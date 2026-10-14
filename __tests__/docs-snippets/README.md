# Docs snippet tests

Typed tests that run the server-side Node.js snippets of the chat docs (the pages of the Node sidebar,
`getstream.io/content/docs/_sidebars/[chat][node].json`) and of the platform docs (the pages of
`getstream.io/content/docs/_sidebars/[platform][default].json`) against a real Stream app.
Only fences labelled `Node.js` are in scope (docs fences must always have a label): they are fixed when they are
wrong. `JavaScript`, `React` and `React Native` fences (client-side code) and `Node.js` fences inside a `<disclosure label="... (no SDK)">` block (reference
implementations without the SDK) are out of scope and are neither tested nor changed.

```sh
# credentials: STREAM_API_KEY / STREAM_SECRET in the repo root .env (the node SDK test app, see .env-example)
yarn test:docs                                                          # all docs tests
yarn test:docs pages/chat/node/01-quick_start/01-backend_quickstart.test.ts  # one file
yarn types:docs                                                         # typecheck the docs tests
yarn test:docs:sync                                                     # test regions == docs fences (no network)
yarn test:docs:sweep                                                    # remove docs-test leftovers older than 30 min, incl. channels, and turns off retention policies (DOCS_SWEEP_DRY_RUN=1 to list only, DOCS_SWEEP_MIN_AGE=0 for all)
yarn eslint __tests__/docs-snippets && npx prettier --check __tests__/docs-snippets   # lint
```

These tests hit the network and are not part of `yarn test` (which runs `__tests__/integration`). Don't run them
at the same time as `yarn test`: both use the same app, and the drift check would see the other suite's changes.

## Push credentials (optional)

`DOCS_PUSH_FIREBASE_CREDENTIALS` in the repo root `.env`: a Firebase service account JSON, on one line. Snippets
that need real push credentials run in `describe.skipIf(!hasFirebaseCredentials)` (`helpers/push.ts`), so the
suite passes without it (those tests are reported as skipped). `sampleFirebaseCredentials` (`helpers/push.ts`) is
the sample service account JSON from the platform push providers page, for snippets with a credentials
placeholder; when the API rejects it, the snippet needs real credentials and is skipped. Push and webhook tests only call the API and
check the response, or read the setting back (`getApp`, `listPushProviders`, push preferences, ...). They don't
check that notifications or webhook events arrive.

## Layout

```
pages/chat/<docs section>/<page>.test.ts    # chat Node.js snippets, run with the server client
pages/platform/<docs section>/<page>.test.ts  # platform Node.js snippets
helpers/                                    # server client, unique ids, cleanup registry, server-side helpers,
                                            # waits, leak check, app snapshot, push credentials
env.ts                                      # .env loading (fails without STREAM_API_KEY / STREAM_SECRET)
setup.ts                                    # per-file leak check and app-settings drift check
global-setup.ts                             # end-of-run sweep: removes leftovers of files that failed while loading
sync/                                       # `yarn test:docs:sync` (docs fence <-> test region check)
maintenance/                                # `yarn test:docs:sweep`
docs-snippets-todo.md                       # pages to cover, their status, blockers and setup notes
docs-snippets-agent-prompt.md               # prompt for an agent that covers one page
learnings.md                                # lessons from earlier agent runs, read before working on a page
```

The path mirrors the docs path (relative to `content/docs`) without `/_default`, e.g.
`chat/_default/04-messages/01-send_message.md` maps to `pages/chat/04-messages/01-send_message.test.ts`,
`chat/node/01-quick_start/...` to `pages/chat/node/01-quick_start/...` and
`platform/02-identity-and-access/02-users.md` to `pages/platform/02-identity-and-access/02-users.test.ts`.

## Conventions

- Import the SDK from `../../../../index` (relative depth varies) and test helpers from `helpers/`. Use `import type` for types.
- `@stream-io/node-sdk` is aliased to the repo's `index.ts` (`resolve.alias` in `vitest.config.mts`, `paths` in `tsconfig.json`), so a docs fence that starts with `import ... from "@stream-io/node-sdk"` can be a region at module level: declare the values it uses (e.g. `apiKey`) above it.
- The docs call the server client `client`: use `const client = getServerClient()` (`helpers/clients.ts`, 30s timeout) and the same variable names as the docs (`client`, `channel`, ...). `createUserToken(userId)` signs user tokens.
- Snippets act on behalf of users with `user_id` / `created_by_id`: those users must exist (`client.upsertUsers`) and have `uniqueId` ids.
- **Isolation**: the id or name of everything a test creates comes from `uniqueId('name')`: users, channels, channel types, roles, commands, blocklists, segments, campaigns (name), user groups, moderation config keys, predefined filters, push providers. Polls are matched by their creator, so create them as a `uniqueId` user. Never use fixed ids like `"john"` or `"general"`.
- **Cleanup**: register everything you create on a `Cleanup` instance and call `cleanup.run()` in `afterAll`. App-level settings changed by a test must be restored with `cleanup.add(...)`.
- Tests in one file may share data created in `beforeAll`. Nothing may leak across files.
- `cleanup.run()` attempts every step and then throws if anything failed, so leftovers show up as a failed `afterAll` instead of piling up in the app. Server-side hard channel deletion is a background task: `Cleanup` waits for it (`waitForTask`) and retries deleting channel types until their channels are gone.
- **Leak check** (`setup.ts`, runs automatically after each file's own `afterAll`): looks up everything minted by `uniqueId` in that file (users, channels, channel types, commands, roles, custom permissions, blocklists, segments, campaigns, user groups, moderation configs, predefined filters, push providers, polls). Anything still there fails the file with a `LEAK` error listing it, and is then removed. Per-user data (reminders, devices, drafts, ...) goes away with the user. It also snapshots app settings (incl. push and webhook config), pre-existing channel types and retention policies before the file and fails with `DRIFT` if anything changed and wasn't restored.
- **End-of-run sweep** (`global-setup.ts`, after every `yarn test:docs`): a file that throws while loading runs no hooks, so its cleanup and leak check never run. The sweep removes every `docs-test` resource created since the run started (channels are found by listing every channel created since then) and fails the run with a `LEAK` list. It also puts back the retention policies the run started with and fails with `DRIFT` if it had to. Don't run two `yarn test:docs` at once: the sweep would remove the other run's resources.
- Anything created under a non-`uniqueId` name can't be found by the leak check or the sweep. Don't do that.
- **Eventual consistency**: channel type changes (`createChannelType` / `updateChannelType`) take ~30s to reach every API node. Call `await waitForChannelTypePropagation()` (from `helpers/wait.ts`) right after creating or updating a channel type. Timeouts are 90s per test and 180s per hook to leave room for this. Use `retry(fn, { retryIf })` for other eventually-consistent reads (e.g. search). Background tasks: `waitForTask(client, taskId)`, and `waitForBatchTask` for channel batch updates (their top-level status completes too early).
- **App settings**: pages are run one at a time, so tests may change app settings and built-in channel types, but must restore them (`cleanup.add`). The check after each file fails with `DRIFT` otherwise.
- `updateChannelType(client, name, patch)` (`helpers/channel-types.ts`) fills in the fields the request requires; `grantMessagingMembers` (`helpers/grants.ts`) adds `messaging` member grants and registers the restore. `helpers/server.ts` has repeated lookups: `sendServerMessage`, `getServerUser` / `getServerMember` / `getServerChannel` (throw unless exactly one result matches), `deletePollsCreatedBy`, `waitForAppSetting` and `waitForTeamIdSupport` (multi-tenancy toggles).
- One `it` per docs snippet (or per closely related group of snippets in the same tab group).
- Add basic `expect`s after each snippet to prove it did what the docs claim.

## Snippet markers and docs sync

Each docs fence has exactly one marked region in a test. `yarn test:docs:sync` (no network) compares them, so later edits on either side fail until they agree again:

```ts
// #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Syncing channels" tab="Node.js" index=1
// COPY: channelId="kung-fu", creatorId="4645"
const channel = client.chat.channel("messaging", channelId);

// create the channel and set created_by to user id 4645
await channel.getOrCreate({ data: { created_by_id: creatorId } });
// #endregion snippet
```

- **Fence key**:
  - `docs` is the page path relative to `getstream.io/content/docs/` (`chat/...` or `platform/...`).
  - `heading` is the text of the nearest heading above the fence.
  - `tab` is the fence `label` (or `unlabelled`).
  - `index` is 1-based among fences with the same heading text and tab (default 1).
- **COPY**: `name="literal"` pairs, applied to the region before comparing (identifier `name` becomes the docs literal). Don't use COPY variables as object keys or shorthand properties.
- **Comparison**: both sides are formatted with the same prettier options, so quote style and line wrapping don't matter, but any code or comment change does.
- **Coverage** (checked first): every `Node.js` fence (`js`/`javascript`/`ts`/`typescript`) on the pages of the chat Node sidebar and the platform sidebar (`content/docs/_sidebars/[chat][node].json`, `[platform][default].json`), whether or not the page has tests yet, must have a region (inside `it.skip` if it can't run). `JavaScript` / `React` / `React Native` fences and comment-only fences are ignored.
- **Labels**: every JS fence on those pages must be labelled `JavaScript`, `React`, `React Native` or `Node.js`; unlabelled or otherwise labelled JS fences fail.
- **Excluded pages**: `EXCLUDED_PAGES` in `sync/parse.ts` lists sidebar pages that are deliberately not validated, with a reason. Both checks skip them.
- **`DOCS_SYNC_WRITE=<page path> yarn test:docs:sync`** writes the regions of that page into the docs fences (docs prettier style). Use it to apply a fix to the docs. `DOCS_SYNC_WRITE=1` writes all pages.
- **`DOCS_DIR`** points at another docs checkout (default: `../getstream.io/content/docs` next to this repo). The check is skipped if the directory doesn't exist.

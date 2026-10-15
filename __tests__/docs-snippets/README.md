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

## How to add tests?

Run the `docs-sync` Claude Code skill (`.claude/skills/docs-sync/SKILL.md`): `/docs-sync [path to the getstream.io checkout]`. It runs `yarn test:docs:sync` against that checkout, adds tests for new `Node.js` snippets, updates existing tests to docs changes (the docs win), and writes fixes for snippets that don't work back to the docs.

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
docs-snippets-todo.md                       # open API, API spec / node SDK and docs issues
AGENTS.md                                   # test conventions and API quirks, read before working on a page
```

The path mirrors the docs path (relative to `content/docs`) without `/_default`, e.g.
`chat/_default/04-messages/01-send_message.md` maps to `pages/chat/04-messages/01-send_message.test.ts`,
`chat/node/01-quick_start/...` to `pages/chat/node/01-quick_start/...` and
`platform/02-identity-and-access/02-users.md` to `pages/platform/02-identity-and-access/02-users.test.ts`.

## Conventions

The test conventions and the API quirks found so far are in [`AGENTS.md`](AGENTS.md). Read it before working on a page.

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

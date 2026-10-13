# Agent prompt: test the docs snippets of one page

Replace `{{PAGE}}` with a path from `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-todo.md`, e.g. `chat/_default/04-messages/01-send_message.md`.

---

You are verifying the server-side Node.js code snippets of one Stream Chat docs page by writing typed tests that run them against a real Stream app with the `@stream-io/node-sdk` server client (API key + secret). Only fences labelled `Node.js` are in scope. Docs fences must always have a label: if you find an unlabelled `js` fence, label it (`Node.js` for `@stream-io/node-sdk` code, `JavaScript` for client code) and report it. `JavaScript` fences are out of scope: don't test, add or change them.

**Page:** `/Users/zitaszupera/Stream/getstream.io/content/docs/{{PAGE}}`

## Hard rules

- **Do not commit, push, stash, or create branches** in any repo. Work only in the local working tree.
- **Do not write to `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/learnings.md`.** Read it, and propose additions in your final report.
- Only touch:
  - the test files for this page under `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/pages/`
  - the docs page itself
  - this page's status row (and its entries in the Blockers detail / Setup notes / API behavior issues / API spec / node SDK issues / Open docs bugs sections). Fixed docs bugs go in the report only; record a docs bug in **Open docs bugs** only if you leave it unfixed in `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-todo.md`
- Do not edit the helpers, the configs, other pages, or anything in `src/` (`src/gen` is generated from the OpenAPI spec, so hand edits would be lost). If a helper is missing something, write a local helper in your test file and propose the shared helper in your report. If the OpenAPI spec or the generated SDK is wrong, report it under "API spec / node SDK issues".
- Change existing docs snippets as little as possible, and only when they are actually wrong.
- Never put the API key, secret or push credentials in any file. They are loaded from the repo root `.env` (`STREAM_API_KEY`, `STREAM_SECRET`, optional `DOCS_PUSH_FIREBASE_CREDENTIALS`).
- In getstream.io, never run `npm run ci` or `npm run lint` for the whole repo. They rewrite thousands of files, including image assets. Use only the per-file commands listed below.

## Read first

1. `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/learnings.md`: issues that earlier agents ran into. Follow it.
2. `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/README.md`: layout, helpers, isolation, cleanup and snippet-marker conventions. Look at `pages/node/01-quick_start/01-backend_quickstart.test.ts` as an example.
3. The page itself, and its row in `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-todo.md`. Also read the page's entries in the TODO's **Blockers detail** and **Setup notes** sections, and the **App facts** line.
4. The SDK source for every method a snippet calls: `src/StreamClient.ts`, `src/StreamChatClient.ts`, `src/StreamChannel.ts`, `src/StreamModerationClient.ts` and the generated `src/gen/` clients and models (`src/gen/models/index.ts`), for the method name, its request object and its response type. When it's unclear whether a server-side endpoint exists or what it accepts, check the OpenAPI spec: https://github.com/GetStream/protocol/tree/main/openapi/v2 (`chat-serverside-api.json`).

## What to build

- **Test** (`__tests__/docs-snippets/pages/<section path>/<page>.test.ts`): run each `Node.js` snippet with `const client = getServerClient()` (`helpers/clients.ts`), named `client` as in the docs.
  - Snippets act on behalf of users through `user_id` / `created_by_id` / `user`: create those users first (`client.upsertUsers`) with `uniqueId` ids.
  - If a `Node.js` snippet is client-side code (it needs a connected user or a WebSocket, or calls a method the node SDK doesn't have, e.g. `connectUser`, `channel.watch()`, `client.on(...)`), it doesn't belong in a `Node.js` tab. Don't invent a server equivalent: put it in `it.skip('BLOCKED: client-side code: ...')` if it still typechecks, otherwise make the smallest docs fix that turns it into the server-side call the node SDK has, and report it either way.
  - If no `Node.js` fence of the page can be tested, don't write a test file; record why in the report and the TODO.
- **Mirror paths.** The test paths mirror the docs path without the `chat/_default/` prefix. Pages under `chat/node/` go under `pages/node/...`.
- **Test structure:**
  - `describe` per page.
  - `beforeAll` creates the shared users and channels with `uniqueId(...)` ids and registers them on a `Cleanup`.
  - `afterAll` runs `cleanup.run()`.
  - One `it` per snippet, or per tab group when the snippets in it depend on each other.
- **Snippet markers.** Every `Node.js` fence on the page needs exactly one marker in a test (`JavaScript` fences are ignored). `yarn test:docs:sync` checks the format and the coverage.
  - Wrap the docs code like this:
    ```ts
    // #region snippet docs="_default/04-messages/01-send_message.md" heading="Sending a Message" tab="Node.js" index=1
    // COPY: channelId="general", userId="john"
    ...docs code...
    // #endregion snippet
    ```
  - `docs` is the page path relative to `content/docs/chat/`.
  - `heading` is the exact text of the nearest heading above the fence.
  - `tab` is the fence label, or `unlabelled`.
  - `index` (default 1) counts fences with the same heading text and tab on the page. If a key is wrong, the sync check lists the page's fence keys.
  - Everything between the markers must be the docs code. Setup goes before the region and assertions after it.
  - **COPY** (optional, first line(s) of the region): `name="docs literal"` pairs. Where the docs use fixed values ("john", "general", "messageID", `"{{ api_key }}"`), use variables in the test, and the sync check replaces each variable with its literal before comparing. Don't use COPY variables as object keys or in shorthand properties (`{ userId }`).
  - Comment-only fences are skipped by the sync check and need no marker. Every other `Node.js` fence gets a real region: blocked or untestable snippets go inside `it.skip('BLOCKED: ...')` so they are still typechecked. A fence that isn't code (e.g. a bare data shape) is a docs bug: rewrite it as code that runs (e.g. reading and logging the fields), and report it.
- **Assertions.** After each snippet, add basic `expect`s proving that it did what the docs say. For example, check that the response contains the new field, or re-query and check that the state changed. Don't over-assert on volatile fields.
- **Naming**: the id or name of every resource you create comes from `uniqueId(...)` (campaigns: `name`; polls: create them as a `uniqueId` user). The automatic leak check after each file only finds resources named this way. If it reports a `LEAK`, fix your cleanup; don't work around the check.
- **App-level side effects** (app settings, built-in channel types, grants, roles, retention policies, multi-tenancy, push config, webhook URLs, ...): pages are run **one at a time**, so changing them is allowed.
  - Read the original value first and restore it with `cleanup.add(...)`.
  - The check after each file fails with `DRIFT` if app settings or pre-existing channel types differ from before the file ran.
  - Prefer `uniqueId` channel types or `config_overrides` when the snippet allows it.
- **Push notifications and webhooks**: don't test that notifications or webhook events arrive. Calling the API and asserting the response (where there is one) is enough; for a setting, read it back (`getApp()`, `listPushProviders()`, `getPushTemplates`, ...).
  - Snippets that need real push credentials (creating a push provider, `firebase_config`, ...) go in `describe.skipIf(!hasFirebaseCredentials)(...)` (`helpers/push.ts`), so the suite still passes without `DOCS_PUSH_FIREBASE_CREDENTIALS`. Pass `firebaseCredentials` through a COPY variable that maps to the docs placeholder (e.g. `credentials="your service worker config"`). Mark the page 🔑 in the TODO.
  - Snippets that work without credentials (listing providers, push templates, `checkPush` with a payload, ...) run unconditionally.
  - Webhook URL settings: set them to an obvious placeholder (e.g. `https://example.com/...`), assert them with `getApp()`, and restore the original value.
- **Channel types are eventually consistent.** After `createChannelType` or `updateChannelType`, API nodes can disagree for up to ~30s.
  - Call `await waitForChannelTypePropagation()` (from `helpers/wait.ts`) right after the create/update, outside the snippet region.
  - Push the name to `cleanup.channelTypes` straight after `createChannelType`. `Cleanup` deletes it after the channels are gone. Never delete channel types in your own cleanup code.
- **Blockers** (the page's Blockers cell in the TODO):
  - ⛔ snippets go in `it.skip('BLOCKED: <reason>', ...)` so they are still typechecked.
  - If you find a new blocker, use `it.skip('BLOCKED: <reason>')`, mark the page `[~]` and report it, with the exact API error.
- **Partial snippets** (fragments like `filters = {...}` or `...` placeholders): wrap them in the minimal code needed to compile and run. The region still holds exactly the docs text.

## Editing the docs page

- Write fixes from the test with `DOCS_SYNC_WRITE=<page path, e.g. _default/04-messages/01-send_message.md> yarn test:docs:sync`. This writes every region of that page into its fence, applying the COPY values and the docs prettier style (double quotes). Don't paste snippets by hand.
- Follow `/Users/zitaszupera/Stream/getstream.io/content/docs/AGENTS.md`. In particular, no em-dashes in prose or comments.
- Then run, from `/Users/zitaszupera/Stream/getstream.io/content/docs`:
  - `npx prettier --write <page path>`
  - `npx markdownlint-cli2 --config .markdownlint-cli2.cjs <page path>`

## Faulty docs snippets

If a docs snippet is wrong (wrong method name or signature, a type error against the node SDK, wrong request or response shape, a runtime API error that isn't caused by test setup):

1. Make the smallest fix that makes it correct, in the test region.
2. Write it to the docs page with `DOCS_SYNC_WRITE=<page path> yarn test:docs:sync`, then check `git diff` in getstream.io: only the intended fence should change.
3. Record it for the report as before/after with the reason and the evidence (error message or type error).

Tell three kinds of problem apart, and record each in its own list in the todo:

- **Docs bug**: the snippet (or the page) is wrong. Fix the snippet as above; prose and non-Node.js fences are out of scope, record those under **Open docs bugs**.
- **API spec / node SDK issue**: the snippet is correct and the API accepts it, but the OpenAPI spec or the generated SDK is wrong (missing or wrongly typed fields, wrong response types, a required field typed optional). Don't change the snippet or `src/`; record it under **API spec / node SDK issues** (say whether it looks like the spec or the generator) and report it. If the types reject a correct snippet, stop and report it: `it.skip` doesn't help, skipped bodies are still typechecked.
- **API behavior issue**: the API itself seems faulty, or behaves differently from what the docs say (fields missing from responses, data silently dropped, settings not enforced, inconsistent answers between API nodes). Assert what the API actually does and record it under **API behavior issues** with the probe evidence. It is not a blocker: it doesn't make the page `[~]` on its own.

If you're not sure whether the snippet or your setup is wrong, don't edit the docs. Mark it as an open question in the report instead.

## Gates (all must pass before you finish)

Run these from `/Users/zitaszupera/Stream/stream-node`:

```sh
yarn test:docs <your test files>                    # green, with no `LEAK` or `DRIFT` error
yarn types:docs                                     # no type errors (strict TS, no `any` escapes, no `!` non-null assertions)
yarn eslint __tests__/docs-snippets                 # zero warnings
npx prettier --check __tests__/docs-snippets
yarn test:docs:sync                                 # your page: every Node.js fence covered, every JS fence labelled JavaScript/Node.js, every region identical to its docs fence
```

`yarn test:docs:sync`'s coverage check also lists pages nobody has done yet: only your page must be absent from it.

Don't use `@ts-ignore`/`@ts-expect-error` or `eslint-disable` to silence a docs snippet. The one lint-only docs change allowed: a fence that assigns a value it never reads, which the test can't read either (block-scoped), gets a `console.log` of the field the page talks about (see `learnings.md`); report it as a docs correction. A type error in a snippet is either a docs bug (fix it as above) or an SDK typing bug (report it).

Finally, update the page's row in `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-todo.md`: `[x]` when done, `[~]` only when some snippets couldn't run (a blocker); API behavior issues and open docs bugs are recorded in their lists and don't make a page `[~]`.

## Final report (your last message)

1. **Files created/changed**: test files, plus the docs page with a one-line summary.
2. **Docs snippet corrections**: for each one, a before/after diff, the reason, and the evidence. These need human review.
3. **Skipped / untestable snippets**: for each one, the snippet and why (including 🔑 push snippets skipped without credentials, and whether you ran them with credentials).
4. **Client-side code in Node.js snippets**: each fence or part of a fence that needs a connected user, with the error or the reason.
5. **API spec / node SDK issues** and **API behavior issues**: two separate lists (see above), each item with its evidence (not fixed).
6. **Proposed learnings** for `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/learnings.md`: a numbered list of short, reusable lessons that would have saved you time. Skip page-specific trivia. The user will approve or reject each one.

---
name: docs-sync
description: Sync the stream-node docs snippet tests (__tests__/docs-snippets) with a getstream.io docs checkout. Asks for the docs repo, first sweeps the docs for missing or mislabelled Node.js snippets (server-side code labelled JavaScript, JavaScript-only snippets the node SDK can run), then runs `yarn test:docs:sync` against it, brings the tests up to date with docs changes (docs win), adds tests for new Node.js snippets, and writes fixes for broken snippets back to the docs. Use when the user asks to sync, check or update the docs snippets or docs snippet tests.
argument-hint: "[path to the getstream.io checkout or its content/docs folder]"
---

# Docs sync

The tests in `__tests__/docs-snippets/` run the server-side `Node.js` snippets of the Stream docs (the chat Node sidebar and the platform sidebar) against a real Stream app with the `@stream-io/node-sdk` server client. Each docs fence has exactly one marked region in a test, and `yarn test:docs:sync` checks that they still agree. This skill makes them agree again after either side changed.

**Docs have preference.** When a region and its fence differ, the docs version is the source of truth: update the test to match it. Change the docs only when the docs snippet doesn't work (type error against the node SDK, runtime error that isn't caused by test setup, wrong request or response shape), and then write the fix back from the test.

All paths below are relative to the stream-node repo root unless they start with `$DOCS_DIR`.

## 1. Find the docs folder

If the user passed a path as the argument, use it. Otherwise ask for it with AskUserQuestion: "Where is the getstream.io docs checkout?", offering `../getstream.io` (the default sibling checkout) as the first option, and accepting any path through "Other".

Resolve it to the `content/docs` folder:

- A repo root (has `content/docs/_sidebars/`): use `<path>/content/docs`.
- A path that already ends in `content/docs` (has `_sidebars/`): use it as is.
- A bare repo name (e.g. `getstream.io`): try it as a sibling of this repo (`../<name>`).
- Anything else, or a folder without `_sidebars/`: tell the user what was checked and ask again. Never guess a path from another machine.

Make it absolute and call it `$DOCS_DIR`. Pass it as `DOCS_DIR=$DOCS_DIR` on **every** `yarn test:docs:sync` call: without it, the sync check falls back to the sibling checkout and, if that doesn't exist, silently skips the docs comparison.

Then show the user, before changing anything:

- the docs repo's current branch and `git status --short` (run git in `$DOCS_DIR`),
- the stream-node branch and `git status --short`.

If either repo has uncommitted changes, say so: your edits will mix with them. Don't stash, commit or switch branches in either repo.

## 2. Read the conventions

Before editing tests, read:

1. `__tests__/docs-snippets/AGENTS.md`: test conventions, test app facts and API quirks. Follow it.
2. `__tests__/docs-snippets/README.md`: layout, commands, push credentials and the snippet-marker format (fence key, COPY, `DOCS_SYNC_WRITE`).
3. `__tests__/docs-snippets/docs-snippets-todo.md`: the open issues. A difference may be the docs fixing one of them.
4. `$DOCS_DIR/AGENTS.md`, if it exists: the docs writing rules (e.g. no em-dashes).

Live tests need `STREAM_API_KEY` and `STREAM_SECRET` of the docs test app in the repo root `.env` (see `.env-example`); `DOCS_PUSH_FIREBASE_CREDENTIALS` is optional (push tests are skipped without it). If the key or secret is missing, ask the user for them. Without them you can still sync, typecheck and lint, but you can't tell whether a changed snippet works: say so in the report, and don't change any docs snippet in that case.

## 3. Sweep for missing Node.js snippets

Before the sync check, make sure every server-side snippet on the tested pages has a `Node.js` fence. The sync check only compares `Node.js` fences with their regions; it can't tell that a `JavaScript` fence should have been one.

### Scope

- Pages: every page of the `[chat][node].json` and `[platform][default].json` sidebars (`$DOCS_DIR/_sidebars/`) under `chat/` or `platform/`, the same list as `findSidebarPages` in `sync/parse.ts`.
- Fences: every JS fence (`js`, `javascript`, `ts`, `typescript`) labelled `JavaScript` or unlabelled, together with its tab group: the other fences in the same `<Tabs>` block, or the fence alone when it isn't in one.
- Out of scope: `React` and `React Native` fences, the stream-chat-js@9 fences (`JavaScript (stream-chat-js@9)`, `Node.js (stream-chat-js@9)`), `Node.js` fences inside a `<disclosure label="... (no SDK)">` block, and comment-only fences.

List them with a throwaway script in the scratchpad (page, heading, line, the labels in the group, the code). Then classify each group by its tabs first and the prose second:

| Group                                                                                                    | Action                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A `JavaScript` fence with server-only code (secret, `updateAppSettings`, `createToken`, ...)             | Relabel it `Node.js` and rewrite it to the node SDK call (`client.updateApp`, ...). Relabel its `JavaScript (stream-chat-js@9)` partner, if any, `Node.js (stream-chat-js@9)`, code unchanged. |
| Only client SDKs (`JavaScript` plus Kotlin, Swift, Dart, Unity, Unreal, React, ...)                      | Client-side: no `Node.js` tab, even when a server equivalent exists.                                                                                                                           |
| `JavaScript` only (or with non-SDK tabs such as `JSON`)                                                  | Add a `Node.js` tab when the node SDK can do the same thing, unless the heading or prose hints "client-side only". See below.                                                                  |
| Other server SDK tabs (Python, Ruby, PHP, Go, C#, Java) but no `Node.js`                                 | Add a `Node.js` tab. If the others are comment-only notes ("client-side only operation"), add the same note for the Node SDK.                                                                  |
| A client group, and the page has its own server-side section for it ("Server-Side Usage", "Server Side") | No `Node.js` tab: the server-side section covers it.                                                                                                                                           |

JavaScript-only groups are common: JavaScript is usually the first SDK documented, and the other SDKs follow later. Being alone is no hint that the code is client-side. Client APIs used in passing aren't either: translate them to the server side (`client.user?.language` → `user.language` of a user you have; the message from `client.chat.getMessage`). Skip the group only when:

- the node SDK has no way to do it (WebSocket events with `client.on` / `channel.on`, `channel.watch()`, `registerSubscriptions` and other local client state, UI code), or
- the prose says so ("the server-side SDKs do not expose custom request headers at all").

To check what the node SDK can do, read `src/StreamClient.ts`, `src/StreamChatClient.ts`, `src/StreamChannel.ts` and `src/gen/`.

### Writing the Node.js fence

- Mirror the `JavaScript` fence: same comments, structure and placeholder literals (`"user-1"`, `"messaging:general"`).
- Use the node SDK's shapes and types: `client.chat.*` / `client.feeds.*`, request objects (`filter_conditions`, `preferences: [...]`), `Date` where the types say `Date` (not `.toISOString()`), and `user_id` where the client code acts as the connected user (server-side `queryChannels` with `hidden` / `muted`, drafts, devices need it).
- Don't write a `Node.js (stream-chat-js@9)` fence for it: list the group in the report so the v9 version can be added by hand.
- Put it before the group's `</Tabs>`. A fence that isn't in a `<Tabs>` block: wrap it and the new fence in `<Tabs>`.
- From `$DOCS_DIR`, run `npx prettier --write <page path>` and `node scripts/tab-lint.mjs <page path>` (it puts the tabs in the canonical order: client SDKs first, then server SDKs).

The new fences then show up in the sync check as `snippets without a test region`, and get a test like any other new fence (see "New fence without a region"). Once the test passes, run `DOCS_SYNC_WRITE` for the page and check that it changes nothing or only whitespace in the new fences. Report every added or relabelled fence under "Docs changes".

## 4. Run the sync check

```sh
DOCS_DIR=$DOCS_DIR yarn test:docs:sync
```

It runs without network and reports four kinds of failure. Collect them all, grouped by docs page, before fixing anything.

| Failure                                    | Meaning                                                                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `snippets without a test region`           | A `Node.js` fence on a tested sidebar page (chat Node, platform) has no region: a new snippet, a new page, or a fence whose key changed (see the next row).             |
| mislabelled JS fences                      | A JS fence is unlabelled or has a label other than `JavaScript`, `React`, `React Native`, `Node.js` or their stream-chat-js@9 versions.                                 |
| `no such fence`                            | A region's key (`docs`, `heading`, `tab`, `index`) matches no fence: the fence was removed, moved, or its heading was renamed. The failure lists the page's fence keys. |
| `<region> differs from <docs file>:<line>` | The region's code and the fence's code differ.                                                                                                                          |

**Check that the docs branch matches the SDK first.** Because the docs win, syncing against docs written for another SDK version would rewrite working tests to code this SDK doesn't have. If many regions across many pages differ, or the differences look like an API change rather than a docs edit (renamed methods, different request shapes), stop: show the user both branches and a few example differences, and ask whether this is the right docs checkout before changing anything.

A renamed heading or a reordered fence shows up twice: as `no such fence` for the old key and as a missing region for the new one. Pair them up by code before treating either as a new or removed snippet.

## 5. Fix each failure

Work one docs page at a time.

### Mislabelled fence

Label it `Node.js` for `@stream-io/node-sdk` (server-side) code, `JavaScript` for client code. Code that works on both sides (e.g. a bare filter object) gets `JavaScript`: an unlabelled `js` fence already renders like `label="JavaScript"` (the JavaScript route's own sample, a titled fallback on the Node route), so the page doesn't change. Whether it also needs a `Node.js` tab is decided by the sweep (step 3). Otherwise, `JavaScript`, `React` and `React Native` fences, the stream-chat-js@9 fences (`JavaScript (stream-chat-js@9)`, `Node.js (stream-chat-js@9)`), and `Node.js` fences inside a `<disclosure label="... (no SDK)">` block (reference implementations without the SDK), are out of scope: never test or change them.

### Region differs from its fence (docs changed)

1. Replace the region's code with the fence's code. Keep the region's COPY line: where the docs use a fixed value that a COPY variable stands for (`channelId="general"`), keep the variable in the region. If the docs changed that literal, update the COPY value. If the docs introduced a new fixed value that would clash with other tests (a fixed user, channel or channel type name), add a COPY variable from `uniqueId(...)` for it.
2. Adjust the setup before the region and the assertions after it to the new code (new users acting through `user_id`, a different response shape, a new call to assert).
3. Run the page's test: `yarn test:docs <test file>`, then `yarn types:docs`.
4. If it passes, done. If it fails, decide why:
   - **Test setup** (missing user, permission, channel config, eventual consistency): fix the setup, not the region.
   - **API spec / generator or node SDK issue**: the snippet is correct and the API accepts it, but the OpenAPI spec, the generated SDK code or the hand-written node SDK code is wrong (missing or wrongly typed fields, wrong response types). Don't change the snippet or `src/` (`src/gen` is generated, hand edits are lost): add it to "API spec / generator issues" or "Node SDK issues" in the TODO and report it. `it.skip` doesn't help with type errors: skipped bodies are still typechecked.
   - **API behavior issue**: the API behaves differently from what the docs say. Assert what it actually does, and report it with the evidence (see "Report"). Don't add it to the TODO.
   - **The docs snippet is wrong**: fix it as described in "Broken docs snippet" below.
   - **Not sure** whether the snippet or the setup is wrong: don't touch the docs. Leave the test failing or put the snippet in `it.skip('BLOCKED: <reason>', ...)` and report it as an open question.

### Marker points at no fence

- **Heading renamed or fence moved/reordered**: update the marker's `heading` / `tab` / `index` to the key the failure lists (it matches the fence with the same code).
- **Fence removed from the docs**: remove the region together with its `it` (or the part of the `it` that only exists for it) and any setup only it used. If a whole page was removed or left the sidebar, remove its test file.

When a fix lands that resolves an entry in `docs-snippets-todo.md` (the docs fixed a recorded docs bug, say), remove that entry.

### New fence without a region

Write a test for it in the page's test file (create the file if the page is new). The path mirrors the docs path relative to `content/docs/`, without `/_default`: `chat/_default/04-messages/01-send_message.md` → `__tests__/docs-snippets/pages/chat/04-messages/01-send_message.test.ts`. Follow `__tests__/docs-snippets/AGENTS.md` (isolation with `uniqueId`, `Cleanup`, one `it` per snippet, basic `expect`s after each region). In short:

- Run the snippet with `const client = getServerClient()` (`helpers/clients.ts`), named `client` as in the docs. Users the snippet acts for (`user_id`, `created_by_id`) must exist first, with `uniqueId` ids.
- Everything between the markers is the docs code; setup goes before, assertions after. Fragments get the minimal surrounding code to compile and run.
- Comment-only fences need no region.
- A fence that isn't code (e.g. a bare data shape) is a docs bug: rewrite it as code that runs (e.g. reading and logging the fields), and report it. Never remove a `Node.js` fence just because it is a fragment or can't be tested: wrap it, or put it in `it.skip`.
- A snippet the test app can't run goes in `it.skip('BLOCKED: <reason>', ...)` so it is still typechecked; report the exact API error.
- **Client-side code in a `Node.js` fence** (needs a connected user or a WebSocket, or a method the node SDK doesn't have: `connectUser`, `channel.watch()`, `client.on(...)`): never test different code from what the fence shows. If the node SDK can do the same thing, make the smallest docs fix that turns the fence into that call (`channel.watch()` → `channel.getOrCreate()`, `user_id` instead of `connectUser`). If it can't (events, WebSocket, local client state), the fence is mislabelled: label it `JavaScript`. Its `Node.js (stream-chat-js@9)` partner, if any, becomes `JavaScript (stream-chat-js@9)`, code unchanged. Use `it.skip('BLOCKED: client-side code: ...')` only while that decision is open. Report it either way. To check what a server-side endpoint accepts, read the SDK source (`src/StreamClient.ts`, `src/StreamChatClient.ts`, `src/StreamChannel.ts`, `src/gen/`) or the OpenAPI spec (`chat-serverside-api.json` in https://github.com/GetStream/protocol/tree/main/openapi/v2).
- **Push and webhooks**: don't test that notifications or webhook events arrive; assert the response or read the setting back (`getApp()`, `listPushProviders()`, ...). Never touch or use the test app's own push provider (see "Test app" in `AGENTS.md`): only use providers the test creates with `uniqueId` names. Snippets that need real credentials run in `describe.skipIf(!hasFirebaseCredentials)` (`helpers/push.ts`); the README's "Push credentials" section has the details.
- **App-level side effects** (app settings, built-in channel types, grants, webhook URLs, push config, ...): read the original value first and restore it with `cleanup.add(...)`, or the file fails with `DRIFT`.

### Broken docs snippet

Only when the docs snippet itself doesn't work (wrong method name or signature, a type error against the node SDK, wrong request or response shape, a runtime API error not caused by setup):

1. Make the smallest fix in the test region.
2. Write it to the docs: `DOCS_DIR=$DOCS_DIR DOCS_SYNC_WRITE=<page path, e.g. chat/_default/04-messages/01-send_message.md> yarn test:docs:sync`. This writes every region of the page into its fence, with the COPY values applied and the docs prettier style. Never paste snippets into the docs by hand.
3. Check `git diff` in `$DOCS_DIR`: only the intended fences may change. If others changed, a region was out of sync; go back to "Region differs from its fence".
4. Format and lint the page, from `$DOCS_DIR`:
   ```sh
   npx prettier --write <page path>
   node scripts/tab-lint.mjs --check <page path>
   ```
   (The docs repo has no markdownlint config.) In zsh, pass several pages as an array (`FILES=(a.md b.md); npx prettier --write $FILES`): a space-separated string stays one argument.
   Never run `npm run ci` or `npm run lint` for the whole docs repo: they rewrite thousands of files, including images.
5. Record the fix for the report: before/after, reason, and evidence (error message or type error).

Docs bugs you leave unfixed (prose, non-`Node.js` fences, or waiting for a decision) go to "Open docs bugs" in the TODO.

## 6. Gates

All must pass before you finish:

```sh
DOCS_DIR=$DOCS_DIR yarn test:docs:sync    # no missing, mislabelled, unknown or differing snippets
yarn test:docs <changed test files>       # green, no LEAK or DRIFT error
yarn types:docs                           # no type errors, no @ts-ignore / @ts-expect-error / `!`
yarn eslint __tests__/docs-snippets       # zero warnings
npx prettier --check __tests__/docs-snippets
```

Never silence a docs snippet with `@ts-ignore` / `@ts-expect-error`: a type error in a snippet is a docs bug or an SDK issue. Don't use `eslint-disable` either. The one lint-only docs change allowed: a fence that assigns a value it never reads (which the test can't read either, being block-scoped) gets a `console.log` of the field the page talks about; report it as a docs correction.

Run `yarn test:docs` only on the test files you changed, never two runs at once, and never at the same time as `yarn test`: they share the app, and the drift check and end-of-run sweep would see each other's changes.

## Rules

- Don't commit, push, stash or create branches in either repo.
- Never write the API key, secret or push credentials to any file except the repo root `.env`.
- Don't edit `src/`, `__tests__/docs-snippets/AGENTS.md`, the helpers or the configs. Propose changes in the report instead.
- Change docs snippets as little as possible: only when they don't work, or to add or relabel `Node.js` fences in the sweep (step 3).

## Report

End with:

1. **Docs folder** used, and both repos' branches.
2. **Sweep**: `Node.js` fences added or relabelled, per page, and the groups you left without one and why (client SDKs only, a server-side section on the page, no node SDK equivalent, prose says client-side).
3. **Tests updated from the docs**: per page, the regions changed and why the setup/assertions changed.
4. **New and removed tests**: snippets added, regions removed with their fences, renamed markers.
5. **Docs changes**: every fence changed in `$DOCS_DIR` (fixes, labels, client-side code), each with before/after, reason and evidence. These need human review.
6. **Skipped snippets**: new `it.skip` / credential-gated snippets and why.
7. **TODO changes**: entries added to or removed from the TODO lists.
8. **API behavior issues**: where the API behaves differently from what the docs say, each with the request, the observed result, what the docs claim, and how the test handles it.
9. **Proposed additions to `__tests__/docs-snippets/AGENTS.md`**: short, reusable lessons. Skip page-specific details.

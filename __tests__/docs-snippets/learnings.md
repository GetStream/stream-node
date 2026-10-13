# Docs snippet tests: learnings

Lessons collected from agent runs. Read this before working on a page.
Entries are added only after the user approves them (agents propose them in their final report).

## Setup and tooling

- A fence that creates a channel type and uses it right away: spy on `client.chat.createChannelType` with a `mockImplementation` that awaits the bound original and then `waitForChannelTypePropagation()`, so the region runs as written without "channel type does not exist" from another API node.

- When a fence's pagination branch (`if (page1.next) { ... }`) needs more results than the docs `limit`, COPY-map the limit to a small number (`pageSize=10` → 1) and create just enough items so the branch runs.

- Fences that start with `import` statements are module-level regions. If two fences import the same names, put them in separate test files (`<page>.test.ts`, `<page>.<topic>.test.ts`): duplicate import bindings in one module are a SyntaxError.
- Snippets that read local files (`./image1.jpg`): write small fixtures to an `os.tmpdir()` dir (a base64 JPEG works for image uploads) and COPY-map the paths (`image1Path="./image1.jpg"`).
- If module-level setup or a module-level region throws, the file fails while loading and none of its hooks run (no cleanup, no per-file leak check). The end-of-run sweep (`global-setup.ts`) then removes what it created and fails the run with a `LEAK` list: fix the load-time error, the leftovers are already gone.

- A spy whose `mockImplementation` calls the bound original must be restored even if the test fails: add `afterEach(() => vi.restoreAllMocks())`. Otherwise the next test binds the old spy, and its own spy recurses until "Maximum call stack size exceeded".
- In zsh, `echo =====` fails ("not found": `=word` is command expansion) and stops the rest of a `;` chain. Use another separator (`echo ----`). BSD `sed` basic regex has no `\|` alternation (`sed '/a\|b/d'` silently matches nothing): use `sed -E '/(a|b)/d'` or `grep -v`.

- To check state between calls inside a region (e.g. after each of several `hide()` calls), spy on the generated method (`client.chat.hideChannel`) with a `mockImplementation` that awaits the bound original, records a probe query, and returns the response. The region stays as is, and `mock.calls[i][0]` is typed (no cast).

- To tell an API behavior from a snippet bug, write a throwaway probe test under `pages/` that logs the results of request variants (e.g. with and without a flag). It still runs the leak check, so name and register what it creates; delete the file before finishing.

- To assert on calls a region awaits without keeping the result, `vi.spyOn(client.chat, '<method>')` (no mock implementation, calls go through) before it and await `spy.mock.results.map((r) => r.value)` after it. `StreamChannel` methods call `client.chat.*`, so the spy sees them too. `mock.results[i].value` is `any`: cast it (`r.value as Promise<ResponseType>`); a return-type annotation still fails `no-unsafe-return`.

- A region whose last call rejects (e.g. "a missing channel returns a 404"): don't wrap it in `try/catch` (its `const`s would be out of scope after it). Spy on the method with `mockImplementation` that calls the original (`client.chat.getChannel.bind(client.chat)`), records the error for that one request and returns `undefined as never`, rethrowing anything else. The region then runs as is and its results are asserted directly after it. Assert on the spy's calls before `mockRestore()` (it clears them). Example: `pages/03-channels/08-get_channel.test.ts`.

- A snippet that assigns a result it never reads (`const update = await channel.update(...)`) fails `unused-imports/no-unused-vars`: assert on that variable after the region instead of disabling the rule.
- COPY replaces the identifier everywhere in the region that isn't a property access or object key, including comments and strings (`sender="..."` also rewrote `{{sender.id}}`). Pick COPY names that appear nowhere else in the fence (`campaignSender`).
- `DOCS_SYNC_WRITE` keeps line breaks that the test's prettier added because of longer COPY names, and docs prettier doesn't rejoin them. Check `git diff` after writing and rejoin untouched lines by hand (the sync check ignores wrapping).
- To read the result of a call the region doesn't keep, spy on the method and `await` its `mock.results[0].value` (a promise for async methods), e.g. `client.updateLiveLocation`.
- Endpoints with very low rate limits (`queryMessageHistory`: 6/min, code 9 / 429) fail on back-to-back runs: spy on the method with a `mockImplementation` that calls the bound original through `retryOnRateLimit` (`helpers/wait.ts`), so the region stays as written.
- `expect.any(...)` inside `toEqual` / `objectContaining` fails `@typescript-eslint/no-unsafe-assignment`: use `toMatchObject` for the literal fields and `typeof x?.field` checks for the rest. The same goes for `expect.objectContaining` / `expect.stringContaining` on an `unknown` error caught in a spy: use `toMatchObject({ code })` and `expect(String(error)).toContain(...)`.
- A fence before the page's first heading uses `heading=""` in its marker. To COPY-map a docs string that contains a test id (`"/ticket suspicious transaction with id 1234"`), map the whole string to a variable built from the id (`ticketText="..."`).
- Two dependent fences that both declare the same `const` (e.g. `response`) can share one `it`: put the second region in its own `{ ... }` block; it still sees the outer variables.

## Server client (`@stream-io/node-sdk`)

- `createChannelType` doesn't take every field `updateChannelType` does (e.g. `reminders`, `grants`, TS2353): create with the required fields only, assert the default, then update. To restore an app setting (e.g. `reminders_interval`), save `getApp().app.<key>` and `cleanup.add` an `updateApp` with it followed by `waitForAppSetting(client, '<key>', original)`.

- Attachments in node SDK requests require `custom` (TS2741 otherwise): `{ type, image_url, custom: {} }`.

- Invites in setup: `getOrCreate({ data: { invites: [{ user_id }] } })` creates a pending invite; `channel.update({ accept_invite: true, user_id })` / `reject_invite` answers it. `queryChannels({ filter_conditions: { invite: 'pending' | 'accepted' | 'rejected' }, user_id })` returns only the matching channels: assert the exact id list.

- Adding members to an existing channel in setup: `channel.update({ add_members: [{ user_id }] })`. `getOrCreate({ data: { members } })` only applies `members` when it creates the channel.

- Failed requests throw `StreamError`: `code` is Stream's error code, the HTTP status is `metadata.responseCode`. Import `StreamError` from the package entry (`index.ts`).

- Custom data is under `custom` in requests and responses (channel `data.custom.name` in, `channel.custom.name` out; same for users, members, messages, attachments), not at the top level.
- Distinct channels (`client.chat.channel(type)` with no id, then `getOrCreate({ data: { members } })`) get an id hashed from the members, which the leak check can't find. `StreamChannel.getOrCreate` sets `channel.id` from the response, so push `channel.cid` to `cleanup.channels` right after the region, and use `uniqueId` members so the hash is unique per run.
- `ChannelResponse` has no `config_overrides` (TS2339): assert an override through the merged `channel.config.<flag>` from `getOrCreate({})`.
- `client.updateUsers({ users: { <key>: { id } } })` uses `id` and ignores the map key: a docs literal key (`userId: { id: "userId" }`) can stay while `id` is COPY-mapped to a `uniqueId`.
- Server-side `getDraft`, `deleteDraft` and `queryDrafts` need `user_id` (code 4 "either user or user_id must be provided when using server side auth"), although the SDK types mark it optional: a Node.js fence without it is a docs bug.
- A fence that builds a request object in a separate `const` and passes it later fails TS2322 when a field is a string-literal union (`callback.mode: "CALLBACK_MODE_REST"` widens to `string`). The plain-JS fix is to move the object inline into the call.
- `updateChannelType` returns `commands` as names (`string[]`), while `getChannelType` / `listChannelTypes` return `Command` objects: compare by `.name`. `commands: ["all"]` expands to every built-in command (giphy, ban, unban, mute, unmute).
- A `vi.spyOn(client, 'updateApp').mockImplementation(...)` must take `request?: UpdateAppRequest` (optional), or it fails TS2345.
- A correct fence that the SDK types reject can't be parked with `it.skip`: skipped bodies are still typechecked, so `yarn types:docs` fails for everyone. Stop and report it as a Possible SDK issue. The generator drops `nullable` everywhere (no `| null` in `src/gen/models`); `grants` on `UpdateChannelTypeRequest` / `UpdateAppRequest` is patched locally to allow `null`.
- `verifyAndParseWebhook` fences: build `req = { rawBody, headers: { 'x-signature': sig } }` before the region, where `sig` is the HMAC-SHA256 hex of the uncompressed JSON keyed with `STREAM_SECRET` and `rawBody` is the JSON or `zlib.gzipSync(json)` (the signature always covers the decompressed bytes).
- Optional response fields (`GetTaskResponse.result`, `MessageResponse.i18n`) aren't narrowed by a status check: a fence reading `response.result.url` fails TS18048, and the docs fix is `?.`.
- `getApp().app.enforce_unique_usernames` is typed `string` but `updateApp` expects `'no' | 'app' | 'team'`: cast the saved value when restoring it. `"team"` is accepted with multi-tenancy off.

## API and SDK behavior

- Reminders need `user_message_reminders` on the channel (code 4 "reminders are not enabled for this channel"): `updateChannelPartial({ set: { config_overrides: { user_message_reminders: true } } })` on a `messaging` channel works immediately, no channel type change. `remind_at` must be at least one minute in the future on create and update: for an "overdue" filter, create the reminder ~62s ahead at the start of `beforeAll` and put slow setup after it so the wait overlaps. One reminder per user and message.

- Search indexing is eventually consistent: in setup (before the region), `retry` a `client.chat.search` until it returns the messages the test sent, so the region runs once and can be asserted exactly. Autocomplete matches across fences ("supercali" matches "supercalifragilistic..."): give each search test its own channel.

- A partial message update with `set: { pinned: true }` keeps an existing `pin_expires`: to pin with no expiry, also set `pin_expires: null`.

- Reactions: a `score` sent with `sendReaction` replaces the user's earlier score for that type (a clap of 5 then 25 gives 25, also in `reaction_groups.<type>.sum_scores`). Each user has at most one reaction per type, so for many reactions on one message (pagination), send different types (`type${i}`) from one user.

- A thread's `created_by_user_id` (`queryThreads` filters, `ThreadStateResponse`) is the author of its first reply, not of the parent message: map a docs "creator" literal to the first replier.

- Server-side uploads (`uploadChannelImage`, `uploadChannelFile`, `uploadImage`, `uploadFile`) need `user: { id }` (code 4 "bad user id" without it).
- To prove a delete worked, assert that deleting the same thing again rejects with `{ code: 16, metadata: { responseCode: 404 } }`.

- Server-side URL enrichment is asynchronous: the `sendMessage` response has `attachments: []`; `retry` a `getMessage` until `attachments[0]` exists before asserting `og_scrape_url`.
- A hard-deleted message is 404 (code 16 "message with id ... doesn't exist") for any later message call.
- Partial message updates address custom fields by bare name: `unset: ["color"]`, `set: { "details.status": ... }` act on `message.custom` (create the message with `custom: { color, details }` to prove it).

- Channel batch update tasks: the top-level `getTask` status reaches `completed` before the channels are updated, so `waitForTask` isn't enough: wait for `result.status === 'completed'` and `result.finished_at` (`waitForBatchTask` in `helpers/wait.ts`). A batch started right after another can take ~60s: raise that test's timeout.

- `truncate({ truncated_at })` must be more recent than the channel's previous truncation (code 4 `"truncated_at" field must be more recent than previous one`). A fence that truncates a channel and then truncates it again with a past `truncated_at` is a docs bug: give that call its own channel.

- A grant snippet (adding a permission to a role of a built-in channel type) only proves something if the role didn't have it: assert `not.toContain(permission)` on the original grants first. `updateChannelType({ grants: { <role>: [...] } })` only changes the roles it names, so save and restore just that role (`cleanup.add`, then `waitForChannelTypePropagation()`, as `grantMessagingMembers` does).

- A soft-deleted channel is 404 (code 16 "Can't find channel") for single-channel endpoints, e.g. a following `channel.delete({ hard_delete: true })`. Batch `deleteChannels({ hard_delete: true })` works on soft-deleted channels. A fence that soft- then hard-deletes the same channel is a docs bug: give the hard delete its own channel.
- `skip_truncate` (`channel.delete`, `deleteChannels`) only works on distinct channels (`client.chat.channel('messaging').getOrCreate({ data: { members } })`). To prove history was kept, send a message first, then recreate the channel with the same members and `state: true` and check `messages`.
- Server-side `deleteChannels` returns a `task_id` for soft and hard deletes: `waitForTask` on it before asserting.

- `muteChannel` with one cid in `channel_cids` returns the mute as `channel_mute` (`channel_mutes` is absent): assert on `channel_mute` or `own_user.channel_mutes`.

- To check what one member sees (`hide_history`, per-member truncation, ...), query as that member: `getServerChannel(client, cid, { user_id, message_limit: 10 })` (`helpers/server.ts`) applies their view, e.g. only messages sent after they joined with `hide_history`.

- Server-side `channel.getOrCreate` paginates only with `state: true`: without it the response has no messages, `members` ignores `limit`/`offset`, and `watchers` is never returned. A snippet that reads messages or paginates through `getOrCreate` without `state: true` is a docs bug.

- Server-side sorting on `user_id` uses a collation that ignores punctuation, so it can differ from JS `.sort()` when one id prefix starts another (`uniqueId('tom')` vs `uniqueId('tommaso')`: "tommaso" before "tom-"). In sort assertions, use `uniqueId` prefixes that sort the same both ways (`thierry`, `tomas`, `tommaso`).

- A full `channel.update({ data: { custom } })` replaces the channel's custom data: fields not in the request are deleted. To prove it, create the channel with an extra custom field and check it's gone from `channel.custom` after the snippet.

- Server-side `queryChannels` filters on per-user fields (`hidden`, `muted`) need a `user_id` (code 4 "you cannot query for hidden channels without a user_id"). Per-user response fields (`pending_messages`) likewise only come back with a `user_id`: `queryChannels({ ..., user_id })` or `channel.get({ state: true, user_id })` (`get` without `state: true` returns no channel state). A Node.js fence that reads them without `user_id` is a docs bug.
- `queryChannels` returns 10 channels by default: a snippet without `limit` on more than 10 test channels returns only 10, so assert the count, not the full set.
- Predefined filters can be created from the test: `client.chat.createPredefinedFilter({ name: uniqueId(...), operation: 'QueryChannels', filter: { ..., members: { $in: ['{{user_id}}'] } } })`. COPY the name to the docs literal and register `cleanup.add(() => client.chat.deletePredefinedFilter({ name }))`.

- App setting changes (e.g. `multi_tenant_enabled`) reach API nodes over a few seconds, and `waitForAppSetting` (it only reads `getApp`) can pass while other endpoints still use the old value. After changing and after restoring, also wait until the endpoint you use agrees several times in a row (for multi-tenancy: `waitForTeamIdSupport` in `helpers/server.ts`).
- `team_id` and multi-tenancy: with it off, `team_id` is rejected ("team_id is not supported when multi-tenancy is not enabled", code 4); with it on, it is required. Run the `team_id` snippets in a nested `describe` that turns multi-tenancy on and restores it, and register the team resources' deletion after the restore step (`cleanup.add` runs in reverse, so they are deleted while multi-tenancy is still on).
- Campaigns: a campaign can only be started once (code 4 "cannot be started"), and `scheduled_for` must be in the future. A "start now" campaign shows `scheduled` briefly before `in_progress`/`completed`. A running campaign can't be deleted and a completed one can't be stopped, so cleanup retries stop, then delete. A segment can't be deleted while a campaign uses it: delete campaigns first.
- Polls work on the built-in `messaging` type with no config change. A vote needs the poll sent in a message first (`sendMessage` with `poll_id`, by the poll's creator). A full `updatePoll` resets every field it doesn't send (create with a `description`, assert `''` after); partial `unset: ["custom_property"]` acts on `poll.custom` by bare name.
- An app-level feature that is off fails with code 17 (403) "... is not enabled for this app, please contact support": that's a ⛔ blocker (`it.skip('BLOCKED: ...')`). Probe it with one plain call before writing setup. Channel-level flags for it (`shared_locations: true` in `config_overrides` or on a channel type) are accepted even then, so a passing "enable" test proves nothing on its own. With the feature on, a channel without the flag fails with code 17 "... is not enabled for this channel": assert that before the "enable" fence and the success after it.
- `translateMessage` works with the app's `auto_translation_enabled` off: no app setting change is needed to test it.
- With slow mode off, channel responses may omit `cooldown` instead of returning 0: assert `channel?.cooldown ?? 0`.
- `queryDrafts` returns the newest draft first (default and `sort: [{ field: 'created_at', direction: -1 }]`): create drafts in a known order and assert the exact `channel_cid` order.
- Restricted visibility (`restricted_visibility: [userId]`, enabled on the test app): compare `getServerChannel(client, cid, { user_id, message_limit })` for a listed member and for an unlisted one. Only users without `ReadRestrictedVisibilityMessage` prove the hiding: admins have it by default and always see the message, so the unlisted viewer must be a plain `user`.
- When a page says an app setting adds a field to responses, check the field too, not only the setting read back (push and webhook settings excepted). `user_response_time_enabled`: a member's reply to another user's message sets the replier's `avg_response_time` within a few seconds (`retry` `getServerUser`).
- Pending messages (enabled on the test app): a second `commitMessage` fails with code 4 "is no longer pending", soft-deleting a pending message fails with code 4 "cannot soft delete a pending message", and server-side `getMessage` / `getManyMessages` return pending messages.
- `shared_location` is missing from server-side `getMessage`, from `queryChannels` without `user_id` and from `getOrCreate({ state: true })`. Read it with `getServerChannel(client, cid, { user_id, message_limit })` or `getUserLiveLocations({ user_id })`.
- Message history entries hold the version before each update, attributed to that version's author (`message_updated_by_id`), not to the user whose update replaced it.
- Retention policy run history is empty for a new policy (the first cleanup runs after 24 hours): the run query can only be asserted as an array whose items all match the policy filter.
- A new channel type starts with empty `guest` grants (no `messaging` defaults). To test removing guest grants on a `uniqueId` type, first copy the guest grants from the built-in type (read only), then `waitForChannelTypePropagation()`; with create + update waits, give that `beforeAll` a 180s timeout.
- Uploads are checked by content as well as extension: a tiny CSV (`a,b`) is read as `text/plain` and fails "File type text/plain is not supported" under `allowed_mime_types: ["text/csv"]`. Use a few rows of real CSV.
- To prove `disable_auth_checks`, send a dev token (`<header>.<payload>.devtoken`, base64url JSON) to `POST /channels?api_key=...` with `stream-auth-type: jwt`: 201 while checks are off, 401 when on. The 401 message differs per API node ("development tokens are not allowed for this application" or "Token signature is invalid", the latter for over a minute on some nodes): accept both, and `retry` until the status matches.
- `file_upload_config` / `image_upload_config` come back with every list present (`[]`) and `size_limit: 0`: restore the saved original and `waitForAppSetting` (deep compare) for it.
- A new custom role isn't known to every API node right away: `updateUsersPartial({ set: { role } })` just after `createRole` can fail with code 4 `role "..." provided but not defined`. Spy on `client.updateUsersPartial` with a `mockImplementation` that calls the bound original through `retry(..., { retryIf: <message includes 'provided but not defined'> })`. `deleteRole` right after `createRole` fails the same way with `role "..." does not exist`: retry it like that on `'does not exist'`.
- `updateChannelType({ grants: null })` resets grants to the API defaults, which differ from a new type's initial grants (they add e.g. `create-attachment`, `send-poll`, `create-mention`): assert against the update response. New and built-in types start with `guest: []` and `anonymous: []`: to prove a removal snippet works, give those roles grants first.
- `updateChannelPartial({ set: { config_overrides: {...} } })` replaces the whole overrides object, it doesn't merge: a later override drops the earlier ones. With `config_overrides.replies: false`, a reply (`parent_id`) fails with code 19 (400), a direct check for that override.
- Channel-level `blocklist` overrides aren't validated (a nonexistent name is accepted) and, on this moderation-enabled app, don't block messages: only the config read back can be asserted. `createChannelType` with a just-created blocklist can fail with "invalid block list name" for ~20s.
- Firebase calls validate the credentials on every request: `upsertPushProvider` and `updateApp({ firebase_config })` fail with code 4 "firebase credentials are invalid" without a real service account, even when only a template changes, so the whole test goes in `describe.skipIf(!hasFirebaseCredentials)`. On this push v3 app `getApp().app.push_notifications` legacy Firebase config is just `{ enabled: false }` and credentials are never returned: cleanup can only restore templates and the enabled flag.
- Export tasks (`exportChannels`, `exportUsers`) finish within seconds: `waitForTask` is enough, and `result.url` downloads with plain `fetch` (no auth), so assert the export's contents (v2: one JSON object per line).
- `client.moderation.flag`: a repeat flag by the same user on the same entity raises `flags_count`, but the review item's `flags` keep only the first one (later `reason` / `custom` are dropped). A fence that flags one placeholder id several times from one user with different reasons is a docs bug: give each call its own entity id. Check flags by `retry`ing `client.moderation.queryReviewQueue({ filter: { entity_id } })` until it returns one item (about a second), then assert `items[0].flags[i]`.

## Server-side vs client-side

- Client-only setup (e.g. creating a draft) can be done with `fetch` as the user: `POST https://chat.stream-io-api.com/channels/{type}/{id}/draft?api_key=...` with headers `Authorization: createUserToken(userId)`, `stream-auth-type: jwt` and body `{ message: { text, parent_id? } }` (example: `pages/05-features/10-advanced/12-drafts.test.ts`).

## Docs conventions

- A fence that assigns a value it never reads, where the test can't read it either (block-scoped, e.g. `if (page1.next) { const page2 = ... }`), fails `no-unused-vars`. Fix the docs minimally by logging the field the page talks about (`console.log(taskResponse.result?.status)`, `console.log(page2.threads)`). Never use `eslint-disable`. In the test, assert the variables that are in scope after the region directly, and read the block-scoped value from the log: `vi.spyOn(console, 'log').mockImplementation(() => undefined)` before the region, `log.mock.calls[0]` after it (example: `pages/04-messages/03-threads.test.ts`, "Supported Sort Fields"). An unused catch parameter (`catch (err) { // comment }`) fails the same rule (`caughtErrors: "all"`): add `console.error(err)` and, in the test, spy on `console.error`.

- A fence that runs conflicting operations on one placeholder id (soft- then hard-delete a channel, truncate again with an earlier `truncated_at`, delete a message after hard-deleting it) is a docs bug: give the later call its own id (`otherChannel` / `"random"`, `anotherMessageID`), reusing a name another tab already uses when there is one.

- A fence that reuses the same placeholder ids for a call that needs a different resource (e.g. `deleteChannels({ cids: [cid1, cid2], skip_truncate: true })` after hard-deleting `cid1`/`cid2`, "distinct channels only") is a docs bug: give that call its own ids (`distinctCid1`, `distinctCid2`). Don't swap request fields in a spy to make it pass.

- Undefined app-supplied values in a fence (`userId`, `channelId`, ...) aren't docs bugs: define them in the test just before the region and leave the docs as they are.

- A docs fix is the code change only: don't add explanatory comments to the fence (e.g. why `user_id` is needed). Put the reason in the report.

## Isolation and cleanup

- Per-user data (reminders, drafts, ...) is easiest to assert exactly with one `uniqueId` user per test, each COPY-mapped to the docs' `"user-id"` literal.

- To prove something does NOT happen (e.g. a silent message doesn't raise the unread count), add a positive control: read the member's `unread_messages` from `getServerChannel(client, cid, { user_id })` (`read` array), then send a normal message and `retry` until it goes up by 1, so a 0 can't come from a lagging counter.
- Unread counts: `client.chat.unreadCounts({ user_id }).total_unread_count` is user-wide (across all that user's channels, so give each test its own `uniqueId` user for an exact total), `getServerChannel(client, cid, { user_id }).read` is per channel, and `channel.get({ state: true }).read` lists every member. They update within a second of a send or mark read/unread (`retry` is enough). `markUnread({ message_id, user_id })` marks that message and every later one unread: mark the channel read first, then assert the count equals the messages from that one onwards.

- A `DRIFT` that lists every built-in channel type with the same change the page never made (e.g. `grants` gaining `anonymous: []`) comes from outside the file: an app-wide change still propagating, or another suite (`yarn test`) on the same app. Check with repeated `listChannelTypes()` calls and rerun once it settles; don't add restore code for settings the page doesn't touch, and report it.

- Snippets that target every channel of a built-in type (`filter: { types: { $in: ["messaging"] } }`) must not run as written: COPY-map the type name to a `uniqueId` channel type (create it, push it to `cleanup.channelTypes`, `waitForChannelTypePropagation()`). The same applies to snippets that change a built-in type (`updateChannelType({ name: "messaging", ... })`): run them on a `uniqueId` type via COPY (`channelType="messaging"`), so nothing built-in needs restoring.

- Short-lived state from an earlier test (e.g. the docs' 10-second mute) can expire before a later test uses it: recreate it outside the region in the test that needs it.

- To prove a sort snippet does the work (e.g. `pinned_at: -1` first), create the item it should put first before the other one: without the sort the newer one comes first, so `toEqual([expected, other])` only passes with the sort.

- `uniqueId(...)` names must be kebab-case (no spaces or `&`): the leak check passes every minted id to a channel `id: { $in }` query, which fails with "invalid id value" and leaves that scan undone. Put docs literals like `"Design Team"` in a COPY variable.
- Docs pagination cursors (`id_gt: "last-id"`, `name_gt: "abc"`) can filter out the test's own resources: map them to `''` with a COPY variable so the assertions see what the test created.
- Docs segment filters ("all users created after 2020") target the whole app: COPY-map them to something only the test's users match (the test start time, a `uniqueId` custom field value) before a campaign is started.
- Channels the API creates from templates (campaign channels named `{{receiver.id}}-{{sender.id}}`) aren't found by the leak check: find them by member in cleanup and push them to `cleanup.channels`. Keep the `uniqueId` names short so the combined id stays under 64 characters.
- `queryPolls` filters (`is_closed: true`) match every poll in the app. When the fence can't be scoped by COPY, create two matching polls and assert their relative order under the docs sort instead of the full list.
- `event_hooks` changes: save `getApp().app.event_hooks` before the region and `cleanup.add` an `updateApp({ event_hooks: original })` followed by `waitForAppSetting(client, 'event_hooks', original)`; passing the returned hooks back keeps their ids (no DRIFT).
- Tests that change the same channel type in setup and again in the snippet need two `waitForChannelTypePropagation()` waits (~60s): give them an explicit 150s timeout (the default is 90s).
- App-level resources that the leak and drift checks don't track (e.g. retention policies): save the original list in `beforeAll`, and `cleanup.add` a restore that puts the originals back and deletes anything the file added. Check that the app is back to its original state after the run.
- A role can't be deleted while a user has it: in cleanup, set that user's role back to `'user'` before `deleteRole` (`Cleanup` deletes users only after the custom steps).
- Unset optional app settings (`before_message_send_hook_url`, `..._attempt_timeout_ms`) are absent from `getApp()`; restoring with `''` / `0` makes them absent again, so `waitForAppSetting(client, key, undefined)` settles with no DRIFT.
- Custom commands are app-wide: give them `uniqueId` names (hyphens are accepted). A command used by a channel type can't be deleted (code 4 "command in use by channel type ..."), and `Cleanup` runs custom steps before deleting channel types: set the type's `commands` to `[]` first (`updateChannelType` helper), then delete the command, retrying on "in use".
- `queryReviewQueue` filters by `entity_type` match the whole app: flag a fresh message just before the region, assert it is `items[0]` under the docs sort and that every item has that `entity_type`.

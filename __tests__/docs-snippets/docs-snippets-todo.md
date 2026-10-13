# Docs snippet tests: todo

Pages of the chat Node sidebar (`getstream.io/content/docs/_sidebars/[chat][node].json`) that contain `Node.js` snippets. Give each page to an agent with `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-agent-prompt.md`. **Run pages one at a time**: tests may change app settings (they must restore them).

- Only server-side snippets are in scope: fences labelled `Node.js`. Unlabelled `js` fences get a label (`JavaScript` or `Node.js`). `JavaScript` fences (client-side) are out of scope.
- **Node.js / Unlabelled**: number of `js` fences labelled `Node.js` / with no label (before the docs were changed).
- **Test**: `yes` when the page gets a test under `__tests__/docs-snippets/pages/...`; `-` when nothing on it can be tested.

**Blockers** (details below; empty = fully runnable, maybe with setup notes):

- ⛔ **Blocked**: the app doesn't have the feature. The snippet goes in `it.skip('BLOCKED: ...')` (still typechecked).
- ◐ **Partial**: only some snippets of the page are affected.
- 🔑 **Push credentials**: needs `DOCS_PUSH_FIREBASE_CREDENTIALS`; the snippets run in `describe.skipIf(!hasFirebaseCredentials)`.
- **Excluded**: not validated, leave as is.

Status: `[ ]` todo, `[x]` done, `[~]` done but some snippets couldn't run (a blocker, e.g. ⛔ or 🔑). API behavior issues and open docs bugs are not blockers: they are tracked in their lists below and don't make a page `[~]`.

Issues are kept in three lists below: [API behavior issues](#api-behavior-issues) (the API itself may be faulty), [API spec / node SDK issues](#api-spec--node-sdk-issues) (the OpenAPI spec or the generated node SDK is wrong) and [Open docs bugs](#open-docs-bugs) (the docs are wrong and not fixed yet).

App facts (node SDK test app, probed 2026-10-12): push v3 with one provider `firebase:firebase` (not a docs-test one, leave it), permissions v2, multi-tenancy off, `disable_auth_checks` off, auto-translation off, campaigns on (segments, user groups and polls endpoints answer), no webhook / SQS / SNS / custom action handler URLs set (`webhook_url`, `custom_action_handler_url`, `sqs_url`, `sns_topic_arn` empty), one entry in `event_hooks`, no retention policies. Channel types: `livestream`, `messaging`, `team`, `agent`, `commerce`, `gaming`, plus `streamnodetest*` types left by the integration tests. Delivery receipts: `delivery_events: true` is accepted on create/update channel type without support enablement (2026-10-12). Location sharing: enabled (2026-10-12); channels still need `shared_locations` (`config_overrides` or channel type), otherwise `sendMessage` with `shared_location` fails with code 17 "location sharing is not enabled for this channel". Translation: `translateMessage` works with auto-translation off; `updateApp({ auto_translation_enabled: true })` is accepted (restored after, 2026-10-12). Restricted visibility messages: enabled (`restricted_visibility` on `sendMessage` works, 2026-10-12). User response time: `updateApp({ user_response_time_enabled: true })` is accepted and `avg_response_time` appears on the replying user within seconds (restored after, 2026-10-12). Dynamic partitioning: `partition_size` / `partition_ttl` accepted on create/update channel type without support enablement (2026-10-12). Message history (audit logs): enabled; `queryMessageHistory` is rate limited to 6 requests per minute (2026-10-12). Not probed yet: feature availability per page (each agent probes what its page needs and records it here).

## chat/node

| Status | Page                                                | Node.js | Unlabelled | Test | Blockers |
| ------ | --------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/node/01-quick_start/01-backend_quickstart.md` | 5       | 0          | yes  |          |

## chat/\_default/02-init_and_users

| Status | Page                                                | Node.js | Unlabelled | Test | Blockers |
| ------ | --------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/02-init_and_users/04-user_groups.md` | 8       | 0          | yes  |          |

## chat/\_default/03-channels

| Status | Page                                                                    | Node.js | Unlabelled | Test | Blockers |
| ------ | ----------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/03-channels/01-creating_channels.md`                     | 2       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/02-query_channels.md`                        | 11      | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/08-get_channel.md`                           | 1       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/03-channel_update.md`                        | 2       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/04-query_members.md`                         | 2       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/05-channel_pagination.md`                    | 2       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/06-channel_members.md`                       | 10      | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/08-archiving.md`       | 1       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/09-pinning.md`         | 1       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/10-muting.md`          | 3       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/11-hiding.md`          | 1       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/12-disabling.md`       | 1       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/13-deleting.md`        | 3       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/14-freezing.md`        | 3       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/15-truncating.md`      | 2       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/16-channel_invites.md` | 6       | 0          | yes  |          |
| [x]    | `chat/_default/03-channels/07-channel_management/17-batch-updates.md`   | 3       | 0          | yes  |          |

## chat/\_default/04-messages

| Status | Page                                                   | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/04-messages/01-send_message.md`         | 9       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/02-file_uploads.md`         | 4       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/03-threads.md`              | 9       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/04-send_reaction.md`        | 5       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/05-pinned_messages.md`      | 3       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/06-search.md`               | 2       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/07-silent_messages.md`      | 2       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/08-unread_reminders.md`     | 1       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/09-message_reminders.md`    | 7       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/10-message_receipts.md`     | 4       | 0          | yes  |          |
| [x]    | `chat/_default/04-messages/11-ai-message-streaming.md` | 2       | 0          | yes  |          |

## chat/\_default/05-features

| Status | Page                                                                     | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/05-features/02-events.md`                                 | 2       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/03-unread.md`                                 | 7       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/06-campaign_api.md`                           | 16      | 0          | yes  |          |
| [x]    | `chat/_default/05-features/07-polls_api.md`                              | 16      | 0          | yes  |          |
| [x]    | `chat/_default/05-features/08-location_sharing.md`                       | 5       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/09-translation.md`                            | 3       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/11-slow_mode_and_throttling.md`   | 1       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/12-drafts.md`                     | 4       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/13-private_messaging.md`          | 1       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/14-user_average_response_time.md` | 1       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/15-pending_messages.md`           | 6       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/16-dynamic_partitioning.md`       | 4       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/17-audit_logs.md`                 | 5       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/18-data_retention_policy.md`      | 4       | 0          | yes  |          |

## chat/\_default/06-app_and_channel_settings

| Status | Page                                                                       | Node.js | Unlabelled | Test | Blockers |
| ------ | -------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/06-app_and_channel_settings/01-channel_types.md`            | 9       | 0          | yes  |          |
| [x]    | `chat/_default/06-app_and_channel_settings/02-app_settings.md`             | 3       | 0          | yes  |          |
| [x]    | `chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md` | 11      | 0          | yes  |          |
| [x]    | `chat/_default/06-app_and_channel_settings/06-channel-level_settings.md`   | 3       | 0          | yes  |          |

## chat/\_default/07-push

| Status | Page                                             | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [~]    | `chat/_default/07-push/07-legacy_push_system.md` | 2       | 0          | yes  | 🔑       |

## chat/\_default/08-webhooks

| Status | Page                                                                               | Node.js | Unlabelled | Test | Blockers |
| ------ | ---------------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md` | 3       | 0          | yes  |          |
| [x]    | `chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md`     | 8       | 0          | yes  |          |

## chat/\_default/10-migrating

| Status | Page                                                  | Node.js | Unlabelled | Test | Blockers |
| ------ | ----------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/10-migrating/03-exporting_channels.md` | 5       | 0          | yes  |          |

## chat/\_default/12-best_practices

| Status | Page                                                               | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/12-best_practices/02-moderation.md`                 | 13      | 0          | yes  |          |
| [x]    | `chat/_default/12-best_practices/05-marketplace_best_practices.md` | 5       | 0          | yes  |          |

## Pages without Node.js snippets

These sidebar pages have no `Node.js` (or unlabelled) JS fences: nothing to test. The sync coverage check still reads them, so a `Node.js` fence added later shows up as uncovered.

- `chat/_default/01-quick_start/02-architecture_and_benchmark.md`
- `chat/_default/01-quick_start/03-roadmap_and_changelog.md`
- `chat/_default/03-channels/07-channel_management/07-overview.md`
- `chat/_default/05-features/01-overview.md`
- `chat/_default/06-app_and_channel_settings/05-permissions_reference.md`
- `chat/_default/07-push/02-push_template.md`
- `chat/_default/08-webhooks/05-webhook_events.md`
- `chat/_default/10-migrating/01-migration_guide.md`
- `chat/_default/10-migrating/02-import.md`
- `chat/_default/11-debugging_and_cli/09-datadog_integration.md`
- `chat/_default/12-best_practices/09-fair_usage_limits.md`
- `chat/_default/11-debugging_and_cli/08-rate_limits.md`
- `chat/_default/11-debugging_and_cli/10-api_budget.md`
- `chat/_default/12-best_practices/08-storage_and_bandwidth.md`
- `chat/_default/12-best_practices/01-best_practices.md`
- `chat/_default/12-best_practices/06-livestream_best_practices.md`

## Blockers detail

None.

## Setup notes (not blockers)

- **node/01-quick_start/01-backend_quickstart**: The first fence creates a client from `"{{ api_key }}"` / `"{{ api_secret }}"` template placeholders: COPY them from the real credentials (`apiKey="{{ api_key }}"`).
- **07-push/07-legacy_push_system**: Push provider / `firebase_config` snippets need real credentials (🔑). Name providers with `uniqueId`; `updateApp({ firebase_config })` changes app-level push config: save it with `getApp()` first and restore it (the DRIFT check compares `push_notifications`). Without real credentials both `upsertPushProvider` and `updateApp({ firebase_config })` (even templates only) fail with code 4 "firebase credentials are invalid" (2026-10-12), so both tests are skipped. Not yet run with credentials: the `firebase_config` restore (templates + `disabled: !enabled`, the app starts with legacy Firebase `enabled: false`) and whether the API accepts the placeholder templates (`"your-template"`) are unverified.
- **08-webhooks/01-webhooks_overview/\***: Configure the hook URL (`before_message_send_hook_url`, `custom_action_handler_url`, ...) with `updateApp`, assert it with `getApp()`, and restore the original (empty) value. Don't test that the webhook is called.
- **02-init_and_users/04-user_groups**: The get/list/search/delete snippets pass `team_id`, which the API rejects without multi-tenancy (`team_id is not supported when multi-tenancy is not enabled`) and requires with it. The test enables `multi_tenant_enabled` for those four snippets (on a `uniqueId` team) and restores it. `waitForAppSetting` is not enough: the user group endpoints of some API nodes keep the old setting for a few seconds more, so the test also waits until 20 calls in a row accept (or reject) `team_id`.
- **03-channels/02-query_channels**: The predefined filter snippets query a filter created by the test (`uniqueId` name, template `{ type: "messaging", members: { $in: ["{{user_id}}"] } }`, COPY-mapped to `"user_messaging_channels"`), deleted in cleanup. The "Filter Best Practices" and "Bad Pattern" regions (and the shared setup) run at module level: their one-line `queryChannels({ filter_conditions: { type: "messaging" } })` would be wrapped by prettier at test indentation, and the sync check keeps the wrapping.
- **03-channels/07-channel_management/13-deleting**: `skip_truncate` only works on distinct channels, so the "Preserving Message History" test runs on a distinct channel (its id COPY-mapped to `"general"`) and recreates it to check the message is back.
- **03-channels/07-channel_management/17-batch-updates**: The docs filter on every `messaging` / `team` channel of the app; the test COPY-maps those type names to two `uniqueId` channel types so only its own channels are touched. Wait on the inner `result.status` / `result.finished_at` of the task (the top-level `status` completes first). A batch started right after another one takes ~60s, so the tests have 240s timeouts.
- **04-messages/01-send_message**: Server-side, URL enrichment runs after `sendMessage` returns: the response has no attachment, and it appears on the stored message about a second later. The test polls `getMessage` for it. The "Mentions" snippet's group id maps to a `uniqueId` user group created in `beforeAll`.
- **04-messages/02-file_uploads**: The "Uploading Files to a Channel" and "Uploading Standalone Files" fences start with `import`s, so they run at module level, and in two files (`02-file_uploads.test.ts`, `02-file_uploads.standalone.test.ts`) because both import `readFile` / `File`. The local paths (`./image1.jpg`, `./report.pdf`, `./avatar.jpg`, ...) are COPY-mapped to a 4x4 JPEG and a minimal PDF written to a temp dir. Server-side uploads need `user: { id }` (code 4 "bad user id" without it).
- **04-messages/09-message_reminders**: Reminders need `user_message_reminders` on the channel (`config_overrides`) or channel type; the "Enabling Reminders" snippet runs on a `uniqueId` type (COPY-mapped to `messaging`). `remind_at` must be at least one minute in the future (create and update, code 4), so the "overdue" filter test uses a reminder created at the start of `beforeAll` with `remind_at` ~62s ahead and waits for it to pass. A user can have only one reminder per message.
- **05-features/06-campaign_api**: Campaigns and segments use `uniqueId` ids and names; the docs segment filters ("created after 2020", `country: "USA"`) are COPY-mapped to the test start time and a `uniqueId` country so only the file's users are targeted. A campaign can be started only once (code 4 "cannot be started" after it ran), and one started "now" reads `scheduled` for a moment before `in_progress` / `completed`; `scheduled_for` must be in the future. A running campaign can't be deleted ("is in progress") and a completed one can't be stopped: cleanup retries stop + delete. Campaign channels get template ids (`{{receiver.id}}-{{sender.id}}`, keep user ids short for the 64-char limit), so cleanup finds them by member. `createSegment` rejects `filter: {}` (code 4 "filter must contain at least 1 item"). `team` in `channel_template` works with multi-tenancy off.
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook**: Commands are app-wide: the docs' `"ticket"` is COPY-mapped to a `uniqueId` name (hyphens are accepted). A command in use by a channel type can't be deleted (code 4 "command in use by channel type"), so cleanup first sets the type's `commands` to `[]`, then deletes the command. The intro fence (sending `/ticket ...`) runs last on a `uniqueId` type with the command (COPY-mapped to `"messaging"`), after the handler URL is set to the example.com placeholder: Stream calls it, it fails, and `sendMessage` rejects with code 45, which the test records through a spy and asserts.
- **All pages that create/update channel types**: Call `waitForChannelTypePropagation()` after `createChannelType` / `updateChannelType` before using the type (it waits ≥10s for a new type, 10s for an update of a docs-test type, 30s for an update of a built-in type). Read a type back with a retry: reads can return old values for over a minute (see API behavior issues).
- **05-features/07-polls_api**: Polls work on the built-in `messaging` type with no config change. All polls are created as one `uniqueId` user (john) and removed with `deletePollsCreatedBy` before the user. Votes need the poll sent in a message first (`sendMessage` with `poll_id`). The "Querying polls" filter (`is_closed: true`) matches every closed poll of the app, so the test asserts only on the order of its own two closed polls.
- **05-features/10-advanced/17-audit_logs**: Message history is enabled on the test app. `queryMessageHistory` allows 6 requests per minute (code 9, 429): the test spies on it to retry on 429 so back-to-back runs pass.
- **05-features/10-advanced/15-pending_messages**: Pending messages are enabled on the test app (2026-10-12). The `mark_messages_pending` snippet runs on a `uniqueId` type (COPY-mapped to `messaging`). Server-side, `pending_messages` is only returned for a user: `queryChannels` needs `user_id`, `channel.get` needs `state: true` and `user_id`. The pending message hook snippet adds a hook with an `https://example.com` URL to `event_hooks`; the test restores the original `event_hooks` array.

## API behavior issues

The API itself may be faulty, or behaves differently from what the docs say. Not blockers: the tests assert the observed behavior and the pages count as done unless something else is open. Remove an entry once someone has decided whether the API or the docs change (and fix the docs or the test accordingly).

- **04-messages/09-message_reminders**: with the default sort (`remind_at`), `queryReminders` pagination skips reminders without a due date: 2 timed + 2 "saved for later" reminders, `limit: 1`, give page 1 and page 2 (timed) and then no `next`. With `sort: [{ field: "created_at", direction: 1 }]` all 4 come back. The "Pagination" test uses timed reminders only. API bug, or a limitation to document?
- **05-features/08-location_sharing**: server-side `getMessage` (with or without `user_id`), `queryChannels` without `user_id` and `getOrCreate({ state: true })` leave out `shared_location`, while `sendMessage`, `queryChannels` with `user_id` and `getUserLiveLocations` return it (probed 2026-10-13; the SDK doesn't drop the field). The docs don't rely on it; the test reads locations from the channel state as a member and from `getUserLiveLocations`.
- **05-features/10-advanced/17-audit_logs**: each history entry holds the text before an update, and its `message_updated_by_id` is the user who wrote that text, not the user of the update that replaced it (probed: v1 alice, v2 alice, v3 admin, v4 alice give entries v1/alice, v2/alice, v3/admin). The docs (JSON response and prose, "the user who made the change") say it's the editor. Should the API record the editor, or the docs change? (The invalid JSON is listed under Open docs bugs.)
- **06-app_and_channel_settings/02-app_settings**: with `disable_auth_checks: false`, a dev token is rejected with 401, but the message differs per API node: "development tokens are not allowed for this application" or "Token signature is invalid", the latter for over a minute on some nodes after re-enabling (2026-10-13). The test accepts both.
- **06-app_and_channel_settings/06-channel-level_settings**: the channel-level blocklist override is set and reads back (`config.blocklist`, `blocklist_behavior: "block"`), but a message with a blocklisted word is not blocked, neither sent server-side nor as the user (60s of retries), and a nonexistent blocklist name is accepted without error (2026-10-12). Possibly because the app has `moderation_enabled: true` and blocklists are enforced through moderation configs; the test only asserts the setting.
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook**: (1) "Edit a Command" says fields not sent stay unchanged, but `updateCommand({ name, description })` resets `args` and `set` to `""` (the SDK leaves undefined fields out of the body, so it is the API). (2) "Performance considerations" says a failing or slow endpoint lets the message through as usual, but when the custom command handler returns an error `sendMessage` is rejected with code 45 "custom command endpoint returned an error" (code 44 "missing custom command endpoint url" without a handler URL). The paragraph looks copied from the Before Message Send page. Fix the prose or the API?
- **12-best_practices/02-moderation**: `client.moderation.flag` by the same user on the same entity again raises `flags_count`, but the review item's `flags` keep only the first flag, so the later `reason` and `custom` data are silently dropped (probed 2026-10-12). The docs flagged one message several times with different reasons; they now flag separate messages. Intended (one flag per user) or should the later flag update or error?
- **All pages that update channel types** (not page-specific, the tests work around it): after `updateChannelType`, the update is enforced on every API node within ~3s, but `getChannelType` / `listChannelTypes` reads flip between the new and the old value for over a minute (probed 2026-10-13: correct for ~15s, then the old value for ~40s, then mixed past 90s). Tests read types back with a retry or assert the update response.

## API spec / node SDK issues

The OpenAPI spec or the generated node SDK is wrong; the API itself works. Not fixed by the agents (no `src/` changes). Remove an entry once it is fixed.

- **06-app_and_channel_settings/03-chat_permission_policies** (node SDK generator): `UpdateChannelTypeRequest.grants` and `UpdateAppRequest.grants` are typed `Record<string, string[]>` without `| null`, while the spec marks them `nullable: true` and the docs reset a scope with `grants: null` (TS2322). The API accepts `null` and resets the grants to the defaults. The generator drops `nullable` everywhere (`src/gen/models/index.ts` has no `| null` at all, e.g. `pin_expires?: Date`): a generator change in `../chat` (`tools/openapi`). Not patched (the local `src/gen` patch was reverted on 2026-10-13), so `yarn types:docs` reports TS2322 on the "Granting permissions" Node.js #4 region until the generator emits `| null`.
- **05-features/06-campaign_api** (API spec): `updateCampaign` and `stopCampaign` are typed as returning `CampaignResponse`, but the API returns `{ campaign: CampaignResponse, ... }` (like `StartCampaignResponse`), so `response.campaign` is a TS2339 error and `response.name` etc. are undefined at runtime. The response schemas of `PUT /campaigns/{id}` and `POST /campaigns/{id}/stop`.
- **04-messages/08-unread_reminders** (API spec, to check): `CreateChannelTypeRequest` has no `reminders` field, while `UpdateChannelTypeRequest` has it, so a channel type can't be created with reminders on in one call from typed code. Check whether the spec (`CreateChannelType`) lacks it or the API doesn't accept it.
- **05-features/10-advanced/12-drafts** (API spec): `getDraft` / `deleteDraft` / `queryDrafts` type `user_id` as optional, but a server-side client must pass it (code 4 "either user or user_id must be provided when using server side auth").
- **12-best_practices/02-moderation** (API spec): `getApp().app.enforce_unique_usernames` is typed `string`, while `UpdateAppRequest.enforce_unique_usernames` is `'no' | 'app' | 'team'`, so restoring a saved value needs a cast.

## Open docs bugs

The docs are wrong and the fix wasn't made (out of scope, e.g. prose or non-Node.js fences, or it waits for a decision above). Not blockers. Remove an entry once it is fixed.

- **05-features/10-advanced/17-audit_logs** (`JSON` response fences, not Node.js): both fences are invalid JSON (`"message_updated_at" "..."` lacks a colon; the second lacks a comma after `"is_deleted": false`). The attribution in them depends on the API behavior issue above.
- **05-features/10-advanced/12-drafts** (prose): a stray `"` at the end of "Draft creation is a client-side operation; there is no server-side alternative."
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook** (prose): "Edit a Command" and "Performance considerations" depend on the API behavior issue above.

## Notes

None yet.

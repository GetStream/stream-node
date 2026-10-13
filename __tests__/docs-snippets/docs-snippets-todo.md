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

Status: `[ ]` todo, `[x]` done, `[~]` done with open questions.

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
| [~]    | `chat/_default/04-messages/09-message_reminders.md`    | 7       | 0          | yes  |          |
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
| [~]    | `chat/_default/05-features/10-advanced/17-audit_logs.md`                 | 5       | 0          | yes  |          |
| [x]    | `chat/_default/05-features/10-advanced/18-data_retention_policy.md`      | 4       | 0          | yes  |          |

## chat/\_default/06-app_and_channel_settings

| Status | Page                                                                       | Node.js | Unlabelled | Test | Blockers |
| ------ | -------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/06-app_and_channel_settings/01-channel_types.md`            | 9       | 0          | yes  |          |
| [x]    | `chat/_default/06-app_and_channel_settings/02-app_settings.md`             | 3       | 0          | yes  |          |
| [x]    | `chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md` | 11      | 0          | yes  |          |
| [~]    | `chat/_default/06-app_and_channel_settings/06-channel-level_settings.md`   | 3       | 0          | yes  |          |

## chat/\_default/07-push

| Status | Page                                             | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [~]    | `chat/_default/07-push/07-legacy_push_system.md` | 2       | 0          | yes  | 🔑       |

## chat/\_default/08-webhooks

| Status | Page                                                                               | Node.js | Unlabelled | Test | Blockers |
| ------ | ---------------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md` | 3       | 0          | yes  |          |
| [~]    | `chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md`     | 8       | 0          | yes  |          |

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
- **All pages that create/update channel types**: Wait 30s (`waitForChannelTypePropagation()`) after `createChannelType` / `updateChannelType` before using the type.
- **05-features/07-polls_api**: Polls work on the built-in `messaging` type with no config change. All polls are created as one `uniqueId` user (john) and removed with `deletePollsCreatedBy` before the user. Votes need the poll sent in a message first (`sendMessage` with `poll_id`). The "Querying polls" filter (`is_closed: true`) matches every closed poll of the app, so the test asserts only on the order of its own two closed polls.
- **05-features/10-advanced/17-audit_logs**: Message history is enabled on the test app. `queryMessageHistory` allows 6 requests per minute (code 9, 429): the test spies on it to retry on 429 so back-to-back runs pass.
- **05-features/10-advanced/15-pending_messages**: Pending messages are enabled on the test app (2026-10-12). The `mark_messages_pending` snippet runs on a `uniqueId` type (COPY-mapped to `messaging`). Server-side, `pending_messages` is only returned for a user: `queryChannels` needs `user_id`, `channel.get` needs `state: true` and `user_id`. The pending message hook snippet adds a hook with an `https://example.com` URL to `event_hooks`; the test restores the original `event_hooks` array.

## Open docs bugs

Docs bugs found but not fixed (open questions, or fixes that need a decision). Remove an entry once it is fixed.

- **04-messages/09-message_reminders** (open question, API behavior): with the default sort (`remind_at`), `queryReminders` pagination skips reminders without a due date: 2 timed + 2 "saved for later" reminders, `limit: 1`, gives page 1 and page 2 (timed) and then no `next`. With `sort: [{ field: "created_at", direction: 1 }]` all 4 pages come back. The "Pagination" test uses timed reminders only. Check whether this is an API bug or should be documented.
- **05-features/10-advanced/17-audit_logs** (open question, `JSON` response fences, not Node.js): each history entry holds the text before an update, and its `message_updated_by_id` is the user who wrote that text, not the user of the update that replaced it (probed: v1 alice, v2 alice, v3 admin, v4 alice gives entries v1/alice, v2/alice, v3/admin). So after the page's example both entries have `message_updated_by_id: "alice"`, while the docs' JSON shows `admin` for the "+31 6 12345678" entry; the prose ("the user who made the change") reads the same way as the JSON. Both JSON fences are also invalid JSON (`"message_updated_at" "..."` lacks a colon, the second fence lacks a comma after `"is_deleted": false`). The test asserts the observed behavior. Decide whether to fix the JSON/prose or whether the API should record the editor.
- **06-app_and_channel_settings/06-channel-level_settings** (open question, API behavior): The blocklist override is asserted only by reading `channel.config` back. Open question: on this app (`moderation_enabled: true`) a message with the blocklist's word is not blocked, neither server-side nor sent as the user with a user token, and `config_overrides.blocklist` accepts a nonexistent name without error (2026-10-12). Probably blocklists are enforced through moderation configs here, not channel config. `set: { config_overrides: {...} }` replaces all overrides (the later replies fence drops the blocklist override). With `replies: false`, a reply fails with code 19 (400).
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook** (open question, prose, not Node.js code): "Edit a Command" says fields not sent to the update API stay unchanged, but `updateCommand({ name, description })` resets `args` and `set` to `""` (probed 2026-10-12; the SDK leaves undefined fields out of the body, so it is the API). "Performance considerations" says a 4xx/5xx or slow endpoint lets the message through as usual, but a custom command whose handler returns an error rejects `sendMessage` with code 45 "custom command endpoint returned an error" (and with no handler URL set, code 44 "missing custom command endpoint url"). The paragraph looks copied from the Before Message Send page. Decide whether to fix the prose or the API.

## Possible SDK issues

Runtime or type problems that look like node SDK bugs rather than docs bugs. Not fixed by the agents (no `src/` changes). Remove an entry once it is fixed.

- **04-messages/08-unread_reminders**: `CreateChannelTypeRequest` (generated, `src/gen/models`) has no `reminders` field, while `UpdateChannelTypeRequest` has it, so a channel type can't be created with reminders on in one call from typed code. Check whether the OpenAPI spec (`CreateChannelType`) lacks it or the API accepts it.

- **05-features/06-campaign_api**: `updateCampaign` and `stopCampaign` are typed as returning `CampaignResponse`, but the API returns `{ campaign: CampaignResponse, ... }` (like `StartCampaignResponse`), so `response.campaign` is a TS2339 error and `response.name` etc. are undefined at runtime. Likely the OpenAPI spec's response schema for `PUT /campaigns/{id}` and `POST /campaigns/{id}/stop`.

- **06-app_and_channel_settings/03-chat_permission_policies**: `UpdateChannelTypeRequest.grants` (and `UpdateAppRequest.grants`) are typed `Record<string, string[]>` without `| null`, while the OpenAPI spec marks them `nullable: true` and the docs reset a scope with `grants: null` (TS2322). The API accepts `null` and resets the grants to the defaults. The generator drops `nullable` everywhere: `src/gen/models/index.ts` has no `| null` at all (e.g. `pin_expires?: Date`), so this is a generator change in `../chat` (`tools/openapi`), not a spec fix. **Patched locally** in `src/gen/models/index.ts` (`grants?: Record<string, Array<string>> | null` on both requests) so the docs code typechecks; a regeneration reverts it until the generator emits `| null`.

## Notes

None yet.

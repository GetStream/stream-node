# Docs snippet tests: todo

Pages of the chat Node sidebar (`getstream.io/content/docs/_sidebars/[chat][node].json`) and the platform sidebar (`getstream.io/content/docs/_sidebars/[platform][default].json`) that contain `Node.js` snippets. Chat tests go under `pages/chat/...`, platform tests under `pages/platform/...`. Give each page to an agent with `/Users/zitaszupera/Stream/stream-node/__tests__/docs-snippets/docs-snippets-agent-prompt.md`. **Run pages one at a time**: tests may change app settings (they must restore them).

- Only server-side snippets are in scope: fences labelled `Node.js`. Unlabelled `js` fences get a label (`JavaScript` or `Node.js`). `JavaScript`, `React` and `React Native` fences (client-side) are out of scope.
- **Node.js / Unlabelled**: number of `js` fences labelled `Node.js` / with no label (before the docs were changed).
- **Test**: `yes` when the page gets a test under `__tests__/docs-snippets/pages/...`; `-` when nothing on it can be tested.

**Blockers** (details below; empty = fully runnable, maybe with setup notes):

- ⛔ **Blocked**: the app doesn't have the feature. The snippet goes in `it.skip('BLOCKED: ...')` (still typechecked).
- ◐ **Partial**: only some snippets of the page are affected.
- 🔑 **Push credentials**: needs `DOCS_PUSH_FIREBASE_CREDENTIALS`; the snippets run in `describe.skipIf(!hasFirebaseCredentials)`.
- **Excluded**: not validated, leave as is.

Status: `[ ]` todo, `[x]` done, `[~]` done but some snippets couldn't run (a blocker, e.g. ⛔ or 🔑). API behavior issues and open docs bugs are not blockers: they are tracked in their lists below and don't make a page `[~]`.

Issues are kept in three lists below: [API behavior issues](#api-behavior-issues) (the API itself may be faulty), [API spec / node SDK issues](#api-spec--node-sdk-issues) (the OpenAPI spec or the generated node SDK is wrong) and [Open docs bugs](#open-docs-bugs) (the docs are wrong and not fixed yet).

App facts (node SDK test app, probed 2026-10-12): push v3 with one provider `firebase:firebase` (not a docs-test one: tests must not touch or use it, e.g. no `upsertPushProvider` / `deletePushProvider` on it and no devices or `checkPush` with `push_provider_name: "firebase"`), permissions v2, multi-tenancy off, `disable_auth_checks` off, auto-translation off, campaigns on (segments, user groups and polls endpoints answer), no webhook / SQS / SNS / custom action handler URLs set (`webhook_url`, `custom_action_handler_url`, `sqs_url`, `sns_topic_arn` empty), one entry in `event_hooks`, no retention policies. Channel types: `livestream`, `messaging`, `team`, `agent`, `commerce`, `gaming`, plus `streamnodetest*` types left by the integration tests. Delivery receipts: `delivery_events: true` is accepted on create/update channel type without support enablement (2026-10-12). Location sharing: enabled (2026-10-12); channels still need `shared_locations` (`config_overrides` or channel type), otherwise `sendMessage` with `shared_location` fails with code 17 "location sharing is not enabled for this channel". Translation: `translateMessage` works with auto-translation off; `updateApp({ auto_translation_enabled: true })` is accepted (restored after, 2026-10-12). Restricted visibility messages: enabled (`restricted_visibility` on `sendMessage` works, 2026-10-12). User response time: `updateApp({ user_response_time_enabled: true })` is accepted and `avg_response_time` appears on the replying user within seconds (restored after, 2026-10-12). Dynamic partitioning: `partition_size` / `partition_ttl` accepted on create/update channel type without support enablement (2026-10-12). Message history (audit logs): enabled; `queryMessageHistory` is rate limited to 6 requests per minute (2026-10-12). Not probed yet: feature availability per page (each agent probes what its page needs and records it here).

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

## platform/01-start-here

| Status | Page                                        | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `platform/01-start-here/01-backend-sdks.md` | 1       | 0          | yes  |          |

## platform/02-identity-and-access

| Status | Page                                                   | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [~]    | `platform/02-identity-and-access/01-authentication.md` | 8       | 0          | yes  | ◐        |
| [x]    | `platform/02-identity-and-access/02-users.md`          | 13      | 0          | yes  |          |
| [x]    | `platform/02-identity-and-access/03-permissions.md`    | 8       | 0          | yes  |          |
| [x]    | `platform/02-identity-and-access/04-multi-tenancy.md`  | 9       | 0          | yes  |          |
| [x]    | `platform/02-identity-and-access/05-gdpr.md`           | 4       | 0          | yes  |          |

## platform/03-events-and-notifications

| Status | Page                                                              | Node.js | Unlabelled | Test | Blockers |
| ------ | ----------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [~]    | `platform/03-events-and-notifications/01-webhooks.md`             | 15      | 1          | yes  | ◐ ⛔     |
| [x]    | `platform/03-events-and-notifications/02-push-notifications.md`   | 3       | 0          | yes  |          |
| [~]    | `platform/03-events-and-notifications/03-push-providers.md`       | 5       | 0          | yes  | ◐ 🔑     |
| [~]    | `platform/03-events-and-notifications/04-push-devices.md`         | 10      | 0          | yes  | ◐ 🔑     |
| [x]    | `platform/03-events-and-notifications/05-push-preferences.md`     | 5       | 0          | yes  |          |
| [~]    | `platform/03-events-and-notifications/06-push-troubleshooting.md` | 2       | 0          | yes  | 🔑       |

## platform/04-using-the-api

| Status | Page                                                 | Node.js | Unlabelled | Test | Blockers |
| ------ | ---------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `platform/04-using-the-api/01-rate-limits.md`        | 3       | 0          | yes  |          |
| [x]    | `platform/04-using-the-api/03-async-operations.md`   | 1       | 0          | yes  |          |
| [x]    | `platform/04-using-the-api/06-connection-pooling.md` | 0       | 1          | yes  |          |
| [x]    | `platform/04-using-the-api/07-api-error-codes.md`    | 2       | 0          | yes  |          |

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
- `platform/00-index.md`
- `platform/04-using-the-api/02-query-syntax-operators.md`
- `platform/04-using-the-api/04-error-handling.md`
- `platform/04-using-the-api/05-logging.md`
- `platform/04-using-the-api/08-cdn-domains.md`

## Blockers detail

- **platform/02-identity-and-access/01-authentication** (◐): "Token Revocation by Application" and its "Undoing the revoke" (Node.js #2) are in `it.skip`: `updateApp({ revoke_tokens_issued_before })` revokes every user token of the shared test app, so it is kept skipped by decision (2026-10-14: other users of the app would get 401s while it is set). To run it later (restore with `revoke_tokens_issued_before: null`; `getApp()` returns `null` for it when unset, so no DRIFT is expected). The undo region also fails `yarn types:docs` (see API spec / node SDK issues).
- **platform/03-events-and-notifications/01-webhooks** (◐ ⛔): (1) "Configuration" Node.js #1 (GCS failover) is in `it.skip`: `updateApp` rejects the placeholder `gcs_credentials` with code 4 "failover_config for hook has invalid gcs_credentials: dialing: auth: email must be provided" (needs a real GCS service account). (2) "Configuration" Node.js #2 (S3 failover) is in `it.skip` (⛔): code 4 "failover_config type 's3' is not enabled for hook" (probed 2026-10-14). The stateless `verifyAndParseWebhook` import fence runs in `01-webhooks.stateless.test.ts` (module-level region); the three "Reference implementation (no SDK)" fences are `Node.js` fences inside the disclosure and out of scope.
- **platform/03-events-and-notifications/03-push-providers** (◐ 🔑): only "List Push Providers" runs. "Upsert a Push Provider", "Delete a Push Provider" and "Linking Devices to Providers" (each on its own `uniqueId` Firebase provider) and "Single-Provider Configuration" (`updateApp({ firebase_config })`, restored like the legacy push page) are in `describe.skipIf(!hasFirebaseCredentials)`: the page's sample service account JSON (`sampleFirebaseCredentials`) is rejected with code 4 "firebase credentials are invalid" by both `upsertPushProvider` and `updateApp({ firebase_config })` (probed 2026-10-14). `DOCS_PUSH_FIREBASE_CREDENTIALS` is not set in `.env`, so these four have never run: their assertions (device `push_provider_name`, `push_notifications.firebase.enabled` turning `true`) and the cleanup are unverified. The "apn or firebase or huawei or xiaomi" placeholders run as `firebase` through COPY.
- **platform/03-events-and-notifications/04-push-devices** (◐ 🔑): only the three list fences and the device type check run (the lists on a new user, so `devices` is `[]`). The three register fences ("Register a Device", "Registering from the chat client SDKs", "Multi-Bundle Device Registration") use `push_provider: "apn"`: `it.skip('BLOCKED: needs APN credentials')`, because `createDevice` checks that the provider exists (code 4 'push provider "production-ios" with type "apn" not found, available push providers for this application: type: "firebase" name: "firebase"', also without `push_provider_name`: 'push provider "" with type "apn" not found'; probed 2026-10-14). The three remove fences need a device, which can only be registered on a `uniqueId` Firebase provider (never the app's own): they are in `describe.skipIf(!hasFirebaseCredentials)` (the sample service account JSON is rejected, see 03-push-providers) and have never run. The "device object" Node.js fence (bare data shape) is now a TypeScript `type Device`, checked at compile time to match `DeviceResponse` exactly.
- **platform/03-events-and-notifications/06-push-troubleshooting** (🔑): both "Testing Push" Node.js fences call `checkPush` without a provider, which would run against the app's own `firebase:firebase` provider (not allowed). The test creates a `uniqueId` Firebase provider and a spy on `client.checkPush` adds `push_provider_type: "firebase"` / `push_provider_name` (both in `CheckPushRequest`), so the regions stay as written. Creating the provider needs a real service account (`sampleFirebaseCredentials` is rejected, see 03-push-providers), so the whole file is in `describe.skipIf(!hasFirebaseCredentials)`; not yet run with credentials (2026-10-14), so the assertions (`skip_devices: true` passed back, `duration` string) are unverified.

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
- **platform/02-identity-and-access/01-authentication**: Tokens are checked by verifying their claims with `jsonwebtoken` and by a client-side `POST /channels` (query channels) with the token (201 accepted, 401 code 40 "This token has been revoked, please generate a new token" when revoked). Revocation takes effect within a few seconds (the test retries). Tokens to revoke are issued with `iat` two minutes in the past; the SDK's default `iat` is one second in the past, so a token generated right after the revocation date can still be revoked (retry). `revoke_tokens_issued_before` is stored rounded to the millisecond (±1 ms).
- **platform/02-identity-and-access/02-users**: `createGuest` stores the user as `guest-<uuid>-<id>` (register `response.user.id` for cleanup, not the requested id). `last_active` is only set by a WebSocket connection (`wss://chat.stream-io-api.com/connect`, within ~3s), not by REST calls with a user token; the "Querying Inactive Users" test opens one. Bulk `deactivateUsers` / `reactivateUsers` and `deleteUsers` return a `task_id`: `waitForTask` before asserting. Soft-deleted users are not returned by `queryUsers`; deactivated ones only with `include_deactivated_users: true`. The "Unique usernames" test restores `enforce_unique_usernames` (original `""`) at its end, not only in cleanup, because of the reactivation issue under API behavior issues.
- **platform/02-identity-and-access/04-multi-tenancy**: The "Enable Teams" test runs the docs `updateApp({ multi_tenant_enabled: true })` and the rest of the file runs with multi-tenancy on (a nested `describe` turns it on again if needed); the original value is restored in cleanup with `waitForAppSetting` + `waitForTeamIdSupport`, as on the chat user groups page (it settles in ~4s). Teams are plain strings: the docs' `"red"` / `"blue"` are COPY-mapped to `uniqueId` team names so the team queries only see the file's channels, calls and users. The "Team based roles" fence has `teams_role` keys `red` / `blue` (object keys can't be COPY-mapped), so that user (a `uniqueId` id) uses the literal team names. Calls aren't tracked by the leak check: the test hard-deletes its `uniqueId` calls (`call.delete({ hard: true })`) before multi-tenancy is restored. `queryTeamUsageStats` returns `teams: []` on the test app, so the docs' pagination branch (`if (response.next)`) doesn't run (see API behavior issues).
- **platform pages (all)**: The platform docs are shared by Chat, Video and Feeds, so their Node.js snippets may call `client.chat`, `client.video` or `client.feeds`. The same isolation, cleanup and restore rules apply.
- **platform/02-identity-and-access/03-permissions**: Feeds v3 works on the test app (feed groups `user`, `timeline`, ... exist; probed 2026-10-14). The feed snippets run on `uniqueId` feeds (owned by `uniqueId` users) that the test hard-deletes in cleanup: the leak check doesn't track feeds. Feed visibilities are app-wide and not covered by the DRIFT check: the "Feeds visibility grants" test saves the `visible` grants, restores `feed_member` and checks the whole grants object is back. `updateApp({ grants })` (`.app` scope) is restored like on the chat permission policies page. Custom roles need the retry spies from the chat page (`provided but not defined` / `does not exist`).
- **platform/02-identity-and-access/05-gdpr**: `exportUsers` and `feeds.exportFeedUserData` tasks finish within seconds (`waitForTask`); `result.url` downloads without auth and contains the user id, their chat message text and their feed activity (id and text). `deleteFeedUserData({ hard_delete: false })` finishes within seconds; the user's activity is then 404 for `getActivity` and the user account stays. The feeds snippets run on a `uniqueId` `user` feed with one activity, hard-deleted in cleanup (ignoring "not found").
- **platform/03-events-and-notifications/02-push-notifications**: All three Node.js fences are Feeds v3 calls (`serverClient.feeds.addComment` / `addReaction` / `addActivityReaction` / `addActivity`); no push provider, device or credentials are involved, and pushes aren't checked (the users have no devices). Each test adds its own activity on a `uniqueId` `user` feed; every `uniqueId` user gets a `notification` feed in setup, because `create_notification_activity` only creates the notification when the activity owner's notification feed exists (see API behavior issues). The custom `alerts` feed group is app-wide: the test creates a `uniqueId` group (hyphens replaced by `_`; whether hyphens are allowed wasn't probed), COPY-mapped to `alerts`, and hard-deletes it in cleanup. The leak check doesn't track feeds or feed groups, so cleanup hard-deletes them (ignoring "not found").
- **platform/03-events-and-notifications/03-push-providers, 04-push-devices**: Use `sampleFirebaseCredentials` (`helpers/push.ts`, the sample service account JSON from the "Upload your credentials" section of the push providers page) for the credentials placeholder (`"my-service-account-information"`) through a COPY variable. If the API rejects it (the chat legacy push page saw code 4 "firebase credentials are invalid" for fake credentials, see `learnings.md`), skip the snippet (`describe.skipIf(!hasFirebaseCredentials)` with `firebaseCredentials`) and mark the page 🔑. Snippets that need another provider config (APN, Huawei, Xiaomi; e.g. the "apn or firebase or huawei or xiaomi" placeholders) are skipped too, unless they can run against a Firebase provider the test created. Name providers with `uniqueId`, and never touch or use the app's own `firebase:firebase` provider (no devices registered on it, no `checkPush` against it). `updateApp({ firebase_config })` changes app-level push config: save it with `getApp()` and restore it (DRIFT). Devices go away with their `uniqueId` user. Probed 2026-10-14 (push-providers): `sampleFirebaseCredentials` is rejected (code 4 "firebase credentials are invalid") by `upsertPushProvider` and `updateApp({ firebase_config })`. `push_provider.name` is limited to 36 characters (code 4 "push_provider.name must be a maximum of 36 characters in length"): keep `uniqueId` names short (`uniqueId('fcm')`).
- **platform/03-events-and-notifications/05-push-preferences**: Don't check which pushes are sent: assert the response, or read the preference back (user / channel member push preferences, channel `config_overrides`, channel type `push_level`). The snippets on `messaging` and `"announcements"` run on a `uniqueId` channel type / channel (COPY-mapped), or the built-in type is restored. `user-1` / `user-2` are `uniqueId` users.
- **platform/03-events-and-notifications/01-webhooks**: Don't check that webhooks arrive. Every `updateApp({ event_hooks })` replaces all hooks: `beforeAll` saves `getApp().app.event_hooks` and cleanup puts them back (same ids); the "preserve existing hooks" tests (webhook, SQS, SNS) restore the originals first so they can assert the original ids are kept. `waitForAppSetting(client, 'event_hooks', original)` never settles after a restore (`updated_at` changes), so compare the hooks without `created_at` / `updated_at` (the DRIFT check ignores them). `event_types: []` reads back as the full list of event types plus `"*"`. SQS / SNS hooks with placeholder keys are accepted; `checkSQS` / `checkSNS` with them return `status: "error"` ("InvalidClientTokenId"), not a rejection. `verifyAndParseWebhook`, `parseSqs` and `parseSns` are tested locally with an HMAC of a sample body (`STREAM_SECRET`) and a gzip + base64 body.
- **platform/04-using-the-api/06-connection-pooling**: The fence imports `undici` (devDependency `undici@^7.30.0`, the major Node.js 22 and 24 bundle). The real call is checked with a pass-through `vi.spyOn(Agent.prototype, 'dispatch')`.

## API behavior issues

The API itself may be faulty, or behaves differently from what the docs say. Not blockers: the tests assert the observed behavior and the pages count as done unless something else is open. Remove an entry once someone has decided whether the API or the docs change (and fix the docs or the test accordingly).

- **04-messages/09-message_reminders**: with the default sort (`remind_at`), `queryReminders` pagination skips reminders without a due date: 2 timed + 2 "saved for later" reminders, `limit: 1`, give page 1 and page 2 (timed) and then no `next`. With `sort: [{ field: "created_at", direction: 1 }]` all 4 come back. The "Pagination" test uses timed reminders only. API bug, or a limitation to document?
- **05-features/08-location_sharing**: server-side `getMessage` (with or without `user_id`), `queryChannels` without `user_id` and `getOrCreate({ state: true })` leave out `shared_location`, while `sendMessage`, `queryChannels` with `user_id` and `getUserLiveLocations` return it (probed 2026-10-13; the SDK doesn't drop the field). The docs don't rely on it; the test reads locations from the channel state as a member and from `getUserLiveLocations`.
- **05-features/10-advanced/17-audit_logs**: each history entry holds the text before an update, and its `message_updated_by_id` is the user who wrote that text, not the user of the update that replaced it (probed: v1 alice, v2 alice, v3 admin, v4 alice give entries v1/alice, v2/alice, v3/admin). The docs (JSON response and prose, "the user who made the change") say it's the editor. Should the API record the editor, or the docs change? (The invalid JSON is listed under Open docs bugs.)
- **06-app_and_channel_settings/02-app_settings**: with `disable_auth_checks: false`, a dev token is rejected with 401, but the message differs per API node: "development tokens are not allowed for this application" or "Token signature is invalid", the latter for over a minute on some nodes after re-enabling (2026-10-13). The test accepts both.
- **06-app_and_channel_settings/06-channel-level_settings**: the channel-level blocklist override is set and reads back (`config.blocklist`, `blocklist_behavior: "block"`), but a message with a blocklisted word is not blocked, neither sent server-side nor as the user (60s of retries), and a nonexistent blocklist name is accepted without error (2026-10-12). Possibly because the app has `moderation_enabled: true` and blocklists are enforced through moderation configs; the test only asserts the setting.
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook**: (1) "Edit a Command" says fields not sent stay unchanged, but `updateCommand({ name, description })` resets `args` and `set` to `""` (the SDK leaves undefined fields out of the body, so it is the API). (2) "Performance considerations" says a failing or slow endpoint lets the message through as usual, but when the custom command handler returns an error `sendMessage` is rejected with code 45 "custom command endpoint returned an error" (code 44 "missing custom command endpoint url" without a handler URL). The paragraph looks copied from the Before Message Send page. Fix the prose or the API?
- **12-best_practices/02-moderation**: `client.moderation.flag` by the same user on the same entity again raises `flags_count`, but the review item's `flags` keep only the first flag, so the later `reason` and `custom` data are silently dropped (probed 2026-10-12). The docs flagged one message several times with different reasons; they now flag separate messages. Intended (one flag per user) or should the later flag update or error?
- **platform/02-identity-and-access/01-authentication**: `updateUsersPartial({ users: [{ id, unset: ["revoke_tokens_issued_before"] }] })` is silently ignored: the response and `queryUsers` still return the date and old tokens stay revoked (also with `set: {}` alongside, probed 2026-10-14). `set: { revoke_tokens_issued_before: null }` clears it (field gone, old tokens work again). The Node.js fence now uses `set: null` (as the prose says); should `unset` work too?
- **platform/02-identity-and-access/02-users**: with `enforce_unique_usernames` set to `"team"` (or `"app"`), `reactivateUser({ user_id, restore_messages: true })` fails with code 4 "user ... is not deactivated" although the user is deactivated (`deactivateUser` response and `queryUsers({ include_deactivated_users: true })` show `deactivated_at`). Without `restore_messages` it works, and with `enforce_unique_usernames: ""` every variant works (probed 2026-10-14, one factor at a time: messages, `mark_messages_deleted`, `created_by_id`, `name` make no difference). The test restores the setting before the deactivation tests.
- **platform/02-identity-and-access/02-users**: with `enforce_unique_usernames: "team"` and multi-tenancy off, users without a team can share a name (a duplicate `upsertUsers` is accepted; with `"app"` it fails with code 6 "username(s) '...' already exist(s)"). Plausible (no team to compare), but the docs don't say what `"team"` does for users without teams. Once (out of ~6 runs) the `"app"` check still accepted a duplicate for 60s after `getApp()` agreed on `"app"` 5 times.
- **platform/02-identity-and-access/04-multi-tenancy**: `queryTeamUsageStats` returns `teams: []` for every query on the test app: no params, `limit: 1`, `month` (`2024-01`, `2026-09`), a date range (`2024-01`, `2026-10-01..13`) and `team: ""`, with multi-tenancy off and on (probed 2026-10-14). The page says "The API returns a row for `team=""` (empty string)" for users and messages without a team, and the app has many of both. Maybe the stats are only aggregated for apps that had multi-tenancy on, or daily with a delay; the docs don't say. The test asserts only the response shape, so the pagination branch is not exercised.
- **All pages that update channel types** (not page-specific, the tests work around it): after `updateChannelType`, the update is enforced on every API node within ~3s, but `getChannelType` / `listChannelTypes` reads flip between the new and the old value for over a minute (probed 2026-10-13: correct for ~15s, then the old value for ~40s, then mixed past 90s). Tests read types back with a retry or assert the update response.
- **platform/03-events-and-notifications/01-webhooks**: `getApp()` never returns `enable_hook_payload_compression` (absent before and after `updateApp({ enable_hook_payload_compression: true })` and `false`, 2026-10-14; `AppResponseFields` has no such field either), so the setting can't be read back, the DRIFT check can't see it, and the original value has to be known from elsewhere: `false` on the test app (confirmed by the user, 2026-10-14), which the test restores.
- **platform/03-events-and-notifications/02-push-notifications**: (1) `feeds.addComment({ ..., create_notification_activity: true })` returns `notification_created: false` with no error when the activity owner has no `notification` feed yet; with the feed created first it returns `true` (probed 2026-10-14). The page says the comment "creates notification activity and sends via notification feed" without mentioning that the feed must exist. Intended (should the API create it, or the docs say so)? (2) A new feed group is eventually consistent: right after `createFeedGroup`, `getOrCreate` of a feed in it and then `addActivity` to it failed on some calls with code 16 "Feed group with ID ... not found", even after a `getOrCreate` in that group had succeeded (2026-10-14). The test retries on "not found".
- **platform/03-events-and-notifications/03-push-providers**: `getApp()` returns every push provider's full credentials in `app.push_notifications.providers[].firebase_credentials` (the app's own `firebase` provider: the whole service account JSON, private key included; probed 2026-10-14), while the legacy app-level config never returns credentials. Intended for a server-side response, or should secrets be masked? Tests must not log `getApp().app.push_notifications`.
- **platform/03-events-and-notifications/04-push-devices**: server-side `deleteDevice({ id, user_id })` with a `user_id` that doesn't exist fails with code 16 'user ... does not have device with id ...' but creates that user anyway: the leak check found the user afterwards (probed 2026-10-14). A failed delete shouldn't upsert the user.
- **platform/03-events-and-notifications/05-push-preferences**: (1) server-side `queryChannels({ filter_conditions: { cid }, user_id })` never returns `push_preferences` (`ChannelStateResponse.push_preferences`), even right after `updatePushNotificationPreferences` set channel-member `chat_preferences` for that member, and still not after 7s of re-queries (the response has `channel, messages, pinned_messages, read, members, membership, threads`; `membership` is also missing, probed 2026-10-14). So channel-member preferences can only be read back from the upsert response server-side. (2) The upsert response's `user_preferences` is documented as "always returned regardless if you edited it", but a call with only a channel-member preference returns `user_preferences: { "<user_id>": null }` (probed 2026-10-14), although the user has user-level `chat_preferences` from the call before. The test asserts both as observed.

## API spec / node SDK issues

The OpenAPI spec or the generated node SDK is wrong; the API itself works. Not fixed by the agents (no `src/` changes). Remove an entry once it is fixed.

- **06-app_and_channel_settings/03-chat_permission_policies** (node SDK generator): `UpdateChannelTypeRequest.grants` and `UpdateAppRequest.grants` are typed `Record<string, string[]>` without `| null`, while the spec marks them `nullable: true` and the docs reset a scope with `grants: null` (TS2322). The API accepts `null` and resets the grants to the defaults. The generator drops `nullable` everywhere (`src/gen/models/index.ts` has no `| null` at all, e.g. `pin_expires?: Date`): a generator change in `../chat` (`tools/openapi`). Not patched (the local `src/gen` patch was reverted on 2026-10-13), so `yarn types:docs` reports TS2322 on the "Granting permissions" Node.js #4 region until the generator emits `| null`.
- **05-features/06-campaign_api** (API spec): `updateCampaign` and `stopCampaign` are typed as returning `CampaignResponse`, but the API returns `{ campaign: CampaignResponse, ... }` (like `StartCampaignResponse`), so `response.campaign` is a TS2339 error and `response.name` etc. are undefined at runtime. The response schemas of `PUT /campaigns/{id}` and `POST /campaigns/{id}/stop`.
- **04-messages/08-unread_reminders** (API spec, to check): `CreateChannelTypeRequest` has no `reminders` field, while `UpdateChannelTypeRequest` has it, so a channel type can't be created with reminders on in one call from typed code. Check whether the spec (`CreateChannelType`) lacks it or the API doesn't accept it.
- **05-features/10-advanced/12-drafts** (API spec): `getDraft` / `deleteDraft` / `queryDrafts` type `user_id` as optional, but a server-side client must pass it (code 4 "either user or user_id must be provided when using server side auth").
- **platform/02-identity-and-access/01-authentication** (node SDK generator): `UpdateAppRequest.revoke_tokens_issued_before` is typed `Date` without `| null`, so the docs' `updateApp({ revoke_tokens_issued_before: null })` ("Undoing the revoke", Node.js #2) fails TS2322 and `yarn types:docs` reports it. Same root cause as the `grants: null` entry above (the generator drops `nullable`); check that the spec marks the field nullable. Not run against the API (see Blockers detail). `UpdateUserPartialRequest.set` is `Record<string, any>`, so the user-level `set: { revoke_tokens_issued_before: null }` typechecks.
- **12-best_practices/02-moderation** (API spec): `getApp().app.enforce_unique_usernames` is typed `string`, while `UpdateAppRequest.enforce_unique_usernames` is `'no' | 'app' | 'team'`, so restoring a saved value needs a cast.
- **platform/03-events-and-notifications/01-webhooks** (node SDK, to check): `client.parseSqs` / `parseSns` always base64-decode and reject a plain JSON body with "invalid base64 encoding", while the docs say uncompressed SQS / SNS bodies are plain JSON ("When compression is on, the message body is gzipped + base64-encoded", and the reference implementation falls back to the raw UTF-8 body) and that "the same call works whether or not compression is on". Check what Stream sends with compression off: either the SDK needs the fallback or the docs are wrong.
- **platform/03-events-and-notifications/04-push-devices** (API spec): `deleteDevice` and `listDevices` type `user_id` as optional, but server-side calls without it fail with code 4 "either user or user_id must be provided when using server side auth." (probed 2026-10-14), like the drafts endpoints.
- **platform/03-events-and-notifications/05-push-preferences** (API spec): `UpsertPushPreferencesResponse.user_preferences` is typed `Record<string, PushPreferencesResponse>`, but the API returns `null` values (`{ "<user_id>": null }` for a call with only a channel-member preference, see API behavior issues): either the value should be nullable in the spec, or the API should return the user's preferences.

- **platform/04-using-the-api/06-connection-pooling** (node SDK): `StreamClientOptions.agent` is passed to the built-in `fetch` as `dispatcher`, which only works with an `undici` Agent of the same major as the one Node bundles. `npm install undici` gives 8.x (latest 8.12.1), and its Agent fails every request on Node 22 (bundled undici 6.21.2) and Node 24 (bundled 7.21.0) with `TypeError: fetch failed`, cause `InvalidArgumentError: invalid onRequestStart method` (`UND_ERR_INVALID_ARG`); an undici 7.21.0 Agent works on both (probed 2026-10-14; Node 26 not checked, no binary available). `agent` is typed `unknown`, so nothing catches this. The SDK could use undici's own `fetch` when an agent is given, or document the version constraint.
- **platform/04-using-the-api/06-connection-pooling** (node SDK): `ApiClient.sendRequest` wraps network errors as `new StreamError("The request failed due to an unexpected error", metadata, error as number)`: the original `Error` ends up in `code` (typed `number`) and is not passed as `cause`, so the real reason ("fetch failed", "invalid onRequestStart method") is hidden.

## Open docs bugs

The docs are wrong and the fix wasn't made (out of scope, e.g. prose or non-Node.js fences, or it waits for a decision above). Not blockers. Remove an entry once it is fixed.

- **05-features/10-advanced/17-audit_logs** (`JSON` response fences, not Node.js): both fences are invalid JSON (`"message_updated_at" "..."` lacks a colon; the second lacks a comma after `"is_deleted": false`). The attribution in them depends on the API behavior issue above.
- **05-features/10-advanced/12-drafts** (prose): a stray `"` at the end of "Draft creation is a client-side operation; there is no server-side alternative."
- **platform/02-identity-and-access/01-authentication** (Python, Ruby, PHP, Go, C#, Java fences of the user-level "Undoing the revoke"): they `unset` `revoke_tokens_issued_before`, which the API ignores (see API behavior issues); the Node.js fence was changed to `set: { revoke_tokens_issued_before: null }`. Not probed in those SDKs. The Java "Token Revocation by Application" comment says the date "must be at least 60 seconds in the past"; the user-level revocation accepted `new Date()` (not probed at app level).
- **08-webhooks/01-webhooks_overview/03-custom_commands_webhook** (prose): "Edit a Command" and "Performance considerations" depend on the API behavior issue above.

- **platform/02-identity-and-access/02-users** (Python and Ruby "Partial updates" fences): the first update sets `field` and unsets `field.unset`, which the API rejects with code 4 "set and unset for same path: [field, field.unset]". The Node.js fence now unsets `field2.unset`. PHP and C# don't set `field`, so they are fine; Go has no unset.
- **platform/02-identity-and-access/02-users** (prose): "Unique usernames" says `enforce_unique_username` (the setting is `enforce_unique_usernames`). "Deleting users" says "deletion is not reversible", while "Restoring deleted users" restores soft-deleted users. The "Deactivating users" comment only calls bulk deactivation asynchronous, but `reactivateUsers` returns a `task_id` and finishes later too.
- **platform/02-identity-and-access/03-permissions** (non-Node.js fences, not probed): the Go "updateFollow" fence has a stray `)` (`}),` closing `Custom`), so it doesn't compile. The Go `.app` grants fence leaves `mute-user` out of `user` and `admin`, unlike every other language. The C# fences use `"user-id"` (Role Management) and `"special_agent"` (delete role) where the others use `"james_bond"` and `"agent_006"`.
- **platform/04-using-the-api/07-api-error-codes** (error table, prose): the "No Access to Channels" row (code 70) gives HTTP status 403 as "Unauthorised"; 403 is "Forbidden" (as in the other 403 rows). The table rows aren't probed.
- **platform/02-identity-and-access/04-multi-tenancy** (prose): "Empty Team" says the API returns a row for `team=""`; on the test app the response has no rows at all (see API behavior issues). Waits for that decision.
- **platform/03-events-and-notifications/01-webhooks** (`Node.js` reference implementations in the no-SDK disclosures, out of scope, not fixed): the SQS and SNS reference fences call `parseEvent`, which no fence defines (ReferenceError when run as plain Node.js; the HTTP reference inlines `JSON.parse`), and the SNS fence also needs `decodeSqsPayload` from the SQS fence. The SQS fence has an em-dash in a comment ("not base64+gzip — fall back").
- **platform/03-events-and-notifications/06-push-troubleshooting** (prose, "Push Test Parameters" / "Push Test Payload" tables, not probed): the parameter table omits `push_provider_type`, `push_provider_name` and `event_type`, which `CheckPushRequest` has (the provider fields are how to test one provider on a multi-provider app). The payload table types `rendered_message` as a string; the node SDK types it `Record<string, string>`. The "Pre-requirements" also say "pass `skip_devices=true`" while the Bash fence doesn't.

## Notes

- Proposed shared helper (from platform/02-identity-and-access/03-permissions): add feeds (by `docs-test` id) to the leak check / sweep (`helpers/leaks.ts`) and feed visibility grants to the DRIFT snapshot (`helpers/snapshot.ts`), so Feeds snippets get LEAK and DRIFT coverage without hand-written checks. Not done yet.

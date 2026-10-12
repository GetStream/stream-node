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

App facts (node SDK test app, probed 2026-10-12): push v3 with one provider `firebase:firebase` (not a docs-test one, leave it), permissions v2, multi-tenancy off, `disable_auth_checks` off, auto-translation off, campaigns on (segments, user groups and polls endpoints answer), no webhook / SQS / SNS / custom action handler URLs set (`webhook_url`, `custom_action_handler_url`, `sqs_url`, `sns_topic_arn` empty), one entry in `event_hooks`, no retention policies. Channel types: `livestream`, `messaging`, `team`, `agent`, `commerce`, `gaming`, plus `streamnodetest*` types left by the integration tests. Not probed yet: feature availability per page (each agent probes what its page needs and records it here).

## chat/node

| Status | Page                                                | Node.js | Unlabelled | Test | Blockers |
| ------ | --------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [x]    | `chat/node/01-quick_start/01-backend_quickstart.md` | 5       | 0          | yes  |          |

## chat/\_default/02-init_and_users

| Status | Page                                                | Node.js | Unlabelled | Test | Blockers |
| ------ | --------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/02-init_and_users/04-user_groups.md` | 8       | 0          |      |          |

## chat/\_default/03-channels

| Status | Page                                                                    | Node.js | Unlabelled | Test | Blockers |
| ------ | ----------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/03-channels/01-creating_channels.md`                     | 2       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/02-query_channels.md`                        | 11      | 0          |      |          |
| [ ]    | `chat/_default/03-channels/08-get_channel.md`                           | 1       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/03-channel_update.md`                        | 2       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/04-query_members.md`                         | 2       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/05-channel_pagination.md`                    | 2       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/06-channel_members.md`                       | 10      | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/08-archiving.md`       | 1       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/09-pinning.md`         | 1       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/10-muting.md`          | 3       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/11-hiding.md`          | 1       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/12-disabling.md`       | 1       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/13-deleting.md`        | 3       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/14-freezing.md`        | 3       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/15-truncating.md`      | 2       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/16-channel_invites.md` | 6       | 0          |      |          |
| [ ]    | `chat/_default/03-channels/07-channel_management/17-batch-updates.md`   | 3       | 0          |      |          |

## chat/\_default/04-messages

| Status | Page                                                   | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/04-messages/01-send_message.md`         | 9       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/02-file_uploads.md`         | 4       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/03-threads.md`              | 9       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/04-send_reaction.md`        | 5       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/05-pinned_messages.md`      | 3       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/06-search.md`               | 2       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/07-silent_messages.md`      | 2       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/08-unread_reminders.md`     | 1       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/09-message_reminders.md`    | 7       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/10-message_receipts.md`     | 4       | 0          |      |          |
| [ ]    | `chat/_default/04-messages/11-ai-message-streaming.md` | 2       | 0          |      |          |

## chat/\_default/05-features

| Status | Page                                                                     | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/05-features/02-events.md`                                 | 2       | 0          |      |          |
| [ ]    | `chat/_default/05-features/03-unread.md`                                 | 7       | 0          |      |          |
| [ ]    | `chat/_default/05-features/06-campaign_api.md`                           | 16      | 0          |      |          |
| [ ]    | `chat/_default/05-features/07-polls_api.md`                              | 16      | 0          |      |          |
| [ ]    | `chat/_default/05-features/08-location_sharing.md`                       | 5       | 0          |      |          |
| [ ]    | `chat/_default/05-features/09-translation.md`                            | 3       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/11-slow_mode_and_throttling.md`   | 1       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/12-drafts.md`                     | 4       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/13-private_messaging.md`          | 1       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/14-user_average_response_time.md` | 1       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/15-pending_messages.md`           | 6       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/16-dynamic_partitioning.md`       | 4       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/17-audit_logs.md`                 | 5       | 0          |      |          |
| [ ]    | `chat/_default/05-features/10-advanced/18-data_retention_policy.md`      | 4       | 0          |      |          |

## chat/\_default/06-app_and_channel_settings

| Status | Page                                                                       | Node.js | Unlabelled | Test | Blockers |
| ------ | -------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/06-app_and_channel_settings/01-channel_types.md`            | 9       | 0          |      |          |
| [ ]    | `chat/_default/06-app_and_channel_settings/02-app_settings.md`             | 3       | 0          |      |          |
| [ ]    | `chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md` | 11      | 0          |      |          |
| [ ]    | `chat/_default/06-app_and_channel_settings/06-channel-level_settings.md`   | 3       | 0          |      |          |

## chat/\_default/07-push

| Status | Page                                             | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/07-push/07-legacy_push_system.md` | 2       | 0          |      | 🔑       |

## chat/\_default/08-webhooks

| Status | Page                                                                               | Node.js | Unlabelled | Test | Blockers |
| ------ | ---------------------------------------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md` | 3       | 0          |      |          |
| [ ]    | `chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md`     | 8       | 0          |      |          |

## chat/\_default/10-migrating

| Status | Page                                                  | Node.js | Unlabelled | Test | Blockers |
| ------ | ----------------------------------------------------- | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/10-migrating/03-exporting_channels.md` | 5       | 0          |      |          |

## chat/\_default/12-best_practices

| Status | Page                                                               | Node.js | Unlabelled | Test | Blockers |
| ------ | ------------------------------------------------------------------ | ------- | ---------- | ---- | -------- |
| [ ]    | `chat/_default/12-best_practices/02-moderation.md`                 | 13      | 0          |      |          |
| [ ]    | `chat/_default/12-best_practices/05-marketplace_best_practices.md` | 5       | 0          |      |          |

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

None found yet.

## Setup notes (not blockers)

- **node/01-quick_start/01-backend_quickstart**: The first fence creates a client from `"{{ api_key }}"` / `"{{ api_secret }}"` template placeholders: COPY them from the real credentials (`apiKey="{{ api_key }}"`).
- **07-push/07-legacy_push_system**: Push provider / `firebase_config` snippets need real credentials (🔑). Name providers with `uniqueId`; `updateApp({ firebase_config })` changes app-level push config: save it with `getApp()` first and restore it (the DRIFT check compares `push_notifications`).
- **08-webhooks/01-webhooks_overview/\***: Configure the hook URL (`before_message_send_hook_url`, `custom_action_handler_url`, ...) with `updateApp`, assert it with `getApp()`, and restore the original (empty) value. Don't test that the webhook is called.
- **All pages that create/update channel types**: Wait 30s (`waitForChannelTypePropagation()`) after `createChannelType` / `updateChannelType` before using the type.

## Known docs bugs

Found while testing; agents confirm and fix them (minimal change, listed in the final report).

None yet.

## Possible SDK issues

Runtime or type problems that look like node SDK bugs rather than docs bugs. Not fixed (no `src/` changes in this project).

None yet.

## Notes

None yet.

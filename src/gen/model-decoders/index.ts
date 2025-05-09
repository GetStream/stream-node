type Decoder = (i: any) => any;

type TypeMapping = Record<string, { type: string; isSingle: boolean }>;

export const decoders: Record<string, Decoder> = {};

const decodeDatetimeType = (input: number) =>
  new Date(Math.floor(input / 1000000));

decoders.DatetimeType = decodeDatetimeType;

const decode = (typeMappings: TypeMapping, input?: Record<string, any>) => {
  if (!input || Object.keys(typeMappings).length === 0) return input;

  Object.keys(typeMappings).forEach((key) => {
    if (input[key] != null) {
      if (typeMappings[key]) {
        const decoder = decoders[typeMappings[key].type];
        if (decoder) {
          if (typeMappings[key].isSingle) {
            input[key] = decoder(input[key]);
          } else {
            Object.keys(input[key]).forEach((k) => {
              input[key][k] = decoder(input[key][k]);
            });
          }
        }
      }
    }
  });

  return input;
};

decoders.ActionLog = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItem', isSingle: true },

    target_user: { type: 'User', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActionLogResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItem', isSingle: true },

    target_user: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AppResponseFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    call_types: { type: 'CallType', isSingle: false },

    channel_configs: { type: 'ChannelConfig', isSingle: false },

    push_notifications: { type: 'PushNotificationFields', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AutomodDetails = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    result: { type: 'MessageModerationResult', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Ban = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'Channel', isSingle: true },

    created_by: { type: 'User', isSingle: true },

    target: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BanResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    banned_by: { type: 'UserResponse', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BlockUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BlockedUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    blocked_user: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallParticipantResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    joined_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRecording = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallReportResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    ended_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    ended_at: { type: 'DatetimeType', isSingle: true },

    starts_at: { type: 'DatetimeType', isSingle: true },

    session: { type: 'CallSessionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallSessionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    participants: { type: 'CallParticipantResponse', isSingle: false },

    accepted_by: { type: 'DatetimeType', isSingle: false },

    missed_by: { type: 'DatetimeType', isSingle: false },

    rejected_by: { type: 'DatetimeType', isSingle: false },

    ended_at: { type: 'DatetimeType', isSingle: true },

    live_ended_at: { type: 'DatetimeType', isSingle: true },

    live_started_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    timer_ends_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallStateResponseFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallStatsReportSummaryResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    first_stats_time: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallTranscription = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallType = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CampaignResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    segments: { type: 'Segment', isSingle: false },

    users: { type: 'UserResponse', isSingle: false },

    stats: { type: 'CampaignStatsResponse', isSingle: true },

    scheduled_for: { type: 'DatetimeType', isSingle: true },

    stop_at: { type: 'DatetimeType', isSingle: true },

    sender: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CampaignStatsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    stats_completed_at: { type: 'DatetimeType', isSingle: true },

    stats_started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Channel = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_message_at: { type: 'DatetimeType', isSingle: true },

    invites: { type: 'ChannelMember', isSingle: false },

    members: { type: 'ChannelMember', isSingle: false },

    config: { type: 'ChannelConfig', isSingle: true },

    created_by: { type: 'User', isSingle: true },

    truncated_by: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelConfig = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelConfigWithInfo = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ChannelMember = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    archived_at: { type: 'DatetimeType', isSingle: true },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    invite_accepted_at: { type: 'DatetimeType', isSingle: true },

    invite_rejected_at: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelMemberResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    archived_at: { type: 'DatetimeType', isSingle: true },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    invite_accepted_at: { type: 'DatetimeType', isSingle: true },

    invite_rejected_at: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelMute = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelPushPreferences = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    hide_messages_before: { type: 'DatetimeType', isSingle: true },

    last_message_at: { type: 'DatetimeType', isSingle: true },

    mute_expires_at: { type: 'DatetimeType', isSingle: true },

    truncated_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'ChannelMember', isSingle: false },

    config: { type: 'ChannelConfigWithInfo', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    truncated_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelStateResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMember', isSingle: false },

    messages: { type: 'MessageResponse', isSingle: false },

    pinned_messages: { type: 'MessageResponse', isSingle: false },

    threads: { type: 'ThreadStateResponse', isSingle: false },

    hide_messages_before: { type: 'DatetimeType', isSingle: true },

    pending_messages: { type: 'PendingMessageResponse', isSingle: false },

    read: { type: 'ReadStateResponse', isSingle: false },

    watchers: { type: 'UserResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    draft: { type: 'DraftResponse', isSingle: true },

    membership: { type: 'ChannelMember', isSingle: true },

    push_preferences: { type: 'ChannelPushPreferences', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelStateResponseFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMember', isSingle: false },

    messages: { type: 'MessageResponse', isSingle: false },

    pinned_messages: { type: 'MessageResponse', isSingle: false },

    threads: { type: 'ThreadStateResponse', isSingle: false },

    hide_messages_before: { type: 'DatetimeType', isSingle: true },

    pending_messages: { type: 'PendingMessageResponse', isSingle: false },

    read: { type: 'ReadStateResponse', isSingle: false },

    watchers: { type: 'UserResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    draft: { type: 'DraftResponse', isSingle: true },

    membership: { type: 'ChannelMember', isSingle: true },

    push_preferences: { type: 'ChannelPushPreferences', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelTypeConfig = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ChatActivityStatsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageStatsResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CheckResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItem', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Command = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ConfigResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CountByMinuteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    start_ts: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateBlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateCallTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateChannelTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateCommandResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    command: { type: 'Command', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateGuestResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateImportResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    import_task: { type: 'ImportTask', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateRoleResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    role: { type: 'Role', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CustomCheckResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeactivateUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteCallResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteMessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Device = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeviceResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DraftPayloadResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    mentioned_users: { type: 'UserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.DraftResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'DraftPayloadResponse', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    parent_message: { type: 'MessageResponse', isSingle: true },

    quoted_message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.EgressRTMPResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.EntityCreator = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    ban_expires: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    last_engaged_at: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.EntityCreatorResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },

    devices: { type: 'DeviceResponse', isSingle: false },

    push_notifications: {
      type: 'PushNotificationSettingsResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders.EventResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    event: { type: 'WSEvent', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ExportUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },

    reactions: { type: 'ReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Flag = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FlagDetails = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    automod: { type: 'AutomodDetails', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FlagFeedback = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FullUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    channel_mutes: { type: 'ChannelMute', isSingle: false },

    devices: { type: 'DeviceResponse', isSingle: false },

    mutes: { type: 'UserMuteResponse', isSingle: false },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetApplicationResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    app: { type: 'AppResponseFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetBlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetBlockedUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocks: { type: 'BlockedUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetCallReportResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    chat_activity: { type: 'ChatActivityStatsResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetCallResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetCallTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetChannelTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetCommandResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetConfigResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    config: { type: 'ConfigResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetDraftResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    draft: { type: 'DraftResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetImportResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    import_task: { type: 'ImportTask', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetManyMessagesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetMessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageWithChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetOrCreateCallResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetReactionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'Reaction', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetRepliesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetReviewQueueItemResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetSegmentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    segment: { type: 'SegmentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetTaskResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetThreadResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    thread: { type: 'ThreadStateResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GoLiveResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ImportTask = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    history: { type: 'ImportTaskHistory', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ImportTaskHistory = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ListBlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocklists: { type: 'BlockListResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListCallTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    call_types: { type: 'CallTypeResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListChannelTypesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel_types: { type: 'ChannelTypeConfig', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListCommandsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListDevicesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    devices: { type: 'DeviceResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListImportsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    import_tasks: { type: 'ImportTask', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListPushProvidersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    push_providers: { type: 'PushProviderResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListRecordingsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    recordings: { type: 'CallRecording', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListRolesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    roles: { type: 'Role', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListTranscriptionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    transcriptions: { type: 'CallTranscription', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.MarkReadResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    event: { type: 'MessageReadEvent', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MemberResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MembersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMember', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.Message = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'Reaction', isSingle: false },

    mentioned_users: { type: 'User', isSingle: false },

    own_reactions: { type: 'Reaction', isSingle: false },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    message_text_updated_at: { type: 'DatetimeType', isSingle: true },

    pin_expires: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    pinned_by: { type: 'User', isSingle: true },

    poll: { type: 'Poll', isSingle: true },

    quoted_message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageFlagResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    approved_at: { type: 'DatetimeType', isSingle: true },

    rejected_at: { type: 'DatetimeType', isSingle: true },

    reviewed_at: { type: 'DatetimeType', isSingle: true },

    details: { type: 'FlagDetails', isSingle: true },

    message: { type: 'Message', isSingle: true },

    moderation_feedback: { type: 'FlagFeedback', isSingle: true },

    moderation_result: { type: 'MessageModerationResult', isSingle: true },

    reviewed_by: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageHistoryEntryResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message_updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageModerationResult = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageReadEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel_last_message_at: { type: 'DatetimeType', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'ReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'ReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    message_text_updated_at: { type: 'DatetimeType', isSingle: true },

    pin_expires: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponse', isSingle: false },

    draft: { type: 'DraftResponse', isSingle: true },

    pinned_by: { type: 'UserResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    quoted_message: { type: 'MessageResponse', isSingle: true },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.MessageStatsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    count_over_time: { type: 'CountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.MessageWithChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'ReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'ReactionResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    message_text_updated_at: { type: 'DatetimeType', isSingle: true },

    pin_expires: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponse', isSingle: false },

    draft: { type: 'DraftResponse', isSingle: true },

    pinned_by: { type: 'UserResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    quoted_message: { type: 'MessageResponse', isSingle: true },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.MuteChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel_mutes: { type: 'ChannelMute', isSingle: false },

    channel_mute: { type: 'ChannelMute', isSingle: true },

    own_user: { type: 'OwnUser', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MuteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    mutes: { type: 'UserMute', isSingle: false },

    own_user: { type: 'OwnUser', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.OwnUser = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    channel_mutes: { type: 'ChannelMute', isSingle: false },

    devices: { type: 'Device', isSingle: false },

    mutes: { type: 'UserMute', isSingle: false },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    last_engaged_at: { type: 'DatetimeType', isSingle: true },

    push_preferences: { type: 'PushPreferences', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.OwnUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    channel_mutes: { type: 'ChannelMute', isSingle: false },

    devices: { type: 'DeviceResponse', isSingle: false },

    mutes: { type: 'UserMuteResponse', isSingle: false },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },

    push_preferences: { type: 'PushPreferences', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ParticipantCountByMinuteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    start_ts: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ParticipantCountOverTimeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    by_minute: { type: 'ParticipantCountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.PendingMessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Poll = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_answers: { type: 'PollVote', isSingle: false },

    own_votes: { type: 'PollVote', isSingle: false },

    created_by: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    poll: { type: 'PollResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollResponseData = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_answers: { type: 'PollVoteResponseData', isSingle: false },

    own_votes: { type: 'PollVoteResponseData', isSingle: false },

    created_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollVote = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollVoteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    vote: { type: 'PollVoteResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollVoteResponseData = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PollVotesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    votes: { type: 'PollVoteResponseData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.PushNotificationFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    providers: { type: 'PushProvider', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.PushNotificationSettingsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PushPreferences = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PushProvider = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    disabled_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PushProviderResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    disabled_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.QueryBannedUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bans: { type: 'BanResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryCallMembersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryCallParticipantsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    participants: { type: 'CallParticipantResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.QueryCallStatsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reports: { type: 'CallStatsReportSummaryResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryCallsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    calls: { type: 'CallStateResponseFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryCampaignsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    campaigns: { type: 'CampaignResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryChannelsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'ChannelStateResponseFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryDraftsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    drafts: { type: 'DraftResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryFeedModerationTemplate = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.QueryFeedModerationTemplatesResponse = (
  input?: Record<string, any>,
) => {
  const typeMappings: TypeMapping = {
    templates: { type: 'QueryFeedModerationTemplate', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryMessageFlagsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    flags: { type: 'MessageFlagResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryMessageHistoryResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message_history: { type: 'MessageHistoryEntryResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryModerationConfigsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    configs: { type: 'ConfigResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryModerationLogsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    logs: { type: 'ActionLogResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryPollsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    polls: { type: 'PollResponseData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryReactionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'ReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryReviewQueueResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    items: { type: 'ReviewQueueItemResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QuerySegmentTargetsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    targets: { type: 'SegmentTargetResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QuerySegmentsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    segments: { type: 'SegmentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryThreadsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    threads: { type: 'ThreadStateResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    users: { type: 'FullUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.Reaction = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReactionGroupResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    first_reaction_at: { type: 'DatetimeType', isSingle: true },

    last_reaction_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReactivateUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReadStateResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReviewQueueItem = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    actions: { type: 'ActionLog', isSingle: false },

    bans: { type: 'Ban', isSingle: false },

    flags: { type: 'Flag', isSingle: false },

    assigned_to: { type: 'User', isSingle: true },

    entity_creator: { type: 'EntityCreator', isSingle: true },

    feeds_v2_reaction: { type: 'Reaction', isSingle: true },

    message: { type: 'Message', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReviewQueueItemResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    actions: { type: 'ActionLogResponse', isSingle: false },

    bans: { type: 'Ban', isSingle: false },

    completed_at: { type: 'DatetimeType', isSingle: true },

    reviewed_at: { type: 'DatetimeType', isSingle: true },

    assigned_to: { type: 'UserResponse', isSingle: true },

    entity_creator: { type: 'EntityCreatorResponse', isSingle: true },

    feeds_v2_reaction: { type: 'Reaction', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.Role = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SearchResult = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'SearchResultMessage', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SearchResultMessage = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'ReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'ReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    message_text_updated_at: { type: 'DatetimeType', isSingle: true },

    pin_expires: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    draft: { type: 'DraftResponse', isSingle: true },

    pinned_by: { type: 'UserResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    quoted_message: { type: 'MessageResponse', isSingle: true },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.Segment = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SegmentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SegmentTargetResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SendMessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SendReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.StopLiveResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SubmitActionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItem', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ThreadParticipant = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    last_read_at: { type: 'DatetimeType', isSingle: true },

    last_thread_message_at: { type: 'DatetimeType', isSingle: true },

    left_thread_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ThreadResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_message_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'ThreadParticipant', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    parent_message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ThreadStateResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_replies: { type: 'MessageResponse', isSingle: false },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_message_at: { type: 'DatetimeType', isSingle: true },

    read: { type: 'ReadStateResponse', isSingle: false },

    thread_participants: { type: 'ThreadParticipant', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    draft: { type: 'DraftResponse', isSingle: true },

    parent_message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.TruncateChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UnreadCountsBatchResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    counts_by_user: { type: 'UnreadCountsResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UnreadCountsChannel = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UnreadCountsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'UnreadCountsChannel', isSingle: false },

    threads: { type: 'UnreadCountsThread', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UnreadCountsThread = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateBlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateCallMembersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UpdateCallResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateCallTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateChannelPartialResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateChannelResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMember', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateChannelTypeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateCommandResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    command: { type: 'Command', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateMemberPartialResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channel_member: { type: 'ChannelMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateMessagePartialResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateMessageResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateThreadPartialResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    thread: { type: 'ThreadResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    users: { type: 'FullUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UpsertConfigResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    config: { type: 'ConfigResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpsertModerationTemplateResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpsertPushPreferencesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    user_preferences: { type: 'PushPreferences', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UpsertPushProviderResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    push_provider: { type: 'PushProviderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.User = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    ban_expires: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    last_engaged_at: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserMute = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    target: { type: 'User', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserMuteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    target: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },

    devices: { type: 'DeviceResponse', isSingle: false },

    push_notifications: {
      type: 'PushNotificationSettingsResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders.UserResponseCommonFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deactivated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    last_active: { type: 'DatetimeType', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.WSEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel_last_message_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    me: { type: 'OwnUserResponse', isSingle: true },

    member: { type: 'ChannelMember', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    poll_vote: { type: 'PollVoteResponseData', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.WrappedUnreadCountsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'UnreadCountsChannel', isSingle: false },

    threads: { type: 'UnreadCountsThread', isSingle: false },
  };
  return decode(typeMappings, input);
};

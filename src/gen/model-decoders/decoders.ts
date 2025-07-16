type Decoder = (i: any) => any;

type TypeMapping = Record<string, { type: string; isSingle: boolean }>;

export const decoders: Record<string, Decoder> = {};

const decodeDatetimeType = (input: number | string) =>
  typeof input === 'number'
    ? new Date(Math.floor(input / 1000000))
    : new Date(input);

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

decoders.AcceptFeedMemberInviteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    member: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AcceptFollowResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActionLogResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },

    target_user: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityMarkEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityMarkedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityPinResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityPinnedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    pinned_activity: { type: 'PinActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityReactionAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityReactionDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityReactionUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityRemovedFromFeedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    comments: { type: 'CommentResponse', isSingle: false },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_bookmarks: { type: 'BookmarkResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    expires_at: { type: 'DatetimeType', isSingle: true },

    current_feed: { type: 'FeedResponse', isSingle: true },

    parent: { type: 'ActivityResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivitySelectorConfig = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    cutoff_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityUnpinnedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    pinned_activity: { type: 'PinActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ActivityUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AddActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AddBookmarkResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AddCommentReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AddCommentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AddCommentsBatchResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'CommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.AddReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AggregatedActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.AnyEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AppResponseFields = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    event_hooks: { type: 'EventHook', isSingle: false },

    call_types: { type: 'CallType', isSingle: false },

    channel_configs: { type: 'ChannelConfig', isSingle: false },

    push_notifications: { type: 'PushNotificationFields', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AsyncBulkImageModerationEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AsyncExportChannelsEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AsyncExportErrorEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AsyncExportModerationLogsEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.AsyncExportUsersEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
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

decoders.BlockedUserEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    blocked_by_user: { type: 'UserResponse', isSingle: true },
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

decoders.BookmarkAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkFolderDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkFolderResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkFolderUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    folder: { type: 'BookmarkFolderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.BookmarkUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallAcceptedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallClosedCaptionsFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallClosedCaptionsStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallClosedCaptionsStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallCreatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallEndedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallFrameRecordingFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallFrameRecordingFrameReadyEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    captured_at: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    users: { type: 'UserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.CallFrameRecordingStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallFrameRecordingStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallHLSBroadcastingFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallHLSBroadcastingStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallHLSBroadcastingStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallLiveStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallMemberAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallMemberRemovedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallMemberUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallMemberUpdatedPermissionEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallMissedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallModerationBlurEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallModerationWarningEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallNotificationEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

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

decoders.CallReactionEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },
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

decoders.CallRecordingFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRecordingReadyEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call_recording: { type: 'CallRecording', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRecordingStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRecordingStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRejectedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
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

decoders.CallRingEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRtmpBroadcastFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRtmpBroadcastStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallRtmpBroadcastStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallSessionEndedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallSessionParticipantJoinedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    participant: { type: 'CallParticipantResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallSessionParticipantLeftEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    participant: { type: 'CallParticipantResponse', isSingle: true },
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

decoders.CallSessionStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
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

decoders.CallStatsReportReadyEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
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

decoders.CallTranscriptionFailedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallTranscriptionReadyEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call_transcription: { type: 'CallTranscription', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallTranscriptionStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallTranscriptionStoppedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
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

decoders.CallUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallUserFeedbackSubmittedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CallUserMutedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CampaignCompletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    campaign: { type: 'CampaignResponse', isSingle: true },
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

decoders.CampaignStartedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    campaign: { type: 'CampaignResponse', isSingle: true },
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

    active_live_locations: { type: 'SharedLocation', isSingle: false },

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

decoders.ChannelCreatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelFrozenEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelHiddenEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.ChannelMutedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
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

    active_live_locations: {
      type: 'SharedLocationResponseData',
      isSingle: false,
    },

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

    active_live_locations: {
      type: 'SharedLocationResponseData',
      isSingle: false,
    },

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

decoders.ChannelTruncatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },
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

decoders.ChannelUnFrozenEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelUnmutedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ChannelVisibleEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
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
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ClosedCaptionEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
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

decoders.CommentAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CommentDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CommentReactionAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CommentReactionDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CommentReactionUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CommentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.CommentUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
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

decoders.CreateFeedGroupResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateFeedViewResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.CreateFeedsBatchResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feeds: { type: 'FeedResponse', isSingle: false },
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

decoders.CustomVideoEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeactivateUserResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteActivityReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.DeleteBookmarkResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
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

decoders.DeleteCommentReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
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

decoders.EventHook = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
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

decoders.FeedCreatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'FeedMemberResponse', isSingle: false },

    feed: { type: 'FeedResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedGroupChangedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedGroupDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedGroupResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedMemberAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'FeedMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedMemberRemovedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedMemberResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    invite_accepted_at: { type: 'DatetimeType', isSingle: true },

    invite_rejected_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedMemberUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'FeedMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    feed: { type: 'FeedResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FeedViewResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    last_used_at: { type: 'DatetimeType', isSingle: true },

    activity_selectors: { type: 'ActivitySelectorConfig', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.FeedsReactionResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
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

decoders.FlagUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FollowBatchResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follows: { type: 'FollowResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.FollowCreatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FollowDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FollowResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    source_feed: { type: 'FeedResponse', isSingle: true },

    target_feed: { type: 'FeedResponse', isSingle: true },

    request_accepted_at: { type: 'DatetimeType', isSingle: true },

    request_rejected_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.FollowUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
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

decoders.GetActiveCallsStatusResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
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
    video_reactions: { type: 'VideoReactionsResponse', isSingle: false },

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

decoders.GetCommentRepliesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'ThreadedCommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.GetCommentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetCommentsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'ThreadedCommentResponse', isSingle: false },
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

decoders.GetFeedGroupResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetFeedViewResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetFollowSuggestionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    suggestions: { type: 'FeedResponse', isSingle: false },
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

decoders.GetOrCreateFeedResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },

    aggregated_activities: {
      type: 'AggregatedActivityResponse',
      isSingle: false,
    },

    followers: { type: 'FollowResponse', isSingle: false },

    following: { type: 'FollowResponse', isSingle: false },

    members: { type: 'FeedMemberResponse', isSingle: false },

    pinned_activities: { type: 'ActivityPinResponse', isSingle: false },

    feed: { type: 'FeedResponse', isSingle: true },

    own_follows: { type: 'FollowResponse', isSingle: false },

    notification_status: { type: 'NotificationStatusResponse', isSingle: true },

    own_membership: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.GetPushTemplatesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    templates: { type: 'PushTemplate', isSingle: false },
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

decoders.ListFeedGroupsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    groups: { type: 'FeedGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.ListFeedViewsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    views: { type: 'FeedViewResponse', isSingle: false },
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

decoders.MemberAddedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'ChannelMember', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MemberRemovedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'ChannelMember', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.MemberUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'ChannelMember', isSingle: true },

    user: { type: 'User', isSingle: true },
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

    reminder: { type: 'MessageReminder', isSingle: true },

    shared_location: { type: 'SharedLocation', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

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

decoders.MessageFlaggedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.MessageNewEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.MessageReminder = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    remind_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'Channel', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

    reminder: { type: 'ReminderResponseData', isSingle: true },

    shared_location: { type: 'SharedLocationResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageStatsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    count_over_time: { type: 'CountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.MessageUnblockedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageUndeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.MessageUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

    reminder: { type: 'ReminderResponseData', isSingle: true },

    shared_location: { type: 'SharedLocationResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ModerationCheckCompletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ModerationCustomActionEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ModerationFlagResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ModerationFlaggedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ModerationMarkReviewedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.NotificationMarkUnreadEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    last_read_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.NotificationStatusResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    last_seen_at: { type: 'DatetimeType', isSingle: true },
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

decoders.PendingMessageEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'Channel', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.PermissionRequestEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.PinActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },
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

    push_templates: { type: 'PushTemplate', isSingle: false },
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

decoders.PushTemplate = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.QueryActivitiesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryActivityReactionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryBannedUsersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bans: { type: 'BanResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryBookmarkFoldersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmark_folders: { type: 'BookmarkFolderResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryBookmarksResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmarks: { type: 'BookmarkResponse', isSingle: false },
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

decoders.QueryCommentReactionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryCommentsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'CommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryDraftsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    drafts: { type: 'DraftResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryFeedMembersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    members: { type: 'FeedMemberResponse', isSingle: false },
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

decoders.QueryFeedsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feeds: { type: 'FeedResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.QueryFollowsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follows: { type: 'FollowResponse', isSingle: false },
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

decoders.QueryModerationFlagsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    flags: { type: 'ModerationFlagResponse', isSingle: false },
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

decoders.QueryRemindersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reminders: { type: 'ReminderResponseData', isSingle: false },
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

decoders.ReactionDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },

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

decoders.ReactionNewEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'User', isSingle: false },

    message: { type: 'Message', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.ReactionUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'Message', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.RejectFeedMemberInviteResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    member: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.RejectFollowResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReminderResponseData = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    remind_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'Message', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReviewQueueItemNewEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    action: { type: 'ActionLogResponse', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },
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

    call: { type: 'CallResponse', isSingle: true },

    entity_creator: { type: 'EntityCreatorResponse', isSingle: true },

    feeds_v2_reaction: { type: 'Reaction', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ReviewQueueItemUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    action: { type: 'ActionLogResponse', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },
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

    reminder: { type: 'ReminderResponseData', isSingle: true },

    shared_location: { type: 'SharedLocationResponseData', isSingle: true },
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

decoders.SharedLocation = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'Channel', isSingle: true },

    message: { type: 'Message', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SharedLocationResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SharedLocationResponseData = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.SharedLocationsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    active_live_locations: {
      type: 'SharedLocationResponseData',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders.SingleFollowResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
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
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
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

decoders.ThreadUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.ThreadedCommentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    replies: { type: 'ThreadedCommentResponse', isSingle: false },

    reaction_groups: { type: 'ReactionGroupResponse', isSingle: false },
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

decoders.UnblockedUserEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UnpinActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
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

decoders.UpdateActivityPartialResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateActivityResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateBlockListResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateBookmarkFolderResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateBookmarkResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
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

decoders.UpdateCommentResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateFeedGroupResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateFeedMembersResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    added: { type: 'FeedMemberResponse', isSingle: false },

    updated: { type: 'FeedMemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.UpdateFeedResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed: { type: 'FeedResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateFeedViewResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpdateFollowResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
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

decoders.UpdateReminderResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    reminder: { type: 'ReminderResponseData', isSingle: true },
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

decoders.UpdatedCallPermissionsEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UpsertActivitiesResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },
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

decoders.UpsertPushTemplateResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    template: { type: 'PushTemplate', isSingle: true },
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

decoders.UserBannedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'User', isSingle: true },

    expiration: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserDeactivatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'User', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserDeletedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserFlaggedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.UserMutedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserReactivatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
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

decoders.UserUnbannedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserUnmutedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserUnreadReminderEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'User', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.UserUpdatedEvent = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders.VideoReactionOverTimeResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    by_minute: { type: 'CountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders.VideoReactionsResponse = (input?: Record<string, any>) => {
  const typeMappings: TypeMapping = {
    count_over_time: { type: 'VideoReactionOverTimeResponse', isSingle: true },
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

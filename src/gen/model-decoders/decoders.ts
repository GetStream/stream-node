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

decoders['AcceptFeedMemberInviteResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    member: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AcceptFollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActionLogResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },

    target_user: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityFeedbackEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityMarkEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityPinResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityPinnedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    pinned_activity: { type: 'PinActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityReactionAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityReactionDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityReactionUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityRemovedFromFeedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    comments: { type: 'CommentResponse', isSingle: false },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_bookmarks: { type: 'BookmarkResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    collections: { type: 'EnrichedCollectionResponse', isSingle: false },

    reaction_groups: { type: 'FeedsReactionGroupResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    expires_at: { type: 'DatetimeType', isSingle: true },

    friend_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    latest_shares: { type: 'ShareResponse', isSingle: false },

    current_feed: { type: 'FeedResponse', isSingle: true },

    parent: { type: 'ActivityResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityRestoredEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivitySelectorConfigResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    cutoff_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityUnpinnedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    pinned_activity: { type: 'PinActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ActivityUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddBookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddCommentBookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddCommentReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    reference_activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddCommentsBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'CommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['AddReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    reference_activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AddUserGroupMembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_group: { type: 'UserGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AggregatedActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['AppResponseFields'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    event_hooks: { type: 'EventHook', isSingle: false },

    call_types: { type: 'CallType', isSingle: false },

    channel_configs: { type: 'ChannelConfig', isSingle: false },

    push_notifications: { type: 'PushNotificationFields', isSingle: true },

    revoke_tokens_issued_before: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AppealAcceptedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    appeal: { type: 'AppealItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AppealCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    appeal: { type: 'AppealItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AppealItemResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    actions: { type: 'ActionLogResponse', isSingle: false },

    flags: { type: 'ModerationFlagResponse', isSingle: false },

    moderation_action: { type: 'ActionLogResponse', isSingle: true },

    original_moderation_action: { type: 'ActionLogResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AppealRejectedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    appeal: { type: 'AppealItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncBulkImageModerationEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncExportChannelsEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncExportErrorEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncExportModerationLogsEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncExportReviewQueueEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AsyncExportUsersEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['AutomodDetailsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    result: { type: 'MessageModerationResult', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BanInfoResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelMetadata', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BanResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    banned_by: { type: 'UserResponse', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BatchQueryActivityReactionsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['BatchQueryCommentReactionsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['BlockListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BlockUsersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BlockedUserEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    blocked_by_user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BlockedUserResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    blocked_user: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkFolderDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkFolderResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkFolderUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    folder: { type: 'BookmarkFolderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BookmarkUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    bookmark: { type: 'BookmarkResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['BulkActionAppealsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    results: { type: 'BulkAppealResult', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['BulkAppealResult'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    appeal_item: { type: 'AppealItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallAcceptedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallClosedCaptionsFailedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallClosedCaptionsStartedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallClosedCaptionsStoppedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallDTMFEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    timestamp: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallEndedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallFrameRecordingFailedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallFrameRecordingFrameReadyEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    captured_at: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    users: { type: 'UserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['CallFrameRecordingStartedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallFrameRecordingStoppedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallHLSBroadcastingFailedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallHLSBroadcastingStartedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallHLSBroadcastingStoppedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallLiveStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallMemberAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallMemberRemovedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallMemberUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallMemberUpdatedPermissionEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallMissedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallModerationBlurEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallModerationWarningEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallNotificationEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallParticipantResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    joined_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallParticipantTimeline'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    timestamp: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallReactionEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRecording'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRecordingFailedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRecordingReadyEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call_recording: { type: 'CallRecording', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRecordingStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRecordingStoppedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRejectedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallReportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    ended_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    egress: { type: 'EgressResponse', isSingle: true },

    ended_at: { type: 'DatetimeType', isSingle: true },

    starts_at: { type: 'DatetimeType', isSingle: true },

    session: { type: 'CallSessionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRingEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRtmpBroadcastFailedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRtmpBroadcastStartedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallRtmpBroadcastStoppedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallSessionEndedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallSessionParticipantCountsUpdatedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallSessionParticipantJoinedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    participant: { type: 'CallParticipantResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallSessionParticipantLeftEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    participant: { type: 'CallParticipantResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallSessionResponse'] = (input?: { [key: string]: any }) => {
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

decoders['CallSessionStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallStateResponseFields'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallStatsParticipant'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sessions: { type: 'CallStatsParticipantSession', isSingle: false },

    latest_activity_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallStatsParticipantSession'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    ended_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallStatsReportReadyEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    participants_overview: { type: 'CallStatsParticipant', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['CallStatsReportSummaryResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    first_stats_time: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallStatsSessionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    generated_at: { type: 'DatetimeType', isSingle: true },

    call_ended_at: { type: 'DatetimeType', isSingle: true },

    call_started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTranscription'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTranscriptionFailedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTranscriptionReadyEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call_transcription: { type: 'CallTranscription', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTranscriptionStartedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTranscriptionStoppedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallType'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallUserFeedbackSubmittedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CallUserMutedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CampaignCompletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    campaign: { type: 'CampaignResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CampaignResponse'] = (input?: { [key: string]: any }) => {
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

decoders['CampaignStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    campaign: { type: 'CampaignResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CampaignStatsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    stats_completed_at: { type: 'DatetimeType', isSingle: true },

    stats_started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChangeFeedVisibilityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed: { type: 'FeedResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelBatchCompletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    batch_created_at: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelBatchStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    batch_created_at: { type: 'DatetimeType', isSingle: true },

    created_at: { type: 'DatetimeType', isSingle: true },

    finished_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelConfig'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelConfigWithInfo'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ChannelContextResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelFrozenEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelHiddenEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelMemberResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    archived_at: { type: 'DatetimeType', isSingle: true },

    ban_expires: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    future_channel_ban_expires: { type: 'DatetimeType', isSingle: true },

    invite_accepted_at: { type: 'DatetimeType', isSingle: true },

    invite_rejected_at: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelMetadata'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_message_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelMute'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelMutedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    mutes: { type: 'ChannelMute', isSingle: false },

    mute: { type: 'ChannelMute', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelPushPreferencesResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    hide_messages_before: { type: 'DatetimeType', isSingle: true },

    last_message_at: { type: 'DatetimeType', isSingle: true },

    mute_expires_at: { type: 'DatetimeType', isSingle: true },

    truncated_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'ChannelMemberResponse', isSingle: false },

    config: { type: 'ChannelConfigWithInfo', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    truncated_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelStateResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },

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

    membership: { type: 'ChannelMemberResponse', isSingle: true },

    push_preferences: {
      type: 'ChannelPushPreferencesResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders['ChannelStateResponseFields'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },

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

    membership: { type: 'ChannelMemberResponse', isSingle: true },

    push_preferences: {
      type: 'ChannelPushPreferencesResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders['ChannelTruncatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelTypeConfig'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ChannelUnFrozenEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelUnmutedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    mutes: { type: 'ChannelMute', isSingle: false },

    mute: { type: 'ChannelMute', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChannelVisibleEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatActivityStatsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageStatsResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatDraftPayloadResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    mentioned_users: { type: 'UserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ChatDraftResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'ChatDraftPayloadResponse', isSingle: true },

    parent_message: { type: 'ChatMessageResponse', isSingle: true },

    quoted_message: { type: 'ChatMessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'ChatReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'ChatReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    message_text_updated_at: { type: 'DatetimeType', isSingle: true },

    pin_expires: { type: 'DatetimeType', isSingle: true },

    pinned_at: { type: 'DatetimeType', isSingle: true },

    mentioned_groups: { type: 'UserGroupResponse', isSingle: false },

    thread_participants: { type: 'UserResponse', isSingle: false },

    draft: { type: 'ChatDraftResponse', isSingle: true },

    pinned_by: { type: 'UserResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    quoted_message: { type: 'ChatMessageResponse', isSingle: true },

    reaction_groups: { type: 'ChatReactionGroupResponse', isSingle: false },

    reminder: { type: 'ChatReminderResponseData', isSingle: true },

    shared_location: { type: 'ChatSharedLocationResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatReactionGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    first_reaction_at: { type: 'DatetimeType', isSingle: true },

    last_reaction_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions_by: {
      type: 'ChatReactionGroupUserResponse',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders['ChatReactionGroupUserResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatReminderResponseData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    remind_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'ChatMessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ChatSharedLocationResponseData'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'ChatMessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CheckResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ClientEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    previously_connected_timestamp: { type: 'DatetimeType', isSingle: true },

    timestamp: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ClosedCaptionEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CollectionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['Command'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentReactionAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentReactionDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentReactionUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    reaction_groups: { type: 'FeedsReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['CommentRestoredEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CommentUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ConfigResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CountByMinuteResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    start_ts: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateBlockListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateCallTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateCampaignResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    campaign: { type: 'CampaignResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateChannelTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateCollectionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    collections: { type: 'CollectionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['CreateCommandResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    command: { type: 'Command', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateFeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateFeedViewResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateFeedsBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feeds: { type: 'FeedResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['CreateGuestResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateImportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    import_task: { type: 'ImportTask', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateImportV2TaskResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateMembershipLevelResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    membership_level: { type: 'MembershipLevelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreatePredefinedFilterResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    predefined_filter: { type: 'PredefinedFilterResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateRoleResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    role: { type: 'Role', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateSIPTrunkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sip_trunk: { type: 'SIPTrunkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateSegmentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    segment: { type: 'SegmentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CreateUserGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_group: { type: 'UserGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CustomCheckResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CustomEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['CustomVideoEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeactivateUserResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteActivityReactionResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteBookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteCallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteChannelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteCommentBookmarkResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteCommentReactionResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },

    reaction: { type: 'FeedsReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeleteReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DeviceResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['DraftPayloadResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    mentioned_users: { type: 'UserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['DraftResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'DraftPayloadResponse', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    parent_message: { type: 'MessageResponse', isSingle: true },

    quoted_message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['EgressRTMPResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['EgressResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    rtmps: { type: 'EgressRTMPResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['EnrichedCollectionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['EntityCreatorResponse'] = (input?: { [key: string]: any }) => {
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

decoders['EventHook'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['EventResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    event: { type: 'WSEvent', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ExportUserResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },

    reactions: { type: 'ReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'FeedMemberResponse', isSingle: false },

    feed: { type: 'FeedResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedGroupChangedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedGroupDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    activity_selectors: {
      type: 'ActivitySelectorConfigResponse',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders['FeedGroupRestoredEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedMemberAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'FeedMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedMemberRemovedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedMemberResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    invite_accepted_at: { type: 'DatetimeType', isSingle: true },

    invite_rejected_at: { type: 'DatetimeType', isSingle: true },

    membership_level: { type: 'MembershipLevelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedMemberUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    member: { type: 'FeedMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedOwnData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    own_followings: { type: 'FollowResponse', isSingle: false },

    own_follows: { type: 'FollowResponse', isSingle: false },

    own_membership: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    own_followings: { type: 'FollowResponse', isSingle: false },

    own_follows: { type: 'FollowResponse', isSingle: false },

    own_membership: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedSuggestionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    own_followings: { type: 'FollowResponse', isSingle: false },

    own_follows: { type: 'FollowResponse', isSingle: false },

    own_membership: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    feed: { type: 'FeedResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedViewResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_used_at: { type: 'DatetimeType', isSingle: true },

    activity_selectors: {
      type: 'ActivitySelectorConfigResponse',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders['FeedsBookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsEnrichedCollectionResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsFeedResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsReactionGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    first_reaction_at: { type: 'DatetimeType', isSingle: true },

    last_reaction_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsShareResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsV3ActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    comments: { type: 'FeedsV3CommentResponse', isSingle: false },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_bookmarks: { type: 'FeedsBookmarkResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    collections: { type: 'FeedsEnrichedCollectionResponse', isSingle: false },

    reaction_groups: { type: 'FeedsReactionGroupResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    expires_at: { type: 'DatetimeType', isSingle: true },

    friend_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    latest_shares: { type: 'FeedsShareResponse', isSingle: false },

    current_feed: { type: 'FeedsFeedResponse', isSingle: true },

    parent: { type: 'FeedsV3ActivityResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FeedsV3CommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    reaction_groups: { type: 'FeedsReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['FlagDetailsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    automod: { type: 'AutomodDetailsResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FlagFeedbackResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FlagUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FollowBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created: { type: 'FollowResponse', isSingle: false },

    follows: { type: 'FollowResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['FollowCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FollowDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FollowResponse'] = (input?: { [key: string]: any }) => {
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

decoders['FollowUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    follow: { type: 'FollowResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['FullUserResponse'] = (input?: { [key: string]: any }) => {
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

decoders['FutureChannelBanResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    banned_by: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetActiveCallsStatusResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    end_time: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetAppealResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    item: { type: 'AppealItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetApplicationResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    app: { type: 'AppResponseFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetBlockListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetBlockedUsersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    blocks: { type: 'BlockedUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetCallParticipantSessionMetricsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    joined_at: { type: 'DatetimeType', isSingle: true },

    published_tracks: { type: 'PublishedTrackMetrics', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetCallReportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    report: { type: 'ReportResponse', isSingle: true },

    video_reactions: { type: 'VideoReactionsResponse', isSingle: false },

    chat_activity: { type: 'ChatActivityStatsResponse', isSingle: true },

    session: { type: 'CallSessionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCallSessionParticipantStatsDetailsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    timeframe: { type: 'ParticipantSeriesTimeframe', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCallTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCampaignResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    campaign: { type: 'CampaignResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetChannelTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetCommandResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCommentRepliesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'ThreadedCommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetCommentsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'ThreadedCommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetConfigResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    config: { type: 'ConfigResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetDraftResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    draft: { type: 'DraftResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetExternalStorageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetFeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetFeedViewResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetFollowSuggestionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    suggestions: { type: 'FeedSuggestionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetImportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    import_task: { type: 'ImportTask', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetImportV2TaskResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetManyMessagesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageWithChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetModerationRuleResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    rule: { type: 'ModerationRuleV2Response', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateCallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateFeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateFeedResponse'] = (input?: { [key: string]: any }) => {
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

    notification_status: { type: 'NotificationStatusResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateFeedViewResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateFollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetOrCreateUnfollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetPinnedMessagesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetPredefinedFilterResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    predefined_filter: { type: 'PredefinedFilterResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetPushTemplatesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    templates: { type: 'PushTemplateResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetReactionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'ReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetRepliesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    messages: { type: 'MessageResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetRetentionPolicyResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    policies: { type: 'RetentionPolicy', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GetReviewQueueItemResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetSegmentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    segment: { type: 'SegmentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetSetupSessionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    setup_session: { type: 'SetupSession', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetTaskResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetThreadResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    thread: { type: 'ThreadStateResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GetUserGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_group: { type: 'UserGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GoLiveResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['GroupedChannelsBucket'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'ChannelStateResponseFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['GroupedQueryChannelsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    groups: { type: 'GroupedChannelsBucket', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ImportTask'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    history: { type: 'ImportTaskHistory', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ImportTaskHistory'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ImportV2TaskItem'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['IngressErrorEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['IngressStartedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['IngressStoppedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['KickedUserEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    kicked_by_user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['LabelResultResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ListBlockListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    blocklists: { type: 'BlockListResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListCallTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call_types: { type: 'CallTypeResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListChannelTypesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel_types: { type: 'ChannelTypeConfig', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListCommandsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    commands: { type: 'Command', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListDevicesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    devices: { type: 'DeviceResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListFeedGroupsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    groups: { type: 'FeedGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListFeedViewsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    views: { type: 'FeedViewResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListImportV2TasksResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    import_tasks: { type: 'ImportV2TaskItem', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListImportsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    import_tasks: { type: 'ImportTask', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListPushProvidersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    push_providers: { type: 'PushProviderResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListQueuesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    queues: { type: 'ModerationQueueResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListRecordingsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    recordings: { type: 'CallRecording', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListRolesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    roles: { type: 'Role', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListSIPInboundRoutingRuleResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    sip_inbound_routing_rules: {
      type: 'SIPInboundRoutingRuleResponse',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders['ListSIPTrunksResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sip_trunks: { type: 'SIPTrunkResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListTranscriptionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    transcriptions: { type: 'CallTranscription', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ListUserGroupsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_groups: { type: 'UserGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['MarkReadResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    event: { type: 'MarkReadResponseEvent', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MarkReadResponseEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel_last_message_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MaxStreakChangedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MemberAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    member: { type: 'ChannelMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MemberRemovedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    member: { type: 'ChannelMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MemberResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MemberUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    member: { type: 'ChannelMemberResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['MembershipLevelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageActionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageFlagResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    approved_at: { type: 'DatetimeType', isSingle: true },

    rejected_at: { type: 'DatetimeType', isSingle: true },

    reviewed_at: { type: 'DatetimeType', isSingle: true },

    details: { type: 'FlagDetailsResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    moderation_feedback: { type: 'FlagFeedbackResponse', isSingle: true },

    moderation_result: { type: 'MessageModerationResult', isSingle: true },

    reviewed_by: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageFlaggedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    details: { type: 'MessageModerationResult', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageHistoryEntryResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message_updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageModerationResult'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageNewEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponseCommonFields', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageReadEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageResponse'] = (input?: { [key: string]: any }) => {
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

    mentioned_groups: { type: 'UserGroupResponse', isSingle: false },

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

decoders['MessageStatsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    count_over_time: { type: 'CountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['MessageUnblockedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageUndeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MessageWithChannelResponse'] = (input?: { [key: string]: any }) => {
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

    mentioned_groups: { type: 'UserGroupResponse', isSingle: false },

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

decoders['ModerationAnalysisFailedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationCallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    ended_at: { type: 'DatetimeType', isSingle: true },

    starts_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationCheckCompletedEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationCustomActionEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationFlagResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationFlaggedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationImageAnalysisCompleteEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationMarkReviewedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    item: { type: 'ReviewQueueItemResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationQueueResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationRuleV2Response'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationRulesTriggeredEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ModerationTextAnalysisCompleteEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MuteChannelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel_mutes: { type: 'ChannelMute', isSingle: false },

    channel_mute: { type: 'ChannelMute', isSingle: true },

    own_user: { type: 'OwnUserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['MuteResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    mutes: { type: 'UserMuteResponse', isSingle: false },

    own_user: { type: 'OwnUserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['NotificationFeedUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    aggregated_activities: {
      type: 'AggregatedActivityResponse',
      isSingle: false,
    },

    notification_status: { type: 'NotificationStatusResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['NotificationMarkUnreadEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    last_read_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['NotificationStatusResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_read_at: { type: 'DatetimeType', isSingle: true },

    last_seen_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['NotificationThreadMessageNewEvent'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponseCommonFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['OwnBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    data: { type: 'FeedOwnData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['OwnUserResponse'] = (input?: { [key: string]: any }) => {
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

    push_preferences: { type: 'PushPreferencesResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ParticipantCountByMinuteResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    start_ts: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ParticipantCountOverTimeResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    by_minute: { type: 'ParticipantCountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ParticipantReportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    count_over_time: {
      type: 'ParticipantCountOverTimeResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders['ParticipantSeriesTimeframe'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    since: { type: 'DatetimeType', isSingle: true },

    until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ParticipantSessionDetails'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    joined_at: { type: 'DatetimeType', isSingle: true },

    left_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PendingMessageEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PendingMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PerformanceAnalysisResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_analyzed: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PermissionRequestEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PinActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestResult'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestRun'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    completed_at: { type: 'DatetimeType', isSingle: true },

    config_updated_at: { type: 'DatetimeType', isSingle: true },

    started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestRunResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    results: { type: 'PolicyTestResult', isSingle: false },

    run: { type: 'PolicyTestRun', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestSet'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    last_run: { type: 'PolicyTestRun', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestSetListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sets: { type: 'PolicyTestSet', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['PolicyTestSetResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    recent_runs: { type: 'PolicyTestRun', isSingle: false },

    set: { type: 'PolicyTestSet', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PollResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    poll: { type: 'PollResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PollResponseData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    latest_answers: { type: 'PollVoteResponseData', isSingle: false },

    own_votes: { type: 'PollVoteResponseData', isSingle: false },

    created_by: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PollVoteResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    poll: { type: 'PollResponseData', isSingle: true },

    vote: { type: 'PollVoteResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PollVoteResponseData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PollVotesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    votes: { type: 'PollVoteResponseData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['PredefinedFilterResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    performance: { type: 'PerformanceAnalysisResponse', isSingle: true },

    stats: { type: 'PredefinedFilterStatsResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PredefinedFilterStatsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    last_seen: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PublishedTrackMetrics'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    warnings: { type: 'SessionWarningResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['PushNotificationFields'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    providers: { type: 'PushProvider', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['PushNotificationSettingsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PushPreferencesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    disabled_until: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PushProvider'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    disabled_at: { type: 'DatetimeType', isSingle: true },

    push_templates: { type: 'PushTemplate', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['PushProviderResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    disabled_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PushTemplate'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['PushTemplateResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryActivitiesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryActivityReactionsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryActivitySharesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    shares: { type: 'ShareResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryAppealsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    items: { type: 'AppealItemResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryBannedUsersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bans: { type: 'BanResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryBookmarkFoldersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark_folders: { type: 'BookmarkFolderResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryBookmarksResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmarks: { type: 'BookmarkResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallMembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallParticipantSessionsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    participants_sessions: {
      type: 'ParticipantSessionDetails',
      isSingle: false,
    },

    session: { type: 'CallSessionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallParticipantsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    participants: { type: 'CallParticipantResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallSessionParticipantStatsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    participants: { type: 'CallStatsParticipant', isSingle: false },

    call_ended_at: { type: 'DatetimeType', isSingle: true },

    call_started_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallSessionParticipantStatsTimelineResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    events: { type: 'CallParticipantTimeline', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallSessionStatsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    call_stats: { type: 'CallStatsSessionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallStatsMapResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call_ended_at: { type: 'DatetimeType', isSingle: true },

    call_started_at: { type: 'DatetimeType', isSingle: true },

    end_time: { type: 'DatetimeType', isSingle: true },

    generated_at: { type: 'DatetimeType', isSingle: true },

    start_time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallStatsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    reports: { type: 'CallStatsReportSummaryResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCallsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    calls: { type: 'CallStateResponseFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCampaignsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    campaigns: { type: 'CampaignResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryChannelsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'ChannelStateResponseFields', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCollectionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    collections: { type: 'CollectionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCommentReactionsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'FeedsReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryCommentsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comments: { type: 'CommentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryDraftsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    drafts: { type: 'DraftResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryFeedMembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'FeedMemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryFeedModerationTemplate'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['QueryFeedModerationTemplatesResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    templates: { type: 'QueryFeedModerationTemplate', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryFeedsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feeds: { type: 'FeedResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryFollowsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follows: { type: 'FollowResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryFutureChannelBansResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    bans: { type: 'FutureChannelBanResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryLabelResultsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    label_results: { type: 'LabelResultResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryMembershipLevelsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    membership_levels: { type: 'MembershipLevelResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryMessageFlagsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    flags: { type: 'MessageFlagResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryMessageHistoryResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message_history: { type: 'MessageHistoryEntryResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryModerationConfigsResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    configs: { type: 'ConfigResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryModerationFlagsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    flags: { type: 'ModerationFlagResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryModerationLogsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    logs: { type: 'ActionLogResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryModerationRulesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    rules: { type: 'ModerationRuleV2Response', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryPinnedActivitiesResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    pinned_activities: { type: 'ActivityPinResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryPollsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    polls: { type: 'PollResponseData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryPredefinedFiltersResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    predefined_filters: { type: 'PredefinedFilterResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryReactionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    reactions: { type: 'ReactionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryRemindersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    reminders: { type: 'ReminderResponseData', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryReviewQueueResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    items: { type: 'ReviewQueueItemResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryRevisionHistoryResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    revisions: { type: 'RevisionHistoryResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QuerySegmentTargetsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    targets: { type: 'SegmentTargetResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QuerySegmentsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    segments: { type: 'SegmentResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryThreadsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    threads: { type: 'ThreadStateResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueryUsersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    users: { type: 'FullUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['QueueResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    queue: { type: 'ModerationQueueResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['Reaction'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactionDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponseCommonFields', isSingle: false },

    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactionGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    first_reaction_at: { type: 'DatetimeType', isSingle: true },

    last_reaction_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions_by: { type: 'ReactionGroupUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ReactionGroupUserResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactionNewEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    thread_participants: { type: 'UserResponseCommonFields', isSingle: false },

    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactionUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReactivateUserResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReadCollectionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    collections: { type: 'CollectionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['ReadStateResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },

    last_delivered_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RejectFeedMemberInviteResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    member: { type: 'FeedMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RejectFollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReminderCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    reminder: { type: 'ReminderResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReminderDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    reminder: { type: 'ReminderResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReminderNotificationEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    reminder: { type: 'ReminderResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReminderResponseData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    remind_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReminderUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    reminder: { type: 'ReminderResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RemoveUserGroupMembersResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    user_group: { type: 'UserGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReportResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallReportResponse', isSingle: true },

    participants: { type: 'ParticipantReportResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ResolveSipInboundResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sip_routing_rule: { type: 'SIPInboundRoutingRuleResponse', isSingle: true },

    sip_trunk: { type: 'SIPTrunkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RestoreActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RestoreCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },

    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RestoreFeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RetentionPolicy'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    enabled_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReviewQueueItemNewEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    flags: { type: 'ModerationFlagResponse', isSingle: false },

    action: { type: 'ActionLogResponse', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReviewQueueItemResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    actions: { type: 'ActionLogResponse', isSingle: false },

    bans: { type: 'BanInfoResponse', isSingle: false },

    flags: { type: 'ModerationFlagResponse', isSingle: false },

    completed_at: { type: 'DatetimeType', isSingle: true },

    escalated_at: { type: 'DatetimeType', isSingle: true },

    reviewed_at: { type: 'DatetimeType', isSingle: true },

    appeal: { type: 'AppealItemResponse', isSingle: true },

    assigned_to: { type: 'UserResponse', isSingle: true },

    call: { type: 'ModerationCallResponse', isSingle: true },

    entity_creator: { type: 'EntityCreatorResponse', isSingle: true },

    feeds_v2_reaction: { type: 'Reaction', isSingle: true },

    feeds_v3_activity: { type: 'FeedsV3ActivityResponse', isSingle: true },

    feeds_v3_comment: { type: 'FeedsV3CommentResponse', isSingle: true },

    message: { type: 'ChatMessageResponse', isSingle: true },

    reaction: { type: 'Reaction', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ReviewQueueItemUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    flags: { type: 'ModerationFlagResponse', isSingle: false },

    action: { type: 'ActionLogResponse', isSingle: true },

    review_queue_item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['RevisionHistoryResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['Role'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SIPInboundRoutingRuleResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SIPTrunkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SearchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    results: { type: 'SearchResult', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['SearchResult'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'SearchResultMessage', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SearchResultMessage'] = (input?: { [key: string]: any }) => {
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

    mentioned_groups: { type: 'UserGroupResponse', isSingle: false },

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

decoders['SearchRolesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    roles: { type: 'Role', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['SearchUserGroupsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_groups: { type: 'UserGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['Segment'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SegmentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SegmentTargetResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SendMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },

    channel_context: { type: 'ChannelContextResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SendReactionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SessionWarningResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    time: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SetRetentionPolicyResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    policy: { type: 'RetentionPolicy', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SetupSession'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    completed_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ShareResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SharedLocationResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SharedLocationResponseData'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    end_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SharedLocationsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    active_live_locations: {
      type: 'SharedLocationResponseData',
      isSingle: false,
    },
  };
  return decode(typeMappings, input);
};

decoders['SingleFollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['StartCampaignResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    campaign: { type: 'CampaignResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['StopLiveResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['StoriesFeedUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    activities: { type: 'ActivityResponse', isSingle: false },

    aggregated_activities: {
      type: 'AggregatedActivityResponse',
      isSingle: false,
    },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['SubmitActionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    appeal_item: { type: 'AppealItemResponse', isSingle: true },

    item: { type: 'ReviewQueueItemResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ThreadParticipant'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    last_read_at: { type: 'DatetimeType', isSingle: true },

    last_thread_message_at: { type: 'DatetimeType', isSingle: true },

    left_thread_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ThreadResponse'] = (input?: { [key: string]: any }) => {
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

decoders['ThreadStateResponse'] = (input?: { [key: string]: any }) => {
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

decoders['ThreadUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['ThreadedCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    mentioned_users: { type: 'UserResponse', isSingle: false },

    own_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    user: { type: 'UserResponse', isSingle: true },

    deleted_at: { type: 'DatetimeType', isSingle: true },

    edited_at: { type: 'DatetimeType', isSingle: true },

    latest_reactions: { type: 'FeedsReactionResponse', isSingle: false },

    replies: { type: 'ThreadedCommentResponse', isSingle: false },

    reaction_groups: { type: 'FeedsReactionGroupResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['TranslateActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['TranslateCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['TruncateChannelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UnblockedUserEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UndeleteMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UnfollowBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follows: { type: 'FollowResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UnfollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UnpinActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UnreadCountsBatchResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    counts_by_user: { type: 'UnreadCountsResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UnreadCountsChannel'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UnreadCountsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'UnreadCountsChannel', isSingle: false },

    threads: { type: 'UnreadCountsThread', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UnreadCountsThread'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    last_read: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateActivitiesPartialBatchResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpdateActivityPartialResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateActivityResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activity: { type: 'ActivityResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateBlockListResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    blocklist: { type: 'BlockListResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateBookmarkFolderResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark_folder: { type: 'BookmarkFolderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateBookmarkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCallMembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCallResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'MemberResponse', isSingle: false },

    call: { type: 'CallResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCallTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateChannelPartialResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateChannelResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    members: { type: 'ChannelMemberResponse', isSingle: false },

    channel: { type: 'ChannelResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateChannelTypeResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCollectionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    collections: { type: 'CollectionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCommandResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    command: { type: 'Command', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCommentBookmarkResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    bookmark: { type: 'BookmarkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCommentPartialResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateCommentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    comment: { type: 'CommentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateFeedGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_group: { type: 'FeedGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateFeedMembersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    added: { type: 'FeedMemberResponse', isSingle: false },

    updated: { type: 'FeedMemberResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpdateFeedResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed: { type: 'FeedResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateFeedViewResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    feed_view: { type: 'FeedViewResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateFollowResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    follow: { type: 'FollowResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateMemberPartialResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channel_member: { type: 'ChannelMemberResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateMembershipLevelResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    membership_level: { type: 'MembershipLevelResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateMessagePartialResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateMessageResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    message: { type: 'MessageResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdatePredefinedFilterResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    predefined_filter: { type: 'PredefinedFilterResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateReminderResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    reminder: { type: 'ReminderResponseData', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateSIPInboundRoutingRuleResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    sip_inbound_routing_rule: {
      type: 'SIPInboundRoutingRuleResponse',
      isSingle: true,
    },
  };
  return decode(typeMappings, input);
};

decoders['UpdateSIPTrunkResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    sip_trunk: { type: 'SIPTrunkResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateSegmentResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    segment: { type: 'SegmentResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateThreadPartialResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    thread: { type: 'ThreadResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateUserGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    user_group: { type: 'UserGroupResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpdateUsersResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    users: { type: 'FullUserResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpdatedCallPermissionsEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertActivitiesResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    activities: { type: 'ActivityResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpsertCollectionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    collections: { type: 'CollectionResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpsertConfigResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    config: { type: 'ConfigResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertModerationRuleResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    rule: { type: 'ModerationRuleV2Response', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertModerationTemplateResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertPushPreferencesResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    user_preferences: { type: 'PushPreferencesResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UpsertPushProviderResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    push_provider: { type: 'PushProviderResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertPushTemplateResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    template: { type: 'PushTemplateResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UpsertSetupSessionResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    setup_session: { type: 'SetupSession', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserBannedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    expiration: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserDeactivatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserFlaggedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    target_user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupCreatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupMember'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupMemberAddedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupMemberRemovedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    members: { type: 'UserGroupMember', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['UserGroupUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserMessagesDeletedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserMuteResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    updated_at: { type: 'DatetimeType', isSingle: true },

    expires: { type: 'DatetimeType', isSingle: true },

    target: { type: 'UserResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserMutedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    target_users: { type: 'UserResponseCommonFields', isSingle: false },

    target_user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserReactivatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserResponse'] = (input?: { [key: string]: any }) => {
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

decoders['UserResponseCommonFields'] = (input?: { [key: string]: any }) => {
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

decoders['UserUnbannedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    created_by: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserUnmutedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },

    target_users: { type: 'UserResponseCommonFields', isSingle: false },

    target_user: { type: 'UserResponseCommonFields', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserUnreadReminderEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    user: { type: 'UserResponseCommonFields', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['UserUpdatedEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    received_at: { type: 'DatetimeType', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['VideoReactionOverTimeResponse'] = (input?: {
  [key: string]: any;
}) => {
  const typeMappings: TypeMapping = {
    by_minute: { type: 'CountByMinuteResponse', isSingle: false },
  };
  return decode(typeMappings, input);
};

decoders['VideoReactionsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    count_over_time: { type: 'VideoReactionOverTimeResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['WSEvent'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    created_at: { type: 'DatetimeType', isSingle: true },

    channel_last_message_at: { type: 'DatetimeType', isSingle: true },

    channel: { type: 'ChannelResponse', isSingle: true },

    created_by: { type: 'UserResponse', isSingle: true },

    me: { type: 'OwnUserResponse', isSingle: true },

    member: { type: 'ChannelMemberResponse', isSingle: true },

    message: { type: 'MessageResponse', isSingle: true },

    poll: { type: 'PollResponseData', isSingle: true },

    poll_vote: { type: 'PollVoteResponseData', isSingle: true },

    reaction: { type: 'ReactionResponse', isSingle: true },

    thread: { type: 'ThreadResponse', isSingle: true },

    user: { type: 'UserResponse', isSingle: true },
  };
  return decode(typeMappings, input);
};

decoders['WrappedUnreadCountsResponse'] = (input?: { [key: string]: any }) => {
  const typeMappings: TypeMapping = {
    channels: { type: 'UnreadCountsChannel', isSingle: false },

    threads: { type: 'UnreadCountsThread', isSingle: false },
  };
  return decode(typeMappings, input);
};

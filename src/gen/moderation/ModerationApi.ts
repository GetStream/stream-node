import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AIImageConfig,
  AITextConfig,
  AIVideoConfig,
  APIError,
  APNConfig,
  APNConfigFields,
  APNS,
  AWSRekognitionRule,
  AcceptFeedMemberInviteRequest,
  AcceptFeedMemberInviteResponse,
  AcceptFollowRequest,
  AcceptFollowResponse,
  Action,
  ActionLogResponse,
  ActionSequence,
  ActiveCallsBitrateStats,
  ActiveCallsFPSStats,
  ActiveCallsLatencyStats,
  ActiveCallsMetrics,
  ActiveCallsResolutionStats,
  ActiveCallsSummary,
  ActivityAddedEvent,
  ActivityDeletedEvent,
  ActivityFeedbackRequest,
  ActivityFeedbackResponse,
  ActivityLocation,
  ActivityMarkEvent,
  ActivityMarkedEvent,
  ActivityPinResponse,
  ActivityPinnedEvent,
  ActivityProcessorConfig,
  ActivityReactionAddedEvent,
  ActivityReactionDeletedEvent,
  ActivityReactionUpdatedEvent,
  ActivityRemovedFromFeedEvent,
  ActivityRequest,
  ActivityResponse,
  ActivitySelectorConfig,
  ActivitySelectorConfigResponse,
  ActivityUnpinnedEvent,
  ActivityUpdatedEvent,
  AddActivityRequest,
  AddActivityResponse,
  AddBookmarkRequest,
  AddBookmarkResponse,
  AddCommentReactionRequest,
  AddCommentReactionResponse,
  AddCommentRequest,
  AddCommentResponse,
  AddCommentsBatchRequest,
  AddCommentsBatchResponse,
  AddFolderRequest,
  AddReactionRequest,
  AddReactionResponse,
  AggregatedActivityResponse,
  AggregationConfig,
  AnyEvent,
  AppResponseFields,
  AsyncBulkImageModerationEvent,
  AsyncExportChannelsEvent,
  AsyncExportErrorEvent,
  AsyncExportModerationLogsEvent,
  AsyncExportUsersEvent,
  AsyncModerationCallbackConfig,
  AsyncModerationConfiguration,
  Attachment,
  AudioSettings,
  AudioSettingsRequest,
  AudioSettingsResponse,
  AutomodDetails,
  AutomodPlatformCircumventionConfig,
  AutomodRule,
  AutomodSemanticFiltersConfig,
  AutomodSemanticFiltersRule,
  AutomodToxicityConfig,
  AzureRequest,
  BackstageSettings,
  BackstageSettingsRequest,
  BackstageSettingsResponse,
  Ban,
  BanActionRequest,
  BanOptions,
  BanRequest,
  BanResponse,
  BlockListConfig,
  BlockListOptions,
  BlockListResponse,
  BlockListRule,
  BlockUserRequest,
  BlockUserResponse,
  BlockUsersRequest,
  BlockUsersResponse,
  BlockedUserEvent,
  BlockedUserResponse,
  BodyguardImageAnalysisConfig,
  BodyguardRule,
  BodyguardSeverityRule,
  BookmarkAddedEvent,
  BookmarkDeletedEvent,
  BookmarkFolderDeletedEvent,
  BookmarkFolderResponse,
  BookmarkFolderUpdatedEvent,
  BookmarkResponse,
  BookmarkUpdatedEvent,
  Bound,
  BroadcastSettings,
  BroadcastSettingsRequest,
  BroadcastSettingsResponse,
  BrowserDataResponse,
  BulkImageModerationRequest,
  BulkImageModerationResponse,
  CallAcceptedEvent,
  CallClosedCaption,
  CallClosedCaptionsFailedEvent,
  CallClosedCaptionsStartedEvent,
  CallClosedCaptionsStoppedEvent,
  CallCreatedEvent,
  CallDeletedEvent,
  CallDurationReport,
  CallDurationReportResponse,
  CallEndedEvent,
  CallFrameRecordingFailedEvent,
  CallFrameRecordingFrameReadyEvent,
  CallFrameRecordingStartedEvent,
  CallFrameRecordingStoppedEvent,
  CallHLSBroadcastingFailedEvent,
  CallHLSBroadcastingStartedEvent,
  CallHLSBroadcastingStoppedEvent,
  CallIngressResponse,
  CallLiveStartedEvent,
  CallMemberAddedEvent,
  CallMemberRemovedEvent,
  CallMemberUpdatedEvent,
  CallMemberUpdatedPermissionEvent,
  CallMissedEvent,
  CallModerationBlurEvent,
  CallModerationWarningEvent,
  CallNotificationEvent,
  CallParticipantCountReport,
  CallParticipantCountReportResponse,
  CallParticipantResponse,
  CallParticipantTimeline,
  CallReactionEvent,
  CallRecording,
  CallRecordingFailedEvent,
  CallRecordingReadyEvent,
  CallRecordingStartedEvent,
  CallRecordingStoppedEvent,
  CallRejectedEvent,
  CallReportResponse,
  CallRequest,
  CallResponse,
  CallRingEvent,
  CallRtmpBroadcastFailedEvent,
  CallRtmpBroadcastStartedEvent,
  CallRtmpBroadcastStoppedEvent,
  CallSessionEndedEvent,
  CallSessionParticipantCountsUpdatedEvent,
  CallSessionParticipantJoinedEvent,
  CallSessionParticipantLeftEvent,
  CallSessionResponse,
  CallSessionStartedEvent,
  CallSettings,
  CallSettingsRequest,
  CallSettingsResponse,
  CallStateResponseFields,
  CallStatsParticipant,
  CallStatsParticipantCounts,
  CallStatsParticipantSession,
  CallStatsReportReadyEvent,
  CallStatsReportSummaryResponse,
  CallTranscription,
  CallTranscriptionFailedEvent,
  CallTranscriptionReadyEvent,
  CallTranscriptionStartedEvent,
  CallTranscriptionStoppedEvent,
  CallType,
  CallTypeResponse,
  CallUpdatedEvent,
  CallUserFeedbackSubmittedEvent,
  CallUserMutedEvent,
  CallsPerDayReport,
  CallsPerDayReportResponse,
  CampaignChannelTemplate,
  CampaignCompletedEvent,
  CampaignMessageTemplate,
  CampaignResponse,
  CampaignStartedEvent,
  CampaignStatsResponse,
  CastPollVoteRequest,
  Channel,
  ChannelConfig,
  ChannelConfigWithInfo,
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelExport,
  ChannelFrozenEvent,
  ChannelGetOrCreateRequest,
  ChannelHiddenEvent,
  ChannelInput,
  ChannelMember,
  ChannelMemberLookup,
  ChannelMemberResponse,
  ChannelMessages,
  ChannelMute,
  ChannelMutedEvent,
  ChannelOwnCapability,
  ChannelPushPreferences,
  ChannelResponse,
  ChannelStateResponse,
  ChannelStateResponseFields,
  ChannelTruncatedEvent,
  ChannelTypeConfig,
  ChannelUnFrozenEvent,
  ChannelUnmutedEvent,
  ChannelUpdatedEvent,
  ChannelVisibleEvent,
  ChatActivityStatsResponse,
  CheckExternalStorageResponse,
  CheckPushRequest,
  CheckPushResponse,
  CheckRequest,
  CheckResponse,
  CheckSNSRequest,
  CheckSNSResponse,
  CheckSQSRequest,
  CheckSQSResponse,
  ClientOSDataResponse,
  ClosedCaptionEvent,
  CollectUserFeedbackRequest,
  CollectUserFeedbackResponse,
  Command,
  CommentAddedEvent,
  CommentDeletedEvent,
  CommentReactionAddedEvent,
  CommentReactionDeletedEvent,
  CommentReactionUpdatedEvent,
  CommentResponse,
  CommentUpdatedEvent,
  CommitMessageRequest,
  ConfigOverrides,
  ConfigResponse,
  ContentCountRuleParameters,
  CountByMinuteResponse,
  CreateBlockListRequest,
  CreateBlockListResponse,
  CreateCallTypeRequest,
  CreateCallTypeResponse,
  CreateChannelTypeRequest,
  CreateChannelTypeResponse,
  CreateCommandRequest,
  CreateCommandResponse,
  CreateDeviceRequest,
  CreateExternalStorageRequest,
  CreateExternalStorageResponse,
  CreateFeedGroupRequest,
  CreateFeedGroupResponse,
  CreateFeedViewRequest,
  CreateFeedViewResponse,
  CreateFeedsBatchRequest,
  CreateFeedsBatchResponse,
  CreateGuestRequest,
  CreateGuestResponse,
  CreateImportRequest,
  CreateImportResponse,
  CreateImportURLRequest,
  CreateImportURLResponse,
  CreateMembershipLevelRequest,
  CreateMembershipLevelResponse,
  CreatePollOptionRequest,
  CreatePollRequest,
  CreateReminderRequest,
  CreateRoleRequest,
  CreateRoleResponse,
  CustomActionRequest,
  CustomCheckFlag,
  CustomCheckRequest,
  CustomCheckResponse,
  CustomVideoEvent,
  DailyAggregateCallDurationReportResponse,
  DailyAggregateCallParticipantCountReportResponse,
  DailyAggregateCallsPerDayReportResponse,
  DailyAggregateQualityScoreReportResponse,
  DailyAggregateSDKUsageReportResponse,
  DailyAggregateUserFeedbackReportResponse,
  DailyMetricResponse,
  DailyMetricStatsResponse,
  Data,
  DataDogInfo,
  DeactivateUserRequest,
  DeactivateUserResponse,
  DeactivateUsersRequest,
  DeactivateUsersResponse,
  DecayFunctionConfig,
  DeleteActivitiesRequest,
  DeleteActivitiesResponse,
  DeleteActivityReactionResponse,
  DeleteActivityRequest,
  DeleteActivityResponse,
  DeleteBookmarkFolderResponse,
  DeleteBookmarkResponse,
  DeleteCallRequest,
  DeleteCallResponse,
  DeleteChannelResponse,
  DeleteChannelsRequest,
  DeleteChannelsResponse,
  DeleteChannelsResultResponse,
  DeleteCommandResponse,
  DeleteCommentReactionResponse,
  DeleteCommentResponse,
  DeleteExternalStorageResponse,
  DeleteFeedGroupResponse,
  DeleteFeedResponse,
  DeleteFeedUserDataResponse,
  DeleteFeedViewResponse,
  DeleteMessageRequest,
  DeleteMessageResponse,
  DeleteModerationConfigResponse,
  DeleteModerationRuleResponse,
  DeleteModerationTemplateResponse,
  DeleteReactionRequest,
  DeleteReactionResponse,
  DeleteRecordingResponse,
  DeleteReminderResponse,
  DeleteSegmentTargetsRequest,
  DeleteTranscriptionResponse,
  DeleteUserRequest,
  DeleteUsersRequest,
  DeleteUsersResponse,
  DeliveryReceipts,
  DeliveryReceiptsResponse,
  Device,
  DeviceDataResponse,
  DeviceErrorInfo,
  DeviceResponse,
  DraftPayloadResponse,
  DraftResponse,
  EdgeResponse,
  EgressHLSResponse,
  EgressRTMPResponse,
  EgressResponse,
  EndCallRequest,
  EndCallResponse,
  EnrichedActivity,
  EnrichedReaction,
  EntityCreatorResponse,
  ErrorResult,
  EventHook,
  EventNotificationSettings,
  EventRequest,
  EventResponse,
  ExportChannelsRequest,
  ExportChannelsResponse,
  ExportFeedUserDataRequest,
  ExportFeedUserDataResponse,
  ExportUserResponse,
  ExportUsersRequest,
  ExportUsersResponse,
  ExternalStorageResponse,
  FCM,
  FeedCreatedEvent,
  FeedDeletedEvent,
  FeedGroup,
  FeedGroupChangedEvent,
  FeedGroupDeletedEvent,
  FeedGroupResponse,
  FeedInput,
  FeedMemberAddedEvent,
  FeedMemberRemovedEvent,
  FeedMemberRequest,
  FeedMemberResponse,
  FeedMemberUpdatedEvent,
  FeedOwnCapability,
  FeedRequest,
  FeedResponse,
  FeedUpdatedEvent,
  FeedViewResponse,
  FeedVisibilityResponse,
  FeedsModerationTemplateConfig,
  FeedsPreferences,
  FeedsReactionResponse,
  Field,
  FileUploadConfig,
  FileUploadRequest,
  FileUploadResponse,
  FirebaseConfig,
  FirebaseConfigFields,
  Flag,
  FlagDetails,
  FlagFeedback,
  FlagMessageDetails,
  FlagRequest,
  FlagResponse,
  FlagUpdatedEvent,
  FlagUserOptions,
  FollowBatchRequest,
  FollowBatchResponse,
  FollowCreatedEvent,
  FollowDeletedEvent,
  FollowPair,
  FollowRequest,
  FollowResponse,
  FollowUpdatedEvent,
  FrameRecordSettings,
  FrameRecordingResponse,
  FrameRecordingSettingsRequest,
  FrameRecordingSettingsResponse,
  FullUserResponse,
  GeofenceResponse,
  GeofenceSettings,
  GeofenceSettingsRequest,
  GeofenceSettingsResponse,
  GetActiveCallsStatusResponse,
  GetActivityResponse,
  GetApplicationResponse,
  GetBlockListResponse,
  GetBlockedUsersResponse,
  GetCallReportResponse,
  GetCallResponse,
  GetCallSessionParticipantStatsDetailsResponse,
  GetCallTypeResponse,
  GetCampaignResponse,
  GetChannelTypeResponse,
  GetCommandResponse,
  GetCommentRepliesResponse,
  GetCommentResponse,
  GetCommentsResponse,
  GetConfigResponse,
  GetCustomPermissionResponse,
  GetDraftResponse,
  GetEdgesResponse,
  GetFeedGroupResponse,
  GetFeedViewResponse,
  GetFeedVisibilityResponse,
  GetFeedsRateLimitsResponse,
  GetFollowSuggestionsResponse,
  GetImportResponse,
  GetManyMessagesResponse,
  GetMessageResponse,
  GetModerationRuleResponse,
  GetOGResponse,
  GetOrCreateCallRequest,
  GetOrCreateCallResponse,
  GetOrCreateFeedGroupRequest,
  GetOrCreateFeedGroupResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  GetOrCreateFeedViewRequest,
  GetOrCreateFeedViewResponse,
  GetPushTemplatesResponse,
  GetRateLimitsResponse,
  GetReactionsResponse,
  GetRepliesResponse,
  GetReviewQueueItemResponse,
  GetSegmentResponse,
  GetTaskResponse,
  GetThreadResponse,
  GoLiveRequest,
  GoLiveResponse,
  GoogleVisionConfig,
  GroupedStatsResponse,
  HLSSettings,
  HLSSettingsRequest,
  HLSSettingsResponse,
  HarmConfig,
  HideChannelRequest,
  HideChannelResponse,
  HuaweiConfig,
  HuaweiConfigFields,
  ImageContentParameters,
  ImageData,
  ImageRuleParameters,
  ImageSize,
  ImageUploadRequest,
  ImageUploadResponse,
  Images,
  ImportTask,
  ImportTaskHistory,
  IngressAudioEncodingOptions,
  IngressAudioEncodingOptionsRequest,
  IngressAudioEncodingResponse,
  IngressSettings,
  IngressSettingsRequest,
  IngressSettingsResponse,
  IngressSource,
  IngressSourceRequest,
  IngressSourceResponse,
  IngressVideoEncodingOptions,
  IngressVideoEncodingOptionsRequest,
  IngressVideoEncodingResponse,
  IngressVideoLayer,
  IngressVideoLayerRequest,
  IngressVideoLayerResponse,
  JoinCallAPIMetrics,
  KickUserRequest,
  KickUserResponse,
  KickedUserEvent,
  LLMConfig,
  LLMRule,
  Label,
  LabelThresholds,
  LayoutSettings,
  LayoutSettingsRequest,
  LayoutSettingsResponse,
  LimitInfo,
  LimitsSettings,
  LimitsSettingsRequest,
  LimitsSettingsResponse,
  ListBlockListResponse,
  ListCallTypeResponse,
  ListChannelTypesResponse,
  ListCommandsResponse,
  ListDevicesResponse,
  ListExternalStorageResponse,
  ListFeedGroupsResponse,
  ListFeedViewsResponse,
  ListFeedVisibilitiesResponse,
  ListImportsResponse,
  ListPermissionsResponse,
  ListPushProvidersResponse,
  ListRecordingsResponse,
  ListRolesResponse,
  ListTranscriptionsResponse,
  MarkActivityRequest,
  MarkChannelsReadRequest,
  MarkReadRequest,
  MarkReadResponse,
  MarkReviewedRequest,
  MarkUnreadRequest,
  MemberAddedEvent,
  MemberRemovedEvent,
  MemberRequest,
  MemberResponse,
  MemberUpdatedEvent,
  MembersResponse,
  MembershipLevelResponse,
  Message,
  MessageActionRequest,
  MessageChangeSet,
  MessageDeletedEvent,
  MessageFlagResponse,
  MessageFlaggedEvent,
  MessageHistoryEntryResponse,
  MessageModerationResult,
  MessageNewEvent,
  MessageOptions,
  MessagePaginationParams,
  MessageReadEvent,
  MessageReminder,
  MessageRequest,
  MessageResponse,
  MessageStatsResponse,
  MessageUnblockedEvent,
  MessageUndeletedEvent,
  MessageUpdate,
  MessageUpdatedEvent,
  MessageWithChannelResponse,
  MetricThreshold,
  ModerationActionConfig,
  ModerationCheckCompletedEvent,
  ModerationConfig,
  ModerationCustomActionEvent,
  ModerationDashboardPreferences,
  ModerationFlagResponse,
  ModerationFlaggedEvent,
  ModerationMarkReviewedEvent,
  ModerationPayload,
  ModerationResponse,
  ModerationRuleV2Response,
  ModerationV2Response,
  MuteChannelRequest,
  MuteChannelResponse,
  MuteRequest,
  MuteResponse,
  MuteUsersRequest,
  MuteUsersResponse,
  NetworkMetricsReportResponse,
  NoiseCancellationSettings,
  NotificationConfig,
  NotificationContext,
  NotificationFeedUpdatedEvent,
  NotificationMarkUnreadEvent,
  NotificationSettings,
  NotificationStatusResponse,
  NotificationTarget,
  NotificationTrigger,
  OCRRule,
  OnlyUserID,
  OverviewDashboardConfig,
  OwnCapabilitiesBatchRequest,
  OwnCapabilitiesBatchResponse,
  OwnCapability,
  OwnUser,
  OwnUserResponse,
  PagerRequest,
  PagerResponse,
  PaginationParams,
  ParticipantCountByMinuteResponse,
  ParticipantCountOverTimeResponse,
  ParticipantReportResponse,
  ParticipantSeriesPublisherStats,
  ParticipantSeriesSubscriberStats,
  ParticipantSeriesSubscriptionTrackMetrics,
  ParticipantSeriesTimeframe,
  ParticipantSeriesTrackMetrics,
  ParticipantSeriesUserStats,
  PendingMessageEvent,
  PendingMessageResponse,
  PerSDKUsageReport,
  Permission,
  PermissionRequestEvent,
  PinActivityRequest,
  PinActivityResponse,
  PinRequest,
  PinResponse,
  PlatformDataResponse,
  Policy,
  PolicyRequest,
  Poll,
  PollOption,
  PollOptionInput,
  PollOptionRequest,
  PollOptionResponse,
  PollOptionResponseData,
  PollResponse,
  PollResponseData,
  PollVote,
  PollVoteResponse,
  PollVoteResponseData,
  PollVotesResponse,
  PrivacySettings,
  PrivacySettingsResponse,
  PublishedTrackFlags,
  PublisherAllMetrics,
  PublisherAudioMetrics,
  PublisherStatsResponse,
  PublisherVideoMetrics,
  PublishersMetrics,
  PushConfig,
  PushNotificationConfig,
  PushNotificationFields,
  PushNotificationSettingsResponse,
  PushPreferenceInput,
  PushPreferences,
  PushProvider,
  PushProviderResponse,
  PushTemplate,
  QualityScoreReport,
  QualityScoreReportResponse,
  QueryActivitiesRequest,
  QueryActivitiesResponse,
  QueryActivityReactionsRequest,
  QueryActivityReactionsResponse,
  QueryAggregateCallStatsRequest,
  QueryAggregateCallStatsResponse,
  QueryBannedUsersPayload,
  QueryBannedUsersResponse,
  QueryBookmarkFoldersRequest,
  QueryBookmarkFoldersResponse,
  QueryBookmarksRequest,
  QueryBookmarksResponse,
  QueryCallMembersRequest,
  QueryCallMembersResponse,
  QueryCallParticipantsRequest,
  QueryCallParticipantsResponse,
  QueryCallSessionParticipantStatsResponse,
  QueryCallSessionParticipantStatsTimelineResponse,
  QueryCallStatsRequest,
  QueryCallStatsResponse,
  QueryCallsRequest,
  QueryCallsResponse,
  QueryCampaignsRequest,
  QueryCampaignsResponse,
  QueryChannelsRequest,
  QueryChannelsResponse,
  QueryCommentReactionsRequest,
  QueryCommentReactionsResponse,
  QueryCommentsRequest,
  QueryCommentsResponse,
  QueryDraftsRequest,
  QueryDraftsResponse,
  QueryFeedMembersRequest,
  QueryFeedMembersResponse,
  QueryFeedModerationTemplate,
  QueryFeedModerationTemplatesResponse,
  QueryFeedsRequest,
  QueryFeedsResponse,
  QueryFeedsUsageStatsRequest,
  QueryFeedsUsageStatsResponse,
  QueryFollowsRequest,
  QueryFollowsResponse,
  QueryMembersPayload,
  QueryMembershipLevelsRequest,
  QueryMembershipLevelsResponse,
  QueryMessageFlagsPayload,
  QueryMessageFlagsResponse,
  QueryMessageHistoryRequest,
  QueryMessageHistoryResponse,
  QueryModerationConfigsRequest,
  QueryModerationConfigsResponse,
  QueryModerationFlagsRequest,
  QueryModerationFlagsResponse,
  QueryModerationLogsRequest,
  QueryModerationLogsResponse,
  QueryModerationRulesRequest,
  QueryModerationRulesResponse,
  QueryPollVotesRequest,
  QueryPollsRequest,
  QueryPollsResponse,
  QueryReactionsRequest,
  QueryReactionsResponse,
  QueryRemindersRequest,
  QueryRemindersResponse,
  QueryReviewQueueRequest,
  QueryReviewQueueResponse,
  QuerySegmentTargetsRequest,
  QuerySegmentTargetsResponse,
  QuerySegmentsRequest,
  QuerySegmentsResponse,
  QueryThreadsRequest,
  QueryThreadsResponse,
  QueryUserFeedbackRequest,
  QueryUserFeedbackResponse,
  QueryUsersPayload,
  QueryUsersResponse,
  RTMPBroadcastRequest,
  RTMPIngress,
  RTMPLocation,
  RTMPSettings,
  RTMPSettingsRequest,
  RTMPSettingsResponse,
  RankingConfig,
  Reaction,
  ReactionDeletedEvent,
  ReactionGroupResponse,
  ReactionNewEvent,
  ReactionRequest,
  ReactionResponse,
  ReactionUpdatedEvent,
  ReactivateUserRequest,
  ReactivateUserResponse,
  ReactivateUsersRequest,
  ReactivateUsersResponse,
  ReadReceipts,
  ReadReceiptsResponse,
  ReadStateResponse,
  RecordSettings,
  RecordSettingsRequest,
  RecordSettingsResponse,
  RejectFeedMemberInviteRequest,
  RejectFeedMemberInviteResponse,
  RejectFollowRequest,
  RejectFollowResponse,
  ReminderCreatedEvent,
  ReminderDeletedEvent,
  ReminderNotificationEvent,
  ReminderResponseData,
  ReminderUpdatedEvent,
  RepliesMeta,
  ReportByHistogramBucket,
  ReportResponse,
  Response,
  RestoreActionRequest,
  RestoreUsersRequest,
  ReviewQueueItemNewEvent,
  ReviewQueueItemResponse,
  ReviewQueueItemUpdatedEvent,
  RingSettings,
  RingSettingsRequest,
  RingSettingsResponse,
  Role,
  RuleBuilderAction,
  RuleBuilderCondition,
  RuleBuilderConditionGroup,
  RuleBuilderConfig,
  RuleBuilderRule,
  S3Request,
  SDKUsageReport,
  SDKUsageReportResponse,
  SRTIngress,
  ScreensharingSettings,
  ScreensharingSettingsRequest,
  ScreensharingSettingsResponse,
  SearchPayload,
  SearchResponse,
  SearchResult,
  SearchResultMessage,
  SearchWarning,
  Segment,
  SegmentResponse,
  SegmentTargetResponse,
  SendCallEventRequest,
  SendCallEventResponse,
  SendClosedCaptionRequest,
  SendClosedCaptionResponse,
  SendEventRequest,
  SendMessageRequest,
  SendMessageResponse,
  SendReactionRequest,
  SendReactionResponse,
  SendUserCustomEventRequest,
  SessionSettings,
  SessionSettingsRequest,
  SessionSettingsResponse,
  ShadowBlockActionRequest,
  SharedLocation,
  SharedLocationResponse,
  SharedLocationResponseData,
  SharedLocationsResponse,
  ShowChannelRequest,
  ShowChannelResponse,
  SingleFollowResponse,
  SortParam,
  SortParamRequest,
  SpeechSegmentConfig,
  StartCampaignRequest,
  StartCampaignResponse,
  StartClosedCaptionsRequest,
  StartClosedCaptionsResponse,
  StartFrameRecordingRequest,
  StartFrameRecordingResponse,
  StartHLSBroadcastingRequest,
  StartHLSBroadcastingResponse,
  StartRTMPBroadcastsRequest,
  StartRTMPBroadcastsResponse,
  StartRecordingRequest,
  StartRecordingResponse,
  StartTranscriptionRequest,
  StartTranscriptionResponse,
  StopAllRTMPBroadcastsRequest,
  StopAllRTMPBroadcastsResponse,
  StopCampaignRequest,
  StopClosedCaptionsRequest,
  StopClosedCaptionsResponse,
  StopFrameRecordingRequest,
  StopFrameRecordingResponse,
  StopHLSBroadcastingRequest,
  StopHLSBroadcastingResponse,
  StopLiveRequest,
  StopLiveResponse,
  StopRTMPBroadcastsRequest,
  StopRTMPBroadcastsResponse,
  StopRecordingRequest,
  StopRecordingResponse,
  StopTranscriptionRequest,
  StopTranscriptionResponse,
  StoriesConfig,
  StoriesFeedUpdatedEvent,
  SubmitActionRequest,
  SubmitActionResponse,
  SubscriberAllMetrics,
  SubscriberAudioMetrics,
  SubscriberStatsResponse,
  SubscriberVideoMetrics,
  SubscribersMetrics,
  TargetResolution,
  TextContentParameters,
  TextRuleParameters,
  ThreadParticipant,
  ThreadResponse,
  ThreadStateResponse,
  ThreadUpdatedEvent,
  ThreadedCommentResponse,
  Thresholds,
  ThumbnailResponse,
  ThumbnailsSettings,
  ThumbnailsSettingsRequest,
  ThumbnailsSettingsResponse,
  Time,
  TrackStatsResponse,
  TranscriptionSettings,
  TranscriptionSettingsRequest,
  TranscriptionSettingsResponse,
  TranslateMessageRequest,
  TranslationSettings,
  TruncateChannelRequest,
  TruncateChannelResponse,
  TypingIndicators,
  TypingIndicatorsResponse,
  UnbanActionRequest,
  UnbanRequest,
  UnbanResponse,
  UnblockActionRequest,
  UnblockUserRequest,
  UnblockUserResponse,
  UnblockUsersRequest,
  UnblockUsersResponse,
  UnblockedUserEvent,
  UnfollowBatchRequest,
  UnfollowBatchResponse,
  UnfollowResponse,
  UnmuteChannelRequest,
  UnmuteRequest,
  UnmuteResponse,
  UnpinActivityResponse,
  UnpinRequest,
  UnpinResponse,
  UnreadCountsBatchRequest,
  UnreadCountsBatchResponse,
  UnreadCountsChannel,
  UnreadCountsChannelType,
  UnreadCountsResponse,
  UnreadCountsThread,
  UpdateActivityPartialRequest,
  UpdateActivityPartialResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  UpdateAppRequest,
  UpdateBlockListRequest,
  UpdateBlockListResponse,
  UpdateBookmarkFolderRequest,
  UpdateBookmarkFolderResponse,
  UpdateBookmarkRequest,
  UpdateBookmarkResponse,
  UpdateCallMembersRequest,
  UpdateCallMembersResponse,
  UpdateCallRequest,
  UpdateCallResponse,
  UpdateCallTypeRequest,
  UpdateCallTypeResponse,
  UpdateChannelPartialRequest,
  UpdateChannelPartialResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelTypeRequest,
  UpdateChannelTypeResponse,
  UpdateCommandRequest,
  UpdateCommandResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdateExternalStorageRequest,
  UpdateExternalStorageResponse,
  UpdateFeedGroupRequest,
  UpdateFeedGroupResponse,
  UpdateFeedMembersRequest,
  UpdateFeedMembersResponse,
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedViewRequest,
  UpdateFeedViewResponse,
  UpdateFeedVisibilityRequest,
  UpdateFeedVisibilityResponse,
  UpdateFollowRequest,
  UpdateFollowResponse,
  UpdateLiveLocationRequest,
  UpdateMemberPartialRequest,
  UpdateMemberPartialResponse,
  UpdateMembershipLevelRequest,
  UpdateMembershipLevelResponse,
  UpdateMessagePartialRequest,
  UpdateMessagePartialResponse,
  UpdateMessageRequest,
  UpdateMessageResponse,
  UpdatePollOptionRequest,
  UpdatePollPartialRequest,
  UpdatePollRequest,
  UpdateReminderRequest,
  UpdateReminderResponse,
  UpdateThreadPartialRequest,
  UpdateThreadPartialResponse,
  UpdateUserPartialRequest,
  UpdateUserPermissionsRequest,
  UpdateUserPermissionsResponse,
  UpdateUsersPartialRequest,
  UpdateUsersRequest,
  UpdateUsersResponse,
  UpdatedCallPermissionsEvent,
  UploadChannelFileRequest,
  UploadChannelFileResponse,
  UploadChannelRequest,
  UploadChannelResponse,
  UpsertActivitiesRequest,
  UpsertActivitiesResponse,
  UpsertConfigRequest,
  UpsertConfigResponse,
  UpsertModerationRuleRequest,
  UpsertModerationRuleResponse,
  UpsertModerationTemplateRequest,
  UpsertModerationTemplateResponse,
  UpsertPushPreferencesRequest,
  UpsertPushPreferencesResponse,
  UpsertPushProviderRequest,
  UpsertPushProviderResponse,
  UpsertPushTemplateRequest,
  UpsertPushTemplateResponse,
  User,
  UserBannedEvent,
  UserCreatedWithinParameters,
  UserCustomEventRequest,
  UserCustomPropertyParameters,
  UserDeactivatedEvent,
  UserDeletedEvent,
  UserFeedbackReport,
  UserFeedbackReportResponse,
  UserFeedbackResponse,
  UserFlaggedEvent,
  UserMessagesDeletedEvent,
  UserMute,
  UserMuteResponse,
  UserMutedEvent,
  UserRatingReportResponse,
  UserReactivatedEvent,
  UserRequest,
  UserResponse,
  UserResponseCommonFields,
  UserResponsePrivacyFields,
  UserRuleParameters,
  UserUnbannedEvent,
  UserUnmutedEvent,
  UserUnreadReminderEvent,
  UserUpdatedEvent,
  VelocityFilterConfig,
  VelocityFilterConfigRule,
  VideoCallRuleConfig,
  VideoContentParameters,
  VideoEndCallRequest,
  VideoKickUserRequest,
  VideoReactionOverTimeResponse,
  VideoReactionsResponse,
  VideoRuleParameters,
  VideoSettings,
  VideoSettingsRequest,
  VideoSettingsResponse,
  VoteData,
  WHIPIngress,
  WSEvent,
  WebhookEvent,
  WrappedUnreadCountsResponse,
  XiaomiConfig,
  XiaomiConfigFields,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class ModerationApi {
  constructor(public readonly apiClient: ApiClient) {}

  async ban(request: BanRequest): Promise<StreamResponse<BanResponse>> {
    const body = {
      target_user_id: request?.target_user_id,
      banned_by_id: request?.banned_by_id,
      channel_cid: request?.channel_cid,
      delete_messages: request?.delete_messages,
      ip_ban: request?.ip_ban,
      reason: request?.reason,
      shadow: request?.shadow,
      timeout: request?.timeout,
      banned_by: request?.banned_by,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BanResponse>
    >(
      'POST',
      '/api/v2/moderation/ban',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['BanResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async bulkImageModeration(
    request: BulkImageModerationRequest,
  ): Promise<StreamResponse<BulkImageModerationResponse>> {
    const body = {
      csv_file: request?.csv_file,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BulkImageModerationResponse>
    >(
      'POST',
      '/api/v2/moderation/bulk_image_moderation',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['BulkImageModerationResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async check(request: CheckRequest): Promise<StreamResponse<CheckResponse>> {
    const body = {
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      config_key: request?.config_key,
      config_team: request?.config_team,
      test_mode: request?.test_mode,
      user_id: request?.user_id,
      config: request?.config,
      moderation_payload: request?.moderation_payload,
      options: request?.options,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckResponse>
    >(
      'POST',
      '/api/v2/moderation/check',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['CheckResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertConfig(
    request: UpsertConfigRequest,
  ): Promise<StreamResponse<UpsertConfigResponse>> {
    const body = {
      key: request?.key,
      async: request?.async,
      team: request?.team,
      user_id: request?.user_id,
      ai_image_config: request?.ai_image_config,
      ai_text_config: request?.ai_text_config,
      ai_video_config: request?.ai_video_config,
      automod_platform_circumvention_config:
        request?.automod_platform_circumvention_config,
      automod_semantic_filters_config: request?.automod_semantic_filters_config,
      automod_toxicity_config: request?.automod_toxicity_config,
      aws_rekognition_config: request?.aws_rekognition_config,
      block_list_config: request?.block_list_config,
      bodyguard_config: request?.bodyguard_config,
      google_vision_config: request?.google_vision_config,
      llm_config: request?.llm_config,
      rule_builder_config: request?.rule_builder_config,
      user: request?.user,
      velocity_filter_config: request?.velocity_filter_config,
      video_call_rule_config: request?.video_call_rule_config,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertConfigResponse>
    >(
      'POST',
      '/api/v2/moderation/config',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['UpsertConfigResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteConfig(request: {
    key: string;
    team?: string;
  }): Promise<StreamResponse<DeleteModerationConfigResponse>> {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      key: request?.key,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteModerationConfigResponse>
    >('DELETE', '/api/v2/moderation/config/{key}', pathParams, queryParams);

    decoders['DeleteModerationConfigResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getConfig(request: {
    key: string;
    team?: string;
  }): Promise<StreamResponse<GetConfigResponse>> {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      key: request?.key,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetConfigResponse>
    >('GET', '/api/v2/moderation/config/{key}', pathParams, queryParams);

    decoders['GetConfigResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryModerationConfigs(
    request?: QueryModerationConfigsRequest,
  ): Promise<StreamResponse<QueryModerationConfigsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryModerationConfigsResponse>
    >(
      'POST',
      '/api/v2/moderation/configs',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryModerationConfigsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async customCheck(
    request: CustomCheckRequest,
  ): Promise<StreamResponse<CustomCheckResponse>> {
    const body = {
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      flags: request?.flags,
      entity_creator_id: request?.entity_creator_id,
      user_id: request?.user_id,
      moderation_payload: request?.moderation_payload,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CustomCheckResponse>
    >(
      'POST',
      '/api/v2/moderation/custom_check',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['CustomCheckResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async v2DeleteTemplate(): Promise<
    StreamResponse<DeleteModerationTemplateResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteModerationTemplateResponse>
    >(
      'DELETE',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
    );

    decoders['DeleteModerationTemplateResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async v2QueryTemplates(): Promise<
    StreamResponse<QueryFeedModerationTemplatesResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFeedModerationTemplatesResponse>
    >(
      'GET',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
    );

    decoders['QueryFeedModerationTemplatesResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async v2UpsertTemplate(
    request: UpsertModerationTemplateRequest,
  ): Promise<StreamResponse<UpsertModerationTemplateResponse>> {
    const body = {
      name: request?.name,
      config: request?.config,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertModerationTemplateResponse>
    >(
      'POST',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['UpsertModerationTemplateResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async flag(request: FlagRequest): Promise<StreamResponse<FlagResponse>> {
    const body = {
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      entity_creator_id: request?.entity_creator_id,
      reason: request?.reason,
      user_id: request?.user_id,
      custom: request?.custom,
      moderation_payload: request?.moderation_payload,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<FlagResponse>
    >(
      'POST',
      '/api/v2/moderation/flag',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['FlagResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryModerationFlags(
    request?: QueryModerationFlagsRequest,
  ): Promise<StreamResponse<QueryModerationFlagsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryModerationFlagsResponse>
    >(
      'POST',
      '/api/v2/moderation/flags',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryModerationFlagsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryModerationLogs(
    request?: QueryModerationLogsRequest,
  ): Promise<StreamResponse<QueryModerationLogsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryModerationLogsResponse>
    >(
      'POST',
      '/api/v2/moderation/logs',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryModerationLogsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertModerationRule(
    request: UpsertModerationRuleRequest,
  ): Promise<StreamResponse<UpsertModerationRuleResponse>> {
    const body = {
      name: request?.name,
      rule_type: request?.rule_type,
      action: request?.action,
      cooldown_period: request?.cooldown_period,
      description: request?.description,
      enabled: request?.enabled,
      logic: request?.logic,
      team: request?.team,
      conditions: request?.conditions,
      config_keys: request?.config_keys,
      groups: request?.groups,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertModerationRuleResponse>
    >(
      'POST',
      '/api/v2/moderation/moderation_rule',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['UpsertModerationRuleResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteModerationRule(): Promise<
    StreamResponse<DeleteModerationRuleResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteModerationRuleResponse>
    >(
      'DELETE',
      '/api/v2/moderation/moderation_rule/{id}',
      undefined,
      undefined,
    );

    decoders['DeleteModerationRuleResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getModerationRule(): Promise<
    StreamResponse<GetModerationRuleResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetModerationRuleResponse>
    >('GET', '/api/v2/moderation/moderation_rule/{id}', undefined, undefined);

    decoders['GetModerationRuleResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryModerationRules(
    request?: QueryModerationRulesRequest,
  ): Promise<StreamResponse<QueryModerationRulesResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryModerationRulesResponse>
    >(
      'POST',
      '/api/v2/moderation/moderation_rules',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryModerationRulesResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async mute(request: MuteRequest): Promise<StreamResponse<MuteResponse>> {
    const body = {
      target_ids: request?.target_ids,
      timeout: request?.timeout,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MuteResponse>
    >(
      'POST',
      '/api/v2/moderation/mute',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['MuteResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryReviewQueue(
    request?: QueryReviewQueueRequest,
  ): Promise<StreamResponse<QueryReviewQueueResponse>> {
    const body = {
      limit: request?.limit,
      lock_count: request?.lock_count,
      lock_duration: request?.lock_duration,
      lock_items: request?.lock_items,
      next: request?.next,
      prev: request?.prev,
      stats_only: request?.stats_only,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryReviewQueueResponse>
    >(
      'POST',
      '/api/v2/moderation/review_queue',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryReviewQueueResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getReviewQueueItem(request: {
    id: string;
  }): Promise<StreamResponse<GetReviewQueueItemResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetReviewQueueItemResponse>
    >('GET', '/api/v2/moderation/review_queue/{id}', pathParams, undefined);

    decoders['GetReviewQueueItemResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async submitAction(
    request: SubmitActionRequest,
  ): Promise<StreamResponse<SubmitActionResponse>> {
    const body = {
      action_type: request?.action_type,
      item_id: request?.item_id,
      user_id: request?.user_id,
      ban: request?.ban,
      custom: request?.custom,
      delete_activity: request?.delete_activity,
      delete_message: request?.delete_message,
      delete_reaction: request?.delete_reaction,
      delete_user: request?.delete_user,
      mark_reviewed: request?.mark_reviewed,
      unban: request?.unban,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SubmitActionResponse>
    >(
      'POST',
      '/api/v2/moderation/submit_action',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['SubmitActionResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unban(
    request: UnbanRequest & {
      target_user_id: string;
      channel_cid?: string;
      created_by?: string;
    },
  ): Promise<StreamResponse<UnbanResponse>> {
    const queryParams = {
      target_user_id: request?.target_user_id,
      channel_cid: request?.channel_cid,
      created_by: request?.created_by,
    };
    const body = {
      unbanned_by_id: request?.unbanned_by_id,
      unbanned_by: request?.unbanned_by,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnbanResponse>
    >(
      'POST',
      '/api/v2/moderation/unban',
      undefined,
      queryParams,
      body,
      'application/json',
    );

    decoders['UnbanResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unmute(
    request: UnmuteRequest,
  ): Promise<StreamResponse<UnmuteResponse>> {
    const body = {
      target_ids: request?.target_ids,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnmuteResponse>
    >(
      'POST',
      '/api/v2/moderation/unmute',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['UnmuteResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}

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

export class VideoApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getActiveCallsStatus(): Promise<
    StreamResponse<GetActiveCallsStatusResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetActiveCallsStatusResponse>
    >('GET', '/api/v2/video/active_calls_status', undefined, undefined);

    decoders['GetActiveCallsStatusResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryUserFeedback(
    request?: QueryUserFeedbackRequest & { full?: boolean },
  ): Promise<StreamResponse<QueryUserFeedbackResponse>> {
    const queryParams = {
      full: request?.full,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryUserFeedbackResponse>
    >(
      'POST',
      '/api/v2/video/call/feedback',
      undefined,
      queryParams,
      body,
      'application/json',
    );

    decoders['QueryUserFeedbackResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallMembers(
    request: QueryCallMembersRequest,
  ): Promise<StreamResponse<QueryCallMembersResponse>> {
    const body = {
      id: request?.id,
      type: request?.type,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallMembersResponse>
    >(
      'POST',
      '/api/v2/video/call/members',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryCallMembersResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallStats(
    request?: QueryCallStatsRequest,
  ): Promise<StreamResponse<QueryCallStatsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallStatsResponse>
    >(
      'POST',
      '/api/v2/video/call/stats',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryCallStatsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCall(request: {
    type: string;
    id: string;
    members_limit?: number;
    ring?: boolean;
    notify?: boolean;
    video?: boolean;
  }): Promise<StreamResponse<GetCallResponse>> {
    const queryParams = {
      members_limit: request?.members_limit,
      ring: request?.ring,
      notify: request?.notify,
      video: request?.video,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallResponse>
    >('GET', '/api/v2/video/call/{type}/{id}', pathParams, queryParams);

    decoders['GetCallResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCall(
    request: UpdateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      starts_at: request?.starts_at,
      custom: request?.custom,
      settings_override: request?.settings_override,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallResponse>
    >(
      'PATCH',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UpdateCallResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOrCreateCall(
    request: GetOrCreateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<GetOrCreateCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      members_limit: request?.members_limit,
      notify: request?.notify,
      ring: request?.ring,
      video: request?.video,
      data: request?.data,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['GetOrCreateCallResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async blockUser(
    request: BlockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<BlockUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BlockUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/block',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['BlockUserResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async sendClosedCaption(
    request: SendClosedCaptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendClosedCaptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      speaker_id: request?.speaker_id,
      text: request?.text,
      end_time: request?.end_time,
      language: request?.language,
      service: request?.service,
      start_time: request?.start_time,
      translated: request?.translated,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendClosedCaptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/closed_captions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['SendClosedCaptionResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCall(
    request: DeleteCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<DeleteCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hard: request?.hard,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/delete',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['DeleteCallResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async sendCallEvent(
    request: SendCallEventRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendCallEventResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendCallEventResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/event',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['SendCallEventResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async collectUserFeedback(
    request: CollectUserFeedbackRequest & { type: string; id: string },
  ): Promise<StreamResponse<CollectUserFeedbackResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      rating: request?.rating,
      sdk: request?.sdk,
      sdk_version: request?.sdk_version,
      reason: request?.reason,
      user_session_id: request?.user_session_id,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CollectUserFeedbackResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/feedback',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['CollectUserFeedbackResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async goLive(
    request: GoLiveRequest & { type: string; id: string },
  ): Promise<StreamResponse<GoLiveResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_storage_name: request?.recording_storage_name,
      start_closed_caption: request?.start_closed_caption,
      start_hls: request?.start_hls,
      start_recording: request?.start_recording,
      start_transcription: request?.start_transcription,
      transcription_storage_name: request?.transcription_storage_name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GoLiveResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/go_live',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['GoLiveResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async kickUser(
    request: KickUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<KickUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      block: request?.block,
      kicked_by_id: request?.kicked_by_id,
      kicked_by: request?.kicked_by,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<KickUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/kick',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['KickUserResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async endCall(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<EndCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<EndCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/mark_ended',
      pathParams,
      undefined,
    );

    decoders['EndCallResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCallMembers(
    request: UpdateCallMembersRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallMembersResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      remove_members: request?.remove_members,
      update_members: request?.update_members,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallMembersResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/members',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UpdateCallMembersResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async muteUsers(
    request: MuteUsersRequest & { type: string; id: string },
  ): Promise<StreamResponse<MuteUsersResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      audio: request?.audio,
      mute_all_users: request?.mute_all_users,
      muted_by_id: request?.muted_by_id,
      screenshare: request?.screenshare,
      screenshare_audio: request?.screenshare_audio,
      video: request?.video,
      user_ids: request?.user_ids,
      muted_by: request?.muted_by,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MuteUsersResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/mute_users',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['MuteUsersResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallParticipants(
    request: QueryCallParticipantsRequest & {
      id: string;
      type: string;
      limit?: number;
    },
  ): Promise<StreamResponse<QueryCallParticipantsResponse>> {
    const queryParams = {
      limit: request?.limit,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };
    const body = {
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallParticipantsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/participants',
      pathParams,
      queryParams,
      body,
      'application/json',
    );

    decoders['QueryCallParticipantsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async videoPin(
    request: PinRequest & { type: string; id: string },
  ): Promise<StreamResponse<PinResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PinResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/pin',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['PinResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listRecordings(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListRecordingsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListRecordingsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/recordings',
      pathParams,
      undefined,
    );

    decoders['ListRecordingsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallReport(request: {
    type: string;
    id: string;
    session_id?: string;
  }): Promise<StreamResponse<GetCallReportResponse>> {
    const queryParams = {
      session_id: request?.session_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallReportResponse>
    >('GET', '/api/v2/video/call/{type}/{id}/report', pathParams, queryParams);

    decoders['GetCallReportResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startRTMPBroadcasts(
    request: StartRTMPBroadcastsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      broadcasts: request?.broadcasts,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StartRTMPBroadcastsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopAllRTMPBroadcasts(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopAllRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopAllRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/stop',
      pathParams,
      undefined,
    );

    decoders['StopAllRTMPBroadcastsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopRTMPBroadcast(
    request: StopRTMPBroadcastsRequest & {
      type: string;
      id: string;
      name: string;
    },
  ): Promise<StreamResponse<StopRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      name: request?.name,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/{name}/stop',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StopRTMPBroadcastsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StartHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_broadcasting',
      pathParams,
      undefined,
    );

    decoders['StartHLSBroadcastingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startClosedCaptions(
    request: StartClosedCaptionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartClosedCaptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      enable_transcription: request?.enable_transcription,
      external_storage: request?.external_storage,
      language: request?.language,
      speech_segment_config: request?.speech_segment_config,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartClosedCaptionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_closed_captions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StartClosedCaptionsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startFrameRecording(
    request: StartFrameRecordingRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartFrameRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartFrameRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_frame_recording',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StartFrameRecordingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startRecording(
    request: StartRecordingRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_recording',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StartRecordingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startTranscription(
    request: StartTranscriptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      enable_closed_captions: request?.enable_closed_captions,
      language: request?.language,
      transcription_external_storage: request?.transcription_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_transcription',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StartTranscriptionResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_broadcasting',
      pathParams,
      undefined,
    );

    decoders['StopHLSBroadcastingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopClosedCaptions(
    request: StopClosedCaptionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopClosedCaptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      stop_transcription: request?.stop_transcription,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopClosedCaptionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_closed_captions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StopClosedCaptionsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopFrameRecording(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopFrameRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopFrameRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_frame_recording',
      pathParams,
      undefined,
    );

    decoders['StopFrameRecordingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopLive(
    request: StopLiveRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopLiveResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      continue_closed_caption: request?.continue_closed_caption,
      continue_hls: request?.continue_hls,
      continue_recording: request?.continue_recording,
      continue_rtmp_broadcasts: request?.continue_rtmp_broadcasts,
      continue_transcription: request?.continue_transcription,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopLiveResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_live',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StopLiveResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopRecording(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_recording',
      pathParams,
      undefined,
    );

    decoders['StopRecordingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopTranscription(
    request: StopTranscriptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      stop_closed_captions: request?.stop_closed_captions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_transcription',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['StopTranscriptionResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listTranscriptions(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListTranscriptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListTranscriptionsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/transcriptions',
      pathParams,
      undefined,
    );

    decoders['ListTranscriptionsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unblockUser(
    request: UnblockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnblockUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnblockUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/unblock',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UnblockUserResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async videoUnpin(
    request: UnpinRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnpinResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnpinResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/unpin',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UnpinResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateUserPermissions(
    request: UpdateUserPermissionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateUserPermissionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      grant_permissions: request?.grant_permissions,
      revoke_permissions: request?.revoke_permissions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateUserPermissionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/user_permissions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UpdateUserPermissionsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteRecording(request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteRecordingResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/recordings/{filename}',
      pathParams,
      undefined,
    );

    decoders['DeleteRecordingResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteTranscription(request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteTranscriptionResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/transcriptions/{filename}',
      pathParams,
      undefined,
    );

    decoders['DeleteTranscriptionResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallSessionParticipantStatsDetails(request: {
    call_type: string;
    call_id: string;
    session: string;
    user: string;
    user_session: string;
    since?: string;
    until?: string;
    max_points?: number;
  }): Promise<StreamResponse<GetCallSessionParticipantStatsDetailsResponse>> {
    const queryParams = {
      since: request?.since,
      until: request?.until,
      max_points: request?.max_points,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
      user: request?.user,
      user_session: request?.user_session,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallSessionParticipantStatsDetailsResponse>
    >(
      'GET',
      '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participant/{user}/{user_session}/details',
      pathParams,
      queryParams,
    );

    decoders['GetCallSessionParticipantStatsDetailsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallSessionParticipantStats(request: {
    call_type: string;
    call_id: string;
    session: string;
    sort?: Array<SortParamRequest>;
    filter_conditions?: Record<string, any>;
  }): Promise<StreamResponse<QueryCallSessionParticipantStatsResponse>> {
    const queryParams = {
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallSessionParticipantStatsResponse>
    >(
      'GET',
      '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participants',
      pathParams,
      queryParams,
    );

    decoders['QueryCallSessionParticipantStatsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallSessionParticipantStatsTimeline(request: {
    call_type: string;
    call_id: string;
    session: string;
    user: string;
    user_session: string;
    start_time?: string;
    end_time?: string;
    severity?: Array<string>;
  }): Promise<
    StreamResponse<QueryCallSessionParticipantStatsTimelineResponse>
  > {
    const queryParams = {
      start_time: request?.start_time,
      end_time: request?.end_time,
      severity: request?.severity,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
      user: request?.user,
      user_session: request?.user_session,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallSessionParticipantStatsTimelineResponse>
    >(
      'GET',
      '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participants/{user}/{user_session}/timeline',
      pathParams,
      queryParams,
    );

    decoders['QueryCallSessionParticipantStatsTimelineResponse']?.(
      response.body,
    );

    return { ...response.body, metadata: response.metadata };
  }

  async queryCalls(
    request?: QueryCallsRequest,
  ): Promise<StreamResponse<QueryCallsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallsResponse>
    >(
      'POST',
      '/api/v2/video/calls',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryCallsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listCallTypes(): Promise<StreamResponse<ListCallTypeResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListCallTypeResponse>
    >('GET', '/api/v2/video/calltypes', undefined, undefined);

    decoders['ListCallTypeResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createCallType(
    request: CreateCallTypeRequest,
  ): Promise<StreamResponse<CreateCallTypeResponse>> {
    const body = {
      name: request?.name,
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateCallTypeResponse>
    >(
      'POST',
      '/api/v2/video/calltypes',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['CreateCallTypeResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCallType(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallType(request: {
    name: string;
  }): Promise<StreamResponse<GetCallTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallTypeResponse>
    >('GET', '/api/v2/video/calltypes/{name}', pathParams, undefined);

    decoders['GetCallTypeResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCallType(
    request: UpdateCallTypeRequest & { name: string },
  ): Promise<StreamResponse<UpdateCallTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallTypeResponse>
    >(
      'PUT',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders['UpdateCallTypeResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getEdges(): Promise<StreamResponse<GetEdgesResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetEdgesResponse>
    >('GET', '/api/v2/video/edges', undefined, undefined);

    decoders['GetEdgesResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryAggregateCallStats(
    request?: QueryAggregateCallStatsRequest,
  ): Promise<StreamResponse<QueryAggregateCallStatsResponse>> {
    const body = {
      from: request?.from,
      to: request?.to,
      report_types: request?.report_types,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryAggregateCallStatsResponse>
    >(
      'POST',
      '/api/v2/video/stats',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders['QueryAggregateCallStatsResponse']?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}

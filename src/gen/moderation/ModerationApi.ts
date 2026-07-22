import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AnalyzeRequest,
  AnalyzeResponse,
  AppealRequest,
  AppealResponse,
  BanRequest,
  BulkActionAppealsRequest,
  BulkActionAppealsResponse,
  BulkDeleteActionConfigRequest,
  BulkDeleteActionConfigResponse,
  BulkImageModerationRequest,
  BulkImageModerationResponse,
  BulkUpsertActionConfigRequest,
  BulkUpsertActionConfigResponse,
  BypassRequest,
  BypassResponse,
  CheckRequest,
  CheckResponse,
  CheckS3AccessRequest,
  CheckS3AccessResponse,
  CreateQueueRequest,
  CustomCheckRequest,
  CustomCheckResponse,
  DeleteActionConfigResponse,
  DeleteModerationConfigResponse,
  DeleteModerationRuleResponse,
  DeleteModerationTemplateResponse,
  DeleteQueueRequest,
  FlagItemResponse,
  FlagRequest,
  GetActionConfigResponse,
  GetAppealResponse,
  GetConfigResponse,
  GetFlagCountRequest,
  GetFlagCountResponse,
  GetModerationRuleResponse,
  GetReviewQueueItemResponse,
  GetSetupSessionResponse,
  InsertActionLogRequest,
  InsertActionLogResponse,
  LabelsRequest,
  LabelsResponse,
  ListQueuesResponse,
  ModerationBanResponse,
  MuteRequest,
  MuteResponse,
  QueryAppealsRequest,
  QueryAppealsResponse,
  QueryFeedModerationTemplatesResponse,
  QueryLabelResultsRequest,
  QueryLabelResultsResponse,
  QueryModerationConfigsRequest,
  QueryModerationConfigsResponse,
  QueryModerationFlagsRequest,
  QueryModerationFlagsResponse,
  QueryModerationLogsRequest,
  QueryModerationLogsResponse,
  QueryModerationRulesRequest,
  QueryModerationRulesResponse,
  QueryReviewQueueRequest,
  QueryReviewQueueResponse,
  QueueResponse,
  SubmitActionRequest,
  SubmitActionResponse,
  SubmitModerationFeedbackRequest,
  SubmitModerationFeedbackResponse,
  UnbanRequest,
  UnbanResponse,
  UnmuteRequest,
  UnmuteResponse,
  UpdateQueueRequest,
  UpsertActionConfigRequest,
  UpsertActionConfigResponse,
  UpsertConfigRequest,
  UpsertConfigResponse,
  UpsertModerationRuleRequest,
  UpsertModerationRuleResponse,
  UpsertModerationTemplateRequest,
  UpsertModerationTemplateResponse,
  UpsertSetupSessionRequest,
  UpsertSetupSessionResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class ModerationApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getActionConfig(request?: {
    queue_type?: string;
    entity_type?: string;
    exclude_defaults?: boolean;
    only_defaults?: boolean;
    user_id?: string;
  }): Promise<StreamResponse<GetActionConfigResponse>> {
    const queryParams = {
      queue_type: request?.queue_type,
      entity_type: request?.entity_type,
      exclude_defaults: request?.exclude_defaults,
      only_defaults: request?.only_defaults,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetActionConfigResponse>
    >('GET', '/api/v2/moderation/action_config', undefined, queryParams);

    decoders.GetActionConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertActionConfig(
    request: UpsertActionConfigRequest,
  ): Promise<StreamResponse<UpsertActionConfigResponse>> {
    const body = {
      action: request?.action,
      entity_type: request?.entity_type,
      order: request?.order,
      description: request?.description,
      icon: request?.icon,
      id: request?.id,
      queue_type: request?.queue_type,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertActionConfigResponse>
    >(
      'POST',
      '/api/v2/moderation/action_config',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertActionConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async bulkUpsertActionConfig(
    request: BulkUpsertActionConfigRequest,
  ): Promise<StreamResponse<BulkUpsertActionConfigResponse>> {
    const body = {
      action_configs: request?.action_configs,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BulkUpsertActionConfigResponse>
    >(
      'POST',
      '/api/v2/moderation/action_config/bulk',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.BulkUpsertActionConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async bulkDeleteActionConfig(
    request: BulkDeleteActionConfigRequest,
  ): Promise<StreamResponse<BulkDeleteActionConfigResponse>> {
    const body = {
      ids: request?.ids,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BulkDeleteActionConfigResponse>
    >(
      'POST',
      '/api/v2/moderation/action_config/bulk_delete',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.BulkDeleteActionConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActionConfig(request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteActionConfigResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActionConfigResponse>
    >(
      'DELETE',
      '/api/v2/moderation/action_config/{id}',
      pathParams,
      queryParams,
    );

    decoders.DeleteActionConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async insertActionLog(
    request: InsertActionLogRequest,
  ): Promise<StreamResponse<InsertActionLogResponse>> {
    const body = {
      action_type: request?.action_type,
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      reason: request?.reason,
      reporter_type: request?.reporter_type,
      reporter_user_id: request?.reporter_user_id,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<InsertActionLogResponse>
    >(
      'POST',
      '/api/v2/moderation/action_logs',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.InsertActionLogResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async analyze(
    request?: AnalyzeRequest,
  ): Promise<StreamResponse<AnalyzeResponse>> {
    const body = {
      async_response: request?.async_response,
      config_key: request?.config_key,
      content_published_at: request?.content_published_at,
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      user_id: request?.user_id,
      content_ids: request?.content_ids,
      custom: request?.custom,
      texts: request?.texts,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AnalyzeResponse>
    >(
      'POST',
      '/api/v2/moderation/analyze',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AnalyzeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async appeal(
    request: AppealRequest,
  ): Promise<StreamResponse<AppealResponse>> {
    const body = {
      appeal_reason: request?.appeal_reason,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      review_queue_item_id: request?.review_queue_item_id,
      user_id: request?.user_id,
      attachments: request?.attachments,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AppealResponse>
    >(
      'POST',
      '/api/v2/moderation/appeal',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AppealResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getAppeal(request: {
    id: string;
  }): Promise<StreamResponse<GetAppealResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetAppealResponse>
    >('GET', '/api/v2/moderation/appeal/{id}', pathParams, undefined);

    decoders.GetAppealResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryAppeals(
    request?: QueryAppealsRequest,
  ): Promise<StreamResponse<QueryAppealsResponse>> {
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
      StreamResponse<QueryAppealsResponse>
    >(
      'POST',
      '/api/v2/moderation/appeals',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryAppealsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async bulkActionAppeals(
    request: BulkActionAppealsRequest,
  ): Promise<StreamResponse<BulkActionAppealsResponse>> {
    const body = {
      action_type: request?.action_type,
      appeal_ids: request?.appeal_ids,
      user_id: request?.user_id,
      mark_reviewed: request?.mark_reviewed,
      reject_appeal: request?.reject_appeal,
      restore: request?.restore,
      unban: request?.unban,
      unblock: request?.unblock,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BulkActionAppealsResponse>
    >(
      'POST',
      '/api/v2/moderation/appeals/bulk_action',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.BulkActionAppealsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async ban(
    request: BanRequest,
  ): Promise<StreamResponse<ModerationBanResponse>> {
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
      StreamResponse<ModerationBanResponse>
    >(
      'POST',
      '/api/v2/moderation/ban',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.ModerationBanResponse?.(response.body);

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

    decoders.BulkImageModerationResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async bypass(
    request: BypassRequest,
  ): Promise<StreamResponse<BypassResponse>> {
    const body = {
      enabled: request?.enabled,
      target_user_id: request?.target_user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BypassResponse>
    >(
      'POST',
      '/api/v2/moderation/bypass',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.BypassResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async check(request: CheckRequest): Promise<StreamResponse<CheckResponse>> {
    const body = {
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      config_key: request?.config_key,
      config_team: request?.config_team,
      content_published_at: request?.content_published_at,
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

    decoders.CheckResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async checkS3Access(
    request?: CheckS3AccessRequest,
  ): Promise<StreamResponse<CheckS3AccessResponse>> {
    const body = {
      s3_url: request?.s3_url,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckS3AccessResponse>
    >(
      'POST',
      '/api/v2/moderation/check_s3_access',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CheckS3AccessResponse?.(response.body);

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
      ai_audio_config: request?.ai_audio_config,
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
      flood_config: request?.flood_config,
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

    decoders.UpsertConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteConfig(request: {
    key: string;
    team?: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteModerationConfigResponse>> {
    const queryParams = {
      team: request?.team,
      user_id: request?.user_id,
    };
    const pathParams = {
      key: request?.key,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteModerationConfigResponse>
    >('DELETE', '/api/v2/moderation/config/{key}', pathParams, queryParams);

    decoders.DeleteModerationConfigResponse?.(response.body);

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

    decoders.GetConfigResponse?.(response.body);

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

    decoders.QueryModerationConfigsResponse?.(response.body);

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

    decoders.CustomCheckResponse?.(response.body);

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

    decoders.DeleteModerationTemplateResponse?.(response.body);

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

    decoders.QueryFeedModerationTemplatesResponse?.(response.body);

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

    decoders.UpsertModerationTemplateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async flag(request: FlagRequest): Promise<StreamResponse<FlagItemResponse>> {
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
      StreamResponse<FlagItemResponse>
    >(
      'POST',
      '/api/v2/moderation/flag',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.FlagItemResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getFlagCount(
    request: GetFlagCountRequest,
  ): Promise<StreamResponse<GetFlagCountResponse>> {
    const body = {
      entity_creator_id: request?.entity_creator_id,
      entity_type: request?.entity_type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFlagCountResponse>
    >(
      'POST',
      '/api/v2/moderation/flag_count',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.GetFlagCountResponse?.(response.body);

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

    decoders.QueryModerationFlagsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async labels(
    request: LabelsRequest,
  ): Promise<StreamResponse<LabelsResponse>> {
    const body = {
      content: request?.content,
      category: request?.category,
      content_id: request?.content_id,
      content_type: request?.content_type,
      dry_run: request?.dry_run,
      policy: request?.policy,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<LabelsResponse>
    >(
      'POST',
      '/api/v2/moderation/labels',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.LabelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryLabelResults(
    request?: QueryLabelResultsRequest,
  ): Promise<StreamResponse<QueryLabelResultsResponse>> {
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
      StreamResponse<QueryLabelResultsResponse>
    >(
      'POST',
      '/api/v2/moderation/labels/results',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryLabelResultsResponse?.(response.body);

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

    decoders.QueryModerationLogsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertModerationRule(
    request: UpsertModerationRuleRequest,
  ): Promise<StreamResponse<UpsertModerationRuleResponse>> {
    const body = {
      name: request?.name,
      rule_type: request?.rule_type,
      cooldown_period: request?.cooldown_period,
      description: request?.description,
      enabled: request?.enabled,
      logic: request?.logic,
      team: request?.team,
      user_id: request?.user_id,
      action_sequences: request?.action_sequences,
      conditions: request?.conditions,
      config_keys: request?.config_keys,
      groups: request?.groups,
      action: request?.action,
      user: request?.user,
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

    decoders.UpsertModerationRuleResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteModerationRule(request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteModerationRuleResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteModerationRuleResponse>
    >(
      'DELETE',
      '/api/v2/moderation/moderation_rule/{id}',
      pathParams,
      queryParams,
    );

    decoders.DeleteModerationRuleResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getModerationRule(request: {
    id: string;
  }): Promise<StreamResponse<GetModerationRuleResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetModerationRuleResponse>
    >('GET', '/api/v2/moderation/moderation_rule/{id}', pathParams, undefined);

    decoders.GetModerationRuleResponse?.(response.body);

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

    decoders.QueryModerationRulesResponse?.(response.body);

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

    decoders.MuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listQueues(): Promise<StreamResponse<ListQueuesResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListQueuesResponse>
    >('GET', '/api/v2/moderation/queues', undefined, undefined);

    decoders.ListQueuesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createQueue(
    request: CreateQueueRequest,
  ): Promise<StreamResponse<QueueResponse>> {
    const body = {
      name: request?.name,
      type: request?.type,
      description: request?.description,
      user_id: request?.user_id,
      sort: request?.sort,
      filters: request?.filters,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueueResponse>
    >(
      'POST',
      '/api/v2/moderation/queues',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueueResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getQueue(request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<QueueResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueueResponse>
    >('GET', '/api/v2/moderation/queues/{id}', pathParams, queryParams);

    decoders.QueueResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateQueue(
    request: UpdateQueueRequest & { id: string },
  ): Promise<StreamResponse<QueueResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      description: request?.description,
      name: request?.name,
      user_id: request?.user_id,
      sort: request?.sort,
      filters: request?.filters,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueueResponse>
    >(
      'PATCH',
      '/api/v2/moderation/queues/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueueResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteQueue(
    request: DeleteQueueRequest & { id: string },
  ): Promise<StreamResponse<QueueResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueueResponse>
    >(
      'POST',
      '/api/v2/moderation/queues/{id}/delete',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueueResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryReviewQueue(
    request?: QueryReviewQueueRequest,
  ): Promise<StreamResponse<QueryReviewQueueResponse>> {
    const body = {
      exclude_default_action_config: request?.exclude_default_action_config,
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

    decoders.QueryReviewQueueResponse?.(response.body);

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

    decoders.GetReviewQueueItemResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getSetupSession(): Promise<StreamResponse<GetSetupSessionResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetSetupSessionResponse>
    >('GET', '/api/v2/moderation/setup', undefined, undefined);

    decoders.GetSetupSessionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertSetupSession(
    request: UpsertSetupSessionRequest,
  ): Promise<StreamResponse<UpsertSetupSessionResponse>> {
    const body = {
      current_step: request?.current_step,
      status: request?.status,
      setup_data: request?.setup_data,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertSetupSessionResponse>
    >(
      'POST',
      '/api/v2/moderation/setup',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertSetupSessionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async submitAction(
    request: SubmitActionRequest,
  ): Promise<StreamResponse<SubmitActionResponse>> {
    const body = {
      action_type: request?.action_type,
      appeal_id: request?.appeal_id,
      item_id: request?.item_id,
      user_id: request?.user_id,
      ban: request?.ban,
      block: request?.block,
      bypass: request?.bypass,
      custom: request?.custom,
      delete_activity: request?.delete_activity,
      delete_comment: request?.delete_comment,
      delete_message: request?.delete_message,
      delete_reaction: request?.delete_reaction,
      delete_user: request?.delete_user,
      escalate: request?.escalate,
      flag: request?.flag,
      mark_reviewed: request?.mark_reviewed,
      reject_appeal: request?.reject_appeal,
      restore: request?.restore,
      shadow_block: request?.shadow_block,
      unban: request?.unban,
      unblock: request?.unblock,
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

    decoders.SubmitActionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async submitModerationFeedback(
    request: SubmitModerationFeedbackRequest,
  ): Promise<StreamResponse<SubmitModerationFeedbackResponse>> {
    const body = {
      message: request?.message,
      published_at: request?.published_at,
      reference: request?.reference,
      channel_id: request?.channel_id,
      current_recommended_action: request?.current_recommended_action,
      description: request?.description,
      expected_recommended_action: request?.expected_recommended_action,
      current_labels: request?.current_labels,
      expected_labels: request?.expected_labels,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SubmitModerationFeedbackResponse>
    >(
      'POST',
      '/api/v2/moderation/submit_moderation_feedback',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.SubmitModerationFeedbackResponse?.(response.body);

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

    decoders.UnbanResponse?.(response.body);

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

    decoders.UnmuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}

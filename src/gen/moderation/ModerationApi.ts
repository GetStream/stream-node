import { BaseApi } from '../../BaseApi';
import { StreamResponse } from '../../types';
import {
  BanRequest,
  BanResponse,
  CheckRequest,
  CheckResponse,
  CustomCheckRequest,
  CustomCheckResponse,
  DeleteModerationTemplateResponse,
  FlagRequest,
  FlagResponse,
  GetConfigResponse,
  GetReviewQueueItemResponse,
  GetUserModerationReportResponse,
  ModeratorStatsResponse,
  MuteRequest,
  MuteResponse,
  QueryFeedModerationTemplatesResponse,
  QueryModerationLogsRequest,
  QueryModerationLogsResponse,
  QueryReviewQueueRequest,
  QueryReviewQueueResponse,
  QueryUsageStatsRequest,
  QueryUsageStatsResponse,
  QueueStatsResponse,
  SubmitActionRequest,
  SubmitActionResponse,
  UnbanRequest,
  UnbanResponse,
  UnmuteRequest,
  UnmuteResponse,
  UpsertConfigRequest,
  UpsertConfigResponse,
  UpsertModerationTemplateRequest,
  UpsertModerationTemplateResponse,
} from '../models';
import { decoders } from '../model-decoders';

export class ModerationApi extends BaseApi {
  ban = async (request: BanRequest): Promise<StreamResponse<BanResponse>> => {
    const body = {
      target_user_id: request?.target_user_id,
      banned_by_id: request?.banned_by_id,
      channel_cid: request?.channel_cid,
      ip_ban: request?.ip_ban,
      reason: request?.reason,
      shadow: request?.shadow,
      timeout: request?.timeout,
      banned_by: request?.banned_by,
    };

    const response = await this.sendRequest<StreamResponse<BanResponse>>(
      'POST',
      '/api/v2/moderation/ban',
      undefined,
      undefined,
      body,
    );

    decoders.BanResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  check = async (
    request: CheckRequest,
  ): Promise<StreamResponse<CheckResponse>> => {
    const body = {
      config_key: request?.config_key,
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      user_id: request?.user_id,
      moderation_payload: request?.moderation_payload,
      options: request?.options,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<CheckResponse>>(
      'POST',
      '/api/v2/moderation/check',
      undefined,
      undefined,
      body,
    );

    decoders.CheckResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  upsertConfig = async (
    request: UpsertConfigRequest,
  ): Promise<StreamResponse<UpsertConfigResponse>> => {
    const body = {
      key: request?.key,
      async: request?.async,
      automod_platform_circumvention_config:
        request?.automod_platform_circumvention_config,
      automod_semantic_filters_config: request?.automod_semantic_filters_config,
      automod_toxicity_config: request?.automod_toxicity_config,
      aws_rek_og_nition_config: request?.aws_rek_og_nition_config,
      block_list_config: request?.block_list_config,
      bodyguard_config: request?.bodyguard_config,
      go_og_le_vision_config: request?.go_og_le_vision_config,
    };

    const response = await this.sendRequest<
      StreamResponse<UpsertConfigResponse>
    >('POST', '/api/v2/moderation/config', undefined, undefined, body);

    decoders.UpsertConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getConfig = async (request: {
    key: string;
  }): Promise<StreamResponse<GetConfigResponse>> => {
    const pathParams = {
      key: request?.key,
    };

    const response = await this.sendRequest<StreamResponse<GetConfigResponse>>(
      'GET',
      '/api/v2/moderation/config/{key}',
      pathParams,
      undefined,
    );

    decoders.GetConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  customCheck = async (
    request: CustomCheckRequest,
  ): Promise<StreamResponse<CustomCheckResponse>> => {
    const body = {
      entity_creator_id: request?.entity_creator_id,
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      name: request?.name,
      reason: request?.reason,
      recommended_action: request?.recommended_action,
      user_id: request?.user_id,
      moderation_payload: request?.moderation_payload,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<CustomCheckResponse>
    >('POST', '/api/v2/moderation/custom_check', undefined, undefined, body);

    decoders.CustomCheckResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  v2DeleteTemplate = async (): Promise<
    StreamResponse<DeleteModerationTemplateResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<DeleteModerationTemplateResponse>
    >(
      'DELETE',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
    );

    decoders.DeleteModerationTemplateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  v2QueryTemplates = async (): Promise<
    StreamResponse<QueryFeedModerationTemplatesResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<QueryFeedModerationTemplatesResponse>
    >(
      'GET',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
    );

    decoders.QueryFeedModerationTemplatesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  v2UpsertTemplate = async (
    request: UpsertModerationTemplateRequest,
  ): Promise<StreamResponse<UpsertModerationTemplateResponse>> => {
    const body = {
      name: request?.name,
      config: request?.config,
    };

    const response = await this.sendRequest<
      StreamResponse<UpsertModerationTemplateResponse>
    >(
      'POST',
      '/api/v2/moderation/feeds_moderation_template',
      undefined,
      undefined,
      body,
    );

    decoders.UpsertModerationTemplateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  flag = async (
    request: FlagRequest,
  ): Promise<StreamResponse<FlagResponse>> => {
    const body = {
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      reason: request?.reason,
      entity_creator_id: request?.entity_creator_id,
      user_id: request?.user_id,
      custom: request?.custom,
      moderation_payload: request?.moderation_payload,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<FlagResponse>>(
      'POST',
      '/api/v2/moderation/flag',
      undefined,
      undefined,
      body,
    );

    decoders.FlagResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryModerationLogs = async (
    request?: QueryModerationLogsRequest,
  ): Promise<StreamResponse<QueryModerationLogsResponse>> => {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryModerationLogsResponse>
    >('POST', '/api/v2/moderation/logs', undefined, undefined, body);

    decoders.QueryModerationLogsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getModeratorStats = async (): Promise<
    StreamResponse<ModeratorStatsResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<ModeratorStatsResponse>
    >('GET', '/api/v2/moderation/moderator_stats', undefined, undefined);

    decoders.ModeratorStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  mute = async (
    request: MuteRequest,
  ): Promise<StreamResponse<MuteResponse>> => {
    const body = {
      target_ids: request?.target_ids,
      timeout: request?.timeout,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<MuteResponse>>(
      'POST',
      '/api/v2/moderation/mute',
      undefined,
      undefined,
      body,
    );

    decoders.MuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getQueueStats = async (): Promise<StreamResponse<QueueStatsResponse>> => {
    const response = await this.sendRequest<StreamResponse<QueueStatsResponse>>(
      'GET',
      '/api/v2/moderation/queue_stats',
      undefined,
      undefined,
    );

    decoders.QueueStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryReviewQueue = async (
    request?: QueryReviewQueueRequest,
  ): Promise<StreamResponse<QueryReviewQueueResponse>> => {
    const body = {
      limit: request?.limit,
      lock_moderator_duration: request?.lock_moderator_duration,
      lock_moderator_id: request?.lock_moderator_id,
      next: request?.next,
      prev: request?.prev,
      stats_only: request?.stats_only,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryReviewQueueResponse>
    >('POST', '/api/v2/moderation/review_queue', undefined, undefined, body);

    decoders.QueryReviewQueueResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getReviewQueueItem = async (request: {
    id: string;
  }): Promise<StreamResponse<GetReviewQueueItemResponse>> => {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetReviewQueueItemResponse>
    >('GET', '/api/v2/moderation/review_queue/{id}', pathParams, undefined);

    decoders.GetReviewQueueItemResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  submitAction = async (
    request: SubmitActionRequest,
  ): Promise<StreamResponse<SubmitActionResponse>> => {
    const body = {
      action_type: request?.action_type,
      item_id: request?.item_id,
      user_id: request?.user_id,
      ban: request?.ban,
      custom: request?.custom,
      delete_message: request?.delete_message,
      delete_reaction: request?.delete_reaction,
      delete_user: request?.delete_user,
      unban: request?.unban,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<SubmitActionResponse>
    >('POST', '/api/v2/moderation/submit_action', undefined, undefined, body);

    decoders.SubmitActionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unban = async (
    request: UnbanRequest & {
      target_user_id: string;
      channel_cid?: string;
      created_by?: string;
    },
  ): Promise<StreamResponse<UnbanResponse>> => {
    const queryParams = {
      target_user_id: request?.target_user_id,
      channel_cid: request?.channel_cid,
      created_by: request?.created_by,
    };
    const body = {
      unbanned_by_id: request?.unbanned_by_id,
      unbanned_by: request?.unbanned_by,
    };

    const response = await this.sendRequest<StreamResponse<UnbanResponse>>(
      'POST',
      '/api/v2/moderation/unban',
      undefined,
      queryParams,
      body,
    );

    decoders.UnbanResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unmute = async (
    request: UnmuteRequest,
  ): Promise<StreamResponse<UnmuteResponse>> => {
    const body = {
      target_ids: request?.target_ids,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<UnmuteResponse>>(
      'POST',
      '/api/v2/moderation/unmute',
      undefined,
      undefined,
      body,
    );

    decoders.UnmuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryUsageStats = async (
    request?: QueryUsageStatsRequest,
  ): Promise<StreamResponse<QueryUsageStatsResponse>> => {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryUsageStatsResponse>
    >('POST', '/api/v2/moderation/usage_stats', undefined, undefined, body);

    decoders.QueryUsageStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getUserReport = async (request: {
    user_id: string;
    create_user_if_not_exists?: boolean;
    include_user_mutes?: boolean;
    include_user_blocks?: boolean;
  }): Promise<StreamResponse<GetUserModerationReportResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
      create_user_if_not_exists: request?.create_user_if_not_exists,
      include_user_mutes: request?.include_user_mutes,
      include_user_blocks: request?.include_user_blocks,
    };

    const response = await this.sendRequest<
      StreamResponse<GetUserModerationReportResponse>
    >('GET', '/api/v2/moderation/user_report', undefined, queryParams);

    decoders.GetUserModerationReportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };
}

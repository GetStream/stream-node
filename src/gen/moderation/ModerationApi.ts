import { BaseApi } from '../../BaseApi';
import { StreamResponse } from '../../types';
import {
  BanRequest,
  BanResponse,
  CheckRequest,
  CheckResponse,
  CustomCheckRequest,
  CustomCheckResponse,
  DeleteModerationConfigResponse,
  DeleteModerationTemplateResponse,
  FlagRequest,
  FlagResponse,
  GetConfigResponse,
  GetReviewQueueItemResponse,
  MuteRequest,
  MuteResponse,
  QueryFeedModerationTemplatesResponse,
  QueryModerationConfigsRequest,
  QueryModerationConfigsResponse,
  QueryModerationLogsRequest,
  QueryModerationLogsResponse,
  QueryReviewQueueRequest,
  QueryReviewQueueResponse,
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
      config_team: request?.config_team,
      test_mode: request?.test_mode,
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
      rule_builder_config: request?.rule_builder_config,
      user: request?.user,
      velocity_filter_config: request?.velocity_filter_config,
    };

    const response = await this.sendRequest<
      StreamResponse<UpsertConfigResponse>
    >('POST', '/api/v2/moderation/config', undefined, undefined, body);

    decoders.UpsertConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteConfig = async (request: {
    key: string;
    team?: string;
  }): Promise<StreamResponse<DeleteModerationConfigResponse>> => {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      key: request?.key,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteModerationConfigResponse>
    >('DELETE', '/api/v2/moderation/config/{key}', pathParams, queryParams);

    decoders.DeleteModerationConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getConfig = async (request: {
    key: string;
    team?: string;
  }): Promise<StreamResponse<GetConfigResponse>> => {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      key: request?.key,
    };

    const response = await this.sendRequest<StreamResponse<GetConfigResponse>>(
      'GET',
      '/api/v2/moderation/config/{key}',
      pathParams,
      queryParams,
    );

    decoders.GetConfigResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryModerationConfigs = async (
    request?: QueryModerationConfigsRequest,
  ): Promise<StreamResponse<QueryModerationConfigsResponse>> => {
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
      StreamResponse<QueryModerationConfigsResponse>
    >('POST', '/api/v2/moderation/configs', undefined, undefined, body);

    decoders.QueryModerationConfigsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  customCheck = async (
    request: CustomCheckRequest,
  ): Promise<StreamResponse<CustomCheckResponse>> => {
    const body = {
      entity_id: request?.entity_id,
      entity_type: request?.entity_type,
      flags: request?.flags,
      entity_creator_id: request?.entity_creator_id,
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
      entity_creator_id: request?.entity_creator_id,
      reason: request?.reason,
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

  queryReviewQueue = async (
    request?: QueryReviewQueueRequest,
  ): Promise<StreamResponse<QueryReviewQueueResponse>> => {
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
      delete_activity: request?.delete_activity,
      delete_message: request?.delete_message,
      delete_reaction: request?.delete_reaction,
      delete_user: request?.delete_user,
      mark_reviewed: request?.mark_reviewed,
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
}

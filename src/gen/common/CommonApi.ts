import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  BlockUsersRequest,
  BlockUsersResponse,
  CheckExternalStorageResponse,
  CheckPushRequest,
  CheckPushResponse,
  CheckSNSRequest,
  CheckSNSResponse,
  CheckSQSRequest,
  CheckSQSResponse,
  CreateBlockListRequest,
  CreateBlockListResponse,
  CreateDeviceRequest,
  CreateExternalStorageRequest,
  CreateExternalStorageResponse,
  CreateGuestRequest,
  CreateGuestResponse,
  CreateImportRequest,
  CreateImportResponse,
  CreateImportURLRequest,
  CreateImportURLResponse,
  CreatePollOptionRequest,
  CreatePollRequest,
  CreateRoleRequest,
  CreateRoleResponse,
  DeactivateUserRequest,
  DeactivateUserResponse,
  DeactivateUsersRequest,
  DeactivateUsersResponse,
  DeleteExternalStorageResponse,
  DeleteUsersRequest,
  DeleteUsersResponse,
  ExportUserResponse,
  ExportUsersRequest,
  ExportUsersResponse,
  FileUploadRequest,
  FileUploadResponse,
  GetApplicationResponse,
  GetBlockListResponse,
  GetBlockedUsersResponse,
  GetCustomPermissionResponse,
  GetImportResponse,
  GetOGResponse,
  GetPushTemplatesResponse,
  GetRateLimitsResponse,
  GetTaskResponse,
  ImageUploadRequest,
  ImageUploadResponse,
  ListBlockListResponse,
  ListDevicesResponse,
  ListExternalStorageResponse,
  ListImportsResponse,
  ListPermissionsResponse,
  ListPushProvidersResponse,
  ListRolesResponse,
  PollOptionResponse,
  PollResponse,
  PollVotesResponse,
  QueryPollVotesRequest,
  QueryPollsRequest,
  QueryPollsResponse,
  QueryUsersPayload,
  QueryUsersResponse,
  ReactivateUserRequest,
  ReactivateUserResponse,
  ReactivateUsersRequest,
  ReactivateUsersResponse,
  Response,
  RestoreUsersRequest,
  SharedLocationResponse,
  SharedLocationsResponse,
  UnblockUsersRequest,
  UnblockUsersResponse,
  UpdateAppRequest,
  UpdateBlockListRequest,
  UpdateBlockListResponse,
  UpdateExternalStorageRequest,
  UpdateExternalStorageResponse,
  UpdateLiveLocationRequest,
  UpdatePollOptionRequest,
  UpdatePollPartialRequest,
  UpdatePollRequest,
  UpdateUsersPartialRequest,
  UpdateUsersRequest,
  UpdateUsersResponse,
  UpsertPushPreferencesRequest,
  UpsertPushPreferencesResponse,
  UpsertPushProviderRequest,
  UpsertPushProviderResponse,
  UpsertPushTemplateRequest,
  UpsertPushTemplateResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class CommonApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getApp(): Promise<StreamResponse<GetApplicationResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetApplicationResponse>
    >('GET', '/api/v2/app', undefined, undefined);

    decoders.GetApplicationResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateApp(
    request?: UpdateAppRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      async_url_enrich_enabled: request?.async_url_enrich_enabled,
      auto_translation_enabled: request?.auto_translation_enabled,
      before_message_send_hook_url: request?.before_message_send_hook_url,
      cdn_expiration_seconds: request?.cdn_expiration_seconds,
      channel_hide_members_only: request?.channel_hide_members_only,
      custom_action_handler_url: request?.custom_action_handler_url,
      disable_auth_checks: request?.disable_auth_checks,
      disable_permissions_checks: request?.disable_permissions_checks,
      enforce_unique_usernames: request?.enforce_unique_usernames,
      feeds_moderation_enabled: request?.feeds_moderation_enabled,
      feeds_v2_region: request?.feeds_v2_region,
      guest_user_creation_disabled: request?.guest_user_creation_disabled,
      image_moderation_enabled: request?.image_moderation_enabled,
      max_aggregated_activities_length:
        request?.max_aggregated_activities_length,
      migrate_permissions_to_v2: request?.migrate_permissions_to_v2,
      moderation_enabled: request?.moderation_enabled,
      moderation_webhook_url: request?.moderation_webhook_url,
      multi_tenant_enabled: request?.multi_tenant_enabled,
      permission_version: request?.permission_version,
      reminders_interval: request?.reminders_interval,
      reminders_max_members: request?.reminders_max_members,
      revoke_tokens_issued_before: request?.revoke_tokens_issued_before,
      sns_key: request?.sns_key,
      sns_secret: request?.sns_secret,
      sns_topic_arn: request?.sns_topic_arn,
      sqs_key: request?.sqs_key,
      sqs_secret: request?.sqs_secret,
      sqs_url: request?.sqs_url,
      user_response_time_enabled: request?.user_response_time_enabled,
      webhook_url: request?.webhook_url,
      allowed_flag_reasons: request?.allowed_flag_reasons,
      event_hooks: request?.event_hooks,
      image_moderation_block_labels: request?.image_moderation_block_labels,
      image_moderation_labels: request?.image_moderation_labels,
      user_search_disallowed_roles: request?.user_search_disallowed_roles,
      webhook_events: request?.webhook_events,
      apn_config: request?.apn_config,
      async_moderation_config: request?.async_moderation_config,
      datadog_info: request?.datadog_info,
      file_upload_config: request?.file_upload_config,
      firebase_config: request?.firebase_config,
      grants: request?.grants,
      huawei_config: request?.huawei_config,
      image_upload_config: request?.image_upload_config,
      moderation_dashboard_preferences:
        request?.moderation_dashboard_preferences,
      push_config: request?.push_config,
      xiaomi_config: request?.xiaomi_config,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'PATCH',
      '/api/v2/app',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listBlockLists(request?: {
    team?: string;
  }): Promise<StreamResponse<ListBlockListResponse>> {
    const queryParams = {
      team: request?.team,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListBlockListResponse>
    >('GET', '/api/v2/blocklists', undefined, queryParams);

    decoders.ListBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createBlockList(
    request: CreateBlockListRequest,
  ): Promise<StreamResponse<CreateBlockListResponse>> {
    const body = {
      name: request?.name,
      words: request?.words,
      is_leet_check_enabled: request?.is_leet_check_enabled,
      is_plural_check_enabled: request?.is_plural_check_enabled,
      team: request?.team,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateBlockListResponse>
    >(
      'POST',
      '/api/v2/blocklists',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteBlockList(request: {
    name: string;
    team?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/blocklists/{name}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getBlockList(request: {
    name: string;
    team?: string;
  }): Promise<StreamResponse<GetBlockListResponse>> {
    const queryParams = {
      team: request?.team,
    };
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetBlockListResponse>
    >('GET', '/api/v2/blocklists/{name}', pathParams, queryParams);

    decoders.GetBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateBlockList(
    request: UpdateBlockListRequest & { name: string },
  ): Promise<StreamResponse<UpdateBlockListResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      is_leet_check_enabled: request?.is_leet_check_enabled,
      is_plural_check_enabled: request?.is_plural_check_enabled,
      team: request?.team,
      words: request?.words,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateBlockListResponse>
    >(
      'PUT',
      '/api/v2/blocklists/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async checkPush(
    request?: CheckPushRequest,
  ): Promise<StreamResponse<CheckPushResponse>> {
    const body = {
      apn_template: request?.apn_template,
      event_type: request?.event_type,
      firebase_data_template: request?.firebase_data_template,
      firebase_template: request?.firebase_template,
      message_id: request?.message_id,
      push_provider_name: request?.push_provider_name,
      push_provider_type: request?.push_provider_type,
      skip_devices: request?.skip_devices,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckPushResponse>
    >(
      'POST',
      '/api/v2/check_push',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CheckPushResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async checkSNS(
    request?: CheckSNSRequest,
  ): Promise<StreamResponse<CheckSNSResponse>> {
    const body = {
      sns_key: request?.sns_key,
      sns_secret: request?.sns_secret,
      sns_topic_arn: request?.sns_topic_arn,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckSNSResponse>
    >(
      'POST',
      '/api/v2/check_sns',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CheckSNSResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async checkSQS(
    request?: CheckSQSRequest,
  ): Promise<StreamResponse<CheckSQSResponse>> {
    const body = {
      sqs_key: request?.sqs_key,
      sqs_secret: request?.sqs_secret,
      sqs_url: request?.sqs_url,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckSQSResponse>
    >(
      'POST',
      '/api/v2/check_sqs',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CheckSQSResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteDevice(request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      id: request?.id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/devices',
      undefined,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listDevices(request?: {
    user_id?: string;
  }): Promise<StreamResponse<ListDevicesResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListDevicesResponse>
    >('GET', '/api/v2/devices', undefined, queryParams);

    decoders.ListDevicesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createDevice(
    request: CreateDeviceRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      id: request?.id,
      push_provider: request?.push_provider,
      push_provider_name: request?.push_provider_name,
      user_id: request?.user_id,
      voip_token: request?.voip_token,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/devices',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async exportUsers(
    request: ExportUsersRequest,
  ): Promise<StreamResponse<ExportUsersResponse>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ExportUsersResponse>
    >(
      'POST',
      '/api/v2/export/users',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.ExportUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listExternalStorage(): Promise<
    StreamResponse<ListExternalStorageResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListExternalStorageResponse>
    >('GET', '/api/v2/external_storage', undefined, undefined);

    decoders.ListExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createExternalStorage(
    request: CreateExternalStorageRequest,
  ): Promise<StreamResponse<CreateExternalStorageResponse>> {
    const body = {
      bucket: request?.bucket,
      name: request?.name,
      storage_type: request?.storage_type,
      gcs_credentials: request?.gcs_credentials,
      path: request?.path,
      aws_s3: request?.aws_s3,
      azure_blob: request?.azure_blob,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateExternalStorageResponse>
    >(
      'POST',
      '/api/v2/external_storage',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteExternalStorage(request: {
    name: string;
  }): Promise<StreamResponse<DeleteExternalStorageResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteExternalStorageResponse>
    >('DELETE', '/api/v2/external_storage/{name}', pathParams, undefined);

    decoders.DeleteExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateExternalStorage(
    request: UpdateExternalStorageRequest & { name: string },
  ): Promise<StreamResponse<UpdateExternalStorageResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      bucket: request?.bucket,
      storage_type: request?.storage_type,
      gcs_credentials: request?.gcs_credentials,
      path: request?.path,
      aws_s3: request?.aws_s3,
      azure_blob: request?.azure_blob,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateExternalStorageResponse>
    >(
      'PUT',
      '/api/v2/external_storage/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async checkExternalStorage(request: {
    name: string;
  }): Promise<StreamResponse<CheckExternalStorageResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CheckExternalStorageResponse>
    >('GET', '/api/v2/external_storage/{name}/check', pathParams, undefined);

    decoders.CheckExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createGuest(
    request: CreateGuestRequest,
  ): Promise<StreamResponse<CreateGuestResponse>> {
    const body = {
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateGuestResponse>
    >('POST', '/api/v2/guest', undefined, undefined, body, 'application/json');

    decoders.CreateGuestResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createImportURL(
    request?: CreateImportURLRequest,
  ): Promise<StreamResponse<CreateImportURLResponse>> {
    const body = {
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateImportURLResponse>
    >(
      'POST',
      '/api/v2/import_urls',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateImportURLResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listImports(): Promise<StreamResponse<ListImportsResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListImportsResponse>
    >('GET', '/api/v2/imports', undefined, undefined);

    decoders.ListImportsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createImport(
    request: CreateImportRequest,
  ): Promise<StreamResponse<CreateImportResponse>> {
    const body = {
      mode: request?.mode,
      path: request?.path,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateImportResponse>
    >(
      'POST',
      '/api/v2/imports',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateImportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getImport(request: {
    id: string;
  }): Promise<StreamResponse<GetImportResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetImportResponse>
    >('GET', '/api/v2/imports/{id}', pathParams, undefined);

    decoders.GetImportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOG(request: {
    url: string;
  }): Promise<StreamResponse<GetOGResponse>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOGResponse>
    >('GET', '/api/v2/og', undefined, queryParams);

    decoders.GetOGResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listPermissions(): Promise<StreamResponse<ListPermissionsResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListPermissionsResponse>
    >('GET', '/api/v2/permissions', undefined, undefined);

    decoders.ListPermissionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPermission(request: {
    id: string;
  }): Promise<StreamResponse<GetCustomPermissionResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCustomPermissionResponse>
    >('GET', '/api/v2/permissions/{id}', pathParams, undefined);

    decoders.GetCustomPermissionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createPoll(
    request: CreatePollRequest,
  ): Promise<StreamResponse<PollResponse>> {
    const body = {
      name: request?.name,
      allow_answers: request?.allow_answers,
      allow_user_suggested_options: request?.allow_user_suggested_options,
      description: request?.description,
      enforce_unique_vote: request?.enforce_unique_vote,
      id: request?.id,
      is_closed: request?.is_closed,
      max_votes_allowed: request?.max_votes_allowed,
      user_id: request?.user_id,
      voting_visibility: request?.voting_visibility,
      options: request?.options,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('POST', '/api/v2/polls', undefined, undefined, body, 'application/json');

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePoll(
    request: UpdatePollRequest,
  ): Promise<StreamResponse<PollResponse>> {
    const body = {
      id: request?.id,
      name: request?.name,
      allow_answers: request?.allow_answers,
      allow_user_suggested_options: request?.allow_user_suggested_options,
      description: request?.description,
      enforce_unique_vote: request?.enforce_unique_vote,
      is_closed: request?.is_closed,
      max_votes_allowed: request?.max_votes_allowed,
      user_id: request?.user_id,
      voting_visibility: request?.voting_visibility,
      options: request?.options,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('PUT', '/api/v2/polls', undefined, undefined, body, 'application/json');

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryPolls(
    request?: QueryPollsRequest & { user_id?: string },
  ): Promise<StreamResponse<QueryPollsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryPollsResponse>
    >(
      'POST',
      '/api/v2/polls/query',
      undefined,
      queryParams,
      body,
      'application/json',
    );

    decoders.QueryPollsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deletePoll(request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPoll(request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('GET', '/api/v2/polls/{poll_id}', pathParams, queryParams);

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePollPartial(
    request: UpdatePollPartialRequest & { poll_id: string },
  ): Promise<StreamResponse<PollResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >(
      'PATCH',
      '/api/v2/polls/{poll_id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createPollOption(
    request: CreatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      text: request?.text,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >(
      'POST',
      '/api/v2/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePollOption(
    request: UpdatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      id: request?.id,
      text: request?.text,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >(
      'PUT',
      '/api/v2/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deletePollOption(request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPollOption(request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollOptionResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >(
      'GET',
      '/api/v2/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryPollVotes(
    request: QueryPollVotesRequest & { poll_id: string; user_id?: string },
  ): Promise<StreamResponse<PollVotesResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVotesResponse>
    >(
      'POST',
      '/api/v2/polls/{poll_id}/votes',
      pathParams,
      queryParams,
      body,
      'application/json',
    );

    decoders.PollVotesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePushNotificationPreferences(
    request: UpsertPushPreferencesRequest,
  ): Promise<StreamResponse<UpsertPushPreferencesResponse>> {
    const body = {
      preferences: request?.preferences,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertPushPreferencesResponse>
    >(
      'POST',
      '/api/v2/push_preferences',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertPushPreferencesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listPushProviders(): Promise<
    StreamResponse<ListPushProvidersResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListPushProvidersResponse>
    >('GET', '/api/v2/push_providers', undefined, undefined);

    decoders.ListPushProvidersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertPushProvider(
    request?: UpsertPushProviderRequest,
  ): Promise<StreamResponse<UpsertPushProviderResponse>> {
    const body = {
      push_provider: request?.push_provider,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertPushProviderResponse>
    >(
      'POST',
      '/api/v2/push_providers',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertPushProviderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deletePushProvider(request: {
    type: string;
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      type: request?.type,
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/push_providers/{type}/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPushTemplates(request: {
    push_provider_type: string;
    push_provider_name?: string;
  }): Promise<StreamResponse<GetPushTemplatesResponse>> {
    const queryParams = {
      push_provider_type: request?.push_provider_type,
      push_provider_name: request?.push_provider_name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetPushTemplatesResponse>
    >('GET', '/api/v2/push_templates', undefined, queryParams);

    decoders.GetPushTemplatesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertPushTemplate(
    request: UpsertPushTemplateRequest,
  ): Promise<StreamResponse<UpsertPushTemplateResponse>> {
    const body = {
      event_type: request?.event_type,
      push_provider_type: request?.push_provider_type,
      enable_push: request?.enable_push,
      push_provider_name: request?.push_provider_name,
      template: request?.template,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertPushTemplateResponse>
    >(
      'POST',
      '/api/v2/push_templates',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertPushTemplateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getRateLimits(request?: {
    server_side?: boolean;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    endpoints?: string;
  }): Promise<StreamResponse<GetRateLimitsResponse>> {
    const queryParams = {
      server_side: request?.server_side,
      android: request?.android,
      ios: request?.ios,
      web: request?.web,
      endpoints: request?.endpoints,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetRateLimitsResponse>
    >('GET', '/api/v2/rate_limits', undefined, queryParams);

    decoders.GetRateLimitsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listRoles(): Promise<StreamResponse<ListRolesResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListRolesResponse>
    >('GET', '/api/v2/roles', undefined, undefined);

    decoders.ListRolesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createRole(
    request: CreateRoleRequest,
  ): Promise<StreamResponse<CreateRoleResponse>> {
    const body = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateRoleResponse>
    >('POST', '/api/v2/roles', undefined, undefined, body, 'application/json');

    decoders.CreateRoleResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteRole(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/roles/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getTask(request: {
    id: string;
  }): Promise<StreamResponse<GetTaskResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetTaskResponse>
    >('GET', '/api/v2/tasks/{id}', pathParams, undefined);

    decoders.GetTaskResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFile(request?: {
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/uploads/file',
      undefined,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async uploadFile(
    request?: FileUploadRequest,
  ): Promise<StreamResponse<FileUploadResponse>> {
    const body = {
      file: request?.file,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<FileUploadResponse>
    >(
      'POST',
      '/api/v2/uploads/file',
      undefined,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders.FileUploadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteImage(request?: {
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/uploads/image',
      undefined,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async uploadImage(
    request?: ImageUploadRequest,
  ): Promise<StreamResponse<ImageUploadResponse>> {
    const body = {
      file: request?.file,
      upload_sizes: request?.upload_sizes,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ImageUploadResponse>
    >(
      'POST',
      '/api/v2/uploads/image',
      undefined,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders.ImageUploadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryUsers(request?: {
    payload?: QueryUsersPayload;
  }): Promise<StreamResponse<QueryUsersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryUsersResponse>
    >('GET', '/api/v2/users', undefined, queryParams);

    decoders.QueryUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateUsersPartial(
    request: UpdateUsersPartialRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> {
    const body = {
      users: request?.users,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateUsersResponse>
    >('PATCH', '/api/v2/users', undefined, undefined, body, 'application/json');

    decoders.UpdateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateUsers(
    request: UpdateUsersRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> {
    const body = {
      users: request?.users,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateUsersResponse>
    >('POST', '/api/v2/users', undefined, undefined, body, 'application/json');

    decoders.UpdateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getBlockedUsers(request?: {
    user_id?: string;
  }): Promise<StreamResponse<GetBlockedUsersResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetBlockedUsersResponse>
    >('GET', '/api/v2/users/block', undefined, queryParams);

    decoders.GetBlockedUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async blockUsers(
    request: BlockUsersRequest,
  ): Promise<StreamResponse<BlockUsersResponse>> {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BlockUsersResponse>
    >(
      'POST',
      '/api/v2/users/block',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.BlockUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deactivateUsers(
    request: DeactivateUsersRequest,
  ): Promise<StreamResponse<DeactivateUsersResponse>> {
    const body = {
      user_ids: request?.user_ids,
      created_by_id: request?.created_by_id,
      mark_channels_deleted: request?.mark_channels_deleted,
      mark_messages_deleted: request?.mark_messages_deleted,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeactivateUsersResponse>
    >(
      'POST',
      '/api/v2/users/deactivate',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.DeactivateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteUsers(
    request: DeleteUsersRequest,
  ): Promise<StreamResponse<DeleteUsersResponse>> {
    const body = {
      user_ids: request?.user_ids,
      calls: request?.calls,
      conversations: request?.conversations,
      files: request?.files,
      messages: request?.messages,
      new_call_owner_id: request?.new_call_owner_id,
      new_channel_owner_id: request?.new_channel_owner_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteUsersResponse>
    >(
      'POST',
      '/api/v2/users/delete',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.DeleteUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getUserLiveLocations(request?: {
    user_id?: string;
  }): Promise<StreamResponse<SharedLocationsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SharedLocationsResponse>
    >('GET', '/api/v2/users/live_locations', undefined, queryParams);

    decoders.SharedLocationsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateLiveLocation(
    request: UpdateLiveLocationRequest & { user_id?: string },
  ): Promise<StreamResponse<SharedLocationResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const body = {
      message_id: request?.message_id,
      end_at: request?.end_at,
      latitude: request?.latitude,
      longitude: request?.longitude,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SharedLocationResponse>
    >(
      'PUT',
      '/api/v2/users/live_locations',
      undefined,
      queryParams,
      body,
      'application/json',
    );

    decoders.SharedLocationResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async reactivateUsers(
    request: ReactivateUsersRequest,
  ): Promise<StreamResponse<ReactivateUsersResponse>> {
    const body = {
      user_ids: request?.user_ids,
      created_by_id: request?.created_by_id,
      restore_channels: request?.restore_channels,
      restore_messages: request?.restore_messages,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ReactivateUsersResponse>
    >(
      'POST',
      '/api/v2/users/reactivate',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.ReactivateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async restoreUsers(
    request: RestoreUsersRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/users/restore',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unblockUsers(
    request: UnblockUsersRequest,
  ): Promise<StreamResponse<UnblockUsersResponse>> {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnblockUsersResponse>
    >(
      'POST',
      '/api/v2/users/unblock',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UnblockUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deactivateUser(
    request: DeactivateUserRequest & { user_id: string },
  ): Promise<StreamResponse<DeactivateUserResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      created_by_id: request?.created_by_id,
      mark_messages_deleted: request?.mark_messages_deleted,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeactivateUserResponse>
    >(
      'POST',
      '/api/v2/users/{user_id}/deactivate',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.DeactivateUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async exportUser(request: {
    user_id: string;
  }): Promise<StreamResponse<ExportUserResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ExportUserResponse>
    >('GET', '/api/v2/users/{user_id}/export', pathParams, undefined);

    decoders.ExportUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async reactivateUser(
    request: ReactivateUserRequest & { user_id: string },
  ): Promise<StreamResponse<ReactivateUserResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      created_by_id: request?.created_by_id,
      name: request?.name,
      restore_messages: request?.restore_messages,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ReactivateUserResponse>
    >(
      'POST',
      '/api/v2/users/{user_id}/reactivate',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ReactivateUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}

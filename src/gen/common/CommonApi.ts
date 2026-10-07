import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AddUserGroupMembersRequest,
  AddUserGroupMembersResponse,
  BlockUsersRequest,
  BlockUsersResponse,
  CancelImportV2TaskResponse,
  CheckExternalStorageResponse,
  CheckGCPPubSubRequest,
  CheckGCPPubSubResponse,
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
  CreateImportV2TaskRequest,
  CreateImportV2TaskResponse,
  CreatePermissionRequest,
  CreatePollOptionRequest,
  CreatePollRequest,
  CreateRoleRequest,
  CreateRoleResponse,
  CreateUserGroupRequest,
  CreateUserGroupResponse,
  DeactivateUserRequest,
  DeactivateUserResponse,
  DeactivateUsersRequest,
  DeactivateUsersResponse,
  DeleteExternalStorageResponse,
  DeleteImportV2TaskResponse,
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
  GetExternalStorageResponse,
  GetImportResponse,
  GetImportV2TaskResponse,
  GetOGResponse,
  GetPushTemplatesResponse,
  GetRateLimitsResponse,
  GetTaskResponse,
  GetUserGroupResponse,
  ImageUploadRequest,
  ImageUploadResponse,
  ImportBlockListRequest,
  ImportBlockListResponse,
  ListBlockListResponse,
  ListDevicesResponse,
  ListExternalStorageResponse,
  ListImportV2TasksResponse,
  ListImportsResponse,
  ListPermissionsResponse,
  ListPushProvidersResponse,
  ListRolesResponse,
  ListUserGroupsResponse,
  PermissionRequest,
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
  RemoveUserGroupMembersRequest,
  RemoveUserGroupMembersResponse,
  Response,
  RestoreUsersRequest,
  SearchRolesResponse,
  SearchUserGroupsResponse,
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
  UpdateUserGroupRequest,
  UpdateUserGroupResponse,
  UpdateUsersPartialRequest,
  UpdateUsersRequest,
  UpdateUsersResponse,
  UpsertExternalStorageRequest,
  UpsertExternalStorageResponse,
  UpsertPushPreferencesRequest,
  UpsertPushPreferencesResponse,
  UpsertPushProviderRequest,
  UpsertPushProviderResponse,
  UpsertPushTemplateRequest,
  UpsertPushTemplateResponse,
  ValidateExternalStorageResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class CommonApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getApp(): Promise<StreamResponse<GetApplicationResponse>> {
    const response = await this.apiClient.sendRequest<GetApplicationResponse>(
      'GET',
      '/api/v2/app',
      undefined,
      undefined,
    );

    decoders['GetApplicationResponse']?.(response);

    return response;
  }

  async updateApp(
    request?: UpdateAppRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      async_url_enrich_enabled: request?.async_url_enrich_enabled,
      auto_translation_enabled: request?.auto_translation_enabled,
      before_message_send_hook_attempt_timeout_ms:
        request?.before_message_send_hook_attempt_timeout_ms,
      before_message_send_hook_url: request?.before_message_send_hook_url,
      cdn_expiration_seconds: request?.cdn_expiration_seconds,
      channel_hide_members_only: request?.channel_hide_members_only,
      chat_primary_use_case: request?.chat_primary_use_case,
      custom_action_handler_url: request?.custom_action_handler_url,
      disable_auth_checks: request?.disable_auth_checks,
      disable_permissions_checks: request?.disable_permissions_checks,
      enable_hook_payload_compression: request?.enable_hook_payload_compression,
      enforce_unique_usernames: request?.enforce_unique_usernames,
      feed_audit_logs_enabled: request?.feed_audit_logs_enabled,
      feeds_moderation_enabled: request?.feeds_moderation_enabled,
      feeds_v2_region: request?.feeds_v2_region,
      guest_user_creation_disabled: request?.guest_user_creation_disabled,
      image_moderation_enabled: request?.image_moderation_enabled,
      max_aggregated_activities_length:
        request?.max_aggregated_activities_length,
      member_custom_on_mentioned_users_enabled:
        request?.member_custom_on_mentioned_users_enabled,
      member_custom_on_messages_enabled:
        request?.member_custom_on_messages_enabled,
      member_custom_on_typing_events_enabled:
        request?.member_custom_on_typing_events_enabled,
      migrate_permissions_to_v2: request?.migrate_permissions_to_v2,
      moderation_analytics_enabled: request?.moderation_analytics_enabled,
      moderation_enabled: request?.moderation_enabled,
      moderation_onboarding_complete: request?.moderation_onboarding_complete,
      moderation_s3_image_access_role_arn:
        request?.moderation_s3_image_access_role_arn,
      moderation_webhook_url: request?.moderation_webhook_url,
      multi_tenant_enabled: request?.multi_tenant_enabled,
      permission_version: request?.permission_version,
      reminders_interval: request?.reminders_interval,
      reminders_max_members: request?.reminders_max_members,
      reminders_max_per_user: request?.reminders_max_per_user,
      revoke_tokens_issued_before: request?.revoke_tokens_issued_before,
      sns_key: request?.sns_key,
      sns_secret: request?.sns_secret,
      sns_topic_arn: request?.sns_topic_arn,
      sqs_key: request?.sqs_key,
      sqs_secret: request?.sqs_secret,
      sqs_url: request?.sqs_url,
      user_response_time_enabled: request?.user_response_time_enabled,
      video_primary_use_case: request?.video_primary_use_case,
      webhook_url: request?.webhook_url,
      allowed_flag_reasons: request?.allowed_flag_reasons,
      event_hooks: request?.event_hooks,
      image_moderation_block_labels: request?.image_moderation_block_labels,
      image_moderation_labels: request?.image_moderation_labels,
      user_search_disallowed_roles: request?.user_search_disallowed_roles,
      webhook_events: request?.webhook_events,
      activity_metrics_config: request?.activity_metrics_config,
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

    const response = await this.apiClient.sendRequest<Response>(
      'PATCH',
      '/api/v2/app',
      undefined,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async listBlockLists(request?: {
    team?: string;
    cursor?: string;
    limit?: number;
  }): Promise<StreamResponse<ListBlockListResponse>> {
    const queryParams = {
      team: request?.team,
      cursor: request?.cursor,
      limit: request?.limit,
    };

    const response = await this.apiClient.sendRequest<ListBlockListResponse>(
      'GET',
      '/api/v2/blocklists',
      undefined,
      queryParams,
    );

    decoders['ListBlockListResponse']?.(response);

    return response;
  }

  async createBlockList(
    request: CreateBlockListRequest,
  ): Promise<StreamResponse<CreateBlockListResponse>> {
    const body = {
      name: request?.name,
      words: request?.words,
      is_confusable_folding_enabled: request?.is_confusable_folding_enabled,
      is_leet_check_enabled: request?.is_leet_check_enabled,
      is_plural_check_enabled: request?.is_plural_check_enabled,
      is_substring_matching_enabled: request?.is_substring_matching_enabled,
      team: request?.team,
      type: request?.type,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<CreateBlockListResponse>(
      'POST',
      '/api/v2/blocklists',
      undefined,
      undefined,
      body,
    );

    decoders['CreateBlockListResponse']?.(response);

    return response;
  }

  async importBlockList(
    request: ImportBlockListRequest & { id: string },
  ): Promise<StreamResponse<ImportBlockListResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      items: request?.items,
      chunk_size: request?.chunk_size,
    };

    const response = await this.apiClient.sendRequest<ImportBlockListResponse>(
      'POST',
      '/api/v2/blocklists/{id}/import',
      pathParams,
      undefined,
      body,
    );

    decoders['ImportBlockListResponse']?.(response);

    return response;
  }

  async deleteBlockList(request: {
    name: string;
    team?: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      team: request?.team,
      user_id: request?.user_id,
    };
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/blocklists/{name}',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<GetBlockListResponse>(
      'GET',
      '/api/v2/blocklists/{name}',
      pathParams,
      queryParams,
    );

    decoders['GetBlockListResponse']?.(response);

    return response;
  }

  async updateBlockList(
    request: UpdateBlockListRequest & { name: string },
  ): Promise<StreamResponse<UpdateBlockListResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      is_confusable_folding_enabled: request?.is_confusable_folding_enabled,
      is_leet_check_enabled: request?.is_leet_check_enabled,
      is_plural_check_enabled: request?.is_plural_check_enabled,
      is_substring_matching_enabled: request?.is_substring_matching_enabled,
      team: request?.team,
      user_id: request?.user_id,
      words: request?.words,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateBlockListResponse>(
      'PUT',
      '/api/v2/blocklists/{name}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateBlockListResponse']?.(response);

    return response;
  }

  async checkGCPPubSub(
    request?: CheckGCPPubSubRequest,
  ): Promise<StreamResponse<CheckGCPPubSubResponse>> {
    const body = {
      gcp_pubsub_event_based_ordering_key_enabled:
        request?.gcp_pubsub_event_based_ordering_key_enabled,
      gcp_pubsub_region: request?.gcp_pubsub_region,
      gcp_pubsub_topic: request?.gcp_pubsub_topic,
    };

    const response = await this.apiClient.sendRequest<CheckGCPPubSubResponse>(
      'POST',
      '/api/v2/check_gcp_pubsub',
      undefined,
      undefined,
      body,
    );

    decoders['CheckGCPPubSubResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<CheckPushResponse>(
      'POST',
      '/api/v2/check_push',
      undefined,
      undefined,
      body,
    );

    decoders['CheckPushResponse']?.(response);

    return response;
  }

  async checkSNS(
    request?: CheckSNSRequest,
  ): Promise<StreamResponse<CheckSNSResponse>> {
    const body = {
      sns_key: request?.sns_key,
      sns_secret: request?.sns_secret,
      sns_topic_arn: request?.sns_topic_arn,
    };

    const response = await this.apiClient.sendRequest<CheckSNSResponse>(
      'POST',
      '/api/v2/check_sns',
      undefined,
      undefined,
      body,
    );

    decoders['CheckSNSResponse']?.(response);

    return response;
  }

  async checkSQS(
    request?: CheckSQSRequest,
  ): Promise<StreamResponse<CheckSQSResponse>> {
    const body = {
      sqs_key: request?.sqs_key,
      sqs_secret: request?.sqs_secret,
      sqs_url: request?.sqs_url,
    };

    const response = await this.apiClient.sendRequest<CheckSQSResponse>(
      'POST',
      '/api/v2/check_sqs',
      undefined,
      undefined,
      body,
    );

    decoders['CheckSQSResponse']?.(response);

    return response;
  }

  async deleteDevice(request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      id: request?.id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/devices',
      undefined,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async listDevices(request?: {
    user_id?: string;
  }): Promise<StreamResponse<ListDevicesResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<ListDevicesResponse>(
      'GET',
      '/api/v2/devices',
      undefined,
      queryParams,
    );

    decoders['ListDevicesResponse']?.(response);

    return response;
  }

  async createDevice(
    request: CreateDeviceRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      id: request?.id,
      push_provider: request?.push_provider,
      hardware_id: request?.hardware_id,
      push_provider_name: request?.push_provider_name,
      user_id: request?.user_id,
      voip_token: request?.voip_token,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/devices',
      undefined,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async exportUsers(
    request: ExportUsersRequest,
  ): Promise<StreamResponse<ExportUsersResponse>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.apiClient.sendRequest<ExportUsersResponse>(
      'POST',
      '/api/v2/export/users',
      undefined,
      undefined,
      body,
    );

    decoders['ExportUsersResponse']?.(response);

    return response;
  }

  async listExternalStorage(): Promise<
    StreamResponse<ListExternalStorageResponse>
  > {
    const response =
      await this.apiClient.sendRequest<ListExternalStorageResponse>(
        'GET',
        '/api/v2/external_storage',
        undefined,
        undefined,
      );

    decoders['ListExternalStorageResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<CreateExternalStorageResponse>(
        'POST',
        '/api/v2/external_storage',
        undefined,
        undefined,
        body,
      );

    decoders['CreateExternalStorageResponse']?.(response);

    return response;
  }

  async deleteExternalStorage(request: {
    name: string;
  }): Promise<StreamResponse<DeleteExternalStorageResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response =
      await this.apiClient.sendRequest<DeleteExternalStorageResponse>(
        'DELETE',
        '/api/v2/external_storage/{name}',
        pathParams,
        undefined,
      );

    decoders['DeleteExternalStorageResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<UpdateExternalStorageResponse>(
        'PUT',
        '/api/v2/external_storage/{name}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateExternalStorageResponse']?.(response);

    return response;
  }

  async checkExternalStorage(request: {
    name: string;
  }): Promise<StreamResponse<CheckExternalStorageResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response =
      await this.apiClient.sendRequest<CheckExternalStorageResponse>(
        'GET',
        '/api/v2/external_storage/{name}/check',
        pathParams,
        undefined,
      );

    decoders['CheckExternalStorageResponse']?.(response);

    return response;
  }

  async createGuest(
    request: CreateGuestRequest,
  ): Promise<StreamResponse<CreateGuestResponse>> {
    const body = {
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<CreateGuestResponse>(
      'POST',
      '/api/v2/guest',
      undefined,
      undefined,
      body,
    );

    decoders['CreateGuestResponse']?.(response);

    return response;
  }

  async createImportURL(
    request?: CreateImportURLRequest,
  ): Promise<StreamResponse<CreateImportURLResponse>> {
    const body = {
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<CreateImportURLResponse>(
      'POST',
      '/api/v2/import_urls',
      undefined,
      undefined,
      body,
    );

    decoders['CreateImportURLResponse']?.(response);

    return response;
  }

  async listImports(): Promise<StreamResponse<ListImportsResponse>> {
    const response = await this.apiClient.sendRequest<ListImportsResponse>(
      'GET',
      '/api/v2/imports',
      undefined,
      undefined,
    );

    decoders['ListImportsResponse']?.(response);

    return response;
  }

  async createImport(
    request: CreateImportRequest,
  ): Promise<StreamResponse<CreateImportResponse>> {
    const body = {
      mode: request?.mode,
      path: request?.path,
      merge_custom: request?.merge_custom,
    };

    const response = await this.apiClient.sendRequest<CreateImportResponse>(
      'POST',
      '/api/v2/imports',
      undefined,
      undefined,
      body,
    );

    decoders['CreateImportResponse']?.(response);

    return response;
  }

  async listImportV2Tasks(request?: {
    state?: number;
  }): Promise<StreamResponse<ListImportV2TasksResponse>> {
    const queryParams = {
      state: request?.state,
    };

    const response =
      await this.apiClient.sendRequest<ListImportV2TasksResponse>(
        'GET',
        '/api/v2/imports/v2',
        undefined,
        queryParams,
      );

    decoders['ListImportV2TasksResponse']?.(response);

    return response;
  }

  async createImportV2Task(
    request: CreateImportV2TaskRequest,
  ): Promise<StreamResponse<CreateImportV2TaskResponse>> {
    const body = {
      product: request?.product,
      settings: request?.settings,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<CreateImportV2TaskResponse>(
        'POST',
        '/api/v2/imports/v2',
        undefined,
        undefined,
        body,
      );

    decoders['CreateImportV2TaskResponse']?.(response);

    return response;
  }

  async deleteImporterExternalStorage(): Promise<
    StreamResponse<DeleteExternalStorageResponse>
  > {
    const response =
      await this.apiClient.sendRequest<DeleteExternalStorageResponse>(
        'DELETE',
        '/api/v2/imports/v2/external-storage',
        undefined,
        undefined,
      );

    decoders['DeleteExternalStorageResponse']?.(response);

    return response;
  }

  async getImporterExternalStorage(): Promise<
    StreamResponse<GetExternalStorageResponse>
  > {
    const response =
      await this.apiClient.sendRequest<GetExternalStorageResponse>(
        'GET',
        '/api/v2/imports/v2/external-storage',
        undefined,
        undefined,
      );

    decoders['GetExternalStorageResponse']?.(response);

    return response;
  }

  async upsertImporterExternalStorage(
    request: UpsertExternalStorageRequest,
  ): Promise<StreamResponse<UpsertExternalStorageResponse>> {
    const body = {
      type: request?.type,
      aws_s3: request?.aws_s3,
      gcs: request?.gcs,
    };

    const response =
      await this.apiClient.sendRequest<UpsertExternalStorageResponse>(
        'PUT',
        '/api/v2/imports/v2/external-storage',
        undefined,
        undefined,
        body,
      );

    decoders['UpsertExternalStorageResponse']?.(response);

    return response;
  }

  async validateImporterExternalStorage(): Promise<
    StreamResponse<ValidateExternalStorageResponse>
  > {
    const response =
      await this.apiClient.sendRequest<ValidateExternalStorageResponse>(
        'POST',
        '/api/v2/imports/v2/external-storage/validate',
        undefined,
        undefined,
      );

    decoders['ValidateExternalStorageResponse']?.(response);

    return response;
  }

  async deleteImportV2Task(request: {
    id: string;
  }): Promise<StreamResponse<DeleteImportV2TaskResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<DeleteImportV2TaskResponse>(
        'DELETE',
        '/api/v2/imports/v2/{id}',
        pathParams,
        undefined,
      );

    decoders['DeleteImportV2TaskResponse']?.(response);

    return response;
  }

  async getImportV2Task(request: {
    id: string;
  }): Promise<StreamResponse<GetImportV2TaskResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetImportV2TaskResponse>(
      'GET',
      '/api/v2/imports/v2/{id}',
      pathParams,
      undefined,
    );

    decoders['GetImportV2TaskResponse']?.(response);

    return response;
  }

  async cancelImportV2Task(request: {
    id: string;
  }): Promise<StreamResponse<CancelImportV2TaskResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<CancelImportV2TaskResponse>(
        'POST',
        '/api/v2/imports/v2/{id}/cancel',
        pathParams,
        undefined,
      );

    decoders['CancelImportV2TaskResponse']?.(response);

    return response;
  }

  async getImport(request: {
    id: string;
  }): Promise<StreamResponse<GetImportResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetImportResponse>(
      'GET',
      '/api/v2/imports/{id}',
      pathParams,
      undefined,
    );

    decoders['GetImportResponse']?.(response);

    return response;
  }

  async getOG(request: {
    url: string;
  }): Promise<StreamResponse<GetOGResponse>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<GetOGResponse>(
      'GET',
      '/api/v2/og',
      undefined,
      queryParams,
    );

    decoders['GetOGResponse']?.(response);

    return response;
  }

  async listPermissions(): Promise<StreamResponse<ListPermissionsResponse>> {
    const response = await this.apiClient.sendRequest<ListPermissionsResponse>(
      'GET',
      '/api/v2/permissions',
      undefined,
      undefined,
    );

    decoders['ListPermissionsResponse']?.(response);

    return response;
  }

  async createPermission(
    request: CreatePermissionRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      action: request?.action,
      id: request?.id,
      name: request?.name,
      condition: request?.condition,
      description: request?.description,
      owner: request?.owner,
      same_team: request?.same_team,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/permissions',
      undefined,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async deletePermission(request: {
    id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/permissions/{id}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getPermission(request: {
    id: string;
  }): Promise<StreamResponse<GetCustomPermissionResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<GetCustomPermissionResponse>(
        'GET',
        '/api/v2/permissions/{id}',
        pathParams,
        undefined,
      );

    decoders['GetCustomPermissionResponse']?.(response);

    return response;
  }

  async updatePermission(
    request: PermissionRequest & { id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      action: request?.action,
      name: request?.name,
      condition: request?.condition,
      description: request?.description,
      owner: request?.owner,
      same_team: request?.same_team,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'PUT',
      '/api/v2/permissions/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
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
      team: request?.team,
      user_id: request?.user_id,
      voting_visibility: request?.voting_visibility,
      options: request?.options,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<PollResponse>(
      'POST',
      '/api/v2/polls',
      undefined,
      undefined,
      body,
    );

    decoders['PollResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollResponse>(
      'PUT',
      '/api/v2/polls',
      undefined,
      undefined,
      body,
    );

    decoders['PollResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<QueryPollsResponse>(
      'POST',
      '/api/v2/polls/query',
      undefined,
      queryParams,
      body,
    );

    decoders['QueryPollsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollResponse>(
      'GET',
      '/api/v2/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders['PollResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollResponse>(
      'PATCH',
      '/api/v2/polls/{poll_id}',
      pathParams,
      undefined,
      body,
    );

    decoders['PollResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollOptionResponse>(
      'POST',
      '/api/v2/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
    );

    decoders['PollOptionResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollOptionResponse>(
      'PUT',
      '/api/v2/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
    );

    decoders['PollOptionResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollOptionResponse>(
      'GET',
      '/api/v2/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders['PollOptionResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PollVotesResponse>(
      'POST',
      '/api/v2/polls/{poll_id}/votes',
      pathParams,
      queryParams,
      body,
    );

    decoders['PollVotesResponse']?.(response);

    return response;
  }

  async updatePushNotificationPreferences(
    request: UpsertPushPreferencesRequest,
  ): Promise<StreamResponse<UpsertPushPreferencesResponse>> {
    const body = {
      preferences: request?.preferences,
    };

    const response =
      await this.apiClient.sendRequest<UpsertPushPreferencesResponse>(
        'POST',
        '/api/v2/push_preferences',
        undefined,
        undefined,
        body,
      );

    decoders['UpsertPushPreferencesResponse']?.(response);

    return response;
  }

  async listPushProviders(): Promise<
    StreamResponse<ListPushProvidersResponse>
  > {
    const response =
      await this.apiClient.sendRequest<ListPushProvidersResponse>(
        'GET',
        '/api/v2/push_providers',
        undefined,
        undefined,
      );

    decoders['ListPushProvidersResponse']?.(response);

    return response;
  }

  async upsertPushProvider(
    request?: UpsertPushProviderRequest,
  ): Promise<StreamResponse<UpsertPushProviderResponse>> {
    const body = {
      push_provider: request?.push_provider,
    };

    const response =
      await this.apiClient.sendRequest<UpsertPushProviderResponse>(
        'POST',
        '/api/v2/push_providers',
        undefined,
        undefined,
        body,
      );

    decoders['UpsertPushProviderResponse']?.(response);

    return response;
  }

  async deletePushProvider(request: {
    type: string;
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      type: request?.type,
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/push_providers/{type}/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getPushTemplates(request: {
    push_provider_type: string;
    push_provider_name?: string;
  }): Promise<StreamResponse<GetPushTemplatesResponse>> {
    const queryParams = {
      push_provider_type: request?.push_provider_type,
      push_provider_name: request?.push_provider_name,
    };

    const response = await this.apiClient.sendRequest<GetPushTemplatesResponse>(
      'GET',
      '/api/v2/push_templates',
      undefined,
      queryParams,
    );

    decoders['GetPushTemplatesResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<UpsertPushTemplateResponse>(
        'POST',
        '/api/v2/push_templates',
        undefined,
        undefined,
        body,
      );

    decoders['UpsertPushTemplateResponse']?.(response);

    return response;
  }

  async getRateLimits(request?: {
    server_side?: boolean;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    unity?: boolean;
    unity_desktop?: boolean;
    unity_console?: boolean;
    endpoints?: string;
  }): Promise<StreamResponse<GetRateLimitsResponse>> {
    const queryParams = {
      server_side: request?.server_side,
      android: request?.android,
      ios: request?.ios,
      web: request?.web,
      unity: request?.unity,
      unity_desktop: request?.unity_desktop,
      unity_console: request?.unity_console,
      endpoints: request?.endpoints,
    };

    const response = await this.apiClient.sendRequest<GetRateLimitsResponse>(
      'GET',
      '/api/v2/rate_limits',
      undefined,
      queryParams,
    );

    decoders['GetRateLimitsResponse']?.(response);

    return response;
  }

  async listRoles(): Promise<StreamResponse<ListRolesResponse>> {
    const response = await this.apiClient.sendRequest<ListRolesResponse>(
      'GET',
      '/api/v2/roles',
      undefined,
      undefined,
    );

    decoders['ListRolesResponse']?.(response);

    return response;
  }

  async createRole(
    request: CreateRoleRequest,
  ): Promise<StreamResponse<CreateRoleResponse>> {
    const body = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<CreateRoleResponse>(
      'POST',
      '/api/v2/roles',
      undefined,
      undefined,
      body,
    );

    decoders['CreateRoleResponse']?.(response);

    return response;
  }

  async searchRoles(request: {
    query: string;
    limit?: number;
    name_gt?: string;
    role_type?: string;
    include_global_roles?: boolean;
  }): Promise<StreamResponse<SearchRolesResponse>> {
    const queryParams = {
      query: request?.query,
      limit: request?.limit,
      name_gt: request?.name_gt,
      role_type: request?.role_type,
      include_global_roles: request?.include_global_roles,
    };

    const response = await this.apiClient.sendRequest<SearchRolesResponse>(
      'GET',
      '/api/v2/roles/search',
      undefined,
      queryParams,
    );

    decoders['SearchRolesResponse']?.(response);

    return response;
  }

  async deleteRole(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/roles/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getTask(request: {
    id: string;
  }): Promise<StreamResponse<GetTaskResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetTaskResponse>(
      'GET',
      '/api/v2/tasks/{id}',
      pathParams,
      undefined,
    );

    decoders['GetTaskResponse']?.(response);

    return response;
  }

  async deleteFile(request?: {
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/uploads/file',
      undefined,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async uploadFile(
    request?: FileUploadRequest,
  ): Promise<StreamResponse<FileUploadResponse>> {
    const body = {
      file: request?.file,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<FileUploadResponse>(
      'POST',
      '/api/v2/uploads/file',
      undefined,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders['FileUploadResponse']?.(response);

    return response;
  }

  async deleteImage(request?: {
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/uploads/image',
      undefined,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async uploadImage(
    request?: ImageUploadRequest,
  ): Promise<StreamResponse<ImageUploadResponse>> {
    const body = {
      file: request?.file,
      upload_sizes: request?.upload_sizes,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<ImageUploadResponse>(
      'POST',
      '/api/v2/uploads/image',
      undefined,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders['ImageUploadResponse']?.(response);

    return response;
  }

  async listUserGroups(request?: {
    limit?: number;
    id_gt?: string;
    created_at_gt?: string;
    team_id?: string;
  }): Promise<StreamResponse<ListUserGroupsResponse>> {
    const queryParams = {
      limit: request?.limit,
      id_gt: request?.id_gt,
      created_at_gt: request?.created_at_gt,
      team_id: request?.team_id,
    };

    const response = await this.apiClient.sendRequest<ListUserGroupsResponse>(
      'GET',
      '/api/v2/usergroups',
      undefined,
      queryParams,
    );

    decoders['ListUserGroupsResponse']?.(response);

    return response;
  }

  async createUserGroup(
    request: CreateUserGroupRequest,
  ): Promise<StreamResponse<CreateUserGroupResponse>> {
    const body = {
      name: request?.name,
      description: request?.description,
      id: request?.id,
      team_id: request?.team_id,
      member_ids: request?.member_ids,
    };

    const response = await this.apiClient.sendRequest<CreateUserGroupResponse>(
      'POST',
      '/api/v2/usergroups',
      undefined,
      undefined,
      body,
    );

    decoders['CreateUserGroupResponse']?.(response);

    return response;
  }

  async searchUserGroups(request: {
    query: string;
    limit?: number;
    name_gt?: string;
    id_gt?: string;
    team_id?: string;
  }): Promise<StreamResponse<SearchUserGroupsResponse>> {
    const queryParams = {
      query: request?.query,
      limit: request?.limit,
      name_gt: request?.name_gt,
      id_gt: request?.id_gt,
      team_id: request?.team_id,
    };

    const response = await this.apiClient.sendRequest<SearchUserGroupsResponse>(
      'GET',
      '/api/v2/usergroups/search',
      undefined,
      queryParams,
    );

    decoders['SearchUserGroupsResponse']?.(response);

    return response;
  }

  async deleteUserGroup(request: {
    id: string;
    team_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      team_id: request?.team_id,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/usergroups/{id}',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getUserGroup(request: {
    id: string;
    team_id?: string;
  }): Promise<StreamResponse<GetUserGroupResponse>> {
    const queryParams = {
      team_id: request?.team_id,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetUserGroupResponse>(
      'GET',
      '/api/v2/usergroups/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetUserGroupResponse']?.(response);

    return response;
  }

  async updateUserGroup(
    request: UpdateUserGroupRequest & { id: string },
  ): Promise<StreamResponse<UpdateUserGroupResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      description: request?.description,
      name: request?.name,
      team_id: request?.team_id,
    };

    const response = await this.apiClient.sendRequest<UpdateUserGroupResponse>(
      'PUT',
      '/api/v2/usergroups/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateUserGroupResponse']?.(response);

    return response;
  }

  async addUserGroupMembers(
    request: AddUserGroupMembersRequest & { id: string },
  ): Promise<StreamResponse<AddUserGroupMembersResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      member_ids: request?.member_ids,
      as_admin: request?.as_admin,
      team_id: request?.team_id,
    };

    const response =
      await this.apiClient.sendRequest<AddUserGroupMembersResponse>(
        'POST',
        '/api/v2/usergroups/{id}/members',
        pathParams,
        undefined,
        body,
      );

    decoders['AddUserGroupMembersResponse']?.(response);

    return response;
  }

  async removeUserGroupMembers(
    request: RemoveUserGroupMembersRequest & { id: string },
  ): Promise<StreamResponse<RemoveUserGroupMembersResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      member_ids: request?.member_ids,
      team_id: request?.team_id,
    };

    const response =
      await this.apiClient.sendRequest<RemoveUserGroupMembersResponse>(
        'POST',
        '/api/v2/usergroups/{id}/members/delete',
        pathParams,
        undefined,
        body,
      );

    decoders['RemoveUserGroupMembersResponse']?.(response);

    return response;
  }

  async queryUsers(request?: {
    payload?: QueryUsersPayload;
  }): Promise<StreamResponse<QueryUsersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<QueryUsersResponse>(
      'GET',
      '/api/v2/users',
      undefined,
      queryParams,
    );

    decoders['QueryUsersResponse']?.(response);

    return response;
  }

  async updateUsersPartial(
    request: UpdateUsersPartialRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> {
    const body = {
      users: request?.users,
    };

    const response = await this.apiClient.sendRequest<UpdateUsersResponse>(
      'PATCH',
      '/api/v2/users',
      undefined,
      undefined,
      body,
    );

    decoders['UpdateUsersResponse']?.(response);

    return response;
  }

  async updateUsers(
    request: UpdateUsersRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> {
    const body = {
      users: request?.users,
    };

    const response = await this.apiClient.sendRequest<UpdateUsersResponse>(
      'POST',
      '/api/v2/users',
      undefined,
      undefined,
      body,
    );

    decoders['UpdateUsersResponse']?.(response);

    return response;
  }

  async getBlockedUsers(request?: {
    user_id?: string;
  }): Promise<StreamResponse<GetBlockedUsersResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<GetBlockedUsersResponse>(
      'GET',
      '/api/v2/users/block',
      undefined,
      queryParams,
    );

    decoders['GetBlockedUsersResponse']?.(response);

    return response;
  }

  async blockUsers(
    request: BlockUsersRequest,
  ): Promise<StreamResponse<BlockUsersResponse>> {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<BlockUsersResponse>(
      'POST',
      '/api/v2/users/block',
      undefined,
      undefined,
      body,
    );

    decoders['BlockUsersResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<DeactivateUsersResponse>(
      'POST',
      '/api/v2/users/deactivate',
      undefined,
      undefined,
      body,
    );

    decoders['DeactivateUsersResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<DeleteUsersResponse>(
      'POST',
      '/api/v2/users/delete',
      undefined,
      undefined,
      body,
    );

    decoders['DeleteUsersResponse']?.(response);

    return response;
  }

  async getUserLiveLocations(request?: {
    user_id?: string;
  }): Promise<StreamResponse<SharedLocationsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<SharedLocationsResponse>(
      'GET',
      '/api/v2/users/live_locations',
      undefined,
      queryParams,
    );

    decoders['SharedLocationsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<SharedLocationResponse>(
      'PUT',
      '/api/v2/users/live_locations',
      undefined,
      queryParams,
      body,
    );

    decoders['SharedLocationResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<ReactivateUsersResponse>(
      'POST',
      '/api/v2/users/reactivate',
      undefined,
      undefined,
      body,
    );

    decoders['ReactivateUsersResponse']?.(response);

    return response;
  }

  async restoreUsers(
    request: RestoreUsersRequest,
  ): Promise<StreamResponse<Response>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/users/restore',
      undefined,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async unblockUsers(
    request: UnblockUsersRequest,
  ): Promise<StreamResponse<UnblockUsersResponse>> {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UnblockUsersResponse>(
      'POST',
      '/api/v2/users/unblock',
      undefined,
      undefined,
      body,
    );

    decoders['UnblockUsersResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<DeactivateUserResponse>(
      'POST',
      '/api/v2/users/{user_id}/deactivate',
      pathParams,
      undefined,
      body,
    );

    decoders['DeactivateUserResponse']?.(response);

    return response;
  }

  async exportUser(request: {
    user_id: string;
  }): Promise<StreamResponse<ExportUserResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<ExportUserResponse>(
      'GET',
      '/api/v2/users/{user_id}/export',
      pathParams,
      undefined,
    );

    decoders['ExportUserResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<ReactivateUserResponse>(
      'POST',
      '/api/v2/users/{user_id}/reactivate',
      pathParams,
      undefined,
      body,
    );

    decoders['ReactivateUserResponse']?.(response);

    return response;
  }
}

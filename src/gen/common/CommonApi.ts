import { BaseApi } from '../../BaseApi';
import { StreamResponse } from '../../types';
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
  CreateDeviceRequest,
  CreateExternalStorageRequest,
  CreateExternalStorageResponse,
  CreateGuestRequest,
  CreateGuestResponse,
  CreateImportRequest,
  CreateImportResponse,
  CreateImportURLRequest,
  CreateImportURLResponse,
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
  GetApplicationResponse,
  GetBlockListResponse,
  GetBlockedUsersResponse,
  GetCustomPermissionResponse,
  GetImportResponse,
  GetOGResponse,
  GetRateLimitsResponse,
  GetTaskResponse,
  ListBlockListResponse,
  ListDevicesResponse,
  ListExternalStorageResponse,
  ListImportsResponse,
  ListPermissionsResponse,
  ListPushProvidersResponse,
  ListRolesResponse,
  QueryUsersPayload,
  QueryUsersResponse,
  ReactivateUserRequest,
  ReactivateUserResponse,
  ReactivateUsersRequest,
  ReactivateUsersResponse,
  Response,
  RestoreUsersRequest,
  UnblockUsersRequest,
  UnblockUsersResponse,
  UpdateAppRequest,
  UpdateBlockListRequest,
  UpdateExternalStorageRequest,
  UpdateExternalStorageResponse,
  UpdateUsersPartialRequest,
  UpdateUsersRequest,
  UpdateUsersResponse,
  UpsertPushProviderRequest,
  UpsertPushProviderResponse,
} from '../models';
import { decoders } from '../model-decoders';

export class CommonApi extends BaseApi {
  getApp = async (): Promise<StreamResponse<GetApplicationResponse>> => {
    const response = await this.sendRequest<
      StreamResponse<GetApplicationResponse>
    >('GET', '/api/v2/app', undefined, undefined);

    decoders.GetApplicationResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateApp = async (
    request?: UpdateAppRequest,
  ): Promise<StreamResponse<Response>> => {
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
      image_moderation_enabled: request?.image_moderation_enabled,
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
      video_provider: request?.video_provider,
      webhook_url: request?.webhook_url,
      allowed_flag_reasons: request?.allowed_flag_reasons,
      image_moderation_block_labels: request?.image_moderation_block_labels,
      image_moderation_labels: request?.image_moderation_labels,
      user_search_disallowed_roles: request?.user_search_disallowed_roles,
      webhook_events: request?.webhook_events,
      agora_options: request?.agora_options,
      apn_config: request?.apn_config,
      async_moderation_config: request?.async_moderation_config,
      datadog_info: request?.datadog_info,
      file_upload_config: request?.file_upload_config,
      firebase_config: request?.firebase_config,
      grants: request?.grants,
      hms_options: request?.hms_options,
      huawei_config: request?.huawei_config,
      image_upload_config: request?.image_upload_config,
      push_config: request?.push_config,
      xiaomi_config: request?.xiaomi_config,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'PATCH',
      '/api/v2/app',
      undefined,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listBlockLists = async (): Promise<StreamResponse<ListBlockListResponse>> => {
    const response = await this.sendRequest<
      StreamResponse<ListBlockListResponse>
    >('GET', '/api/v2/blocklists', undefined, undefined);

    decoders.ListBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createBlockList = async (
    request: CreateBlockListRequest,
  ): Promise<StreamResponse<Response>> => {
    const body = {
      name: request?.name,
      words: request?.words,
      type: request?.type,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/blocklists',
      undefined,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteBlockList = async (request: {
    name: string;
  }): Promise<StreamResponse<Response>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/blocklists/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getBlockList = async (request: {
    name: string;
  }): Promise<StreamResponse<GetBlockListResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<GetBlockListResponse>
    >('GET', '/api/v2/blocklists/{name}', pathParams, undefined);

    decoders.GetBlockListResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateBlockList = async (
    request: UpdateBlockListRequest & { name: string },
  ): Promise<StreamResponse<Response>> => {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      words: request?.words,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'PUT',
      '/api/v2/blocklists/{name}',
      pathParams,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  checkPush = async (
    request?: CheckPushRequest,
  ): Promise<StreamResponse<CheckPushResponse>> => {
    const body = {
      apn_template: request?.apn_template,
      firebase_data_template: request?.firebase_data_template,
      firebase_template: request?.firebase_template,
      message_id: request?.message_id,
      push_provider_name: request?.push_provider_name,
      push_provider_type: request?.push_provider_type,
      skip_devices: request?.skip_devices,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<CheckPushResponse>>(
      'POST',
      '/api/v2/check_push',
      undefined,
      undefined,
      body,
    );

    decoders.CheckPushResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  checkSNS = async (
    request?: CheckSNSRequest,
  ): Promise<StreamResponse<CheckSNSResponse>> => {
    const body = {
      sns_key: request?.sns_key,
      sns_secret: request?.sns_secret,
      sns_topic_arn: request?.sns_topic_arn,
    };

    const response = await this.sendRequest<StreamResponse<CheckSNSResponse>>(
      'POST',
      '/api/v2/check_sns',
      undefined,
      undefined,
      body,
    );

    decoders.CheckSNSResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  checkSQS = async (
    request?: CheckSQSRequest,
  ): Promise<StreamResponse<CheckSQSResponse>> => {
    const body = {
      sqs_key: request?.sqs_key,
      sqs_secret: request?.sqs_secret,
      sqs_url: request?.sqs_url,
    };

    const response = await this.sendRequest<StreamResponse<CheckSQSResponse>>(
      'POST',
      '/api/v2/check_sqs',
      undefined,
      undefined,
      body,
    );

    decoders.CheckSQSResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteDevice = async (request: {
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> => {
    const queryParams = {
      id: request?.id,
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/devices',
      undefined,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listDevices = async (request?: {
    user_id?: string;
  }): Promise<StreamResponse<ListDevicesResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<
      StreamResponse<ListDevicesResponse>
    >('GET', '/api/v2/devices', undefined, queryParams);

    decoders.ListDevicesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createDevice = async (
    request: CreateDeviceRequest,
  ): Promise<StreamResponse<Response>> => {
    const body = {
      id: request?.id,
      push_provider: request?.push_provider,
      push_provider_name: request?.push_provider_name,
      user_id: request?.user_id,
      voip_token: request?.voip_token,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/devices',
      undefined,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  exportUsers = async (
    request: ExportUsersRequest,
  ): Promise<StreamResponse<ExportUsersResponse>> => {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.sendRequest<
      StreamResponse<ExportUsersResponse>
    >('POST', '/api/v2/export/users', undefined, undefined, body);

    decoders.ExportUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listExternalStorage = async (): Promise<
    StreamResponse<ListExternalStorageResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<ListExternalStorageResponse>
    >('GET', '/api/v2/external_storage', undefined, undefined);

    decoders.ListExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createExternalStorage = async (
    request: CreateExternalStorageRequest,
  ): Promise<StreamResponse<CreateExternalStorageResponse>> => {
    const body = {
      bucket: request?.bucket,
      name: request?.name,
      storage_type: request?.storage_type,
      gcs_credentials: request?.gcs_credentials,
      path: request?.path,
      aws_s3: request?.aws_s3,
      azure_blob: request?.azure_blob,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateExternalStorageResponse>
    >('POST', '/api/v2/external_storage', undefined, undefined, body);

    decoders.CreateExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteExternalStorage = async (request: {
    name: string;
  }): Promise<StreamResponse<DeleteExternalStorageResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteExternalStorageResponse>
    >('DELETE', '/api/v2/external_storage/{name}', pathParams, undefined);

    decoders.DeleteExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateExternalStorage = async (
    request: UpdateExternalStorageRequest & { name: string },
  ): Promise<StreamResponse<UpdateExternalStorageResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<UpdateExternalStorageResponse>
    >('PUT', '/api/v2/external_storage/{name}', pathParams, undefined, body);

    decoders.UpdateExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  checkExternalStorage = async (request: {
    name: string;
  }): Promise<StreamResponse<CheckExternalStorageResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<CheckExternalStorageResponse>
    >('GET', '/api/v2/external_storage/{name}/check', pathParams, undefined);

    decoders.CheckExternalStorageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createGuest = async (
    request: CreateGuestRequest,
  ): Promise<StreamResponse<CreateGuestResponse>> => {
    const body = {
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateGuestResponse>
    >('POST', '/api/v2/guest', undefined, undefined, body);

    decoders.CreateGuestResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createImportURL = async (
    request?: CreateImportURLRequest,
  ): Promise<StreamResponse<CreateImportURLResponse>> => {
    const body = {
      filename: request?.filename,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateImportURLResponse>
    >('POST', '/api/v2/import_urls', undefined, undefined, body);

    decoders.CreateImportURLResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listImports = async (): Promise<StreamResponse<ListImportsResponse>> => {
    const response = await this.sendRequest<
      StreamResponse<ListImportsResponse>
    >('GET', '/api/v2/imports', undefined, undefined);

    decoders.ListImportsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createImport = async (
    request: CreateImportRequest,
  ): Promise<StreamResponse<CreateImportResponse>> => {
    const body = {
      mode: request?.mode,
      path: request?.path,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateImportResponse>
    >('POST', '/api/v2/imports', undefined, undefined, body);

    decoders.CreateImportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getImport = async (request: {
    id: string;
  }): Promise<StreamResponse<GetImportResponse>> => {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<GetImportResponse>>(
      'GET',
      '/api/v2/imports/{id}',
      pathParams,
      undefined,
    );

    decoders.GetImportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getOG = async (request: {
    url: string;
  }): Promise<StreamResponse<GetOGResponse>> => {
    const queryParams = {
      url: request?.url,
    };

    const response = await this.sendRequest<StreamResponse<GetOGResponse>>(
      'GET',
      '/api/v2/og',
      undefined,
      queryParams,
    );

    decoders.GetOGResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listPermissions = async (): Promise<
    StreamResponse<ListPermissionsResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<ListPermissionsResponse>
    >('GET', '/api/v2/permissions', undefined, undefined);

    decoders.ListPermissionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getPermission = async (request: {
    id: string;
  }): Promise<StreamResponse<GetCustomPermissionResponse>> => {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetCustomPermissionResponse>
    >('GET', '/api/v2/permissions/{id}', pathParams, undefined);

    decoders.GetCustomPermissionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listPushProviders = async (): Promise<
    StreamResponse<ListPushProvidersResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<ListPushProvidersResponse>
    >('GET', '/api/v2/push_providers', undefined, undefined);

    decoders.ListPushProvidersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  upsertPushProvider = async (
    request?: UpsertPushProviderRequest,
  ): Promise<StreamResponse<UpsertPushProviderResponse>> => {
    const body = {
      push_provider: request?.push_provider,
    };

    const response = await this.sendRequest<
      StreamResponse<UpsertPushProviderResponse>
    >('POST', '/api/v2/push_providers', undefined, undefined, body);

    decoders.UpsertPushProviderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deletePushProvider = async (request: {
    type: string;
    name: string;
  }): Promise<StreamResponse<Response>> => {
    const pathParams = {
      type: request?.type,
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/push_providers/{type}/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getRateLimits = async (request?: {
    server_side?: boolean;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    endpoints?: string;
  }): Promise<StreamResponse<GetRateLimitsResponse>> => {
    const queryParams = {
      server_side: request?.server_side,
      android: request?.android,
      ios: request?.ios,
      web: request?.web,
      endpoints: request?.endpoints,
    };

    const response = await this.sendRequest<
      StreamResponse<GetRateLimitsResponse>
    >('GET', '/api/v2/rate_limits', undefined, queryParams);

    decoders.GetRateLimitsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listRoles = async (): Promise<StreamResponse<ListRolesResponse>> => {
    const response = await this.sendRequest<StreamResponse<ListRolesResponse>>(
      'GET',
      '/api/v2/roles',
      undefined,
      undefined,
    );

    decoders.ListRolesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createRole = async (
    request: CreateRoleRequest,
  ): Promise<StreamResponse<CreateRoleResponse>> => {
    const body = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<CreateRoleResponse>>(
      'POST',
      '/api/v2/roles',
      undefined,
      undefined,
      body,
    );

    decoders.CreateRoleResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteRole = async (request: {
    name: string;
  }): Promise<StreamResponse<Response>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/roles/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getTask = async (request: {
    id: string;
  }): Promise<StreamResponse<GetTaskResponse>> => {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<GetTaskResponse>>(
      'GET',
      '/api/v2/tasks/{id}',
      pathParams,
      undefined,
    );

    decoders.GetTaskResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryUsers = async (request?: {
    payload?: QueryUsersPayload;
  }): Promise<StreamResponse<QueryUsersResponse>> => {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.sendRequest<StreamResponse<QueryUsersResponse>>(
      'GET',
      '/api/v2/users',
      undefined,
      queryParams,
    );

    decoders.QueryUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateUsersPartial = async (
    request: UpdateUsersPartialRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> => {
    const body = {
      users: request?.users,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateUsersResponse>
    >('PATCH', '/api/v2/users', undefined, undefined, body);

    decoders.UpdateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateUsers = async (
    request: UpdateUsersRequest,
  ): Promise<StreamResponse<UpdateUsersResponse>> => {
    const body = {
      users: request?.users,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateUsersResponse>
    >('POST', '/api/v2/users', undefined, undefined, body);

    decoders.UpdateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getBlockedUsers = async (request?: {
    user_id?: string;
  }): Promise<StreamResponse<GetBlockedUsersResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetBlockedUsersResponse>
    >('GET', '/api/v2/users/block', undefined, queryParams);

    decoders.GetBlockedUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  blockUsers = async (
    request: BlockUsersRequest,
  ): Promise<StreamResponse<BlockUsersResponse>> => {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<BlockUsersResponse>>(
      'POST',
      '/api/v2/users/block',
      undefined,
      undefined,
      body,
    );

    decoders.BlockUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deactivateUsers = async (
    request: DeactivateUsersRequest,
  ): Promise<StreamResponse<DeactivateUsersResponse>> => {
    const body = {
      user_ids: request?.user_ids,
      created_by_id: request?.created_by_id,
      mark_channels_deleted: request?.mark_channels_deleted,
      mark_messages_deleted: request?.mark_messages_deleted,
    };

    const response = await this.sendRequest<
      StreamResponse<DeactivateUsersResponse>
    >('POST', '/api/v2/users/deactivate', undefined, undefined, body);

    decoders.DeactivateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteUsers = async (
    request: DeleteUsersRequest,
  ): Promise<StreamResponse<DeleteUsersResponse>> => {
    const body = {
      user_ids: request?.user_ids,
      calls: request?.calls,
      conversations: request?.conversations,
      messages: request?.messages,
      new_call_owner_id: request?.new_call_owner_id,
      new_channel_owner_id: request?.new_channel_owner_id,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteUsersResponse>
    >('POST', '/api/v2/users/delete', undefined, undefined, body);

    decoders.DeleteUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  reactivateUsers = async (
    request: ReactivateUsersRequest,
  ): Promise<StreamResponse<ReactivateUsersResponse>> => {
    const body = {
      user_ids: request?.user_ids,
      created_by_id: request?.created_by_id,
      restore_channels: request?.restore_channels,
      restore_messages: request?.restore_messages,
    };

    const response = await this.sendRequest<
      StreamResponse<ReactivateUsersResponse>
    >('POST', '/api/v2/users/reactivate', undefined, undefined, body);

    decoders.ReactivateUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  restoreUsers = async (
    request: RestoreUsersRequest,
  ): Promise<StreamResponse<Response>> => {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/users/restore',
      undefined,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unblockUsers = async (
    request: UnblockUsersRequest,
  ): Promise<StreamResponse<UnblockUsersResponse>> => {
    const body = {
      blocked_user_id: request?.blocked_user_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<UnblockUsersResponse>
    >('POST', '/api/v2/users/unblock', undefined, undefined, body);

    decoders.UnblockUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deactivateUser = async (
    request: DeactivateUserRequest & { user_id: string },
  ): Promise<StreamResponse<DeactivateUserResponse>> => {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      created_by_id: request?.created_by_id,
      mark_messages_deleted: request?.mark_messages_deleted,
    };

    const response = await this.sendRequest<
      StreamResponse<DeactivateUserResponse>
    >(
      'POST',
      '/api/v2/users/{user_id}/deactivate',
      pathParams,
      undefined,
      body,
    );

    decoders.DeactivateUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  exportUser = async (request: {
    user_id: string;
  }): Promise<StreamResponse<ExportUserResponse>> => {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<StreamResponse<ExportUserResponse>>(
      'GET',
      '/api/v2/users/{user_id}/export',
      pathParams,
      undefined,
    );

    decoders.ExportUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  reactivateUser = async (
    request: ReactivateUserRequest & { user_id: string },
  ): Promise<StreamResponse<ReactivateUserResponse>> => {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      created_by_id: request?.created_by_id,
      name: request?.name,
      restore_messages: request?.restore_messages,
    };

    const response = await this.sendRequest<
      StreamResponse<ReactivateUserResponse>
    >(
      'POST',
      '/api/v2/users/{user_id}/reactivate',
      pathParams,
      undefined,
      body,
    );

    decoders.ReactivateUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };
}

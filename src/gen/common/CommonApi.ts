import { BaseApi } from '../../BaseApi';
import { ApiConfig } from '../../types';
import {
    // TODO: remove duplicates from import
    
    GetApplicationResponse,
    Response,UpdateAppRequest,
    ListBlockListResponse,
    Response,CreateBlockListRequest,
    Response,
    GetBlockListResponse,
    Response,UpdateBlockListRequest,
    CheckPushResponse,CheckPushRequest,
    CheckSNSResponse,CheckSNSRequest,
    CheckSQSResponse,CheckSQSRequest,
    Response,
    ListDevicesResponse,
    Response,CreateDeviceRequest,
    ExportUsersResponse,ExportUsersRequest,
    ListExternalStorageResponse,
    CreateExternalStorageResponse,CreateExternalStorageRequest,
    DeleteExternalStorageResponse,
    UpdateExternalStorageResponse,UpdateExternalStorageRequest,
    CheckExternalStorageResponse,
    CreateGuestResponse,CreateGuestRequest,
    CreateImportURLResponse,CreateImportURLRequest,
    ListImportsResponse,
    CreateImportResponse,CreateImportRequest,
    GetImportResponse,
    Response,
    Response,BanRequest,
    FlagResponse,FlagRequest,
    MuteUserResponse,MuteUserRequest,
    UnmuteResponse,UnmuteUserRequest,
    GetOGResponse,
    ListPermissionsResponse,
    GetCustomPermissionResponse,
    ListPushProvidersResponse,
    UpsertPushProviderResponse,UpsertPushProviderRequest,
    Response,
    GetRateLimitsResponse,
    ListRolesResponse,
    CreateRoleResponse,CreateRoleRequest,
    Response,
    GetTaskResponse,
    QueryUsersResponse,
    UpdateUsersResponse,UpdateUsersPartialRequest,
    UpdateUsersResponse,UpdateUsersRequest,
    DeactivateUsersResponse,DeactivateUsersRequest,
    DeleteUsersResponse,DeleteUsersRequest,
    ReactivateUsersResponse,ReactivateUsersRequest,
    Response,RestoreUsersRequest,
    DeactivateUserResponse,DeactivateUserRequest,
    ExportUserResponse,
    ReactivateUserResponse,ReactivateUserRequest,} from '../models';

export class CommonApi extends BaseApi {

    constructor(apiConfig: ApiConfig) {
      super(apiConfig);
    }

    
    getApp(): Promise<GetApplicationResponse> {
        

        return this.sendRequest<GetApplicationResponse>('GET', '/api/v2/app',  undefined ,  undefined  );
}
    
    updateApp(update_app_request?: UpdateAppRequest): Promise<Response> {
        const body = update_app_request;
        

        return this.sendRequest<Response>('PATCH', '/api/v2/app',  undefined ,  undefined  , body);
}
    
    listBlockLists(): Promise<ListBlockListResponse> {
        

        return this.sendRequest<ListBlockListResponse>('GET', '/api/v2/blocklists',  undefined ,  undefined  );
}
    
    createBlockList(create_block_list_request: CreateBlockListRequest): Promise<Response> {
        const body = create_block_list_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/blocklists',  undefined ,  undefined  , body);
}
    
    deleteBlockList(name: string): Promise<Response> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/blocklists/{name}', pathParams ,  undefined  );
}
    
    getBlockList(name: string): Promise<GetBlockListResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<GetBlockListResponse>('GET', '/api/v2/blocklists/{name}', pathParams ,  undefined  );
}
    
    updateBlockList(name: string, update_block_list_request?: UpdateBlockListRequest): Promise<Response> {
        const pathParams = {
          name: name,
        };
        const body = update_block_list_request;
        

        return this.sendRequest<Response>('PUT', '/api/v2/blocklists/{name}', pathParams ,  undefined  , body);
}
    
    checkPush(check_push_request?: CheckPushRequest): Promise<CheckPushResponse> {
        const body = check_push_request;
        

        return this.sendRequest<CheckPushResponse>('POST', '/api/v2/check_push',  undefined ,  undefined  , body);
}
    
    checkSNS(check_snsrequest?: CheckSNSRequest): Promise<CheckSNSResponse> {
        const body = check_snsrequest;
        

        return this.sendRequest<CheckSNSResponse>('POST', '/api/v2/check_sns',  undefined ,  undefined  , body);
}
    
    checkSQS(check_sqsrequest?: CheckSQSRequest): Promise<CheckSQSResponse> {
        const body = check_sqsrequest;
        

        return this.sendRequest<CheckSQSResponse>('POST', '/api/v2/check_sqs',  undefined ,  undefined  , body);
}
    
    deleteDevice(id: string, user_id?: string): Promise<Response> {
        const queryParams = {
          id: id, user_id: user_id,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/devices',  undefined , queryParams  );
}
    
    listDevices(user_id?: string): Promise<ListDevicesResponse> {
        const queryParams = {
          user_id: user_id,
        };
        

        return this.sendRequest<ListDevicesResponse>('GET', '/api/v2/devices',  undefined , queryParams  );
}
    
    createDevice(create_device_request: CreateDeviceRequest): Promise<Response> {
        const body = create_device_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/devices',  undefined ,  undefined  , body);
}
    
    exportUsers(export_users_request: ExportUsersRequest): Promise<ExportUsersResponse> {
        const body = export_users_request;
        

        return this.sendRequest<ExportUsersResponse>('POST', '/api/v2/export/users',  undefined ,  undefined  , body);
}
    
    listExternalStorage(): Promise<ListExternalStorageResponse> {
        

        return this.sendRequest<ListExternalStorageResponse>('GET', '/api/v2/external_storage',  undefined ,  undefined  );
}
    
    createExternalStorage(create_external_storage_request: CreateExternalStorageRequest): Promise<CreateExternalStorageResponse> {
        const body = create_external_storage_request;
        

        return this.sendRequest<CreateExternalStorageResponse>('POST', '/api/v2/external_storage',  undefined ,  undefined  , body);
}
    
    deleteExternalStorage(name: string): Promise<DeleteExternalStorageResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<DeleteExternalStorageResponse>('DELETE', '/api/v2/external_storage/{name}', pathParams ,  undefined  );
}
    
    updateExternalStorage(name: string, update_external_storage_request: UpdateExternalStorageRequest): Promise<UpdateExternalStorageResponse> {
        const pathParams = {
          name: name,
        };
        const body = update_external_storage_request;
        

        return this.sendRequest<UpdateExternalStorageResponse>('PUT', '/api/v2/external_storage/{name}', pathParams ,  undefined  , body);
}
    
    checkExternalStorage(name: string): Promise<CheckExternalStorageResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<CheckExternalStorageResponse>('GET', '/api/v2/external_storage/{name}/check', pathParams ,  undefined  );
}
    
    createGuest(create_guest_request: CreateGuestRequest): Promise<CreateGuestResponse> {
        const body = create_guest_request;
        

        return this.sendRequest<CreateGuestResponse>('POST', '/api/v2/guest',  undefined ,  undefined  , body);
}
    
    createImportURL(create_import_urlrequest?: CreateImportURLRequest): Promise<CreateImportURLResponse> {
        const body = create_import_urlrequest;
        

        return this.sendRequest<CreateImportURLResponse>('POST', '/api/v2/import_urls',  undefined ,  undefined  , body);
}
    
    listImports(): Promise<ListImportsResponse> {
        

        return this.sendRequest<ListImportsResponse>('GET', '/api/v2/imports',  undefined ,  undefined  );
}
    
    createImport(create_import_request: CreateImportRequest): Promise<CreateImportResponse> {
        const body = create_import_request;
        

        return this.sendRequest<CreateImportResponse>('POST', '/api/v2/imports',  undefined ,  undefined  , body);
}
    
    getImport(id: string): Promise<GetImportResponse> {
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetImportResponse>('GET', '/api/v2/imports/{id}', pathParams ,  undefined  );
}
    
    unban(target_user_id: string, channel_cid?: string, created_by?: string): Promise<Response> {
        const queryParams = {
          target_user_id: target_user_id, channel_cid: channel_cid, created_by: created_by,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/moderation/ban',  undefined , queryParams  );
}
    
    ban(ban_request: BanRequest): Promise<Response> {
        const body = ban_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/moderation/ban',  undefined ,  undefined  , body);
}
    
    flag(flag_request?: FlagRequest): Promise<FlagResponse> {
        const body = flag_request;
        

        return this.sendRequest<FlagResponse>('POST', '/api/v2/moderation/flag',  undefined ,  undefined  , body);
}
    
    muteUser(mute_user_request: MuteUserRequest): Promise<MuteUserResponse> {
        const body = mute_user_request;
        

        return this.sendRequest<MuteUserResponse>('POST', '/api/v2/moderation/mute',  undefined ,  undefined  , body);
}
    
    unmuteUser(unmute_user_request: UnmuteUserRequest): Promise<UnmuteResponse> {
        const body = unmute_user_request;
        

        return this.sendRequest<UnmuteResponse>('POST', '/api/v2/moderation/unmute',  undefined ,  undefined  , body);
}
    
    getOG(url: string): Promise<GetOGResponse> {
        const queryParams = {
          url: url,
        };
        

        return this.sendRequest<GetOGResponse>('GET', '/api/v2/og',  undefined , queryParams  );
}
    
    listPermissions(): Promise<ListPermissionsResponse> {
        

        return this.sendRequest<ListPermissionsResponse>('GET', '/api/v2/permissions',  undefined ,  undefined  );
}
    
    getPermission(id: string): Promise<GetCustomPermissionResponse> {
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetCustomPermissionResponse>('GET', '/api/v2/permissions/{id}', pathParams ,  undefined  );
}
    
    listPushProviders(): Promise<ListPushProvidersResponse> {
        

        return this.sendRequest<ListPushProvidersResponse>('GET', '/api/v2/push_providers',  undefined ,  undefined  );
}
    
    upsertPushProvider(upsert_push_provider_request?: UpsertPushProviderRequest): Promise<UpsertPushProviderResponse> {
        const body = upsert_push_provider_request;
        

        return this.sendRequest<UpsertPushProviderResponse>('POST', '/api/v2/push_providers',  undefined ,  undefined  , body);
}
    
    deletePushProvider(type: string, name: string): Promise<Response> {
        const pathParams = {
          type: type, name: name,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/push_providers/{type}/{name}', pathParams ,  undefined  );
}
    
    getRateLimits(server_side?: boolean, android?: boolean, ios?: boolean, web?: boolean, endpoints?: string): Promise<GetRateLimitsResponse> {
        const queryParams = {
          server_side: server_side, android: android, ios: ios, web: web, endpoints: endpoints,
        };
        

        return this.sendRequest<GetRateLimitsResponse>('GET', '/api/v2/rate_limits',  undefined , queryParams  );
}
    
    listRoles(): Promise<ListRolesResponse> {
        

        return this.sendRequest<ListRolesResponse>('GET', '/api/v2/roles',  undefined ,  undefined  );
}
    
    createRole(create_role_request: CreateRoleRequest): Promise<CreateRoleResponse> {
        const body = create_role_request;
        

        return this.sendRequest<CreateRoleResponse>('POST', '/api/v2/roles',  undefined ,  undefined  , body);
}
    
    deleteRole(name: string): Promise<Response> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/roles/{name}', pathParams ,  undefined  );
}
    
    getTask(id: string): Promise<GetTaskResponse> {
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetTaskResponse>('GET', '/api/v2/tasks/{id}', pathParams ,  undefined  );
}
    
    queryUsers(payload?: QueryUsersPayload): Promise<QueryUsersResponse> {
        const queryParams = {
          payload: payload,
        };
        

        return this.sendRequest<QueryUsersResponse>('GET', '/api/v2/users',  undefined , queryParams  );
}
    
    updateUsersPartial(update_users_partial_request: UpdateUsersPartialRequest): Promise<UpdateUsersResponse> {
        const body = update_users_partial_request;
        

        return this.sendRequest<UpdateUsersResponse>('PATCH', '/api/v2/users',  undefined ,  undefined  , body);
}
    
    updateUsers(update_users_request: UpdateUsersRequest): Promise<UpdateUsersResponse> {
        const body = update_users_request;
        

        return this.sendRequest<UpdateUsersResponse>('POST', '/api/v2/users',  undefined ,  undefined  , body);
}
    
    deactivateUsers(deactivate_users_request: DeactivateUsersRequest): Promise<DeactivateUsersResponse> {
        const body = deactivate_users_request;
        

        return this.sendRequest<DeactivateUsersResponse>('POST', '/api/v2/users/deactivate',  undefined ,  undefined  , body);
}
    
    deleteUsers(delete_users_request: DeleteUsersRequest): Promise<DeleteUsersResponse> {
        const body = delete_users_request;
        

        return this.sendRequest<DeleteUsersResponse>('POST', '/api/v2/users/delete',  undefined ,  undefined  , body);
}
    
    reactivateUsers(reactivate_users_request: ReactivateUsersRequest): Promise<ReactivateUsersResponse> {
        const body = reactivate_users_request;
        

        return this.sendRequest<ReactivateUsersResponse>('POST', '/api/v2/users/reactivate',  undefined ,  undefined  , body);
}
    
    restoreUsers(restore_users_request: RestoreUsersRequest): Promise<Response> {
        const body = restore_users_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/users/restore',  undefined ,  undefined  , body);
}
    
    deactivateUser(user_id: string, deactivate_user_request?: DeactivateUserRequest): Promise<DeactivateUserResponse> {
        const pathParams = {
          user_id: user_id,
        };
        const body = deactivate_user_request;
        

        return this.sendRequest<DeactivateUserResponse>('POST', '/api/v2/users/{user_id}/deactivate', pathParams ,  undefined  , body);
}
    
    exportUser(user_id: string): Promise<ExportUserResponse> {
        const pathParams = {
          user_id: user_id,
        };
        

        return this.sendRequest<ExportUserResponse>('GET', '/api/v2/users/{user_id}/export', pathParams ,  undefined  );
}
    
    reactivateUser(user_id: string, reactivate_user_request?: ReactivateUserRequest): Promise<ReactivateUserResponse> {
        const pathParams = {
          user_id: user_id,
        };
        const body = reactivate_user_request;
        

        return this.sendRequest<ReactivateUserResponse>('POST', '/api/v2/users/{user_id}/reactivate', pathParams ,  undefined  , body);
}
    }
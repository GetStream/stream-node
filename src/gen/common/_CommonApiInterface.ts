import { StreamResponse } from '../../gen-imports';
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
  UpdateBlockListResponse,
  UpdateExternalStorageRequest,
  UpdateExternalStorageResponse,
  UpdateUsersPartialRequest,
  UpdateUsersRequest,
  UpdateUsersResponse,
  UpsertPushProviderRequest,
  UpsertPushProviderResponse,
} from '../models';

export interface _CommonApiInterface {
  getApp: () => Promise<StreamResponse<GetApplicationResponse>>;

  updateApp: (request?: UpdateAppRequest) => Promise<StreamResponse<Response>>;

  listBlockLists: (request?: {
    team?: string;
  }) => Promise<StreamResponse<ListBlockListResponse>>;

  createBlockList: (
    request: CreateBlockListRequest,
  ) => Promise<StreamResponse<CreateBlockListResponse>>;

  deleteBlockList: (request: {
    name: string;
    team?: string;
  }) => Promise<StreamResponse<Response>>;

  getBlockList: (request: {
    name: string;
    team?: string;
  }) => Promise<StreamResponse<GetBlockListResponse>>;

  updateBlockList: (
    request: UpdateBlockListRequest & { name: string },
  ) => Promise<StreamResponse<UpdateBlockListResponse>>;

  checkPush: (
    request?: CheckPushRequest,
  ) => Promise<StreamResponse<CheckPushResponse>>;

  checkSNS: (
    request?: CheckSNSRequest,
  ) => Promise<StreamResponse<CheckSNSResponse>>;

  checkSQS: (
    request?: CheckSQSRequest,
  ) => Promise<StreamResponse<CheckSQSResponse>>;

  deleteDevice: (request: {
    id: string;
    user_id?: string;
  }) => Promise<StreamResponse<Response>>;

  listDevices: (request?: {
    user_id?: string;
  }) => Promise<StreamResponse<ListDevicesResponse>>;

  createDevice: (
    request: CreateDeviceRequest,
  ) => Promise<StreamResponse<Response>>;

  exportUsers: (
    request: ExportUsersRequest,
  ) => Promise<StreamResponse<ExportUsersResponse>>;

  listExternalStorage: () => Promise<
    StreamResponse<ListExternalStorageResponse>
  >;

  createExternalStorage: (
    request: CreateExternalStorageRequest,
  ) => Promise<StreamResponse<CreateExternalStorageResponse>>;

  deleteExternalStorage: (request: {
    name: string;
  }) => Promise<StreamResponse<DeleteExternalStorageResponse>>;

  updateExternalStorage: (
    request: UpdateExternalStorageRequest & { name: string },
  ) => Promise<StreamResponse<UpdateExternalStorageResponse>>;

  checkExternalStorage: (request: {
    name: string;
  }) => Promise<StreamResponse<CheckExternalStorageResponse>>;

  createGuest: (
    request: CreateGuestRequest,
  ) => Promise<StreamResponse<CreateGuestResponse>>;

  createImportURL: (
    request?: CreateImportURLRequest,
  ) => Promise<StreamResponse<CreateImportURLResponse>>;

  listImports: () => Promise<StreamResponse<ListImportsResponse>>;

  createImport: (
    request: CreateImportRequest,
  ) => Promise<StreamResponse<CreateImportResponse>>;

  getImport: (request: {
    id: string;
  }) => Promise<StreamResponse<GetImportResponse>>;

  getOG: (request: { url: string }) => Promise<StreamResponse<GetOGResponse>>;

  listPermissions: () => Promise<StreamResponse<ListPermissionsResponse>>;

  getPermission: (request: {
    id: string;
  }) => Promise<StreamResponse<GetCustomPermissionResponse>>;

  listPushProviders: () => Promise<StreamResponse<ListPushProvidersResponse>>;

  upsertPushProvider: (
    request?: UpsertPushProviderRequest,
  ) => Promise<StreamResponse<UpsertPushProviderResponse>>;

  deletePushProvider: (request: {
    type: string;
    name: string;
  }) => Promise<StreamResponse<Response>>;

  getRateLimits: (request?: {
    server_side?: boolean;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    endpoints?: string;
  }) => Promise<StreamResponse<GetRateLimitsResponse>>;

  listRoles: () => Promise<StreamResponse<ListRolesResponse>>;

  createRole: (
    request: CreateRoleRequest,
  ) => Promise<StreamResponse<CreateRoleResponse>>;

  deleteRole: (request: { name: string }) => Promise<StreamResponse<Response>>;

  getTask: (request: {
    id: string;
  }) => Promise<StreamResponse<GetTaskResponse>>;

  queryUsers: (request?: {
    payload?: QueryUsersPayload;
  }) => Promise<StreamResponse<QueryUsersResponse>>;

  updateUsersPartial: (
    request: UpdateUsersPartialRequest,
  ) => Promise<StreamResponse<UpdateUsersResponse>>;

  updateUsers: (
    request: UpdateUsersRequest,
  ) => Promise<StreamResponse<UpdateUsersResponse>>;

  getBlockedUsers: (request?: {
    user_id?: string;
  }) => Promise<StreamResponse<GetBlockedUsersResponse>>;

  blockUsers: (
    request: BlockUsersRequest,
  ) => Promise<StreamResponse<BlockUsersResponse>>;

  deactivateUsers: (
    request: DeactivateUsersRequest,
  ) => Promise<StreamResponse<DeactivateUsersResponse>>;

  deleteUsers: (
    request: DeleteUsersRequest,
  ) => Promise<StreamResponse<DeleteUsersResponse>>;

  reactivateUsers: (
    request: ReactivateUsersRequest,
  ) => Promise<StreamResponse<ReactivateUsersResponse>>;

  restoreUsers: (
    request: RestoreUsersRequest,
  ) => Promise<StreamResponse<Response>>;

  unblockUsers: (
    request: UnblockUsersRequest,
  ) => Promise<StreamResponse<UnblockUsersResponse>>;

  deactivateUser: (
    request: DeactivateUserRequest & { user_id: string },
  ) => Promise<StreamResponse<DeactivateUserResponse>>;

  exportUser: (request: {
    user_id: string;
  }) => Promise<StreamResponse<ExportUserResponse>>;

  reactivateUser: (
    request: ReactivateUserRequest & { user_id: string },
  ) => Promise<StreamResponse<ReactivateUserResponse>>;
}

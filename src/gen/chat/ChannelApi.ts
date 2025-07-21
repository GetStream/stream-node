import { StreamResponse, ChatApi } from '../../gen-imports';
import {
  ChannelGetOrCreateRequest,
  ChannelStateResponse,
  DeleteChannelResponse,
  EventResponse,
  FileUploadRequest,
  FileUploadResponse,
  GetDraftResponse,
  GetManyMessagesResponse,
  HideChannelRequest,
  HideChannelResponse,
  ImageUploadRequest,
  ImageUploadResponse,
  MarkReadRequest,
  MarkReadResponse,
  MarkUnreadRequest,
  Response,
  SendEventRequest,
  SendMessageRequest,
  SendMessageResponse,
  ShowChannelRequest,
  ShowChannelResponse,
  TruncateChannelRequest,
  TruncateChannelResponse,
  UpdateChannelPartialRequest,
  UpdateChannelPartialResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateMemberPartialRequest,
  UpdateMemberPartialResponse,
} from '../models';

export class ChannelApi {
  constructor(
    protected chatApi: ChatApi,
    public readonly type: string,
    public id: string | undefined,
  ) {}

  delete(request?: {
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteChannelResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.deleteChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  updateChannelPartial(
    request?: UpdateChannelPartialRequest,
  ): Promise<StreamResponse<UpdateChannelPartialResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.updateChannelPartial({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  update(
    request?: UpdateChannelRequest,
  ): Promise<StreamResponse<UpdateChannelResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.updateChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  deleteDraft(request?: {
    parent_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.deleteDraft({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  getDraft(request?: {
    parent_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<GetDraftResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.getDraft({ id: this.id, type: this.type, ...request });
  }

  sendEvent(request: SendEventRequest): Promise<StreamResponse<EventResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.sendEvent({ id: this.id, type: this.type, ...request });
  }

  deleteFile(request?: { url?: string }): Promise<StreamResponse<Response>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.deleteFile({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  uploadFile(
    request?: FileUploadRequest,
  ): Promise<StreamResponse<FileUploadResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.uploadFile({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  hide(
    request?: HideChannelRequest,
  ): Promise<StreamResponse<HideChannelResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.hideChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  deleteImage(request?: { url?: string }): Promise<StreamResponse<Response>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.deleteImage({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  uploadImage(
    request?: ImageUploadRequest,
  ): Promise<StreamResponse<ImageUploadResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.uploadImage({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  updateMemberPartial(
    request?: UpdateMemberPartialRequest & { user_id?: string },
  ): Promise<StreamResponse<UpdateMemberPartialResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.updateMemberPartial({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  sendMessage(
    request: SendMessageRequest,
  ): Promise<StreamResponse<SendMessageResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.sendMessage({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  getManyMessages(request: {
    ids: string[];
  }): Promise<StreamResponse<GetManyMessagesResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.getManyMessages({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  getOrCreate(
    request?: ChannelGetOrCreateRequest,
  ): Promise<StreamResponse<ChannelStateResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.getOrCreateChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  markRead(
    request?: MarkReadRequest,
  ): Promise<StreamResponse<MarkReadResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.markRead({ id: this.id, type: this.type, ...request });
  }

  show(
    request?: ShowChannelRequest,
  ): Promise<StreamResponse<ShowChannelResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.showChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  truncate(
    request?: TruncateChannelRequest,
  ): Promise<StreamResponse<TruncateChannelResponse>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.truncateChannel({
      id: this.id,
      type: this.type,
      ...request,
    });
  }

  markUnread(request?: MarkUnreadRequest): Promise<StreamResponse<Response>> {
    if (!this.id) {
      throw new Error(
        `Channel isn't yet created, call getOrCreateDistinctChannel() before this operation`,
      );
    }

    return this.chatApi.markUnread({
      id: this.id,
      type: this.type,
      ...request,
    });
  }
}

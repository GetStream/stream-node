/* tslint:disable */
/* eslint-disable */
/**
 * Stream API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v98.0.2-ingress-test.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  VideoAPIError,
  VideoCreateExternalStorageRequest,
  VideoCreateExternalStorageResponse,
  VideoDeleteExternalStorageResponse,
  VideoListExternalStorageResponse,
} from '../models';

export interface CreateExternalStorageRequest {
    videoCreateExternalStorageRequest: VideoCreateExternalStorageRequest | null;
}

export interface DeleteExternalStorageRequest {
    name: string;
}

/**
 * 
 */
export class SettingsApi extends runtime.BaseAPI {

    /**
     * Creates new external storage 
     * Create external storage
     */
    async createExternalStorageRaw(requestParameters: CreateExternalStorageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VideoCreateExternalStorageResponse>> {
        if (requestParameters.videoCreateExternalStorageRequest === null || requestParameters.videoCreateExternalStorageRequest === undefined) {
            throw new runtime.RequiredError('videoCreateExternalStorageRequest','Required parameter requestParameters.videoCreateExternalStorageRequest was null or undefined when calling createExternalStorage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Stream-Auth-Type"] = this.configuration.apiKey("Stream-Auth-Type"); // stream-auth-type authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        const response = await this.request({
            path: `/video/external_storage`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.videoCreateExternalStorageRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Creates new external storage 
     * Create external storage
     */
    async createExternalStorage(requestParameters: CreateExternalStorageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VideoCreateExternalStorageResponse> {
        const response = await this.createExternalStorageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deletes external storage 
     * Delete external storage
     */
    async deleteExternalStorageRaw(requestParameters: DeleteExternalStorageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VideoDeleteExternalStorageResponse>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling deleteExternalStorage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Stream-Auth-Type"] = this.configuration.apiKey("Stream-Auth-Type"); // stream-auth-type authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        const response = await this.request({
            path: `/video/external_storage/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Deletes external storage 
     * Delete external storage
     */
    async deleteExternalStorage(requestParameters: DeleteExternalStorageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VideoDeleteExternalStorageResponse> {
        const response = await this.deleteExternalStorageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Lists external storage 
     * List external storage
     */
    async listExternalStorageRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VideoListExternalStorageResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Stream-Auth-Type"] = this.configuration.apiKey("Stream-Auth-Type"); // stream-auth-type authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // JWT authentication
        }

        const response = await this.request({
            path: `/video/external_storage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Lists external storage 
     * List external storage
     */
    async listExternalStorage(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VideoListExternalStorageResponse> {
        const response = await this.listExternalStorageRaw(initOverrides);
        return await response.value();
    }

}
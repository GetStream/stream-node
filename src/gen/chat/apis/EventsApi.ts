/* tslint:disable */
/* eslint-disable */
/**
 * Stream Chat API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v92.7.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  APIError,
  EventResponse,
  Response,
  SendEventRequest,
  SendUserCustomEventRequest,
} from '../models';

export interface SendEventOperationRequest {
    type: string;
    id: string;
    sendEventRequest: SendEventRequest | null;
}

export interface SendUserCustomEventOperationRequest {
    userId: string;
    sendUserCustomEventRequest: SendUserCustomEventRequest | null;
}

/**
 * 
 */
export class EventsApi extends runtime.BaseAPI {

    /**
     * Sends event to the channel  Sends events: - any  Required permissions: - SendCustomEvent 
     * Send event
     */
    async sendEventRaw(requestParameters: SendEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventResponse>> {
        if (requestParameters.type === null || requestParameters.type === undefined) {
            throw new runtime.RequiredError('type','Required parameter requestParameters.type was null or undefined when calling sendEvent.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling sendEvent.');
        }

        if (requestParameters.sendEventRequest === null || requestParameters.sendEventRequest === undefined) {
            throw new runtime.RequiredError('sendEventRequest','Required parameter requestParameters.sendEventRequest was null or undefined when calling sendEvent.');
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
            path: `/channels/{type}/{id}/event`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters.type))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.sendEventRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Sends event to the channel  Sends events: - any  Required permissions: - SendCustomEvent 
     * Send event
     */
    async sendEvent(requestParameters: SendEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventResponse> {
        const response = await this.sendEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Sends a custom event to a user  Sends events: - custom 
     * Send user event
     */
    async sendUserCustomEventRaw(requestParameters: SendUserCustomEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Response>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling sendUserCustomEvent.');
        }

        if (requestParameters.sendUserCustomEventRequest === null || requestParameters.sendUserCustomEventRequest === undefined) {
            throw new runtime.RequiredError('sendUserCustomEventRequest','Required parameter requestParameters.sendUserCustomEventRequest was null or undefined when calling sendUserCustomEvent.');
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
            path: `/users/{user_id}/event`.replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.sendUserCustomEventRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Sends a custom event to a user  Sends events: - custom 
     * Send user event
     */
    async sendUserCustomEvent(requestParameters: SendUserCustomEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Response> {
        const response = await this.sendUserCustomEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

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
  CheckPushRequest,
  CheckPushResponse,
  CheckSNSRequest,
  CheckSNSResponse,
  CheckSQSRequest,
  CheckSQSResponse,
} from '../models';

export interface CheckPushOperationRequest {
    checkPushRequest: CheckPushRequest | null;
}

export interface CheckSNSOperationRequest {
    checkSNSRequest: CheckSNSRequest | null;
}

export interface CheckSQSOperationRequest {
    checkSQSRequest: CheckSQSRequest | null;
}

/**
 * 
 */
export class TestingApi extends runtime.BaseAPI {

    /**
     * Sends a test message via push, this is a test endpoint to verify your push settings 
     * Check push
     */
    async checkPushRaw(requestParameters: CheckPushOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CheckPushResponse>> {
        if (requestParameters.checkPushRequest === null || requestParameters.checkPushRequest === undefined) {
            throw new runtime.RequiredError('checkPushRequest','Required parameter requestParameters.checkPushRequest was null or undefined when calling checkPush.');
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
            path: `/check_push`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.checkPushRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Sends a test message via push, this is a test endpoint to verify your push settings 
     * Check push
     */
    async checkPush(requestParameters: CheckPushOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CheckPushResponse> {
        const response = await this.checkPushRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Validates Amazon SNS configuration 
     * Check SNS
     */
    async checkSNSRaw(requestParameters: CheckSNSOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CheckSNSResponse>> {
        if (requestParameters.checkSNSRequest === null || requestParameters.checkSNSRequest === undefined) {
            throw new runtime.RequiredError('checkSNSRequest','Required parameter requestParameters.checkSNSRequest was null or undefined when calling checkSNS.');
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
            path: `/check_sns`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.checkSNSRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Validates Amazon SNS configuration 
     * Check SNS
     */
    async checkSNS(requestParameters: CheckSNSOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CheckSNSResponse> {
        const response = await this.checkSNSRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Validates Amazon SQS credentials 
     * Check SQS
     */
    async checkSQSRaw(requestParameters: CheckSQSOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CheckSQSResponse>> {
        if (requestParameters.checkSQSRequest === null || requestParameters.checkSQSRequest === undefined) {
            throw new runtime.RequiredError('checkSQSRequest','Required parameter requestParameters.checkSQSRequest was null or undefined when calling checkSQS.');
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
            path: `/check_sqs`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.checkSQSRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Validates Amazon SQS credentials 
     * Check SQS
     */
    async checkSQS(requestParameters: CheckSQSOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CheckSQSResponse> {
        const response = await this.checkSQSRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

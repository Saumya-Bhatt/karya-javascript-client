import axios, { AxiosInstance } from "axios";

import { ClientConfig } from "./config.js";
import { User, Plan } from "../entities/models.js";
import { SubmitPlanRequest, CreateUserRequest, UpdatePlanRequest } from "./requests.js";
import { GetPlanResponse, GetSummaryResponse } from "./responses.js";

export class KaryaRestClient {
    private static apiVersion: string = "v1";
    private static _plansEndpoint: string = `${KaryaRestClient.apiVersion}/plan`;
    private static _usersEndpoint: string = `${KaryaRestClient.apiVersion}/user`;

    private client: AxiosInstance;
    private baseUrl: string;

    constructor(config: ClientConfig) {
        this.client = axios.create();
        this.baseUrl = config.getBaseUrl();
    }

    /**
     * Creates a new user by sending a POST request to the Karya API.
     */
    async createUser(request: CreateUserRequest): Promise<User> {
        const url = `${this.baseUrl}/${KaryaRestClient._usersEndpoint}`;
        const response = await this.client.post(url, request);
        return new User(response.data);
    }

    /**
     * Retrieves the details of a specific user by username.
     */
    async getUser(username: string): Promise<User> {
        const url = `${this.baseUrl}/${KaryaRestClient._usersEndpoint}`;
        const params = { username };
        const response = await this.client.get(url, { params });
        return new User(response.data);
    }

    /**
     * Submits a new plan to the Karya API.
     */
    async submitPlan(request: SubmitPlanRequest): Promise<Plan> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}`;
        const response = await this.client.post(url, request);
        return new Plan(response.data);
    }

    /**
     * Retrieves the details of a specific plan by ID.
     */
    async getPlan(planId: string): Promise<GetPlanResponse> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}`;
        const response = await this.client.get(url);
        return new GetPlanResponse(response.data);
    }

    /**
     * Updates an existing plan with new details.
     */
    async updatePlan(request: UpdatePlanRequest): Promise<Plan> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${request.planId}`;
        const response = await this.client.patch(url, request);
        return new Plan(response.data);
    }

    /**
     * Cancels a specified plan by ID.
     */
    async cancelPlan(planId: string): Promise<Plan> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}`;
        const response = await this.client.post(url);
        return new Plan(response.data);
    }

    /**
     * Retrieves the summary for a specific plan by ID.
     */
    async getSummary(planId: string): Promise<GetSummaryResponse> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}/summary`;
        const response = await this.client.get(url);
        return new GetSummaryResponse(response.data);
    }

    /**
     * Retrieves a list of plans for a specific user.
     */
    async listPlans(userId: string): Promise<Plan[]> {
        const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}`;
        const params = { user_id: userId };
        const response = await this.client.get(url, { params });
        return response.data.map((plan: any) => new Plan(plan));
    }

    /**
     * Closes the HTTP client connection.
     */
    async close(): Promise<void> {
        // Do nothing
    }
}

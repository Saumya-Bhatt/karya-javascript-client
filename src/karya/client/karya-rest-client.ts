import axios, { AxiosInstance } from 'axios';

import { ClientConfig } from './config.js';
import { User, Plan } from '../entities/models.js';
import { SubmitPlanRequest, CreateUserRequest, UpdatePlanRequest } from './requests.js';
import { GetPlanResponse, GetSummaryResponse } from './responses.js';

/**
 * Represents the Karya API client for interacting with the Karya REST API.
 * Provides methods for creating and managing users, plans, and retrieving plan details.
 */
export class KaryaRestClient {
  /** The API version used for endpoints. */
  private static apiVersion: string = 'v1';

  /** The endpoint for plan-related API requests. */
  private static _plansEndpoint: string = `${KaryaRestClient.apiVersion}/plan`;

  /** The endpoint for user-related API requests. */
  private static _usersEndpoint: string = `${KaryaRestClient.apiVersion}/user`;

  /** The Axios client instance used for making HTTP requests. */
  private client: AxiosInstance;

  /** The base URL for the API. */
  private baseUrl: string;

  /**
   * Creates an instance of the `KaryaRestClient` class.
   * @param config - The configuration object containing the base URL and protocol settings.
   */
  constructor(config: ClientConfig) {
    this.client = axios.create();
    this.baseUrl = config.getBaseUrl();
  }

  /**
   * Creates a new user in the Karya system.
   * @param request - The request object containing user creation data.
   * @returns A promise that resolves to the created user.
   */
  async createUser(request: CreateUserRequest): Promise<User> {
    const url = `${this.baseUrl}/${KaryaRestClient._usersEndpoint}`;
    const response = await this.client.post(url, request);
    return new User(response.data);
  }

  /**
   * Retrieves the details of a specific user by username.
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the user object.
   */
  async getUser(username: string): Promise<User> {
    const url = `${this.baseUrl}/${KaryaRestClient._usersEndpoint}`;
    const params = { username };
    const response = await this.client.get(url, { params });
    return new User(response.data);
  }

  /**
   * Submits a new plan to the Karya API.
   * @param request - The request object containing plan submission data.
   * @returns A promise that resolves to the created plan.
   */
  async submitPlan(request: SubmitPlanRequest): Promise<Plan> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}`;
    const response = await this.client.post(url, request);
    return new Plan(response.data);
  }

  /**
   * Retrieves the details of a specific plan by ID.
   * @param planId - The ID of the plan to retrieve.
   * @returns A promise that resolves to the plan details.
   */
  async getPlan(planId: string): Promise<GetPlanResponse> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}`;
    const response = await this.client.get(url);
    return new GetPlanResponse(response.data);
  }

  /**
   * Updates an existing plan with new details.
   * @param request - The request object containing updated plan data.
   * @returns A promise that resolves to the updated plan.
   */
  async updatePlan(request: UpdatePlanRequest): Promise<Plan> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${request.planId}`;
    const response = await this.client.patch(url, request);
    return new Plan(response.data);
  }

  /**
   * Cancels a specified plan by ID.
   * @param planId - The ID of the plan to cancel.
   * @returns A promise that resolves to the cancelled plan.
   */
  async cancelPlan(planId: string): Promise<Plan> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}`;
    const response = await this.client.post(url);
    return new Plan(response.data);
  }

  /**
   * Retrieves the summary for a specific plan by ID.
   * @param planId - The ID of the plan for which the summary is requested.
   * @returns A promise that resolves to the plan summary.
   */
  async getSummary(planId: string): Promise<GetSummaryResponse> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}/${planId}/summary`;
    const response = await this.client.get(url);
    return new GetSummaryResponse(response.data);
  }

  /**
   * Retrieves a list of plans associated with a specific user.
   * @param userId - The ID of the user whose plans are to be retrieved.
   * @returns A promise that resolves to a list of plans for the user.
   */
  async listPlans(userId: string): Promise<Plan[]> {
    const url = `${this.baseUrl}/${KaryaRestClient._plansEndpoint}`;
    const params = { user_id: userId };
    const response = await this.client.get(url, { params });
    return response.data.map((plan: Plan) => new Plan(plan));
  }

  /**
   * Closes the HTTP client connection.
   * This method is a placeholder as the Axios client does not require explicit closure.
   * @returns A promise that resolves when the client is closed (no actual action is performed).
   */
  async close(): Promise<void> {
    // Axios does not require explicit closing of the client.
    // This method is a no-op in this implementation.
  }
}

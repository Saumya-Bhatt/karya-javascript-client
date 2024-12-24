import { KaryaRestClient } from '../dist/karya/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/karya/client/requests.js';
import { RestApiRequest } from '../dist/karya/entities/actions.js';
import { Protocol, Method } from '../dist/karya/entities/constants.js';
import { Recurring } from '../dist/karya/entities/plan-types.js';

// Initialize the configuration for the Karya API client
const config = ClientConfig.dev(); // Configuration for the local development environment
const client = new KaryaRestClient(config); // Create a new KaryaRestClient instance with the provided config

/**
 * Create a new user using the Karya API.
 * This example demonstrates the creation of a new user with the name "typescript-client".
 * @returns {Promise<User>} A promise that resolves to the created user object.
 */
const user = await client.createUser(new CreateUserRequest('typescript-client'));
console.log(user); // Log the created user to the console

/**
 * Define a REST API action for the plan.
 * This action will send an HTTP POST request to a specified endpoint with a JSON body.
 * @type {RestApiRequest} The action that sends a REST API request with the specified parameters.
 */
const restAction = new RestApiRequest(
  'eox7wbcodh9parh.m.pipedream.net', // The base URL for the REST API request
  new RestApiRequest.JsonBody({ message: 'Hello from typescript client' }), // JSON body for the request
  Protocol.HTTPS, // The protocol to be used for the request (HTTPS)
  Method.POST, // The HTTP method to be used (POST)
  { 'content-type': 'application/json' }, // HTTP headers for the request
  2000, // Timeout for the request in milliseconds (2 seconds)
);

/**
 * Prepare a plan submission request for the user.
 * This plan is a recurring plan that will run periodically based on the specified period time.
 * @type {SubmitPlanRequest} The plan submission request that includes user details, plan type, and actions.
 */
const request = new SubmitPlanRequest(
  user.id, // The user ID for the plan
  'recurring api plan', // The description of the plan
  'PT7S', // The period time (in ISO 8601 duration format) for the recurring plan
  new Recurring(Date.now() + 10000), // Recurring plan type with an end date 10 seconds from now
  restAction, // The REST API action to be executed
);

/**
 * Submit the plan to the Karya API.
 * The `submitPlan` method sends the plan request to the server and creates the plan.
 * @returns {Promise<Plan>} A promise that resolves to the created plan object.
 */
const plan = await client.submitPlan(request);
console.log(plan); // Log the created plan to the console

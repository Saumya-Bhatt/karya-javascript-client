import { ClientConfig } from '../dist/client/config.js';
import { KaryaRestClient } from '../dist/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/client/requests.js';
import { EmailRequest } from '../dist/entities/actions.js';
import { OneTime } from '../dist/entities/plan-types.js';

// Create and configure the Karya REST client instance
const config = ClientConfig.dev();  // Configuration for local development environment
const client = new KaryaRestClient(config);  // KaryaRestClient instance for API interactions

/**
 * Create a new user using the Karya API client.
 * This example demonstrates the creation of a new user with the name "typescript-client".
 * @returns A promise that resolves to the created user object.
 */
const user = await client.createUser(new CreateUserRequest('typescript-client'));

/**
 * Define the action for the plan.
 * This action will send an email to the specified recipient with the subject and message provided.
 * @type {EmailRequest} The email request action.
 */
const action = new EmailRequest(
  'receipient@email.com', // The recipient's email address
  'Hello from karya typescript client', // The subject of the email
  'Hello', // The body of the email
);

/**
 * Prepare a plan submission request for the user.
 * This plan is a "OneTime" plan, which will run once, and it includes the email action defined above.
 * @type {SubmitPlanRequest} The plan submission request with user details, plan type, and actions.
 */
const request = new SubmitPlanRequest(user.id, 'delayed email plan', 'PT7S', new OneTime(), action);

/**
 * Submit the plan request to the Karya API.
 * The `submitPlan` method sends the request and creates the plan on the server.
 * @returns A promise that resolves to the created plan object.
 */
const plan = await client.submitPlan(request);

/**
 * Output the plan details to the console.
 * Once the plan has been successfully submitted, the plan object is logged.
 */
console.log(plan);

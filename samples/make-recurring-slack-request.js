import { ClientConfig } from '../dist/client/config.js';
import { KaryaRestClient } from '../dist/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/client/requests.js';
import { SlackMessageRequest } from '../dist/entities/actions.js';
import { Recurring } from '../dist/entities/plan-types.js';

// Initialize the configuration for the Karya API client
const config = ClientConfig.dev(); // Use development configuration (local environment setup)
const client = new KaryaRestClient(config); // Create a new instance of KaryaRestClient with the specified config

/**
 * Create a new user for the plan.
 * In this example, the user is created with the name 'typescript-client'.
 * @returns {Promise<User>} A promise that resolves to the created user object.
 */
const user = await client.createUser(new CreateUserRequest('typescript-client'));
console.log(user); // Log the created user to the console for debugging

/**
 * Define a Slack message action that will be executed as part of the plan.
 * This action sends a message to a Slack channel.
 * @type {SlackMessageRequest} The Slack message request that sends a message to the specified channel.
 */
const action = new SlackMessageRequest(
  'slack-channel', // The Slack channel to which the message will be sent
  'Hello from karya typescript client' // The content of the Slack message
);

/**
 * Create a new plan submission request for the user.
 * This is a recurring plan that will execute the Slack message action periodically.
 * @type {SubmitPlanRequest} The request that includes user details, plan type, and actions.
 */
const request = new SubmitPlanRequest(
  user.id, // The user ID to whom the plan belongs
  'recurring slack plan', // A description of the plan
  'PT7S', // The period time (ISO 8601 duration format), here it is 7 seconds for a recurring plan
  new Recurring(Date.now() + 10000), // Recurring plan type with an end date 10 seconds from now
  action, // The action to be executed as part of the plan (sending a Slack message)
);

/**
 * Submit the plan to the Karya API.
 * The plan includes the user, action, and type of plan (recurring).
 * @returns {Promise<Plan>} A promise that resolves to the created plan object.
 */
const plan = await client.submitPlan(request);
console.log(plan); // Log the created plan object for debugging purposes

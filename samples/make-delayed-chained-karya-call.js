import { ClientConfig } from 'karya-client/client/config.js';
import { KaryaRestClient } from 'karya-client/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from 'karya-client/client/requests.js';
import { ChainedRequest, RestApiRequest } from 'karya-client/entities/actions.js';
import { OneTime, Recurring } from 'karya-client/entities/plan-types.js';

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
 * Define a chained request action.
 * This action submits a new plan, which is itself a chained action.
 * The plan will be a recurring plan that executes after 10 seconds.
 * @type {ChainedRequest} A chained request action to be used in another plan submission.
 */
const chained_action = new ChainedRequest(
  new SubmitPlanRequest(
    user.id, // The ID of the user for whom the plan is being created
    'recurring api plan', // A description of the plan
    'PT7S', // The period time (7 seconds)
    new Recurring(Date.now() + 10000), // The plan type (Recurring), with an end time in 10 seconds
    new RestApiRequest('eox7wbcodh9parh.m.pipedream.net'), // The action for the plan (sending an API request)
  ),
);

/**
 * Prepare a plan submission request for the user, with a chained action.
 * This plan is a "OneTime" plan and includes the previously defined `chained_action`.
 * @type {SubmitPlanRequest} The plan submission request with user details, plan type, and actions.
 */
const chained_request = new SubmitPlanRequest(
  user.id, // The ID of the user for whom the plan is being created
  'delayed chained api plan', // A description of the plan
  'PT7S', // The period time (7 seconds)
  new OneTime(), // The plan type (OneTime)
  chained_action, // The chained request action
);

/**
 * Submit the plan request to the Karya API.
 * The `submitPlan` method sends the request and creates the plan on the server.
 * @returns A promise that resolves to the created plan object.
 */
const plan = await client.submitPlan(chained_request);

/**
 * Output the plan details to the console.
 * Once the plan has been successfully submitted, the plan object is logged.
 */
console.log(plan);

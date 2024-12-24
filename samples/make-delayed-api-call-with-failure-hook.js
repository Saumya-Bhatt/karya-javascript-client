import { ClientConfig } from '../dist/client/config.js';
import { KaryaRestClient } from '../dist/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/client/requests.js';
import { RestApiRequest } from '../dist/entities/actions.js';
import { Trigger } from '../dist/entities/constants.js';
import { OneTime } from '../dist/entities/plan-types.js';
import { Hook } from '../dist/entities/models.js';

// Create and configure the Karya REST client instance
const config = ClientConfig.dev();  // Configuration for local development environment
const client = new KaryaRestClient(config);  // KaryaRestClient instance to interact with the API

/**
 * Create a new user using the Karya API client.
 * This example demonstrates the creation of a new user with the name "typescript-client".
 * @returns A promise that resolves to the created user object.
 */
const user = await client.createUser(new CreateUserRequest('typescript-client'));

/**
 * Define a failure hook for triggering actions in case of plan execution failure.
 * In this example, an HTTP request will be sent to the specified endpoint if the plan fails.
 * @type {Hook} The hook that triggers an action on failure.
 */
const failure_hook = new Hook(
  Trigger.ON_FAILURE, // Trigger the hook on failure
  new RestApiRequest('eox7wbcodh9parh.m.pipedream.net'), // Action to execute (send REST API request)
);

/**
 * Define a REST API request action.
 * This is a planned action that will intentionally fail to demonstrate the failure hook.
 * @type {RestApiRequest} The REST API request action with an intentionally incorrect endpoint.
 */
const restAction = new RestApiRequest('eox7wbcodh9parh.m.pipedream.net--------will-fail');

/**
 * Prepare a plan submission request for the user.
 * This plan is a "OneTime" plan, which will run once, and it includes the failure hook.
 * @type {SubmitPlanRequest} The plan submission request with user details, plan type, and actions.
 */
const request = new SubmitPlanRequest(
  user.id, // The ID of the user for whom the plan is being created
  'Recurring api plan with failure hook', // A description of the plan
  'PT7S', // The period time (7 seconds)
  new OneTime(), // The plan type (OneTime)
  restAction, // The action associated with the plan (an API request)
  [failure_hook], // List of hooks (the failure hook in this case)
);

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

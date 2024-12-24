import { ClientConfig } from '../dist/karya/client/config.js';
import { KaryaRestClient } from '../dist/karya/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/karya/client/requests.js';
import { KafkaProducerRequest } from '../dist/karya/entities/actions.js';
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
 * Define a Kafka producer action for the plan.
 * This action will produce a message to a specified Kafka topic.
 * @type {KafkaProducerRequest} The Kafka producer request that sends a message to the Kafka topic.
 */
const action = new KafkaProducerRequest(
  'karya-topic', // The Kafka topic to which the message will be sent
  'Hello from karya typescript client', // The message to be sent to the Kafka topic
);

/**
 * Prepare a plan submission request for the user.
 * This plan is a recurring plan that will run periodically based on the specified period time.
 * @type {SubmitPlanRequest} The plan submission request that includes user details, plan type, and actions.
 */
const request = new SubmitPlanRequest(
  user.id, // The user ID for the plan
  'delayed kafka plan', // The description of the plan
  'PT7S', // The period time (in ISO 8601 duration format) for the recurring plan
  new Recurring(Date.now() + 10000), // Recurring plan type with an end date 10 seconds from now
  action, // The Kafka producer action to be executed
);

/**
 * Submit the plan to the Karya API.
 * The `submitPlan` method sends the plan request to the server and creates the plan.
 * @returns {Promise<Plan>} A promise that resolves to the created plan object.
 */
const plan = await client.submitPlan(request);
console.log(plan); // Log the created plan to the console

import { ClientConfig } from '../client/config.js';
import { KaryaRestClient } from '../client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../client/requests.js';
import { SlackMessageRequest } from '../entities/actions.js';
import { Recurring } from '../entities/plan-types.js';

const config = ClientConfig.dev();
const client = new KaryaRestClient(config);

const user = await client.createUser(new CreateUserRequest('typescript-client'));

const action = new SlackMessageRequest('slack-channel', 'Hello from karya typescript client');

const request = new SubmitPlanRequest(
  user.id,
  'recurring slack plan',
  'PT7S',
  new Recurring(Date.now() + 10000),
  action,
);

const plan = await client.submitPlan(request);
console.log(plan);

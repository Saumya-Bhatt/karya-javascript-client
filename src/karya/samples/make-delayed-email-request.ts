import { ClientConfig } from '../client/config.js';
import { KaryaRestClient } from '../client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../client/requests.js';
import { EmailRequest } from '../entities/actions.js';
import { OneTime } from '../entities/plan-types.js';

const config = ClientConfig.dev();
const client = new KaryaRestClient(config);

const user = await client.createUser(new CreateUserRequest('typescript-client'));

const action = new EmailRequest(
  'receipient@email.com',
  'Hello from karya typescript client',
  'Hello',
);

const request = new SubmitPlanRequest(user.id, 'delayed email plan', 'PT7S', new OneTime(), action);

const plan = await client.submitPlan(request);
console.log(plan);

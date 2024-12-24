import { ClientConfig } from '../client/config.js';
import { KaryaRestClient } from '../client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../client/requests.js';
import { RestApiRequest } from '../entities/actions.js';
import { Protocol, Method } from '../entities/constants.js';
import { Recurring } from '../entities/plan-types.js';

const config = ClientConfig.dev();
const client = new KaryaRestClient(config);

const user = await client.createUser(new CreateUserRequest('typescript-client'));
console.log(user);

const restAction = new RestApiRequest(
  'eox7wbcodh9parh.m.pipedream.net',
  new RestApiRequest.JsonBody({ message: 'Hello from typescript client' }),
  Protocol.HTTPS,
  Method.POST,
  { 'content-type': 'application/json' },
  2000,
);

const request = new SubmitPlanRequest(
  user.id,
  'recurring api plan',
  'PT7S',
  new Recurring(Date.now() + 10000),
  restAction,
);

const plan = await client.submitPlan(request);
console.log(plan);

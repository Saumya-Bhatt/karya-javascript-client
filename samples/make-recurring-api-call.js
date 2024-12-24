import { ClientConfig } from '../dist/karya/client/config.js';
import { KaryaRestClient } from '../dist/karya/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/karya/client/requests.js';
import { RestApiRequest } from '../dist/karya/entities/actions.js';
import { Protocol, Method } from '../dist/karya/entities/constants.js';
import { Recurring } from '../dist/karya/entities/plan-types.js';

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

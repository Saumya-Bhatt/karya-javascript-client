import { ClientConfig } from '../dist/karya/client/config.js';
import { KaryaRestClient } from '../dist/karya/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/karya/client/requests.js';
import { ChainedRequest, RestApiRequest } from '../dist/karya/entities/actions.js';
import { OneTime, Recurring } from '../dist/karya/entities/plan-types.js';

const config = ClientConfig.dev();
const client = new KaryaRestClient(config);

const user = await client.createUser(new CreateUserRequest('typescript-client'));

const chained_action = new ChainedRequest(
  new SubmitPlanRequest(
    user.id,
    'recurring api plan',
    'PT7S',
    new Recurring(Date.now() + 10000),
    new RestApiRequest('eox7wbcodh9parh.m.pipedream.net'),
  ),
);

const chained_request = new SubmitPlanRequest(
  user.id,
  'delayed chained api plan',
  'PT7S',
  new OneTime(),
  chained_action,
);

const plan = await client.submitPlan(chained_request);
console.log(plan);

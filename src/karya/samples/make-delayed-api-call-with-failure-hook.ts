import { ClientConfig } from '../client/config.js';
import { KaryaRestClient } from '../client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../client/requests.js';
import { RestApiRequest } from '../entities/actions.js';
import { Trigger } from '../entities/constants.js';
import { OneTime } from '../entities/plan-types.js';
import { Hook } from '../entities/models.js';

const config = ClientConfig.dev();
const client = new KaryaRestClient(config);

const user = await client.createUser(new CreateUserRequest('typescript-client'));

const failure_hook = new Hook(
  Trigger.ON_FAILURE,
  new RestApiRequest('eox7wbcodh9parh.m.pipedream.net'),
);

const restAction = new RestApiRequest('eox7wbcodh9parh.m.pipedream.net--------will-fail');

const request = new SubmitPlanRequest(
  user.id,
  'Recurring api plan with failure hook',
  'PT7S',
  new OneTime(),
  restAction,
  [failure_hook],
);

const plan = await client.submitPlan(request);
console.log(plan);

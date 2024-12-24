import { ClientConfig } from '../dist/karya/client/config.js';
import { KaryaRestClient } from '../dist/karya/client/karya-rest-client.js';
import { CreateUserRequest, SubmitPlanRequest } from '../dist/karya/client/requests.js';
import { RestApiRequest } from '../dist/karya/entities/actions.js';
import { Trigger } from '../dist/karya/entities/constants.js';
import { OneTime } from '../dist/karya/entities/plan-types.js';
import { Hook } from '../dist/karya/entities/models.js';

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

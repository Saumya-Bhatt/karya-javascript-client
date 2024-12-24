import { ClientConfig } from "../client/config.js";
import { KaryaRestClient } from "../client/karya-rest-client.js";
import { CreateUserRequest, SubmitPlanRequest } from "../client/requests.js";
import { RestApiRequest } from "../entities/actions.js";
import { Trigger } from "../entities/constants.js";
import { OneTime } from "../entities/plan-types.js";
import { Hook } from "../entities/models.js";

let config = ClientConfig.dev()
let client = new KaryaRestClient(config)

let user = await client.createUser(new CreateUserRequest("typescript-client"))

let failure_hook = new Hook(
    Trigger.ON_FAILURE,
    new RestApiRequest("eox7wbcodh9parh.m.pipedream.net")
)

let restAction = new RestApiRequest("eox7wbcodh9parh.m.pipedream.net--------will-fail")

let request = new SubmitPlanRequest(
    user.id,
    "Recurring api plan with failure hook",
    "PT7S",
    new OneTime(),
    restAction,
    [failure_hook]
)

let plan = await client.submitPlan(request)
console.log(plan)

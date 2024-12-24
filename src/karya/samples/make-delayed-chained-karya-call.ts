import { ClientConfig } from "../client/config.js";
import { KaryaRestClient } from "../client/karya-rest-client.js";
import { CreateUserRequest, SubmitPlanRequest } from "../client/requests.js";
import { ChainedRequest, RestApiRequest } from "../entities/actions.js";
import { OneTime, Recurring } from "../entities/plan-types.js";

let config = ClientConfig.dev()
let client = new KaryaRestClient(config)

let user = await client.createUser(new CreateUserRequest("typescript-client"))

let chained_action = new ChainedRequest(
    new SubmitPlanRequest(
        user.id,
        "recurring api plan",
        "PT7S",
        new Recurring(Date.now() + 10000),
        new RestApiRequest("eox7wbcodh9parh.m.pipedream.net")
    )
)

let chained_request = new SubmitPlanRequest(
    user.id,
    "delayed chained api plan",
    "PT7S",
    new OneTime(),
    chained_action
)

let plan = await client.submitPlan(chained_request)
console.log(plan)
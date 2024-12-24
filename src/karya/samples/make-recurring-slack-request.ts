import { ClientConfig } from "../client/config.js";
import { KaryaRestClient } from "../client/karya-rest-client.js";
import { CreateUserRequest, SubmitPlanRequest } from "../client/requests.js";
import { SlackMessageRequest } from "../entities/actions.js";
import { Recurring } from "../entities/plan-types.js";

let config = ClientConfig.dev()
let client = new KaryaRestClient(config)

let user = await client.createUser(new CreateUserRequest("typescript-client"))

let action = new SlackMessageRequest(
    "slack-channel",
    "Hello from karya typescript client"
)

let request = new SubmitPlanRequest(
    user.id,
    "recurring slack plan",
    "PT7S",
    new Recurring(Date.now() + 10000),
    action
)

let plan = await client.submitPlan(request)
console.log(plan)
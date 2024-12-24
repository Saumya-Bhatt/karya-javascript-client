import { ClientConfig } from "../client/config.js";
import { KaryaRestClient } from "../client/karya-rest-client.js";
import { CreateUserRequest, SubmitPlanRequest } from "../client/requests.js";
import { EmailRequest } from "../entities/actions.js";
import { OneTime } from "../entities/plan-types.js";

let config = ClientConfig.dev()
let client = new KaryaRestClient(config)

let user = await client.createUser(new CreateUserRequest("typescript-client"))

let action = new EmailRequest(
    "receipient@email.com",
    "Hello from karya typescript client",
    "Hello",
)

let request = new SubmitPlanRequest(
    user.id,
    "delayed email plan",
    "PT7S",
    new OneTime(),
    action
)

let plan = await client.submitPlan(request)
console.log(plan)
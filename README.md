# Karya Javascript Client

This here is the Javascript client to interract with [Karya - the open sourced distributed job scheduler](https://github.com/Saumya-Bhatt/karya)

- [API Docs](https://saumya-bhatt.github.io/karya-javascript-client)
- [How to contribute](./.github/CONTRIBUTING.md)

---

## Getting Started

This section highlights the steps to get started with the Karya Python client.

### Installation

```shell
    npm install karya-client
```

The distribution files can also be found here - [Github Release](https://github.com/Saumya-Bhatt/karya-javascript-client/releases).

### Useage Examples

A list of samples to configure different plans with various actions and hooks can be found [here](./samples/)

### Using the Client

1. Create a config object:

   ```javascript
   import { ClientConfig } from 'karya-client';

   ## point this to where the Karya server is running
   const config = new ClientConfig({
       protocol: 'HTTP',
       host: 'localhost',
       port: 8080
   });

   ## For localsetup, a default config is provided as: ClientConfig.dev()
   ```

2. Create a client object:

   ```javascript
    import { KaryaRestClient } from 'karya-client';

    const client = new KaryaRestClient(config);
    ```

3. Creat a user. Only a user configured in the Karya server can be used to create a client object.

    ```javascript
    import { CreateUserRequest } from 'karya-client';
    
    const create_user_request = new CreateUserRequest({name: "javascript-client"});
    const user = await client.create_user(create_user_request);
    ```

4. Specify the action that you would want to trigger once the task is scheduled.

    ```javascript

    const restAction = new RestApiRequest(
    'localhost', // The base URL for the REST API request
    new RestApiRequest.JsonBody({ message: 'Hello from typescript client' }), // JSON body for the request
    Protocol.HTTPS, // The protocol to be used for the request (HTTPS)
    Method.POST, // The HTTP method to be used (POST)
    { 'content-type': 'application/json' }, // HTTP headers for the request
    2000, // Timeout for the request in milliseconds (2 seconds)
    );
    ```

5. Submit the plan to Karya.

   > `period_time` has to be in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) format.

   ```javascript
   const request = new SubmitPlanRequest(
        user.id, // The user ID for the plan
        'recurring api plan', // The description of the plan
        'PT7S', // The period time (in ISO 8601 duration format) for the recurring plan
        new Recurring(Date.now() + 10000), // Recurring plan type with an end date 10 seconds from now
        restAction, // The REST API action to be executed
    );
    const plan = await client.submitPlan(request);
   ```

6. And you're done! The plan will be executed as per the schedule:

   - The action will be triggered every 7 seconds.
   - The action will make a POST request to `localhost` with the JSON body `{"message": "Hello from python client"}`
   - The request will have a timeout of 2 seconds.

---

## Plan Type

Karya supports the following plan types:

### One Time

This can be used to trigger a delayed action.

```javascript
import { OneTime } from 'karya-client';

const oneTime = new OneTime();
```

### Recurring

This can be used to trigger an action at regular intervals.

```javascript
import { Recurring } from 'karya-client';

const recurring = new Recurring(Date.now() + 10000);
```

---

## Actions

Actions define what Karya should do once it has to execute the plan. The client supports the following actions:

### REST API Request

Make a REST API request to a specified URL with the given parameters.

```javascript
import { RestApiRequest, Protocol, Method } from 'karya-client';

const restAction = new RestApiRequest(
    'localhost', // The base URL for the REST API request
    new RestApiRequest.JsonBody({ message: 'Hello from typescript client' }), // JSON body for the request
    Protocol.HTTPS, // The protocol to be used for the request (HTTPS)
    Method.POST, // The HTTP method to be used (POST)
    { 'content-type': 'application/json' }, // HTTP headers for the request
    2000, // Timeout for the request in milliseconds (2 seconds)
);
```

### Push to Kafka

Push a message to a Kafka topic.

```javascript
import { KafkaProducerRequest } from 'karya-client';

const kafkaAction = new KafkaProducerRequest(
    'kafka-topic', // The Kafka topic to push the message to
    'Hello from typescript client', // The message to be pushed
);
```

### Send Email

Send an email to a specified email address.

```javascript
import { EmailRequest } from 'karya-client';

const emailAction = new EmailRequest(
    'receipient@email.com', // The recipient's email address
    'Hello from karya typescript client', // The subject of the email
    'Hello', // The body of the email
);
```

### Send a Slack Message

Send a message to a specified Slack channel.

```javascript
import { SlackMessage } from 'karya-client';

const slackAction = new SlackMessage(
    'slack-channel', // The Slack channel to send the message to
    'Hello from typescript client', // The message to be sent
);
```

### Chain another job

Chain another job to the current job.

```javascript
import { ChainedRequest  } from 'karya-client';

const chained_action = new ChainedRequest(
  new SubmitPlanRequest(
    user.id, // The ID of the user for whom the plan is being created
    'recurring api plan', // A description of the plan
    'PT7S', // The period time (7 seconds)
    new Recurring(Date.now() + 10000), // The plan type (Recurring), with an end time in 10 seconds
    new RestApiRequest('eox7wbcodh9parh.m.pipedream.net'), // The action for the plan (sending an API request)
  ),
);
```

---

## Hooks


```javascript
import { Hook, HookType } from 'karya-client';

const hook = new Hook(
    HookType.ON_FAILURE, // The type of hook (ON_FAILURE)
    restAction, // The action to be triggered
);
```

Hooks are used to trigger actions on certain triggers. The client supports the following hooks:

- `ON_FAILURE`: Trigger an action when the plan fails.
- `ON_COMPLETION`: Trigger an action when the plan completes successfully.

import { AbstractAction, AbstractBody } from './abstracts.js';
import { SubmitPlanRequest } from 'karya/client/requests.js';
import { Protocol, Method } from './constants.js';

// RestApiRequest class
export class RestApiRequest extends AbstractAction {
  base_url: string;
  body: AbstractBody;
  protocol: Protocol;
  method: Method;
  headers: Record<string, string>;
  timeout: number;
  type: string;

  constructor(
    base_url: string,
    body: AbstractBody = new RestApiRequest.EmptyBody(),
    protocol: Protocol = Protocol.HTTP,
    method: Method = Method.GET,
    headers: Record<string, string> = { 'content-type': 'application/json' },
    timeout: number = 2000,
  ) {
    super();
    this.base_url = base_url;
    this.body = body;
    this.protocol = protocol;
    this.method = method;
    this.headers = headers;
    this.timeout = timeout;
    this.type = 'karya.core.entities.Action.RestApiRequest';
  }

  // Nested classes for body types
  static AbstractBody = AbstractBody;

  static JsonBody = class extends AbstractBody {
    json_string: string;
    type: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data: Record<string, any>) {
      super();
      this.json_string = JSON.stringify(data);
      this.type = 'karya.core.entities.http.Body.JsonBody';
    }
  };

  static EmptyBody = class extends AbstractBody {
    type: string;

    constructor() {
      super();
      this.type = 'karya.core.entities.http.Body.EmptyBody';
    }
  };
}

// KafkaProducerRequest class
export class KafkaProducerRequest extends AbstractAction {
  topic: string;
  message: string;
  key?: string;
  type: string;

  constructor(topic: string, message: string, key?: string) {
    super();
    this.topic = topic;
    this.message = message;
    this.key = key;
    this.type = 'karya.core.entities.Action.KafkaProducerRequest';
  }
}

// ChainedRequest class
export class ChainedRequest extends AbstractAction {
  request: SubmitPlanRequest;
  type: string;

  constructor(request: SubmitPlanRequest) {
    super();
    this.request = request;
    this.type = 'karya.core.entities.Action.ChainedRequest';
  }
}

// EmailRequest class
export class EmailRequest extends AbstractAction {
  recipient: string;
  subject: string;
  message: string;
  type: string;

  constructor(recipient: string, subject: string, message: string) {
    super();
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
    this.type = 'karya.core.entities.Action.EmailRequest';
  }
}

// SlackMessageRequest class
export class SlackMessageRequest extends AbstractAction {
  channel: string;
  message: string;
  type: string;

  constructor(channel: string, message: string) {
    super();
    this.channel = channel;
    this.message = message;
    this.type = 'karya.core.entities.Action.SlackMessageRequest';
  }
}

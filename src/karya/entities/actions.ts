import { AbstractAction, AbstractBody } from './abstracts.js';
import { SubmitPlanRequest } from 'karya/client/requests.js';
import { Protocol, Method } from './constants.js';

/**
 * Class representing a REST API request action.
 * This action sends an HTTP request to a given `base_url` with specified HTTP method, headers, body, and timeout.
 */
export class RestApiRequest extends AbstractAction {
  /** The base URL for the API request. */
  base_url: string;

  /** The body of the API request, which can be a custom or empty body. */
  body: AbstractBody;

  /** The protocol used for the request (e.g., HTTP or HTTPS). */
  protocol: Protocol;

  /** The HTTP method (GET, POST, etc.) used for the request. */
  method: Method;

  /** The headers for the request, represented as key-value pairs. */
  headers: Record<string, string>;

  /** The timeout for the request in milliseconds. */
  timeout: number;

  /** The type of the action, specific to REST API requests. */
  type: string;

  /**
   * Creates an instance of the `RestApiRequest` class.
   * @param base_url - The base URL for the API request.
   * @param body - The body of the API request. Defaults to an empty body if not provided.
   * @param protocol - The protocol to use for the request. Defaults to HTTP.
   * @param method - The HTTP method for the request. Defaults to GET.
   * @param headers - The headers for the request. Defaults to `{ 'content-type': 'application/json' }`.
   * @param timeout - The timeout in milliseconds for the request. Defaults to 2000 ms.
   */
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

  /** A reference to the AbstractBody class. */
  static AbstractBody = AbstractBody;

  /**
   * Class representing a JSON body for the REST API request.
   * Serializes data into a JSON string for use in the request body.
   */
  static JsonBody = class extends AbstractBody {
    /** The JSON string representation of the request body. */
    json_string: string;

    /** The type of the body, specific to JSON bodies. */
    type: string;

    /**
     * Creates an instance of the `JsonBody` class.
     * @param data - The data to be serialized into a JSON string.
     */
    constructor(
      data: Record<string, /* eslint-disable-line @typescript-eslint/no-explicit-any */ any>,
    ) {
      super();
      this.json_string = JSON.stringify(data);
      this.type = 'karya.core.entities.http.Body.JsonBody';
    }
  };

  /**
   * Class representing an empty body for the REST API request.
   * This can be used when no body is required in the request.
   */
  static EmptyBody = class extends AbstractBody {
    /** The type of the body, specific to empty bodies. */
    type: string;

    /** Creates an instance of the `EmptyBody` class. */
    constructor() {
      super();
      this.type = 'karya.core.entities.http.Body.EmptyBody';
    }
  };
}

/**
 * Class representing a Kafka producer request.
 * This action sends a message to a Kafka topic, optionally including a key for the message.
 */
export class KafkaProducerRequest extends AbstractAction {
  /** The Kafka topic to which the message will be sent. */
  topic: string;

  /** The message to be sent to the Kafka topic. */
  message: string;

  /** The optional key associated with the message. */
  key?: string;

  /** The type of the action, specific to Kafka producer requests. */
  type: string;

  /**
   * Creates an instance of the `KafkaProducerRequest` class.
   * @param topic - The Kafka topic to send the message to.
   * @param message - The message to be sent to the Kafka topic.
   * @param key - The optional key for the Kafka message.
   */
  constructor(topic: string, message: string, key?: string) {
    super();
    this.topic = topic;
    this.message = message;
    this.key = key;
    this.type = 'karya.core.entities.Action.KafkaProducerRequest';
  }
}

/**
 * Class representing a chained request.
 * This action wraps a `SubmitPlanRequest` to be executed as part of a sequence of actions.
 */
export class ChainedRequest extends AbstractAction {
  /** The `SubmitPlanRequest` that is wrapped in this chained request. */
  request: SubmitPlanRequest;

  /** The type of the action, specific to chained requests. */
  type: string;

  /**
   * Creates an instance of the `ChainedRequest` class.
   * @param request - The `SubmitPlanRequest` to be executed in the chain.
   */
  constructor(request: SubmitPlanRequest) {
    super();
    this.request = request;
    this.type = 'karya.core.entities.Action.ChainedRequest';
  }
}

/**
 * Class representing an email request action.
 * This action sends an email to a specified recipient with a subject and message.
 */
export class EmailRequest extends AbstractAction {
  /** The recipient of the email. */
  recipient: string;

  /** The subject of the email. */
  subject: string;

  /** The body content of the email. */
  message: string;

  /** The type of the action, specific to email requests. */
  type: string;

  /**
   * Creates an instance of the `EmailRequest` class.
   * @param recipient - The recipient's email address.
   * @param subject - The subject of the email.
   * @param message - The body content of the email.
   */
  constructor(recipient: string, subject: string, message: string) {
    super();
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
    this.type = 'karya.core.entities.Action.EmailRequest';
  }
}

/**
 * Class representing a Slack message request action.
 * This action sends a message to a specified Slack channel.
 */
export class SlackMessageRequest extends AbstractAction {
  /** The Slack channel to which the message will be sent. */
  channel: string;

  /** The message to be sent to the Slack channel. */
  message: string;

  /** The type of the action, specific to Slack message requests. */
  type: string;

  /**
   * Creates an instance of the `SlackMessageRequest` class.
   * @param channel - The Slack channel to send the message to.
   * @param message - The message to be sent to the Slack channel.
   */
  constructor(channel: string, message: string) {
    super();
    this.channel = channel;
    this.message = message;
    this.type = 'karya.core.entities.Action.SlackMessageRequest';
  }
}

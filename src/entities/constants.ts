/**
 * Enum representing the supported protocols for client-server communication.
 * Used to define whether the connection should use HTTP or HTTPS.
 */
export enum Protocol {
  /** HTTP protocol. */
  HTTP = 'HTTP',

  /** HTTPS protocol. */
  HTTPS = 'HTTPS',
}

/**
 * Enum representing the different HTTP request methods.
 * Used to specify the type of HTTP request in API interactions.
 */
export enum Method {
  /** HTTP GET method. Used for retrieving data. */
  GET = 'GET',

  /** HTTP POST method. Used for creating new resources. */
  POST = 'POST',

  /** HTTP PATCH method. Used for partially updating resources. */
  PATCH = 'PATCH',

  /** HTTP DELETE method. Used for removing resources. */
  DELETE = 'DELETE',
}

/**
 * Enum representing the possible statuses of a plan.
 * Used to track the state of a plan during its lifecycle.
 */
export enum PlanStatus {
  /** Plan has been created but not yet started. */
  CREATED = 'CREATED',

  /** Plan is currently in progress. */
  RUNNING = 'RUNNING',

  /** Plan has completed successfully. */
  COMPLETED = 'COMPLETED',

  /** Plan was cancelled before completion. */
  CANCELLED = 'CANCELLED',
}

/**
 * Enum representing the possible statuses of a task.
 * Used to track the state of a task within a plan or process.
 */
export enum TaskStatus {
  /** Task has been created but not yet started. */
  CREATED = 'CREATED',

  /** Task is currently being processed. */
  PROCESSING = 'PROCESSING',

  /** Task completed successfully. */
  SUCCESS = 'SUCCESS',

  /** Task failed to complete. */
  FAILURE = 'FAILURE',

  /** Task was cancelled before completion. */
  CANCELLED = 'CANCELLED',
}

/**
 * Enum representing the possible triggers for an action.
 * Used to specify when an action should be triggered based on the state of a task or plan.
 */
export enum Trigger {
  /** Action is triggered when a task or plan fails. */
  ON_FAILURE = 'ON_FAILURE',

  /** Action is triggered when a task or plan completes. */
  ON_COMPLETION = 'ON_COMPLETION',
}

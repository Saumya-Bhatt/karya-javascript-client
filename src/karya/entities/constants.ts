// Protocol Enum
export enum Protocol {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
}

// Method Enum
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// PlanStatus Enum
export enum PlanStatus {
  CREATED = 'CREATED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// TaskStatus Enum
export enum TaskStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CANCELLED = 'CANCELLED',
}

// Trigger Enum
export enum Trigger {
  ON_FAILURE = 'ON_FAILURE',
  ON_COMPLETION = 'ON_COMPLETION',
}

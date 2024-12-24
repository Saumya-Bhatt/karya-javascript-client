import { AbstractAction, AbstractPlanType, AbstractErrorLogType } from './abstracts.js';
import { Trigger, TaskStatus, PlanStatus } from './constants.js';

/**
 * Represents a user in the system.
 * A user is defined by an ID, name, and the time they were created.
 */
export class User {
  /** The unique identifier for the user. */
  id: string;

  /** The name of the user. */
  name: string;

  /** The timestamp (in milliseconds) when the user was created. */
  created_at: number;

  /**
   * Creates an instance of the `User` class.
   * @param data - The user data containing `id`, `name`, and `created_at`.
   */
  constructor(data: { id: string; name: string; created_at: number }) {
    this.id = data.id;
    this.name = data.name;
    this.created_at = data.created_at;
  }
}

/**
 * Represents a task in a plan.
 * A task is associated with a plan and can have various statuses, execution times, and retries.
 */
export class Task {
  /** The unique identifier for the task. */
  id: string;

  /** The ID of the plan this task belongs to. */
  plan_id: string;

  /** A partition key for sharding or distribution. */
  partition_key: number;

  /** The status of the task (e.g., CREATED, PROCESSING, SUCCESS). */
  status: TaskStatus;

  /** The timestamp (in milliseconds) when the task was created. */
  created_at: number;

  /** The timestamp (in milliseconds) when the task was executed. Optional. */
  executed_at?: number;

  /** The timestamp (in milliseconds) when the task is scheduled to be executed next. Optional. */
  next_execution_at?: number;

  /**
   * Creates an instance of the `Task` class.
   * @param id - The unique identifier for the task.
   * @param plan_id - The ID of the plan this task belongs to.
   * @param partition_key - A partition key for sharding or distribution.
   * @param status - The status of the task (e.g., CREATED, PROCESSING, SUCCESS).
   * @param created_at - The timestamp when the task was created.
   * @param executed_at - The timestamp when the task was executed. Optional.
   * @param next_execution_at - The timestamp for the next task execution. Optional.
   */
  constructor(
    id: string,
    plan_id: string,
    partition_key: number,
    status: TaskStatus,
    created_at: number,
    executed_at?: number,
    next_execution_at?: number,
  ) {
    this.id = id;
    this.plan_id = plan_id;
    this.partition_key = partition_key;
    this.status = status;
    this.created_at = created_at;
    this.executed_at = executed_at;
    this.next_execution_at = next_execution_at;
  }
}

/**
 * Represents a hook in the system.
 * A hook is an action triggered by an event, defined by a trigger and an action to be executed.
 */
export class Hook {
  /** The trigger event that activates the hook (e.g., ON_FAILURE, ON_COMPLETION). */
  trigger: Trigger;

  /** The action to be executed when the hook is triggered. */
  action: AbstractAction;

  /** The maximum number of retries for the action if it fails. */
  max_retry: number;

  /**
   * Creates an instance of the `Hook` class.
   * @param trigger - The trigger event for the hook.
   * @param action - The action to be executed when the hook is triggered.
   * @param max_retry - The maximum number of retries for the action if it fails. Defaults to 3.
   */
  constructor(trigger: Trigger, action: AbstractAction, max_retry: number = 3) {
    this.trigger = trigger;
    this.action = action;
    this.max_retry = max_retry;
  }
}

/**
 * Represents a plan in the system.
 * A plan contains multiple tasks and hooks, and tracks its status and retries.
 */
export class Plan {
  /** The unique identifier for the plan. */
  id: string;

  /** The ID of the user who created the plan. */
  user_id: string;

  /** A description of the plan. */
  description: string;

  /** The period of time (e.g., "daily", "weekly") for which the plan repeats. */
  period_time: string;

  /** The type of the plan (e.g., recurring, one-time). */
  type: AbstractPlanType;

  /** The status of the plan (e.g., CREATED, RUNNING, COMPLETED). */
  status: PlanStatus;

  /** The maximum number of failure retries for tasks in the plan. */
  max_failure_retry: number;

  /** The action to be executed as part of the plan. */
  action: AbstractAction;

  /** A list of hooks associated with the plan. */
  hook: Hook[];

  /** The parent plan ID, if this plan is a sub-plan. Optional. */
  parent_plan_id?: string;

  /** The timestamp (in milliseconds) when the plan was created. */
  created_at: number;

  /** The timestamp (in milliseconds) when the plan was last updated. */
  updated_at: number;

  /**
   * Creates an instance of the `Plan` class.
   * @param data - The plan data including ID, user ID, description, type, status, max failure retry, action, hooks, and timestamps.
   */
  constructor(data: {
    id: string;
    user_id: string;
    description: string;
    period_time: string;
    type: AbstractPlanType;
    status: PlanStatus;
    max_failure_retry: number;
    action: AbstractAction;
    hook: Hook[];
    parent_plan_id?: string;
    created_at: number;
    updated_at: number;
  }) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.description = data.description;
    this.period_time = data.period_time;
    this.type = data.type;
    this.status = data.status;
    this.max_failure_retry = data.max_failure_retry;
    this.action = data.action;
    this.hook = data.hook;
    this.parent_plan_id = data.parent_plan_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

/**
 * Represents an error log in the system.
 * An error log is created when an error occurs in a plan or task, and it contains details about the error.
 */
export class ErrorLog {
  /** The ID of the plan where the error occurred. */
  plan_id: string;

  /** The error message. */
  error: string;

  /** The type of error log (e.g., HookErrorLog, ExecutorErrorLog). */
  type: AbstractErrorLogType;

  /** The timestamp (in milliseconds) when the error occurred. */
  timestamp: number;

  /**
   * Creates an instance of the `ErrorLog` class.
   * @param plan_id - The ID of the plan where the error occurred.
   * @param error - The error message.
   * @param type - The type of the error log.
   * @param timestamp - The timestamp when the error occurred.
   */
  constructor(plan_id: string, error: string, type: AbstractErrorLogType, timestamp: number) {
    this.plan_id = plan_id;
    this.error = error;
    this.type = type;
    this.timestamp = timestamp;
  }

  /**
   * Represents an error log related to a hook failure.
   * This is a nested class within `ErrorLog`.
   */
  static HookErrorLog = class extends AbstractErrorLogType {
    /** Creates an instance of the `HookErrorLog` class. */
    constructor() {
      super();
    }
  };

  /**
   * Represents an error log related to a task execution failure.
   * This is a nested class within `ErrorLog`.
   */
  static ExecutorErrorLog = class extends AbstractErrorLogType {
    /** The ID of the task that failed. */
    task_id: string;

    /**
     * Creates an instance of the `ExecutorErrorLog` class.
     * @param task_id - The ID of the task that failed.
     */
    constructor(task_id: string) {
      super();
      this.task_id = task_id;
    }
  };
}

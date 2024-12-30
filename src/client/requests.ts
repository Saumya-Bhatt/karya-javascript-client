import { AbstractAction, AbstractPlanType } from '../entities/abstracts.js';
import { Hook } from '../entities/models.js';

/**
 * Represents a request to create a new user.
 * Contains the name of the user to be created.
 */
export class CreateUserRequest {
  /** The name of the user to be created. */
  name: string;

  /**
   * Creates an instance of the `CreateUserRequest` class.
   * @param name - The name of the user to be created.
   */
  constructor(name: string) {
    this.name = name;
  }
}

/**
 * Represents a request to submit a new plan.
 * Contains details about the user, plan type, action, hooks, and retries.
 */
export class SubmitPlanRequest {
  /** The ID of the user who is submitting the plan. */
  user_id: string;

  /** A description of the plan. */
  description: string;

  /** The period of time for which the plan will be executed (e.g., "daily", "weekly"). */
  period_time: string;

  /** The type of the plan (e.g., recurring, one-time). */
  plan_type: AbstractPlanType;

  /** The action that should be executed as part of the plan. */
  action: AbstractAction;

  /** A list of hooks that are associated with the plan. */
  hooks: Hook[] = [];

  /** The maximum number of failure retries for tasks in the plan. Defaults to 3. */
  max_failure_retry: number = 3;

  /**
   * Creates an instance of the `SubmitPlanRequest` class.
   * @param user_id - The ID of the user submitting the plan.
   * @param description - A description of the plan.
   * @param period_time - The period of time (e.g., "daily", "weekly") for plan execution.
   * @param plan_type - The type of the plan (e.g., recurring, one-time).
   * @param action - The action to be executed as part of the plan.
   * @param hooks - A list of hooks to be triggered by the plan. Defaults to an empty array.
   * @param max_failure_retry - The maximum number of failure retries for tasks. Defaults to 3.
   */
  constructor(
    user_id: string,
    description: string,
    period_time: string,
    plan_type: AbstractPlanType,
    action: AbstractAction,
    hooks: Hook[] = [],
    max_failure_retry: number = 3,
  ) {
    this.user_id = user_id;
    this.description = description;
    this.period_time = period_time;
    this.plan_type = plan_type;
    this.action = action;
    this.hooks = hooks;
    this.max_failure_retry = max_failure_retry;
  }
}

/**
 * Represents a request to update an existing plan.
 * Contains optional parameters to modify the plan's period time, failure retries, and hooks.
 */
export class UpdatePlanRequest {
  /** The unique ID of the plan to be updated. */
  plan_id: string;

  /** The new period time for the plan (e.g., "daily", "weekly"). Optional. */
  period_time?: string;

  /** The new maximum number of failure retries for the plan. Optional. */
  max_failure_retry?: number;

  /** The new list of hooks to be associated with the plan. Optional. */
  hooks?: Hook[];

  /**
   * Creates an instance of the `UpdatePlanRequest` class.
   * @param plan_id - The ID of the plan to be updated.
   * @param period_time - The new period time for the plan. Optional.
   * @param max_failure_retry - The new maximum number of failure retries. Optional.
   * @param hooks - The new list of hooks for the plan. Optional.
   */
  constructor(plan_id: string, period_time?: string, max_failure_retry?: number, hooks?: Hook[]) {
    this.plan_id = plan_id;
    this.period_time = period_time;
    this.max_failure_retry = max_failure_retry;
    this.hooks = hooks;
  }
}

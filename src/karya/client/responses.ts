import { Plan, Task, ErrorLog } from '../entities/models.js';

/**
 * Represents the response structure for retrieving a single plan.
 * Contains the plan and its latest associated task.
 */
export class GetPlanResponse {
  /** The plan associated with the response. */
  plan: Plan;

  /** The latest task associated with the plan. */
  latestTask: Task;

  /**
   * Creates an instance of the `GetPlanResponse` class.
   * @param data - The data containing the plan and the latest task.
   * @param data.plan - The plan that is being returned in the response.
   * @param data.latestTask - The latest task associated with the plan.
   */
  constructor(data: { plan: Plan; latestTask: Task }) {
    this.plan = data.plan;
    this.latestTask = data.latestTask;
  }
}

/**
 * Represents the response structure for retrieving a plan summary.
 * Contains the plan, a list of tasks, and any associated error logs.
 */
export class GetSummaryResponse {
  /** The plan associated with the response. */
  plan: Plan;

  /** A list of tasks related to the plan. */
  tasks: Task[];

  /** A list of error logs associated with the plan or its tasks. */
  errorLogs: ErrorLog[];

  /**
   * Creates an instance of the `GetSummaryResponse` class.
   * @param data - The data containing the plan, tasks, and error logs.
   * @param data.plan - The plan being returned in the response.
   * @param data.tasks - A list of tasks associated with the plan.
   * @param data.errorLogs - A list of error logs associated with the plan or tasks.
   */
  constructor(data: { plan: Plan; tasks: Task[]; errorLogs: ErrorLog[] }) {
    this.plan = data.plan;
    this.tasks = data.tasks;
    this.errorLogs = data.errorLogs;
  }
}

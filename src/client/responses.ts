import { Plan, Task, ErrorLog } from '../entities/models.js';

/**
 * Represents the response structure for retrieving a single plan.
 * Contains the plan and its latest associated task.
 */
export class GetPlanResponse {
  /** The plan associated with the response. */
  plan: Plan;

  /** The latest task associated with the plan. */
  latest_task: Task;

  /**
   * Creates an instance of the `GetPlanResponse` class.
   * @param data - The data containing the plan and the latest task.
   * @param data.plan - The plan that is being returned in the response.
   * @param data.latest_task - The latest task associated with the plan.
   */
  constructor(data: { plan: Plan; latest_task: Task }) {
    this.plan = data.plan;
    this.latest_task = data.latest_task;
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
  error_logs: ErrorLog[];

  /**
   * Creates an instance of the `GetSummaryResponse` class.
   * @param data - The data containing the plan, tasks, and error logs.
   * @param data.plan - The plan being returned in the response.
   * @param data.tasks - A list of tasks associated with the plan.
   * @param data.error_logs - A list of error logs associated with the plan or tasks.
   */
  constructor(data: { plan: Plan; tasks: Task[]; error_logs: ErrorLog[] }) {
    this.plan = data.plan;
    this.tasks = data.tasks;
    this.error_logs = data.error_logs;
  }
}

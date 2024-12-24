import { Plan, Task, ErrorLog } from '../entities/models.js';

// GetPlanResponse Interface
export class GetPlanResponse {
  plan: Plan;
  latestTask: Task;

  constructor(data: { plan: Plan; latestTask: Task }) {
    this.plan = data.plan;
    this.latestTask = data.latestTask;
  }
}

// GetSummaryResponse Interface
export class GetSummaryResponse {
  plan: Plan;
  tasks: Task[];
  errorLogs: ErrorLog[];

  constructor(data: { plan: Plan; tasks: Task[]; errorLogs: ErrorLog[] }) {
    this.plan = data.plan;
    this.tasks = data.tasks;
    this.errorLogs = data.errorLogs;
  }
}

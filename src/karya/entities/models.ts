import { AbstractAction, AbstractPlanType, AbstractErrorLogType } from './abstracts.js'
import { Trigger, TaskStatus, PlanStatus } from './constants.js'

// User class
export class User {
    id: string;
    name: string;
    created_at: number;

    constructor(data: {id: string, name: string, created_at: number}) {
        this.id = data.id;
        this.name = data.name;
        this.created_at = data.created_at;
    }
}

// Task class
export class Task {
    id: string;
    plan_id: string;
    partition_key: number;
    status: TaskStatus;
    created_at: number;
    executed_at?: number;
    next_execution_at?: number;

    constructor(
        id: string,
        plan_id: string,
        partition_key: number,
        status: TaskStatus,
        created_at: number,
        executed_at?: number,
        next_execution_at?: number
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

// Hook class
export class Hook {
    trigger: Trigger;
    action: AbstractAction;
    max_retry: number;

    constructor(trigger: Trigger, action: AbstractAction, max_retry: number = 3) {
        this.trigger = trigger;
        this.action = action;
        this.max_retry = max_retry;
    }
}

// Plan class
export class Plan {
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

    constructor(data: {id: string, user_id: string, description: string, period_time: string, type: AbstractPlanType, status: PlanStatus, max_failure_retry: number, action: AbstractAction, hook: Hook[], parent_plan_id?: string, created_at: number, updated_at: number}) {
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

// ErrorLog class
export class ErrorLog {
    plan_id: string;
    error: string;
    type: AbstractErrorLogType;
    timestamp: number;

    constructor(plan_id: string, error: string, type: AbstractErrorLogType, timestamp: number) {
        this.plan_id = plan_id;
        this.error = error;
        this.type = type;
        this.timestamp = timestamp;
    }

    // HookErrorLog class (nested)
    static HookErrorLog = class extends AbstractErrorLogType {
        constructor() {
            super();
        }
    };

    // ExecutorErrorLog class (nested)
    static ExecutorErrorLog = class extends AbstractErrorLogType {
        task_id: string;

        constructor(task_id: string) {
            super();
            this.task_id = task_id;
        }
    };
}
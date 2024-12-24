import { AbstractAction, AbstractPlanType } from '../entities/abstracts.js';
import { Hook } from '../entities/models.js';

// CreateUserRequest class
export class CreateUserRequest {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// SubmitPlanRequest class
export class SubmitPlanRequest {
    user_id: string;
    description: string;
    period_time: string;
    plan_type: AbstractPlanType;
    action: AbstractAction;
    hooks: Hook[] = [];
    max_failure_retry: number = 3;

    constructor(
        user_id: string,
        description: string,
        period_time: string,
        plan_type: AbstractPlanType,
        action: AbstractAction,
        hooks: Hook[] = [],
        max_failure_retry: number = 3
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

// UpdatePlanRequest class
export class UpdatePlanRequest {
    planId: string;
    periodTime?: string;
    maxFailureRetry?: number;
    hooks?: Hook[];

    constructor(
        planId: string,
        periodTime?: string,
        maxFailureRetry?: number,
        hooks?: Hook[]
    ) {
        this.planId = planId;
        this.periodTime = periodTime;
        this.maxFailureRetry = maxFailureRetry;
        this.hooks = hooks;
    }
}

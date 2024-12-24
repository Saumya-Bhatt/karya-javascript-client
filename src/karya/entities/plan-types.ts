import { AbstractPlanType } from "./abstracts.js";

// Recurring class
export class Recurring extends AbstractPlanType {
    end_at?: number; // Optional end date for the recurring plan (Unix timestamp)
    type: string = "karya.core.entities.PlanType.Recurring";

    constructor(end_at?: number) {
        super();
        if (end_at) {
            this.end_at = end_at;
        }
    }
}

// OneTime class
export class OneTime extends AbstractPlanType {
    type: string = "karya.core.entities.PlanType.OneTime";

    constructor() {
        super();
    }
}

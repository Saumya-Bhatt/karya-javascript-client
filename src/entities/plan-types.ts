import { AbstractPlanType } from './abstracts.js';

/**
 * Class representing a recurring plan.
 * This plan type has an optional `end_at` property that indicates when the recurring plan should end.
 * Inherits from `AbstractPlanType` and provides a specific `type` for recurring plans.
 */
export class Recurring extends AbstractPlanType {
  /** The timestamp (in milliseconds) when the recurring plan should end. Optional. */
  end_at?: number;

  /** The type of the plan, specific to recurring plans. */
  type: string = 'karya.core.entities.PlanType.Recurring';

  /**
   * Creates an instance of the `Recurring` plan type.
   * @param end_at - An optional timestamp (in milliseconds) indicating when the recurring plan should end.
   */
  constructor(end_at?: number) {
    super();
    if (end_at) {
      this.end_at = end_at;
    }
  }
}

/**
 * Class representing a one-time plan.
 * This plan type does not have an end date and is used for plans that only happen once.
 * Inherits from `AbstractPlanType` and provides a specific `type` for one-time plans.
 */
export class OneTime extends AbstractPlanType {
  /** The type of the plan, specific to one-time plans. */
  type: string = 'karya.core.entities.PlanType.OneTime';

  /**
   * Creates an instance of the `OneTime` plan type.
   * This plan does not require any parameters for creation.
   */
  constructor() {
    super();
  }
}

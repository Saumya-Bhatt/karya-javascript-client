/**
 * Abstract base class for defining a plan type.
 * This class serves as a blueprint for specific plan types that will implement the `type` property.
 */
export abstract class AbstractPlanType {
  /** A string representing the type of the plan. This must be implemented by subclasses. */
  abstract type: string;
}

/**
 * Abstract base class for defining an action type.
 * This class serves as a blueprint for specific action types that will implement the `type` property.
 */
export abstract class AbstractAction {
  /** A string representing the type of the action. This must be implemented by subclasses. */
  abstract type: string;
}

/**
 * Abstract base class for defining a body type.
 * This class serves as a blueprint for specific body types that will implement the `type` property.
 */
export abstract class AbstractBody {
  /** A string representing the type of the body. This must be implemented by subclasses. */
  abstract type: string;
}

/**
 * Abstract base class for defining an error log type.
 * This class serves as a blueprint for specific error log types. Currently, it has no properties or methods,
 * but it can be extended to define specific error log structures.
 */
export abstract class AbstractErrorLogType {}

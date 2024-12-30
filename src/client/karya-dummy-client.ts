import { User, Plan, Task, ErrorLog } from '../entities/models.js';
import { KafkaProducerRequest } from '../entities/actions.js';
import { OneTime } from '../entities/plan-types.js';
import { PlanStatus, TaskStatus } from '../entities/constants.js';
import { SubmitPlanRequest, CreateUserRequest, UpdatePlanRequest } from './requests.js';
import { GetPlanResponse, GetSummaryResponse, ListPlanResponse } from './responses.js';

// Dummy Kafka action for testing
const mockKafkaAction = new KafkaProducerRequest('sample-topic', 'sample-message');

// Dummy Karya client for testing
export class KaryaDummyClient {

    constructor() { }

    // Simulating a delay for async operations (similar to real API calls)
    private async simulateDelay() {
        return new Promise((resolve) => setTimeout(resolve, 100));
    }

    async createUser(request: CreateUserRequest): Promise<User> {
        await this.simulateDelay(); // Simulate network delay
        // Returning dummy user data
        return new User({
            id: 'user123',
            name: request.name,
            created_at: Date.now(),
        });
    }

    async getUser(username: string): Promise<User> {
        await this.simulateDelay();
        // Returning a dummy user
        return new User({
            id: 'user123',
            name: username,
            created_at: Date.now(),
        });
    }

    async submitPlan(request: SubmitPlanRequest): Promise<Plan> {
        await this.simulateDelay();
        // Returning a dummy plan
        return new Plan({
            id: 'plan123',
            user_id: request.user_id,
            description: request.description,
            period_time: request.period_time,
            type: request.plan_type,
            status: PlanStatus.CREATED, // Defaulting to CREATED
            max_failure_retry: request.max_failure_retry,
            action: request.action,
            hook: request.hooks,
            created_at: Date.now(),
            updated_at: Date.now(),
        });
    }

    async getPlan(planId: string): Promise<GetPlanResponse> {
        await this.simulateDelay();
        // Returning a dummy plan and task
        const plan = new Plan({
            id: planId,
            user_id: 'user123',
            description: 'Dummy plan',
            period_time: '2024-12-30',
            type: new OneTime(),
            status: PlanStatus.CREATED,
            max_failure_retry: 3,
            action: mockKafkaAction,
            hook: [],
            created_at: Date.now(),
            updated_at: Date.now(),
        });

        const task = new Task(
            'task123',
            plan.id,
            1,
            TaskStatus.PROCESSING,
            Date.now()
        );

        return new GetPlanResponse({ plan, latest_task: task });
    }

    async updatePlan(request: UpdatePlanRequest): Promise<Plan> {
        await this.simulateDelay();
        // Returning updated dummy plan
        return new Plan({
            id: request.plan_id,
            user_id: 'user123',
            description: 'Updated plan',
            period_time: request.period_time ?? '2024-12-30',
            type: new OneTime(),
            status: PlanStatus.RUNNING,
            max_failure_retry: request.max_failure_retry ?? 3,
            action: mockKafkaAction,
            hook: request.hooks ?? [],
            created_at: Date.now(),
            updated_at: Date.now(),
        });
    }

    async cancelPlan(planId: string): Promise<Plan> {
        await this.simulateDelay();
        // Simulate a canceled plan
        return new Plan({
            id: planId,
            user_id: 'user123',
            description: 'Canceled plan',
            period_time: '2024-12-30',
            type: new OneTime(),
            status: PlanStatus.CANCELLED,
            max_failure_retry: 3,
            action: mockKafkaAction,
            hook: [],
            created_at: Date.now(),
            updated_at: Date.now(),
        });
    }

    async getSummary(planId: string): Promise<GetSummaryResponse> {
        await this.simulateDelay();
        // Returning dummy summary data
        const plan = new Plan({
            id: planId,
            user_id: 'user123',
            description: 'Dummy plan',
            period_time: '2024-12-30',
            type: new OneTime(),
            status: PlanStatus.COMPLETED,
            max_failure_retry: 3,
            action: mockKafkaAction,
            hook: [],
            created_at: Date.now(),
            updated_at: Date.now(),
        });

        const tasks = [
            new Task('task123', plan.id, 1, TaskStatus.SUCCESS, Date.now(), Date.now(), Date.now()),
            new Task('task124', plan.id, 1, TaskStatus.SUCCESS, Date.now(), Date.now(), Date.now()),
        ];

        const error_logs = [
            new ErrorLog(plan.id, 'Sample error', new ErrorLog.ExecutorErrorLog('task123'), Date.now())
        ];

        return new GetSummaryResponse({ plan, tasks, error_logs });
    }

    async listPlans(userId: string, page: number): Promise<ListPlanResponse> {
        await this.simulateDelay();
        // Returning dummy list of plans
        const plans = [
            new Plan({
                id: 'plan123',
                user_id: userId,
                description: 'Dummy plan 1',
                period_time: '2024-12-30',
                type: new OneTime(),
                status: PlanStatus.CREATED,
                max_failure_retry: 3,
                action: mockKafkaAction,
                hook: [],
                created_at: Date.now(),
                updated_at: Date.now(),
            }),
            new Plan({
                id: 'plan124',
                user_id: userId,
                description: 'Dummy plan 2',
                period_time: '2024-12-30',
                type: new OneTime(),
                status: PlanStatus.RUNNING,
                max_failure_retry: 3,
                action: mockKafkaAction,
                hook: [],
                created_at: Date.now(),
                updated_at: Date.now(),
            })
        ];

        return new ListPlanResponse({
            plans,
            total: 2,
            offset: page * 2,
        });
    }

    async close(): Promise<void> {
        console.log('Dummy Karya client closed');
    }
}

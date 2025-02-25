import type {Task} from "./Task.ts";

export interface TaskRepository {
    save(task: Task): Promise<void>;
}
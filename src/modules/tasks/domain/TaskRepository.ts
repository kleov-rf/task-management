import type {Task} from "./Task.ts";

export interface TaskRepository {
    save(task: Task): Promise<void>;
    getAll(): Promise<Task[]>;
    delete(id: string): Promise<void>;
}
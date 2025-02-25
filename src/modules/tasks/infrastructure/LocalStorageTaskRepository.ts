import type {TaskRepository} from "../domain/TaskRepository.ts";
import type {Task} from "../domain/Task.ts";

export class LocalStorageTaskRepository implements TaskRepository {
    save(task: Task): Promise<void> {
        const tasks = new Map();
        const coursePrimitives = task.toPrimitives();

        tasks.set(coursePrimitives.id, coursePrimitives);

        localStorage.setItem("tasks", JSON.stringify(Array.from(tasks.entries())));

        return Promise.resolve();
    }

    async getAll(): Promise<Task[]> {
        const tasks = localStorage.getItem("tasks");
    }
}
import type {TaskRepository} from "../domain/TaskRepository.ts";
import {Task} from "../domain/Task.ts";
import type {Primitives} from "@codelytv/primitives-type";

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

        if (tasks === null) {
            return [];
        }

        const mappedTasks = new Map(JSON.parse(tasks) as Iterable<[string, Primitives<Task>]>);
        return Promise.resolve(Array.from(mappedTasks.values()).map((task) => Task.create(task)));
    }
}
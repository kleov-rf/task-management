import type {TaskRepository} from "../domain/TaskRepository.ts";
import {Task} from "../domain/Task.ts";
import type {Primitives} from "@codelytv/primitives-type";

export class LocalStorageTaskRepository implements TaskRepository {
    async save(task: Task): Promise<void> {
        const tasks = this.getAllFromLocalStorage();
        const taskPrimitives = task.toPrimitives();

        tasks.set(taskPrimitives.id, taskPrimitives);

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

    private getAllFromLocalStorage(): Map<string, Primitives<Task>> {
        const tasks = localStorage.getItem("tasks");

        if (tasks === null) {
            return new Map();
        }

        return new Map(JSON.parse(tasks) as Iterable<[string, Primitives<Task>]>);
    }

    async get(id: string) {
        const tasks = this.getAllFromLocalStorage();
        const task = tasks.get(id);

        if (!task) {
            return Promise.resolve(null);
        }

        return Promise.resolve(Task.create(task));
    }

    async delete(id: string): Promise<void> {
        const tasks = this.getAllFromLocalStorage();
        tasks.delete(id);

        localStorage.setItem("tasks", JSON.stringify(Array.from(tasks.entries())));
    }
}
import type {Primitives} from "@codelytv/primitives-type";

export class Task {
    private constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly dueDate: Date,
        readonly status: string
    ) {}

    public static create({id, title, description, dueDate, status}: Primitives<Task>): Task {
        return new Task(id, title, description, new Date(dueDate), status);
    }
}
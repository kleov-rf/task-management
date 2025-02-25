import type {TaskRepository} from "../../domain/TaskRepository.ts";

interface CreateTaskDTO {
    title: string;
    description: string;
    dueDate: number;
}

export class TaskCreator {
    constructor(private readonly repository: TaskRepository) {
    }

    async create({title, description, dueDate}: CreateTaskDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
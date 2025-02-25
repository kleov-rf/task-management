import type {TaskRepository} from "../../domain/TaskRepository.ts";
import {Task} from "../../domain/Task.ts";

interface CreateTaskDTO {
    title: string;
    description: string;
    dueDate: number;
}

export class TaskCreator {
    constructor(private readonly repository: TaskRepository) {
    }

    async create({title, description, dueDate}: CreateTaskDTO): Promise<void> {
        const task = Task.create({
            id: '1',
            title,
            description,
            dueDate,
            status: 'pending',
        });

        await this.repository.save(task);
    }
}
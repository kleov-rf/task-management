import type {TaskRepository} from "../../domain/TaskRepository.ts";

export class TaskDeleter {
    constructor(private readonly repository: TaskRepository) {}

    async delete(id: string): Promise<void> {
        throw new Error('Not implemented');
    }
}
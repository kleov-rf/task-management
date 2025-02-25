import type {TaskRepository} from "../../domain/TaskRepository.ts";

export class TaskDeleter {
    constructor(private readonly repository: TaskRepository) {}

    async delete(id: string): Promise<void> {
        await this.repository.get(id);
        await this.repository.delete(id);
        return Promise.resolve();
    }
}
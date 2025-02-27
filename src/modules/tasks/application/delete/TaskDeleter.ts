import type { TaskRepository } from '../../domain/TaskRepository.ts'

export class TaskDeleter {
  constructor(private readonly repository: TaskRepository) {}

  async delete(id: string): Promise<void> {
    const task = await this.repository.get(id)

    if (task !== null) {
      await this.repository.delete(id)
    }

    return Promise.resolve()
  }
}

import type { Task } from '../../domain/Task.ts'
import type { TaskRepository } from '../../domain/TaskRepository.ts'

export class AllTasksGetter {
  constructor(private readonly repository: TaskRepository) {}

  async get(): Promise<Task[]> {
    return this.repository.getAll()
  }
}

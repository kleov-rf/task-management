import type { TaskRepository } from '../../domain/TaskRepository.ts'
import { Task } from '../../domain/Task.ts'

interface CreateTaskDTO {
  id: string
  title: string
  description: string
  dueDate: number
}

export class TaskCreator {
  constructor(private readonly repository: TaskRepository) {}

  async create({
    id,
    title,
    description,
    dueDate
  }: CreateTaskDTO): Promise<void> {
    const task = Task.create({
      id,
      title,
      description,
      dueDate,
      status: 'pending'
    })

    await this.repository.save(task)
  }
}

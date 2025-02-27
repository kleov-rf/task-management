import type { Task } from './Task.ts'

export interface TaskRepository {
  save(task: Task): Promise<void>
  get(id: string): Promise<Task | null>
  getAll(): Promise<Task[]>
  delete(id: string): Promise<void>
}

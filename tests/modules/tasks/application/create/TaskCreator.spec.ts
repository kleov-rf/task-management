import { TaskRepository } from '../../../../../src/modules/tasks/domain/TaskRepository'
import { describe, expect, it, vi } from 'vitest'
import { TaskCreator } from '../../../../../src/modules/tasks/application/create/TaskCreator'
import { Task } from '../../../../../src/modules/tasks/domain/Task'

describe('TaskCreator', () => {
  it('should call TaskRepository save when creating a task', async () => {
    const mockTaskRepository = {
      save: vi.fn()
    } as TaskRepository
    const taskCreator = new TaskCreator(mockTaskRepository)

    let mockDueDate = new Date().getTime()
    await taskCreator.create({
      id: '1',
      title: 'Task title',
      description: 'Task description',
      dueDate: mockDueDate
    })

    let expectedTask = Task.create({
      id: '1',
      title: 'Task title',
      description: 'Task description',
      dueDate: mockDueDate,
      status: 'pending'
    })
    expect(mockTaskRepository.save).toHaveBeenCalledWith(expectedTask)
  })
})

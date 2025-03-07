import { describe, expect, it, vi } from 'vitest'
import { AllTasksGetter } from '../../../../../src/modules/tasks/application/get-all/AllTasksGetter'
import { TaskRepository } from '../../../../../src/modules/tasks/domain/TaskRepository'

describe('AllTasksGetter', () => {
  it('should call task repository to get all tasks', async () => {
    const taskRepository = {
      getAll: vi.fn()
    } as unknown as TaskRepository
    const allTasksGetter = new AllTasksGetter(taskRepository)

    await allTasksGetter.get()

    expect(taskRepository.getAll).toHaveBeenCalled()
  })
})

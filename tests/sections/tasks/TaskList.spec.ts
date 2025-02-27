import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../../../src/sections/tasks/TaskList.vue'
import { Task } from '../../../src/modules/tasks/domain/Task'

describe('TaskList component', () => {
  it('should emit task deleted event when delete button is clicked', async () => {
    const mockTask = Task.create({
      id: '1',
      title: 'Task 1',
      description: 'hello',
      dueDate: new Date().getTime(),
      status: 'pending'
    })
    const mockTaskDeleter = {
      delete: vi.fn()
    }
    const wrapper = mount(TaskList, {
      props: {
        tasks: [mockTask]
      },
      global: {
        provide: {
          taskDeleter: mockTaskDeleter
        }
      }
    })

    const deleteButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Delete/))[0]
    await deleteButton.trigger('click')

    expect(wrapper.emitted('task-deleted')).toBeTruthy()
  })
  it('should call task deleter when delete button is clicked', async () => {
    const mockTaskId = '1'
    const mockTask = Task.create({
      id: mockTaskId,
      title: 'Task 1',
      description: 'hello',
      dueDate: new Date().getTime(),
      status: 'pending'
    })
    const mockTaskDeleter = {
      delete: vi.fn()
    }
    const wrapper = mount(TaskList, {
      props: {
        tasks: [mockTask]
      },
      global: {
        provide: {
          taskDeleter: mockTaskDeleter
        }
      }
    })

    const deleteButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Delete/))[0]
    await deleteButton.trigger('click')

    expect(mockTaskDeleter.delete).toHaveBeenCalledWith(mockTaskId)
  })
})

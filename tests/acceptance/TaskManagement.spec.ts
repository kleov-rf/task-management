import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import { LocalStorageTaskRepository } from '../../src/modules/tasks/infrastructure/LocalStorageTaskRepository'
import { TaskCreator } from '../../src/modules/tasks/application/create/TaskCreator'
import { AllTasksGetter } from '../../src/modules/tasks/application/get-all/AllTasksGetter'
import { createTask } from './utils/createTask'
import { TaskDeleter } from '../../src/modules/tasks/application/delete/TaskDeleter'

describe('Task Management', () => {
  afterEach(() => {
    localStorage.clear()
  })
  it('should create a task', async () => {
    const taskRepository = new LocalStorageTaskRepository()
    const taskCreator = new TaskCreator(taskRepository)
    const allTasksGetter = new AllTasksGetter(taskRepository)
    const wrapper = mount(App, {
      global: {
        provide: { taskCreator, allTasksGetter }
      }
    })

    await flushPromises()

    await createTask(wrapper, 'Task 1', 'Task 1 description', '2025-12-12')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const newTaskTitle = wrapper
      .findAll('th')
      .filter((b) => b.text().match(/Task 1/))[0]
    expect(newTaskTitle.exists()).toBe(true)
  })
  it('should show all tasks', async () => {
    const taskRepository = new LocalStorageTaskRepository()
    const taskCreator = new TaskCreator(taskRepository)
    const allTasksGetter = new AllTasksGetter(taskRepository)
    const wrapper = mount(App, {
      global: {
        provide: { taskCreator, allTasksGetter }
      }
    })

    await flushPromises()

    await createTask(wrapper, 'Task 1', 'Task 1 description', '2026-12-12')

    await flushPromises()
    await wrapper.vm.$nextTick()

    await createTask(wrapper, 'Task 2', 'Task 2 description', '2026-10-12')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const task1Title = wrapper
      .findAll('th')
      .filter((b) => b.text().match(/Task 1/))[0]
    expect(task1Title.exists()).toBe(true)

    const task2Title = wrapper
      .findAll('th')
      .filter((b) => b.text().match(/Task 2/))[0]
    expect(task2Title.exists()).toBe(true)
  })
  it('should delete a task', async () => {
    const taskRepository = new LocalStorageTaskRepository()
    const taskCreator = new TaskCreator(taskRepository)
    const allTasksGetter = new AllTasksGetter(taskRepository)
    const taskDeleter = new TaskDeleter(taskRepository)
    const wrapper = mount(App, {
      global: {
        provide: { taskCreator, allTasksGetter, taskDeleter }
      }
    })

    await flushPromises()

    await createTask(wrapper, 'Task 1', 'Task 1 description', '2028-12-12')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const deleteButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Delete/))[0]
    await deleteButton.trigger('click')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const confirmDeletionButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Confirm/))[0]
    await confirmDeletionButton.trigger('click')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const task1TitleMatches = wrapper
      .findAll('th')
      .filter((b) => b.text().match(/Task 1/))
    expect(task1TitleMatches.length).toBe(0)
  })
})

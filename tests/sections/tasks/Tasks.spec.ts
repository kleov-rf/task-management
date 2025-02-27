import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Tasks from '../../../src/sections/tasks/Tasks.vue'
import { Task } from '../../../src/modules/tasks/domain/Task'

describe('Tasks component', () => {
  let mockAllTasksGetter
  let wrapper: VueWrapper

  beforeEach(async () => {
    mockAllTasksGetter = {
      get: vi.fn().mockResolvedValue([])
    }
    wrapper = mount(Tasks, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      }
    })

    await flushPromises()
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('should call to get all tasks when component is mounted', () => {
    expect(mockAllTasksGetter.get).toHaveBeenCalled()
  })
  it('should show create task form fields when clicking on create new task button', async () => {
    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const descriptionTextArea = wrapper.find('textarea[name="description"]')
    expect(descriptionTextArea.exists()).toBe(true)

    const dueDateInput = wrapper.find('input[name="dueDate"]')
    expect(dueDateInput.exists()).toBe(true)
  })
  it('should not show create task form fields if not clicked on create new task button', async () => {
    const titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(false)

    const descriptionTextArea = wrapper.find('textarea[name="description"]')
    expect(descriptionTextArea.exists()).toBe(false)

    const dueDateInput = wrapper.find('input[name="dueDate"]')
    expect(dueDateInput.exists()).toBe(false)
  })
  it('should not show create task form fields if create task form emits cancel', async () => {
    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    let titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('cancel-create-task')

    titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(false)
  })
  it('should not show create task form fields if create task form emits task created', async () => {
    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    let titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('task-created')

    titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(false)
  })
  it('should call to get all tasks when create task form emits task created', async () => {
    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    let titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('task-created')

    expect(mockAllTasksGetter.get).toHaveBeenCalled()
  })
  it('should show all tasks retrieved from all tasks getter when create task form emits task created', async () => {
    const mockRetrievedTasks = [
      Task.create({
        id: '1',
        title: 'Task 1',
        description: 'Laptop',
        dueDate: new Date().getTime(),
        status: 'pending'
      })
    ]
    const mockAllTasksGetter = {
      get: vi.fn().mockResolvedValue(mockRetrievedTasks)
    }
    wrapper = mount(Tasks, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      }
    })

    await flushPromises()

    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    let titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('task-created')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const tasks = wrapper.findAll('.task')
    expect(tasks.length).toBe(mockRetrievedTasks.length)

    const newTaskTitle = wrapper
      .findAll('th')
      .filter((b) => b.text().match(/Task 1/))[0]
    expect(newTaskTitle.exists()).toBe(true)
  })
  it('should call to get all tasks when tasks list emits task deleted', async () => {
    const mockRetrievedTasks = [
      Task.create({
        id: '1',
        title: 'Task 1',
        description: 'Laptop',
        dueDate: new Date().getTime(),
        status: 'pending'
      })
    ]
    const mockAllTasksGetter = {
      get: vi.fn().mockResolvedValue(mockRetrievedTasks)
    }
    wrapper = mount(Tasks, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      }
    })

    await flushPromises()

    const createTaskFormComponent = wrapper.findComponent({ name: 'TasksList' })
    await createTaskFormComponent.vm.$emit('task-deleted')

    expect(mockAllTasksGetter.get).toHaveBeenCalledTimes(2)
  })
})

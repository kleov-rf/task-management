import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import TaskDashboard from '../../../src/sections/tasks/TaskDashboard.vue'
import { Task } from '../../../src/modules/tasks/domain/Task'

describe('TaskDashboard component', () => {
  let mockAllTasksGetter
  let wrapper: VueWrapper

  beforeEach(async () => {
    mockAllTasksGetter = {
      get: vi.fn().mockResolvedValue([])
    }
    wrapper = mount(TaskDashboard, {
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
  it('should set inert to main element when clicking on create new task button', async () => {
    const mainElement = wrapper.find('main')
    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]

    await createNewTaskButton.trigger('click')

    expect(mainElement.attributes('inert')).toBe('')
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
    wrapper = mount(TaskDashboard, {
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
    wrapper = mount(TaskDashboard, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      }
    })

    await flushPromises()

    const createTaskFormComponent = wrapper.findComponent({ name: 'TaskList' })
    await createTaskFormComponent.vm.$emit('task-deleted')

    expect(mockAllTasksGetter.get).toHaveBeenCalledTimes(2)
  })
  it('should focus on create new task button after create task form emits task created', async () => {
    const wrapper = mount(TaskDashboard, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      },
      attachTo: document.body
    })

    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('task-created')

    const createNewTaskButtonAfterCancel = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    expect(createNewTaskButtonAfterCancel.element).toBe(document.activeElement)
  })
  it('should focus on create new task button after create task form emits cancel', async () => {
    const wrapper = mount(TaskDashboard, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      },
      attachTo: document.body
    })

    const createNewTaskButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    await createNewTaskButton.trigger('click')

    const createTaskFormComponent = wrapper.findComponent({
      name: 'CreateTaskForm'
    })
    await createTaskFormComponent.vm.$emit('cancel-create-task')

    const createNewTaskButtonAfterCancel = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Create new task/))[0]
    expect(createNewTaskButtonAfterCancel.element).toBe(document.activeElement)
  })
  it('should show confirm task deletion dialog when task list emits delete task', async () => {
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
    wrapper = mount(TaskDashboard, {
      global: {
        provide: {
          allTasksGetter: mockAllTasksGetter
        }
      }
    })

    await flushPromises()

    const taskList = wrapper.findComponent({ name: 'TaskList' })
    await taskList.vm.$emit('delete-task')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const deleteTaskTitle = wrapper
      .findAll('h2')
      .filter((heading) => heading.text().match(/Delete task/))[0]
    const cancelDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Cancel/))[0]
    const confirmDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Delete/))[0]

    expect(deleteTaskTitle.exists()).toBe(true)
    expect(cancelDeletionButton.exists()).toBe(true)
    expect(confirmDeletionButton.exists()).toBe(true)
  })
  it('should not show confirm task deletion dialog if not emitted delete task', async () => {
    const deleteTaskTitle = wrapper
      .findAll('h2')
      .filter((heading) => heading.text().match(/Delete task/))[0]
    const cancelDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Cancel/))[0]
    const confirmDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Delete/))[0]

    expect(deleteTaskTitle).toBeUndefined()
    expect(cancelDeletionButton).toBeUndefined()
    expect(confirmDeletionButton).toBeUndefined()
  })
  it('should not show confirm task deletion dialog if emitted cancel deletion', async () => {
    const taskList = wrapper.findComponent({ name: 'TaskList' })
    await taskList.vm.$emit('delete-task')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const confirmTaskDeletionDialog = wrapper.findComponent({
      name: 'ConfirmDeleteTaskModal'
    })
    await confirmTaskDeletionDialog.vm.$emit('cancel-deletion')

    const deleteTaskTitle = wrapper
      .findAll('h2')
      .filter((heading) => heading.text().match(/Delete task/))[0]
    const cancelDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Cancel/))[0]
    const confirmDeletionButton = wrapper
      .findAll('button')
      .filter((button) => button.text().match(/Delete/))[0]

    expect(deleteTaskTitle).toBeUndefined()
    expect(cancelDeletionButton).toBeUndefined()
    expect(confirmDeletionButton).toBeUndefined()
  })
})

import { describe, expect, it, vi } from 'vitest'
import CreateTaskFormModal from '../../../src/sections/tasks/CreateTaskFormModal.vue'
import { mount } from '@vue/test-utils'

describe('Create Task Form Modal component', () => {
  it('should call task creator to create a task', async () => {
    const mockTaskCreator = {
      create: vi.fn()
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      }
    })

    await wrapper.find('input[name="title"]').setValue('Awesome task')
    await wrapper
      .find('textarea[name="description"]')
      .setValue('Description of the awesome task')
    await wrapper.find('input[name="dueDate"]').setValue('2021-12-31')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(mockTaskCreator.create).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'Awesome task',
      description: 'Description of the awesome task',
      dueDate: new Date('2021-12-31').getTime()
    })
  })
  it('should emit cancel event when cancel button is clicked', async () => {
    const mockTaskCreator = {
      create: vi.fn()
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      }
    })

    const cancelButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Cancel/))[0]
    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel-create-task')).toBeTruthy()
  })
  it('should emit cancel event when user presses escape key', async () => {
    const mockTaskCreator = {
      create: vi.fn()
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      }
    })

    await wrapper.get('dialog').trigger('keydown.esc')

    expect(wrapper.emitted('cancel-create-task')).toBeTruthy()
  })
  it('should emit task created event when task is created', async () => {
    const mockTaskCreator = {
      create: vi.fn().mockResolvedValue({})
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      }
    })

    await wrapper.find('input[name="title"]').setValue('Awesome task')
    await wrapper
      .find('textarea[name="description"]')
      .setValue('Description of the awesome task')
    await wrapper.find('input[name="dueDate"]').setValue('2021-12-31')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.emitted('task-created')).toBeTruthy()
  })
  it('should not emit task created event is task creation fails', async () => {
    const mockTaskCreator = {
      create: vi.fn().mockRejectedValue('Error')
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      }
    })

    await wrapper.find('input[name="title"]').setValue('Awesome task')
    await wrapper
      .find('textarea[name="description"]')
      .setValue('Description of the awesome task')
    await wrapper.find('input[name="dueDate"]').setValue('2021-12-31')

    const confirmButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Confirm/))[0]
    await confirmButton.trigger('click')

    expect(wrapper.emitted('task-created')).toBeFalsy()
  })
  it('should focus on title input when component is mounted', async () => {
    const mockTaskCreator = {
      create: vi.fn()
    }
    const wrapper = mount(CreateTaskFormModal, {
      global: {
        provide: {
          taskCreator: mockTaskCreator
        }
      },
      attachTo: document.body
    })

    const titleInput = wrapper.find('input[name="title"]').element
    expect(titleInput).toBe(document.activeElement)
    wrapper.unmount()
  })
  it('should call dialog show modal when component is mounted', () => {
    const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')

    mount(CreateTaskFormModal)

    expect(showModalSpy).toHaveBeenCalled()
  })
  it('should call dialog close modal when cancel button is clicked', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mount(CreateTaskFormModal)

    await wrapper.find('button').trigger('click')

    expect(closeSpy).toHaveBeenCalled()
  })
  it('should call dialog close modal when user presses escape key', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mount(CreateTaskFormModal)

    await wrapper.get('dialog').trigger('keydown.esc')

    expect(closeSpy).toHaveBeenCalled()
  })
})

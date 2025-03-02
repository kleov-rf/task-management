import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDeleteTaskModal from '../../../src/sections/tasks/ConfirmDeleteTaskModal.vue'

describe('Confirm delete task modal component', () => {
  it('should emit cancel deletion event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmDeleteTaskModal)
    const cancelButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Cancel/))[0]
    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel-delete-task')).toBeTruthy()
  })
  it('should emit cancel deletion event when user presses escape key', async () => {
    const wrapper = mount(ConfirmDeleteTaskModal)
    await wrapper.trigger('keydown.esc')

    expect(wrapper.emitted('cancel-delete-task')).toBeTruthy()
  })
  it('should call dialog show modal when component is mounted', async () => {
    const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')

    mount(ConfirmDeleteTaskModal)

    expect(showModalSpy).toHaveBeenCalled()
  })
  it('should call dialog close modal when cancel button is clicked', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mount(ConfirmDeleteTaskModal)

    await wrapper.find('button').trigger('click')

    expect(closeSpy).toHaveBeenCalled()
  })
  it('should call dialog close modal when user presses escape key', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mount(ConfirmDeleteTaskModal)

    await wrapper.trigger('keydown.esc')

    expect(closeSpy).toHaveBeenCalled()
  })
  it('should focus on cancel button when component is mounted', async () => {
    const wrapper = mount(ConfirmDeleteTaskModal, {
      attachTo: document.body
    })
    const cancelButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Cancel/))[0]

    expect(cancelButton.element).toBe(document.activeElement)
  })
  it('should call delete task with task id when confirm button is clicked', async () => {
    const mockTaskId = '1'
    const mockTaskDeleter = {
      delete: vi.fn()
    }
    const wrapper = mount(ConfirmDeleteTaskModal, {
      props: {
        taskId: mockTaskId
      },
      global: {
        provide: {
          taskDeleter: mockTaskDeleter
        }
      }
    })

    const confirmButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Confirm/))[0]
    await confirmButton.trigger('click')

    expect(mockTaskDeleter.delete).toHaveBeenCalledWith(mockTaskId)
  })
  it('should emit task deleted event when confirm button is clicked', async () => {
    const mockTaskDeleter = {
      delete: vi.fn()
    }
    const wrapper = mount(ConfirmDeleteTaskModal, {
      props: {
        taskId: '1'
      },
      global: {
        provide: {
          taskDeleter: mockTaskDeleter
        }
      }
    })

    const confirmButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Confirm/))[0]
    await confirmButton.trigger('click')

    expect(wrapper.emitted('task-deleted')).toBeTruthy()
  })
  it('should call dialog close modal when confirm button is clicked', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const mockTaskDeleter = {
      delete: vi.fn()
    }
    const wrapper = mount(ConfirmDeleteTaskModal, {
      props: {
        taskId: '1'
      },
      global: {
        provide: {
          taskDeleter: mockTaskDeleter
        }
      }
    })

    const confirmButton = wrapper
      .findAll('button')
      .filter((b) => b.text().match(/Confirm/))[0]
    await confirmButton.trigger('click')

    expect(closeSpy).toHaveBeenCalled()
  })
})

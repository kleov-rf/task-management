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

    expect(wrapper.emitted('cancel-deletion')).toBeTruthy()
  })
  it('should emit cancel deletion event when user presses escape key', async () => {
    const wrapper = mount(ConfirmDeleteTaskModal)
    await wrapper.trigger('keydown.esc')

    expect(wrapper.emitted('cancel-deletion')).toBeTruthy()
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
})

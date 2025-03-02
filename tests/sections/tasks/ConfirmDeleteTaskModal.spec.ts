import { describe, expect, it } from 'vitest'
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
})

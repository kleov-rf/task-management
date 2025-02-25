import {describe, expect, it} from "vitest";
import {flushPromises, mount} from "@vue/test-utils";
import Tasks from "../../../src/sections/tasks/Tasks.vue";

describe('Tasks component', () => {
    it('should show create task form fields when clicking on create new task button', async () => {
        const wrapper = mount(Tasks)

        await flushPromises()

        const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
        await createNewTaskButton.trigger('click');

        const titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(true);

        const descriptionTextArea = wrapper.find('textarea[name="description"]')
        expect(descriptionTextArea.exists()).toBe(true);

        const dueDateInput = wrapper.find('input[name="dueDate"]')
        expect(dueDateInput.exists()).toBe(true);
    })
})
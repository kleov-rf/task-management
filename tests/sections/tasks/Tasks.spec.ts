import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {flushPromises, mount, VueWrapper} from "@vue/test-utils";
import Tasks from "../../../src/sections/tasks/Tasks.vue";

describe('Tasks component', () => {
    let mockAllTasksGetter;
    let wrapper: VueWrapper;

    beforeEach(async () => {
        mockAllTasksGetter = {
            get: vi.fn()
        }
        wrapper = mount(Tasks, {
            global: {
                provide: {
                    allTasksGetter: mockAllTasksGetter
                }
            }
        })

        await flushPromises();
    })

    afterEach(() => {
        vi.clearAllMocks();
        wrapper.unmount();
    })

    it('should show create task form fields when clicking on create new task button', async () => {
        const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
        await createNewTaskButton.trigger('click');

        const titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(true);

        const descriptionTextArea = wrapper.find('textarea[name="description"]')
        expect(descriptionTextArea.exists()).toBe(true);

        const dueDateInput = wrapper.find('input[name="dueDate"]')
        expect(dueDateInput.exists()).toBe(true);
    })
    it('should not show create task form fields if not clicked on create new task button', async () => {
        const titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(false);

        const descriptionTextArea = wrapper.find('textarea[name="description"]')
        expect(descriptionTextArea.exists()).toBe(false);

        const dueDateInput = wrapper.find('input[name="dueDate"]')
        expect(dueDateInput.exists()).toBe(false);
    })
    it('should not show create task form fields if create task form emits cancel', async () => {
        const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
        await createNewTaskButton.trigger('click');

        let titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(true);

        const createTaskFormComponent = wrapper.findComponent({name: 'CreateTaskForm'})
        await createTaskFormComponent.vm.$emit('cancel-create-task')

        titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(false);
    })
    it('should not show create task form fields if create task form emits task created', async () => {
        const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
        await createNewTaskButton.trigger('click');

        let titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(true);

        const createTaskFormComponent = wrapper.findComponent({name: 'CreateTaskForm'})
        await createTaskFormComponent.vm.$emit('task-created')

        titleInput = wrapper.find('input[name="title"]')
        expect(titleInput.exists()).toBe(false);
    })
})
import {describe, expect, it} from "vitest";
import {flushPromises, mount} from "@vue/test-utils";
import App from "../../src/App.vue";
import {LocalStorageTaskRepository} from "../../src/modules/tasks/infrastructure/LocalStorageTaskRepository";
import {TaskCreator} from "../../src/modules/tasks/application/create/TaskCreator";
import {AllTasksGetter} from "../../src/modules/tasks/application/get-all/AllTasksGetter";

describe('Task Management', () => {
    it('should create a task', async () => {
        const taskRepository = new LocalStorageTaskRepository();
        const taskCreator = new TaskCreator(taskRepository);
        const allTasksGetter = new AllTasksGetter(taskRepository);
        const wrapper = mount(App, {
            global: {
                provide: {taskCreator, allTasksGetter}
            }
        })

        await flushPromises();

        const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
        await createNewTaskButton.trigger('click');

        const titleInput = wrapper.find('input[name="title"]')
        await titleInput.setValue('Task 1')

        const descriptionTextArea = wrapper.find('textarea[name="description"]')
        await descriptionTextArea.setValue('Task 1 description')

        const dueDateInput = wrapper.find('input[name="dueDate"]')
        await dueDateInput.setValue('2025-12-12')

        const confirmButton = wrapper.findAll('button').filter(b => b.text().match(/Confirm/))[0];
        await confirmButton.trigger('click');

        const newTaskTitle = wrapper.findAll('td').filter(b => b.text().match(/Task 1/))[0];
        expect(newTaskTitle.exists()).toBe(true)
    })
})
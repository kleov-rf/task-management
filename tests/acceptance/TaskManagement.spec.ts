import {describe, expect, it} from "vitest";
import {flushPromises, mount, VueWrapper} from "@vue/test-utils";
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

        await createTask(wrapper, 'Task 1', 'Task 1 description', '2025-12-12');

        await flushPromises();
        await wrapper.vm.$nextTick();

        const newTaskTitle = wrapper.findAll('th').filter(b => b.text().match(/Task 1/))[0];
        expect(newTaskTitle.exists()).toBe(true)
    })
    it('should show all tasks', async () => {
        const taskRepository = new LocalStorageTaskRepository();
        const taskCreator = new TaskCreator(taskRepository);
        const allTasksGetter = new AllTasksGetter(taskRepository);
        const wrapper = mount(App, {
            global: {
                provide: {taskCreator, allTasksGetter}
            }
        })

        await flushPromises();

        await createTask(wrapper, 'Task 1', 'Task 1 description', '2026-12-12');

        await flushPromises();
        await wrapper.vm.$nextTick();

        await createTask(wrapper, 'Task 2', 'Task 2 description', '2026-10-12');

        await flushPromises();
        await wrapper.vm.$nextTick();

        const task1Title = wrapper.findAll('th').filter(b => b.text().match(/Task 1/))[0];
        expect(task1Title.exists()).toBe(true)

        const task2Title = wrapper.findAll('th').filter(b => b.text().match(/Task 2/))[0];
        expect(task2Title.exists()).toBe(true)
    });
})

const createTask = async (wrapper: VueWrapper, title: string, description: string, dueDate: string) => {
    const createNewTaskButton = wrapper.findAll('button').filter(b => b.text().match(/Create new task/))[0];
    await createNewTaskButton.trigger('click');

    const titleInput = wrapper.find('input[name="title"]')
    await titleInput.setValue(title)

    const descriptionTextArea = wrapper.find('textarea[name="description"]')
    await descriptionTextArea.setValue(description)

    const dueDateInput = wrapper.find('input[name="dueDate"]')
    await dueDateInput.setValue(dueDate)

    const confirmButton = wrapper.findAll('button').filter(b => b.text().match(/Confirm/))[0];
    await confirmButton.trigger('click');
}
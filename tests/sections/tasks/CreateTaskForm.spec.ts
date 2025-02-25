import {describe, expect, it, vi} from "vitest";
import CreateTaskForm from "../../../src/sections/tasks/CreateTaskForm.vue";
import {mount} from "@vue/test-utils";

describe('Create Task Form component', () => {
    it('should call task creator to create a task', async () => {
        const mockTaskCreator = {
            create: vi.fn()
        }
        const wrapper = mount(CreateTaskForm, {
            global: {
                provide: {
                    taskCreator: mockTaskCreator
                }
            }
        });

        await wrapper.find('input[name="title"]').setValue('Awesome task');
        await wrapper.find('textarea[name="description"]').setValue('Description of the awesome task');
        await wrapper.find('input[name="dueDate"]').setValue('2021-12-31');

        const confirmButton = wrapper.findAll('button').filter(b => b.text().match(/Confirm/))[0];
        await confirmButton.trigger('click');

        expect(mockTaskCreator.create).toHaveBeenCalledWith({
            title: 'Awesome task',
            description: 'Description of the awesome task',
            dueDate: new Date('2021-12-31').getTime()
        });
    });
});
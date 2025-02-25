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
            id: expect.any(String),
            title: 'Awesome task',
            description: 'Description of the awesome task',
            dueDate: new Date('2021-12-31').getTime()
        });
    });
    it('should emit cancel event when cancel button is clicked', async () => {
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

        const cancelButton = wrapper.findAll('button').filter(b => b.text().match(/Cancel/))[0];
        await cancelButton.trigger('click');

        expect(wrapper.emitted('cancel-create-task')).toBeTruthy();
    });
    it('should emit task created event when task is created', async () => {
        const mockTaskCreator = {
            create: vi.fn().mockResolvedValue()
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

        expect(wrapper.emitted('task-created')).toBeTruthy();
    });
});
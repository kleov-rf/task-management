import {VueWrapper} from "@vue/test-utils";

export const createTask = async (wrapper: VueWrapper, title: string, description: string, dueDate: string) => {
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
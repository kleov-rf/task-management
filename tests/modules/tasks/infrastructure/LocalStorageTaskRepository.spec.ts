import {describe, expect, it, vi} from "vitest";
import {LocalStorageTaskRepository} from "../../../../src/modules/tasks/infrastructure/LocalStorageTaskRepository";
import {Task} from "../../../../src/modules/tasks/domain/Task";

describe("LocalStorageTaskRepository", () => {
    it('should call localStorage when saving a task', async () => {
        const localStorageMock = {
            setItem: vi.fn(),
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const mockDueDate = new Date().getTime();
        const mockTaskId = '1';
        const mockTask = Task.create({
            id: mockTaskId,
            title: 'Task 1',
            description: 'hello',
            dueDate: mockDueDate,
            status: 'pending'
        });
        const repository = new LocalStorageTaskRepository();

        await repository.save(mockTask);

        const expectedTask = JSON.stringify(Array.from(new Map().set(mockTaskId, mockTask.toPrimitives()).entries()));
        expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expectedTask);
    });
    it('should call localStorage when retrieving all tasks', async () => {
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify([])),
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const repository = new LocalStorageTaskRepository();

        await repository.getAll();

        expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
    });
    it('should return an empty array when there are no tasks in localStorage', async () => {
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(null),
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const repository = new LocalStorageTaskRepository();

        const tasks = await repository.getAll();

        expect(tasks).toEqual([]);
    });
});
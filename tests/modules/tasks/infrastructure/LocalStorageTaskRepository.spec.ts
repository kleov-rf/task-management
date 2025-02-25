import {describe, expect, it, vi} from "vitest";
import {LocalStorageTaskRepository} from "../../../../src/modules/tasks/infrastructure/LocalStorageTaskRepository";
import {Task} from "../../../../src/modules/tasks/domain/Task";

describe("LocalStorageTaskRepository", () => {
    it('should call localStorage when saving a task', async () => {
        const localStorageMock = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(null),
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
    it('should call localStorage when saving a task to get existing tasks', async () => {
        const localStorageMock = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(JSON.stringify([])),
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

        expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
    });
    it('should call localStorage with new and existing tasks when saving a task', async () => {
        const mockExistingTaskId = '1';
        const existingTasks = new Map().set(mockExistingTaskId, Task.create({
            id: mockExistingTaskId,
            title: 'Task 1',
            description: 'hello',
            dueDate: new Date().getTime(),
            status: 'pending'
        }).toPrimitives());
        const localStorageMock = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(JSON.stringify(Array.from(existingTasks.entries()))),
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const mockDueDate = new Date().getTime();
        const mockTaskId = '2';
        const mockTask = Task.create({
            id: mockTaskId,
            title: 'Task 2',
            description: 'hello',
            dueDate: mockDueDate,
            status: 'pending'
        });
        const repository = new LocalStorageTaskRepository();

        await repository.save(mockTask);

        const mappedTasks = existingTasks;
        mappedTasks.set(mockTaskId, mockTask.toPrimitives());
        const expectedTasks = JSON.stringify(Array.from(mappedTasks.entries()));
        expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expectedTasks);
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
    it('should return an array of tasks when there are tasks in localStorage', async () => {
        const mockDueDate = new Date().getTime();
        const mockTaskId = '1';
        const mockTask = Task.create({
            id: mockTaskId,
            title: 'Task 1',
            description: 'hello',
            dueDate: mockDueDate,
            status: 'pending'
        });
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify(Array.from(new Map().set(mockTaskId, mockTask.toPrimitives()).entries())))
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const repository = new LocalStorageTaskRepository();

        const tasks = await repository.getAll();

        expect(tasks).toEqual([mockTask]);
    });
    it('should return task when retrieving a task by id', async () => {
        const mockDueDate = new Date().getTime();
        const mockTaskId = '1';
        const mockTask = Task.create({
            id: mockTaskId,
            title: 'Task 1',
            description: 'hello',
            dueDate: mockDueDate,
            status: 'pending'
        });
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify(Array.from(new Map().set(mockTaskId, mockTask.toPrimitives()).entries())))
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const repository = new LocalStorageTaskRepository();

        const task = await repository.get(mockTaskId);

        expect(task).toEqual(mockTask);
    });
    it('should return null when retrieving a task by id and task does not exist', async () => {
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(null)
        };
        Object.defineProperty(window, 'localStorage', {value: localStorageMock})
        const repository = new LocalStorageTaskRepository();

        const task = await repository.get('1');

        expect(task).toBeNull();
    });
});
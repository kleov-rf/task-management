import {describe, expect, it, vi} from "vitest";
import {TaskDeleter} from "../../../../../src/modules/tasks/application/delete/TaskDeleter";
import {TaskRepository} from "../../../../../src/modules/tasks/domain/TaskRepository";

describe('TaskDeleter', () => {
    it('should call repository to delete a task', async () => {
        const mockTaskRepository = {
            delete: vi.fn(),
            getAll: vi.fn(),
            save: vi.fn(),
            get: vi.fn()
        } as TaskRepository
        const taskDeleter = new TaskDeleter(mockTaskRepository);

        await taskDeleter.delete('1');

        expect(mockTaskRepository.delete).toHaveBeenCalledWith('1');
    });
    it('should call repository to check if task exists', async () => {
        const mockTaskRepository = {
            delete: vi.fn(),
            getAll: vi.fn(),
            save: vi.fn(),
            get: vi.fn()
        } as TaskRepository
        const taskDeleter = new TaskDeleter(mockTaskRepository);

        await taskDeleter.delete('1');

        expect(mockTaskRepository.get).toHaveBeenCalledWith('1');
    });
    it('should not call repository to delete a task if it does not exist', async () => {
        const mockTaskRepository = {
            delete: vi.fn(),
            getAll: vi.fn(),
            save: vi.fn(),
            get: vi.fn().mockResolvedValue(null)
        } as TaskRepository
        const taskDeleter = new TaskDeleter(mockTaskRepository);

        await taskDeleter.delete('1');

        expect(mockTaskRepository.delete).not.toHaveBeenCalled();
    });
})
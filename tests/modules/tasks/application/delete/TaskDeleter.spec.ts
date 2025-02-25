import {describe, expect, it, vi} from "vitest";
import {TaskDeleter} from "../../../../../src/modules/tasks/application/delete/TaskDeleter";
import {TaskRepository} from "../../../../../src/modules/tasks/domain/TaskRepository";

describe('TaskDeleter', () => {
    it('should call repository to delete a task', async () => {
        const mockTaskRepository = {
            delete: vi.fn(),
            getAll: vi.fn(),
            save: vi.fn()
        } as TaskRepository
        const taskDeleter = new TaskDeleter(mockTaskRepository);

        await taskDeleter.delete('1');

        expect(mockTaskRepository.delete).toHaveBeenCalledWith('1');
    });
})
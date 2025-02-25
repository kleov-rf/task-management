import type {TaskRepository} from "../domain/TaskRepository.ts";
import type {Task} from "../domain/Task.ts";

export class LocalStorageTaskRepository implements TaskRepository {
    save(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
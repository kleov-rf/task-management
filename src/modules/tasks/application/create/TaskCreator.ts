interface CreateTaskDTO {
    title: string;
    description: string;
    dueDate: number;
}

export class TaskCreator {
    async create({title, description, dueDate}: CreateTaskDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
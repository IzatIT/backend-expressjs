import { Todo, TodoAttributes, TodoCreationAttributes, TodoUpdateAttributes } from '../models/todos';

export class TodoService {

    public async getAll(): Promise<Todo[]> {
        try {
            const todos = await Todo.findAll({
                attributes: ['title', "id", "createdAt", "updatedAt", "did", "enabled"]
            });
            return todos;
        } catch (error) {
            console.error("Error fetching todos:", error);
            throw error;
        }
    }

    public async create(data: TodoCreationAttributes): Promise<Todo> {
        const todo = await Todo.create(data);
        return todo;
    }


    public async update(id: number, data: TodoUpdateAttributes): Promise<TodoAttributes | null> {
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }

        const [updatedCount] = await Todo.update(data, {
            where: { id: id },
        });

        if (updatedCount === 0) {
            return null;
        }

        const updatedTodo = await this.getById(id);
        return updatedTodo;
    }


    public async getById(id: number): Promise<TodoAttributes | null> {
        const todo = await Todo.findOne({ where: { id: id } });
        return todo;
    }
}

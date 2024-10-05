// userController.ts
import { Body, Delete, Get, Post, Query, Route } from "tsoa";
import { Todo, TodoAttributes, TodoCreationAttributes } from "../models/todos";
import { TodoService } from "../services/todo";


@Route("api/v1/todo")
export class TodoController {
    private todoService = new TodoService();

    @Post("/create")
    public async create(@Body() data: TodoCreationAttributes): Promise<TodoAttributes> {
        const res = await this.todoService.create(data);
        return res
    }

    @Post("/update/{id}")
    public async update(
        @Query() id: number,
        @Body()
        data: TodoCreationAttributes,
    ): Promise<TodoAttributes | null> {
        const updatedTodo = await this.todoService.update(id, data);
        return updatedTodo
    }

    @Get("/{id}")
    public async getById(
        @Query() id: number
    ): Promise<TodoAttributes | null> {
        const data = await this.todoService.getById(id)
        return data
    }

    @Post("/did")
    public async did(
        @Query() id: number
    ): Promise<TodoAttributes | null> {
        const todo = await this.getById(id);
        const data = await this.todoService.update(id, {
            did: !todo?.did
        })
        return data
    }


    @Delete("/disable")
    public async disable(
        @Query() id: number
    ): Promise<TodoAttributes | null> {
        const data = await this.todoService.update(id, {
            enabled: false
        })
        return data
    }

    @Post("/enable")
    public async enable(
        @Query() id: number
    ): Promise<TodoAttributes | null> {
        const data = await this.todoService.update(id, {
            enabled: true
        })
        return data
    }

    @Get("/")
    public async getAll(): Promise<TodoAttributes[] | null> {
        const data = await this.todoService.getAll()
        return data
    }
}

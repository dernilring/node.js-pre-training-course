import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { threadId } from "worker_threads";

@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll() {
    const todos = await this.todoService.getAll();
    if (!todos) {
      throw new NotFoundException("todos not found");
    }
    return todos;
  }
  @Get(":id")
  async getByID(@Param("id") id: string) {
    const todo = await this.todoService.getById(Number(id));
    if (!todo) {
      throw new NotFoundException(`todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(
    @Body()
    body: {
      title: string;
      description?: string;
      completed?: boolean;
      userId?: number;
    }
  ) {
    return this.todoService.create(body);
  }
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: { title?: string; completed?: boolean; description?: string }
  ) {
    return await this.todoService.update(Number(id), body);
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const result = await this.todoService.delete(Number(id));
    if (!result) {
      throw new NotFoundException(`todo with id ${id} not found`);
    }
    return { message: "Todo deleted successfully", id: Number(id) };
  }
}

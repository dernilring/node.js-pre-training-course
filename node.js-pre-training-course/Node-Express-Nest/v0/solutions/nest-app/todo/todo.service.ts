import { Injectable } from "@nestjs/common";
import { Todo } from "../../../../../JS-TS/solutions/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class TodoService {
  // TODO: implement methods for managing todos

  private mapToApiFormat(dbTodo: any) {
    return {
      id: dbTodo.id,
      title: dbTodo.title,
      description: dbTodo.description,
      completed: dbTodo.status === "completed",
    };
  }

  async create(data: {
    title: string;
    description?: string;
    completed?: boolean;
    userId?: number;
  }) {
    const DBtodo = await prisma.todos.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: data.completed ? "completed" : "active",
        user_id: data.userId || 1,
      },
    });
    return this.mapToApiFormat(DBtodo);
  }
  async getAll() {
    const todos = await prisma.todos.findMany();
    return todos.map((todo) => this.mapToApiFormat(todo));
  }

  async getById(id: number) {
    const todo = await prisma.todos.findUnique({
      where: {
        id,
      },
    });
    return todo ? this.mapToApiFormat(todo) : null;
  }

  async update(
    id: number,
    data: { title?: string; description?: string; completed?: boolean }
  ) {
    const updatedData: any = {};
    if (data.title !== undefined) updatedData.title = data.title;
    if (data.description !== undefined)
      updatedData.description = data.description;
    if (data.completed !== undefined) updatedData.completed = data.completed;

    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: updatedData,
    });
    return this.mapToApiFormat(updatedTodo);
  }
 

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.todos.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

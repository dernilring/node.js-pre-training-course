// NestJS Service for ToDos
import { Injectable } from "@nestjs/common";
import { Todo, TodoStatus, NewTodo } from "../../../JS-TS/solutions/types.ts";

@Injectable()
export class TodosService {
  // TODO: implement todos storage and methods (getTodos, addTodo, markCompleted)
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: NewTodo): Todo {
    const todo: Todo = {
      id: Date.now(),
      ...newTodo,
      status: TodoStatus.IN_PROGRESS,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  markCompleted(id: number): Todo | undefined {
    const todoToFind = this.todos.find((t) => t.id === id);
    if (todoToFind) {
      todoToFind.status = TodoStatus.COMPLETED;
      return todoToFind;
    }
  }
}

import { Injectable } from '@nestjs/common';
import {Todo} from '../../../../../JS-TS/solutions/types'

@Injectable()
export class TodoService {
  // TODO: implement methods for managing todos
    private todos: Todo[] = [];

  getAll(): Todo[] {
    return this.todos;
  }

  create(todo: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      id: this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
      createdAt: new Date(),
      ...todo,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
} 
// NestJS Controller for /todos
import { Controller, Get } from '@nestjs/common';

@Controller('todos')
export class TodosController {
 private todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Learn Node.js', completed: false },
  { id: 3, title: 'Write code', completed: false },
  { id: 4, title: 'Go to gym', completed: false },
  { id: 5, title: 'Read a book', completed: true }
];
  @Get() 
  getTodos() {
  return this.todos;
  }
} 
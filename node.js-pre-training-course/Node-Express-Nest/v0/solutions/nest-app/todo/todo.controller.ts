import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Controller("todos")
export class TodoController {
  private todos: Todo[] = [
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Learn Node.js", completed: false },
    { id: 3, title: "Write code", completed: false },
    { id: 4, title: "Go to gym", completed: false },
    { id: 5, title: "Read a book", completed: true },
  ];

  @Get()
  getAll(): Todo[] {
    // TODO: implement
    return this.todos;
  }

  @Post()
  create(@Body() body: { title: string; completed?: boolean }): Todo {
    // TODO: implement
    const newTodo: Todo = {
      id:
        this.todos.length > 0
          ? Math.max(...this.todos.map((todo) => todo.id)) + 1
          : 1,
      title: body.title,
      completed: body.completed ?? false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }


  @Get("search")
  search(@Query() query: { title?: string; completed?: string }): Todo[] {
    // TODO: implement

    let filtered = this.todos;

    if (query.title !== undefined) {
      const substr = String(query.title).toLocaleLowerCase();
      filtered = filtered.filter((todo) =>
        todo.title.toLocaleLowerCase().includes(substr)
      );
    }

    if (query.completed !== undefined) {
      const compFlag = query.completed === "true";
      filtered = filtered.filter((todo) => todo.completed === compFlag);
    }
    return filtered;
  }
  
  @Get(":id")
  getById(@Param("id") id: string): Todo | undefined{
    const idN = Number(id);
    return this.todos.find((t) => t.id === idN);
  }

}

import { TodoApi } from "./todo-api";
import { NewTodo, Todo, TodoStatus } from "./types";

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description = ""): Promise<Todo> {
    if (!title.trim()) throw new Error("title can not be empty ");
    const newTodo: NewTodo = { title, description };
    return this.api.add(newTodo);
  }

  async toggleStatus(id: number): Promise<Todo> {
    if (typeof id !== "number") throw new Error("id is number");
    return this.api.update(id, { status: TodoStatus.COMPLETED });
  }

  async search(keyword: string): Promise<Todo[]> {
    const searchValue = keyword.toLowerCase().trim();

    const todos = await this.api.getAll();

    if (!searchValue) return todos;
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchValue) ||
        todo.description?.toLowerCase().includes(searchValue)
    );
  }
}

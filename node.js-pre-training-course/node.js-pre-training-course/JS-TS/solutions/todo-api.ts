import { InMemoryRepository } from "./repository";
import { Todo, NewTodo, TodoStatus } from "./types";

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  private nextId = 1;

  async getAll(): Promise<Todo[]> {
    await createNetworkLatency();
    return this.repo.findAll();
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await createNetworkLatency();
    const todo: Todo = {
      id: this.nextId++,
      title: newTodo.title,
      description: newTodo.description,
      status: TodoStatus.PENDING,
      createdAt: new Date(),
    };
    return this.repo.add(todo);
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>
  ): Promise<Todo> {
    await createNetworkLatency();
    const found = this.repo.findById(id);
    if (!found) throw new TodoNotFoundError(id);
    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await createNetworkLatency();
    const found = this.repo.findById(id);
    if (!found) throw new TodoNotFoundError(id);
    return this.repo.remove(id);
  }
}

function createNetworkLatency(): Promise<void> {
  const delay = 300 + Math.floor(Math.random() * 300);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`todo ${id} is not found`);
    this.name = "TodoNotFoundError";
  }
}

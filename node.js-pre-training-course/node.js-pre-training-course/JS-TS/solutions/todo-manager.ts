import { TodoService } from "./todo-service";
import { TodoApi } from "./todo-api";
import { Todo } from "./types";

export class ToDoManager {
  private service = new TodoService(new TodoApi());

  async init(): Promise<void> {
    await this.service.create("Buy groceries", "Milk and bread");
    await this.service.create("Write code", "Finish the project");
    await this.service.create("Read book", "Science fiction novel");
  }

  async add(title: string, description = ""): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    return this.service.search("");
  }
}

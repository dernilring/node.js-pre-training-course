// NestJS DTO class for ToDo

export class ToDoDto {
  // TODO: implement fields: id, title, completed
  id: number;
  title: string;
  completed: boolean;

  constructor(data: any) {
    if (typeof data.id !== "number") {
      throw new Error("invalid id");
    }
    if (typeof data.title !== "string") {
      throw new Error("invalid title");
    }
    if (typeof data.completed !== "boolean") {
      throw new Error("invalid status");
    }

    this.id = data.id;
    this.title = data.title;
    this.completed = data.completed;
  }
}

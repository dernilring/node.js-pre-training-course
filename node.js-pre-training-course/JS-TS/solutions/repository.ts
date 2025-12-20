export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    const indexTodoToUpdate = this.items.findIndex((todo) => todo.id === id);
    if (indexTodoToUpdate === -1) throw new Error(`todo ${id} is not found`);
    const updated = { ...this.items[indexTodoToUpdate], ...patch };
    this.items[indexTodoToUpdate] = updated;
    return updated;
  }

  remove(id: number): void {
    this.items = this.items.filter((todo) => todo.id !== id);
  }

  findById(id: number): T | undefined {
    return this.items.find((todo) => todo.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }
}

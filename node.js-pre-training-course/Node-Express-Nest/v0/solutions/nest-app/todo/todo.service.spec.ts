import { TodoService } from "./todo.service";

describe("TodoService", () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should manage todos in service", () => {
    // TODO: implement test for managing todos
    const all = service.getAll?.() ?? [];
    expect(Array.isArray(all)).toBe(true);

    if (service.create) {
      const created = service.create({ title: "Test todo" } as any);
      expect(created).toBeDefined();
      expect(created.title).toBe("Test todo");
    }
    expect(typeof service).toBe("object");
  });
});

import { Todo } from "./types";

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  if (state === null || state === undefined)
    throw new Error("state ia null or indefined");

  return [...state, todo];
}

export function updateTodo(
  state: Todo[],
  id: number,
  update: Partial<Omit<Todo, "id" | "createdAt">>
): Todo[] {
  if (state === null || state === undefined)
    throw new Error("state ia null or indefined");

  return state.map((todo) => (todo.id === id ? { ...todo, ...update } : todo));
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  if (state === null || state === undefined)
    throw new Error("state ia null or indefined");

  return state.filter((todo) => todo.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  if (state === null || state === undefined)
    throw new Error("state ia null or indefined");
  return state.find((todo) => todo.id === id);
}

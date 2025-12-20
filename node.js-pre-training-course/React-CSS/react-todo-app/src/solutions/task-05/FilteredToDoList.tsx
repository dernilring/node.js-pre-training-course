import React, { useCallback, useMemo, useState } from "react";
import { Todo } from "../../types";
import { AddToDo } from "../task-03/AddToDo";
import { CompleteToDoList } from "../task-04/CompleteToDoList";

/**
 * Task 5: FilteredToDoList Component
 *
 * Theory: Derived State and Computed Values
 *
 * In React, you often need to compute values based on your state. These are called "derived state"
 * or "computed values" and should be calculated during render rather than stored in state.
 *
 * Why Use Derived State:
 * 1. Avoids state synchronization issues
 * 2. Reduces complexity by having a single source of truth
 * 3. Automatically updates when source data changes
 * 4. Prevents stale state bugs
 *
 * Common Derived State Patterns:
 *
 * Filtering:
 * - const activeTodos = todos.filter(todo => !todo.completed)
 * - const completedTodos = todos.filter(todo => todo.completed)
 *
 * Searching:
 * - const filteredTodos = todos.filter(todo =>
 *     todo.title.toLowerCase().includes(searchTerm.toLowerCase())
 *   )
 *
 * Sorting:
 * - const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title))
 *
 * Aggregations:
 * - const completedCount = todos.filter(todo => todo.completed).length
 * - const totalCount = todos.length
 *
 * Multiple Filters:
 * - Use multiple filter conditions or combine them
 * - Consider using useMemo for expensive computations
 *
 * Key Concepts:
 * - Calculate derived values during render
 * - Don't store computed values in state
 * - Use useMemo for expensive calculations
 * - Keep state minimal and derive the rest
 */
export const FilteredToDoList: React.FC = () => {
  // TODO: Implement the FilteredToDoList component
  //
  // Requirements:
  // 1. Display a list of todos with add functionality
  // 2. Add filter buttons: "All", "Active", "Completed"
  // 3. Filter todos based on selected filter
  // 4. Use derived state for filtered results
  // 5. Add complete functionality for todos
  //
  // Example implementation:
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
   const [inputValue, setInputValue] = useState("");

  const handleSetFilter=(filterType: "all" | "active" | "completed")=>{
    setFilter(filterType)
  }

  const filterTodos = useCallback(
    (todos: Todo[], filterType: "all" | "active" | "completed") => {
      if (filterType === "active")
        return todos.filter((todo) => !todo.completed);
      if (filterType === "completed")
        return todos.filter((todo) => todo.completed);
      return todos;
    },
    []
  );
  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter, filterTodos]);

  const markCompleted = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
    };
  
    const handleSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleAddTodo = () => {
      if (inputValue.trim().length === 0) return;
  
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue,
        completed: false,
      };
  
      setTodos([...todos, newTodo]);
      setInputValue("");
    };
  
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleAddTodo();
    };
  

  return (
    <div>
  <input
        type="text"
        value={inputValue}
        onChange={handleSetInputValue}
        placeholder="Add todo"
      />
      <button onClick={handleButtonClick}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={markCompleted.bind(null, todo.id)}>
              Complete
            </button>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button onClick={()=>handleSetFilter("all")}>All</button>
        <button onClick={()=>handleSetFilter("completed")}>Completed</button>
        <button onClick={()=>handleSetFilter("active")}>Active</button>
      </div>

       {filteredTodos.map(todo => (
      <div key={todo.id}>{todo.title}</div>
    ))}
    </div>
  );
};

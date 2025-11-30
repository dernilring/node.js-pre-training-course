#!/usr/bin/env ts-node
// CLI entry for Task 10 – placeholder only
import { ToDoManager } from "./todo-manager";

const manager = new ToDoManager();

async function main() {
  const command = process.argv[2];

  if (!command) {
    console.log("Usage: node index.ts <command>");
    console.log("Commands: init, add, list, complete");
    return;
  }

  if (command === "init") {
    await manager.init();
    console.log("Demo data initialized!");
  } else if (command === "add") {
    const title = process.argv[3];
    const description = process.argv[4];

    if (!title) {
      console.error("Please provide a title");
      process.exit(1);
    }

    await manager.add(title, description);
    console.log("Todo added!");
  } else if (command === "list") {
    const todos = await manager.list();
    console.table(todos);
  } else if (command === "complete") {
    const id = parseInt(process.argv[3]);

    if (isNaN(id)) {
      console.error("Please provide a valid ID");
      process.exit(1);
    }

    await manager.complete(id);
    console.log("Todo completed!");
  } else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});

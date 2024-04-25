import { deleteTodoAction, toogleTodoAction } from "./actions";
import { getAllTodos } from "@/data-access/todos";
import { unstable_noStore } from "next/cache";

import "./global.css";

import { TodoForm } from "@/components/todo-form";
import { CheckSquareIcon, SquareIcon } from "lucide-react";

export default async function Home() {
  unstable_noStore();
  const todosList = await getAllTodos();
  return (
    <main className="m-8">
      <TodoForm />
      <ul className="list">
        {todosList?.map((todo) => {
          return (
            <li key={todo.id} className="flex gap-2 items-center">
              <form action={toogleTodoAction.bind(null, todo.id)}>
                <button>
                  {todo.completed ? <CheckSquareIcon /> : <SquareIcon />}
                </button>
              </form>
              {todo.text}
              <form action={deleteTodoAction.bind(null, todo.id)}>
                <button className="text-red-400">delete</button>
              </form>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

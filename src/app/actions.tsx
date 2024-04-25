"use server";

import { todos } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type FormState = {
  text: string;
  errors: {
    text: string | undefined;
  };
};

export async function createTodoAction(
  previousState: FormState,
  formData: FormData
) {
  const text = formData.get("text") as string;

  if (!text) {
    return {
      text,
      errors: {
        text: "Todo description required",
      },
    };
  }
  await db?.insert(todos).values({
    text,
  });
  revalidatePath("/");
  return {
    text: "",
    errors: {
      text: undefined,
    },
  };
}
export async function deleteTodoAction(id: number) {
  await db?.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function toogleTodoAction(id: number) {
  const todo = await db?.query.todos.findFirst({
    where: eq(todos.id, id),
  });
  await db
    ?.update(todos)
    .set({
      completed: !todo?.completed,
    })
    .where(eq(todos.id, id));
  revalidatePath("/");
}

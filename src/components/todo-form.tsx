"use client";

import { createTodoAction, FormState } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";

export function TodoForm() {
  const [formState, wrappedCreateTodoAction] = useFormState(createTodoAction, {
    text: "",
    errors: {
      text: undefined,
    },
  } as FormState);
  return (
    <form action={wrappedCreateTodoAction}>
      <input defaultValue={formState.text} name="text" />
      {formState.errors.text && (
        <div className="text-red-400">{formState.errors.text}</div>
      )}
      <SubmitButton />
    </form>
  );
}

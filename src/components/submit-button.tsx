"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      style={{
        backgroundColor: pending ? "red" : "blue",
        color: "wheat",
        marginLeft: "8px",
        padding: "8px",
      }}
    >
      {pending ? "Creating..." : "Create Todo"}
    </button>
  );
}

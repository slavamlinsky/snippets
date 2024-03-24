"use client";
// import { createSnippet } from "@/actions";
import * as actions from "@/actions";
// import { db } from "@/db";
// import { redirect } from "next/navigation";

import { useFormState } from "react-dom";

const SnippetCreatePage = () => {
  const [formState, action] = useFormState(actions.createSnippet, { message: "" });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input className="border rounded p-2 w-full" type="text" name="title" id="title" />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea className="border rounded p-2 w-full" name="code" id="code" rows={5} />
        </div>
        {formState.message && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div>
        )}
        <button className="border rounded p-2 bg-blue-200">Add snippet</button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;

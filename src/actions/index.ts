"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/");

  redirect(`/`);
};

export async function createSnippet(formState: { message: string }, formData: FormData) {
  // return { message: "title must be longer" };

  try {
    // Check the user's inputs and make sure they're valid
    const title: FormDataEntryValue | null = formData.get("title");
    const code: FormDataEntryValue | null = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }

    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be longer" };
    }

    // create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });

    revalidatePath("/");

    // throw new Error("Failed to save to database.");
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: "DataBase error" };
  }

  // Redirect the user back to the root route
  redirect("/");
}

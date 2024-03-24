"use client";

import * as actions from "@/actions";

// import { editSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "", event: any) => {
    setCode(value);
    // const result = editSnippet();
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <h2 className="text-3xl my-3 mx-2">{snippet.title}</h2>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false } }}
      />
      <form action={editSnippetAction}>
        <button className="my-2 bg-gray-400 text-white rounded py-2 px-4 hover:bg-gray-700">Save changes</button>
      </form>
    </div>
  );
};

export default SnippetEditForm;

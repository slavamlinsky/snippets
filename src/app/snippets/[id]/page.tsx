import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

const SnippetShowPage = async (props: SnippetShowPageProps) => {
  const snippetId = props.params.id;

  const snippet = await db.snippet.findFirst({ where: { id: parseInt(snippetId) } });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold"> {snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippetId}/edit`}
            className="my-2 bg-gray-400 text-white rounded py-2 px-4 hover:bg-gray-700"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="my-2 bg-gray-400 text-white rounded py-2 px-4 hover:bg-gray-700">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-400">{snippet.code}</pre>
    </div>
  );
};

export default SnippetShowPage;

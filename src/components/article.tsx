import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { Buffer } from "buffer";
import { LoadingPage } from "./loading";

export const Article = (props: { path: string }) => {
  const [articleText, setArticleText] = useState("");

  // Fetch Terms of Use
  useEffect(() => {
    void fetch(props.path)
      .then((res) => res.text())
      .then((text) => setArticleText(text));
  });

  // const [input, setInput] = useState("");
  //
  // const ctx = api.useContext();
  //
  // const { mutate, isLoading: isPosting } = api.articles.create.useMutation({
  //   onSuccess: () => {
  //     toast.success("Article posted!");
  //     // setInput("");
  //     // void ctx.articles.getAll.invalidate();
  //   },
  //   onError: (e) => {
  //     const errorMessage = e.data?.zodError?.fieldErrors.content;
  //     if (errorMessage && errorMessage[0]) {
  //       toast.error(errorMessage[0]);
  //     } else {
  //       toast.error("Failed to post. Please try again later.");
  //     }
  //   },
  // });

  // <button
  //   className="w-full h-screen rounded-lg bg-black"
  //   onClick={() =>
  //     mutate({ title: "My First Article", content: Buffer.from(articleText).toString("ascii") })
  //   }
  // />

  return (
    <>
      {articleText == "" ? (
        <LoadingPage />
      ) : (
        <div className="m-4 flex items-center gap-2 rounded-sm bg-white">
          <div className="m-16 flex">
            <ReactMarkdown className="prose text-xl text-gray-800">
              {articleText}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

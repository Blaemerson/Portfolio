import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const Article = (props: {path: string}) => {
  const [articleText, setArticleText] = useState("");

  // Fetch Terms of Use
  useEffect(() => {
    fetch(props.path)
      .then((res) => res.text())
      .then((text) => setArticleText(text));
  });

  return (
    <div className="m-4 flex items-center gap-2 rounded-sm bg-white">
      <div className="m-16 flex">
        <ReactMarkdown children={articleText} className="prose text-xl font-serif"/>
      </div>
    </div>
  );
};

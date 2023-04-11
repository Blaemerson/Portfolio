import ReactMarkdown from "react-markdown";
import { RouterOutputs } from "~/utils/api";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type ArticleWithUser = RouterOutputs["articles"]["getAll"][number];
export const ArticlePreview = (props: ArticleWithUser) => {
  const { article, author } = props;

  const preview = article.content.split("\n").slice(0, 3).join("\n");
  return (
    <Link href={`/blog/${article.id}`}>
      <div
        key={article.id}
        className="transition my-4 duration-200 ease-in-out hover:bg-white bg-gray-100 flex hover:shadow-xl text-md sm:text-xl text-slate-700"
      >
        <img
          className="m-2 flex h-12 w-12 md:h-16 md:w-16"
          src={author.profilePicture!}
        />
        <div className="m-4 flex flex-col">
          <div className="flex">
            <span className="italic text-slate-500">{`${author.name!}`}</span>
            <span className="whitespace-pre-wrap italic text-slate-400">{` - ${dayjs(
              article.createdAt
            ).fromNow()}`}</span>
          </div>
          <ReactMarkdown>{`${preview}`}</ReactMarkdown>
          <span className="font-bold text-blue-500 hover:text-blue-400">
            . . .
          </span>
        </div>
      </div>
    </Link>
  );
};

export const Article = (props: ArticleWithUser) => {
  return (
    <>
      <div
        key={props.article.id}
        className="flex text-md sm:text-xl text-slate-700"
      >
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex">
              <span className="justify-center italic text-slate-500 pb-4">{`Author: ${props
                .author.name!}`}</span>
              <span className="whitespace-pre-wrap italic text-slate-400">{` - ${dayjs(
                props.article.createdAt
              ).fromNow()}`}</span>
            </div>
            <ReactMarkdown className="whitespace-pre-wrap text-md sm:text-xl sm:text-justify text-gray-800">
              {props.article.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

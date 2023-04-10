import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { LoadingPage } from "./loading";
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
        className="ms-4 flex gap-2 rounded-md bg-white p-4 font-serif text-xl text-slate-700"
      >
        <img
          className="m-2 flex h-16 w-16 rounded-md"
          src={author.profilePicture!}
        />
        <div className="my-2 flex flex-col">
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
        className="flex rounded-md bg-white font-serif text-xl text-slate-700"
      >
        <div className="flex items-center">
          <div className="flex flex-col p-8">
            <div className="flex">
              <span className="justify-center italic text-slate-500">{`Author: ${props
                .author.name!}`}</span>
              <span className="whitespace-pre-wrap italic text-slate-400">{` - ${dayjs(
                props.article.createdAt
              ).fromNow()}`}</span>
            </div>
            <ReactMarkdown className="prose pt-4 text-xl text-gray-800">
              {props.article.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

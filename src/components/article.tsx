import ReactMarkdown from "react-markdown";
import { type RouterOutputs, api } from "~/utils/api";
import Link from "next/link";
import Image from "next/image";

import { toast } from "react-hot-toast";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingSpinner } from "./loading";
import { useSession } from "next-auth/react";
dayjs.extend(relativeTime);

interface Data {
  title: string;
  id: string;
}

export const RecentArticles = () => {
  const { data, isLoading: articlesLoading } = api.articles.getAll.useQuery();
  if (articlesLoading) return <></>;
  if (!data)
    return (
      <div className="flex justify-center p-10 text-2xl text-red-500">
        Something went wrong...
      </div>
    );

  const headlines: Data[] = data.map((entry) => {
    return { title: entry.article.title, id: entry.article.id };
  });

  return (
    <div className="w-56 flex-col">
      <div className="orange_bar_sep">
        Recent
      </div>
      {[...headlines].map((entry) => (
        <Link key={entry.id} href={`/blog/${entry.id}`}>
          <div className="article_preview p-4 ">
            {entry.title.replaceAll("#", "")}
          </div>
        </Link>
      ))}
    </div>
  );

  return <div className="h-60 w-60 bg-black">Hello there</div>;
};

type ArticleWithUser = RouterOutputs["articles"]["getAll"][number];
export const ArticlePreview = (props: ArticleWithUser) => {
  const { article, author } = props;
  const { data: numComments, isLoading: commentsLoading } =
    api.comments.aggregate.useQuery({
      article_id: article.id,
    });

  const ctx = api.useContext();
  const { mutate, isLoading: isDeleting } = api.articles.delete.useMutation({
    onSuccess: () => {
      void ctx.articles.getAll.invalidate();
      toast.success("Post deleted");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to delete post");
      }
    },
  });
  const user = useSession().data?.user;

  const preview = article.content.split("\n").slice(0, 3).join("\n");
  return (
    <div>
      <Link href={`/blog/${article.id}`}>
        <div key={article.id} className="article_block">
          <div className="m-4 w-full">
            <div className="w-full">
              <span className="whitespace-pre-wrap italic text-slate-400">{`${
                author.name ?? ""
              } - ${dayjs(article.createdAt).fromNow()}`}</span>
            </div>
            <ReactMarkdown>{`${preview}`}</ReactMarkdown>
          </div>
          <span
            id="comment_count"
            className="me-2 flex items-end"
          >
            <Link className="my-2 rounded-xl" scroll={false} href={`/blog/${article.id}#comment_section`}>
              <span className="p-2 flex w-16 justify-center rounded-xl hover:bg-slate-200 dark:hover:bg-slate-900 gap-x-1 font-bold ">
                {commentsLoading ? <LoadingSpinner size={20} /> : numComments}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </span>
            </Link>
          </span>
        </div>
      </Link>
      {user && user.email == "blakesavage99@gmail.com" ? (
        <div className="m-4 flex flex-col items-center justify-center">
          <button
            disabled={isDeleting}
            className="flex h-12 w-24 items-center justify-center rounded-xl bg-gradient-to-b  from-red-400 to-red-500 text-xl hover:from-slate-300 hover:to-slate-400 disabled:bg-slate-300"
            onClick={() => mutate({ id: article.id })}
          >
            Delete
          </button>
        </div>
      ) : (
        <>
          {isDeleting && (
            <div className="m-4 flex items-center justify-center">
              <LoadingSpinner size={40} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const Article = (props: ArticleWithUser) => {
  return (
    <div key={props.article.id} className="article">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex">
            <span className="justify-center pb-4 italic">{`Author: ${
              props.author.name ?? "name"
            }`}</span>
            <span className="whitespace-pre-wrap italic">{` - ${dayjs(
              props.article.createdAt
            ).fromNow()}`}</span>
          </div>
          <ReactMarkdown className="text-md whitespace-pre-wrap sm:text-justify sm:text-xl">
            {props.article.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

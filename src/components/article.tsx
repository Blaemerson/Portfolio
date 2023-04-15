import ReactMarkdown from "react-markdown";
import { RouterOutputs, api } from "~/utils/api";
import Link from "next/link";

import { toast } from "react-hot-toast";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingSpinner } from "./loading";
import { useSession } from "next-auth/react";
dayjs.extend(relativeTime);

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
        <div
          key={article.id}
          className="text-md items-between my-4 flex bg-gray-100 text-slate-700 transition duration-200 ease-in-out hover:bg-white hover:shadow-xl md:text-xl"
        >
          <img
            className="m-2 h-12 w-12 md:h-16 md:w-16"
            src={author.profilePicture!}
          />
          <div className="w-full m-4">
            <div className="w-full">
              <span className="whitespace-pre-wrap italic text-slate-400">{`${author.name!} - ${dayjs(
                article.createdAt
              ).fromNow()}`}</span>
            </div>
            <ReactMarkdown>{`${preview}`}</ReactMarkdown>
          </div>
          <span
            id="comment_count"
            className="flex items-end me-2 hover:text-blue-400"
          >
            <Link scroll={false} href={`/blog/${article.id}#comment_section`}>
              <span className="m-2 flex gap-x-1 font-bold ">
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
    <div
      key={props.article.id}
      className="text-md flex text-slate-700 sm:text-xl"
    >
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex">
            <span className="justify-center pb-4 italic text-slate-500">{`Author: ${props
              .author.name!}`}</span>
            <span className="whitespace-pre-wrap italic text-slate-400">{` - ${dayjs(
              props.article.createdAt
            ).fromNow()}`}</span>
          </div>
          <ReactMarkdown className="text-md whitespace-pre-wrap text-gray-800 sm:text-justify sm:text-xl">
            {props.article.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

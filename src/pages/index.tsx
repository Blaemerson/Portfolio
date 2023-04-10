import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { SideBar } from "~/components/sidebar";
import { ArticlePreview } from "~/components/article";
import ReactMarkdown from "react-markdown";

const CreateArticleWizard = () => {
  const user = useSession().data?.user;

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.articles.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.articles.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post. Please try again later.");
      }
    },
  });

  if (!user) return null;

  console.log(user);

  return (
    <div className="m-6 flex">
      <img
        src={user.image!}
        alt="Profile Image"
        className="mr-3 h-16 w-16 rounded-md "
      />
      <div className="flex w-full flex-col">
        <textarea
          placeholder="Blog Post"
          className="grow rounded-lg bg-white p-4 text-xl text-slate-800 outline-none disabled:bg-slate-300"
          value={input}
          disabled={isPosting}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="m-4 flex items-center justify-center">
          {input !== "" && !isPosting && (
            <button
              className="flex h-16 w-32 items-center justify-center rounded-md bg-gradient-to-b from-slate-400 to-slate-500 text-3xl hover:from-slate-300 hover:to-slate-400"
              onClick={() =>
                mutate({ content: input, title: input.split("\n")[0]! })
              }
            >
              Post
            </button>
          )}
        </div>
        {isPosting && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={40} />
          </div>
        )}
      </div>
    </div>
  );
};

const CreatePostWizard = () => {
  const user = useSession().data?.user;

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post. Please try again later.");
      }
    },
  });

  if (!user) return null;

  console.log(user);

  return (
    <div className="mx-6 flex">
      <img
        src={user.image!}
        alt="Profile Image"
        className="mr-3 h-16 w-16 rounded-md "
      />
      <input
        placeholder="Comment"
        className="grow rounded-lg bg-white px-4 text-xl text-slate-800 outline-none disabled:bg-slate-300"
        value={input}
        type="text"
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      {input !== "" && !isPosting && (
        <button
          className="ml-3 w-24 rounded-md bg-gradient-to-b from-slate-400 to-slate-500 text-xl hover:from-slate-300 hover:to-slate-400"
          onClick={() => mutate({ content: input })}
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      )}
    </div>
  );
};



const ArticleFeed = () => {
  const { data, isLoading: postsLoading } = api.articles.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data)
    return (
      <div className="flex justify-center p-10 text-2xl text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <div>
      {[...data].map((fullArticle) => (
        <ArticlePreview key={fullArticle.article.id} {...fullArticle} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  api.posts.getAll.useQuery();
  const user = useSession().data?.user;

  return (
    <>
      <main>
        <div className="h-screen w-screen pe-16 ps-16 sm:ps-80 lg:text-justify">
          <div className="me-80">
            <SideBar />
          </div>
          <div className="flex h-screen">
            <div className="h-screen w-full pt-2 md:max-w-5xl">
              <h1 className="mb-4 ms-4">Blog</h1>
              {user && user.email == "blakesavage99@gmail.com" ? (
                <CreateArticleWizard />
              ) : (
                <></>
              )}
              <ArticleFeed />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

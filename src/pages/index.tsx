import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SideBar } from "~/components/sidebar";
import { ArticlePreview } from "~/components/article";

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
    <div className="flex">
      <img
        src={user.image!}
        alt="Profile Image"
        className="m-2 h-16 w-16 rounded-md "
      />
      <div className="flex w-full flex-col">
        <textarea
          placeholder="Blog Post"
          className="grow rounded-lg bg-white p-4 text-xl text-slate-800 disabled:bg-slate-300"
          value={input}
          disabled={isPosting}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center justify-center">
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
    <div className="pb-16">
      {[...data].map((fullArticle) => (
        <ArticlePreview key={fullArticle.article.id} {...fullArticle} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const user = useSession().data?.user;

  return (
    <>
      <main>
        <div className="h-screen w-screen px-4 sm:ps-80 lg:text-justify">
          <div>
            <SideBar />
          </div>
          <div className="flex h-screen">
            <div className="h-screen w-full md:max-w-5xl">
              <h1>Blog</h1>
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

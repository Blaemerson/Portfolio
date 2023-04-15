import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ArticlePreview } from "~/components/article";
import { PageLayout } from "~/components/layout";

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
    <div>
      <img
        src={user.image!}
        alt="Profile Image"
        className="m-2 h-16 w-16 rounded-md "
      />
      <div className="flex flex-col">
        <textarea
          placeholder="Blog Post"
          className="grow rounded-lg bg-gray-50 p-4 text-xl text-slate-800 hover:bg-white disabled:bg-slate-300"
          value={input}
          disabled={isPosting}
          onChange={(e) => setInput(e.target.value)}
        />
        {isPosting && (
          <div className="m-4 flex items-center justify-center">
            <LoadingSpinner size={40} />
          </div>
        )}
      </div>
      {input !== "" && !isPosting && (
        <div className="m-4 flex flex-col items-center justify-center">
          <button
            disabled={isPosting}
            className="flex h-12 w-24 items-center justify-center rounded-xl bg-gradient-to-b  from-red-400 to-red-500 text-xl hover:from-slate-300 hover:to-slate-400 disabled:bg-slate-300"
            onClick={() =>
              mutate({ content: input, title: input.split("\n")[0]! })
            }
          >
            Post
          </button>
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
  const user = useSession().data?.user;

  return (
    <PageLayout>
      <h1>Blog</h1>
      <div className="w-full bg-white p-4 shadow-xl sm:mt-0">
        {user && user.email == "blakesavage99@gmail.com" ? (
          <CreateArticleWizard />
        ) : (
          <></>
        )}
        <ArticleFeed />
      </div>
    </PageLayout>
  );
};

export default Home;

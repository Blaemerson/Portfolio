import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { RouterOutputs, api } from "~/utils/api";

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { toast } from "react-hot-toast";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import Link from "next/link";
import { Article } from "~/components/article";
import { SideBar } from "~/components/sidebar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useState } from "react";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const TextPost = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="m-4 flex gap-2 rounded-md bg-white font-serif text-xl text-slate-700"
    >
      <img
        className="m-2 flex h-16 w-16 rounded-md"
        src={author.profilePicture!}
      />
      <div className="my-2 flex flex-col">
        <div className="flex">
          <Link href={`${author.id}`}>
            <span className="italic text-slate-500">{`${author.name!}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="whitespace-pre-wrap italic text-slate-400">{` - ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <Link href={`/post/${post.id}`}>
          <span className="flex text-slate-600">{post.content}</span>
        </Link>
      </div>
    </div>
  );
};

type ArticleIdType = {articleId: string}
const Feed = ({articleId}: ArticleIdType) => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery({article_id: articleId});

  if (postsLoading) return <LoadingPage />;

  if (!data)
    return (
      <div className="flex justify-center p-10 text-2xl text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <div className="mb-16">
      {[...data].map((fullPost) => (
        <TextPost key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const CreatePostWizard = ({articleId}: ArticleIdType) => {
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
    <div className="m-6 flex">
      <img
        src={user.image!}
        alt="Profile Image"
        className="mr-3 h-16 w-16 rounded-md "
      />
      <input
        placeholder="Leave a comment"
        className="grow rounded-lg bg-white px-4 text-xl text-slate-800 outline-none disabled:bg-slate-300"
        value={input}
        type="text"
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input, article_id: articleId });
            }
          }
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      {input !== "" && !isPosting && (
        <button
          className="ml-3 w-24 rounded-md bg-gradient-to-b from-slate-400 to-slate-500 text-xl hover:from-slate-300 hover:to-slate-400"
          onClick={() => mutate({ content: input, article_id: articleId })}
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

type ArticleWithUser = RouterOutputs["articles"]["getAll"][number];
const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.articles.getArticleById.useQuery({ id });

  if (!data) return <div> No Data </div>;

  return (
    <>
      <Head>
        <title>{data.article.title}</title>
      </Head>
      <main>
        <SideBar />

        <div className="h-screen w-screen pe-16 ps-16 sm:ps-80">
          <div className="h-screen w-full pt-8 md:max-w-4xl lg:text-justify">
            <Article key={data.article.id} {...data} />
            <div className="pt-8">
              <CreatePostWizard articleId={data.article.id}/>
              <Feed articleId={data.article.id}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma: prisma },
    transformer: SuperJSON,
  });

  const id = context.params?.id;
  console.log("slug");
  if (typeof id !== "string") throw new Error("no slug");

  await ssg.articles.getArticleById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;

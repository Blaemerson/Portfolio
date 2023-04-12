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
import { SideBar, TopBar } from "~/components/sidebar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PageLayout } from "~/components/layout";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const Comment = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="text-md my-2 flex bg-white p-3 text-slate-700 sm:text-xl"
    >
      <img
        className="me-4 flex h-12 w-12 rounded-md sm:h-16 sm:w-16"
        src={author.profilePicture!}
      />
      <div className="flex flex-col">
        <div className="flex">
          <Link href={`${author.id}`}>
            <span className="italic text-slate-500">{author.name!}</span>
            <span className="my-2 whitespace-pre-wrap italic text-slate-400">{`- ${dayjs(
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

type ArticleIdType = { articleId: string };
const CommentFeed = ({ articleId }: ArticleIdType) => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery({
    article_id: articleId,
  });

  if (postsLoading)
    return (
      <div className="mb-16 flex flex-col items-center justify-center text-xl text-slate-700">
        Loading Comments...<div className="py-4"></div>
        <LoadingSpinner size={64} />
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center p-10 text-2xl text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <div className="mb-16">
      {[...data].map((fullPost) => (
        <Comment key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const CreateCommentWizard = ({ articleId }: ArticleIdType) => {
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
    <div className="flex flex-col md:flex-row">
      <input
        placeholder="Leave a comment"
        className="text-md w-full rounded-lg bg-white p-4 text-slate-800 disabled:bg-slate-300 sm:text-xl"
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
        <div className="ms-4 flex justify-end">
          <button
            className="text-md m-2 w-24 rounded-xl bg-gradient-to-b from-orange-200 to-orange-300 p-2 font-bold text-slate-700 hover:from-orange-300 hover:to-orange-400 sm:text-xl md:m-0"
            onClick={() => mutate({ content: input, article_id: articleId })}
          >
            Submit
          </button>
        </div>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      )}
    </div>
  );
};

const BlogPostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.articles.getArticleById.useQuery({ id });

  if (!data) return <div> No Data </div>;
  return (
    <>
      <Head>
        <title>{data.article.title}</title>
      </Head>
      <PageLayout>
        <div className="h-screen w-full pt-8 md:max-w-4xl">
          <div className="bg-white p-8">
            <Article key={data.article.id} {...data} />
          </div>
          <div id="comment-section" className="pt-8">
            <CreateCommentWizard articleId={data.article.id} />
            <CommentFeed articleId={data.article.id} />
          </div>
        </div>
      </PageLayout>
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

export default BlogPostPage;

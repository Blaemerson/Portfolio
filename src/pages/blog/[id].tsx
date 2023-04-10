import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { RouterOutputs, api } from "~/utils/api";

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { LoadingPage } from "~/components/loading";
import Link from "next/link";
import { Article } from "~/components/article";
import { SideBar } from "~/components/sidebar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data)
    return (
      <div className="flex justify-center p-10 text-2xl text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <div>
      {[...data].map((fullPost) => (
        <TextPost key={fullPost.post.id} {...fullPost} />
      ))}
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
            <div className="flex justify-end">
              <Link
                href={`/`}
                className="mb-6 me-4 mt-4 flex h-16 w-48 items-center justify-center rounded-full bg-gradient-to-b from-indigo-200 to-indigo-300 p-2 text-xl font-bold text-gray-900 hover:from-indigo-100 hover:to-indigo-200 dark:text-white dark:hover:bg-gray-700"
              >
                Back
              </Link>
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

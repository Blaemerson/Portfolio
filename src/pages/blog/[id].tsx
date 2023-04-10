import {
  GetStaticProps,
  InferGetStaticPropsType,
  type NextPage,
} from "next";
import { api } from "~/utils/api";

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

const SinglePostPage: NextPage<{id: string}> = ({ id }) => {
  const { data } = api.articles.getArticleById.useQuery({ id });

  if (!data) return <div> No Data </div>;

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-screen w-full pt-2 md:max-w-5xl lg:text-justify">
          <div className="m-16 flex">
            <div
              key={data.id}
              className="ms-4 flex gap-2 rounded-md bg-white p-4 font-serif text-xl text-slate-700"
            >
              <div className="my-2 flex flex-col">
                <ReactMarkdown>{data.content}</ReactMarkdown>
              </div>
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

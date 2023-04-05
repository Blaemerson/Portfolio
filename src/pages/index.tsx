import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const user = useSession().data?.user

  if (!user) return null;

  return (
    <div className="flex">
      <img src={user.image!} alt="Profile Image" className="w-16 h-16 m-4 rounded-full" />
      <input placeholder="Type something!" className="w-full outline-none bg-white text-xl text-slate-800 m-4 p-4 rounded-lg" />
    </div>
  )
}

type TextPostProps = {
  childComp: React.ReactNode;
}
const TextPost: React.FC<TextPostProps> = (children) => {
  const {childComp} = children;
  return (
    <p className="bg-white font-serif text-xl rounded-md text-slate-700 p-2 m-2">
      {childComp}
    </p>
  );
}

const Home: NextPage = () => {
  const {data, isLoading} = api.posts.getAll.useQuery();

  if (isLoading) return <div className="flex justify-center p-10 text-2xl">Loading...</div>

  if (!data) return <div className="flex justify-center p-10 text-2xl text-red-500">Something went wrong...</div>

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x md:max-w-2xl">
          <div className="">
            <AuthShowcase />
          </div>
          <CreatePostWizard />
          {[...data].map((post) => (<TextPost key={post.id} childComp=<div>{post.content}</div>></TextPost>))}
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex justify-center">
        <p className="text-center mt-2 text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="rounded-full bg-white/20 my-2 px-10 py-4 font-semibold text-white no-underline transition hover:bg-black/10 hover:text-gray-500"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </>
  );
};

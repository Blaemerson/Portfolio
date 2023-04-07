import { type NextPage } from "next";
import Head from "next/head";
import { LoadingPage } from "~/components/loading";
import {api} from "~/utils/api"

const ProfilePage: NextPage = () => {
  const {data, isLoading} = api.profiles.getUserById.useQuery({id: "clg44roux0008sb4ajojjmith"});
  if (isLoading) return <LoadingPage />

  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>About {data.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>
          {data.name}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
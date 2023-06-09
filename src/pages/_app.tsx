import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [darkToggle, setDarkToggle] = useState(false)

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Blake Savage</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className={`flex ${darkToggle ? 'dark' : ''}`}>
        <button className={`fixed bottom-8 right-8 rounded-full w-20 h-20 ${!darkToggle ? 'bg-slate-800 text-white' : ''} ${darkToggle ? 'bg-slate-200' : ''}`} onClick={() => setDarkToggle(!darkToggle)}>
          <div className="p-2 justify-center items-center">
            {darkToggle ?
              "dark"
              :
              "light"
            }
          </div>
        </button>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};


export default api.withTRPC(MyApp);

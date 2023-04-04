import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";


type SidebarProps = {
  open: boolean;
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <div
      className=
        "flex flex-col justify-between bg-slate-300 text-zinc-50 md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed md:h-[calc(100vh)] h-full w-[300px] transition-transform .3s ease-in-out md:translate-x-0 -translate-x-full"
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          <li>links here</li>
        </ul>
      </nav>
    </div>
  );
};

// components/layout/Navbar.tsx
import React, { useState } from "react";
type NavbarProps = {
  onMenuButtonClick(): void;
};
const Navbar = () => {
  return (
    <nav
      className="bg-white text-zinc-500
        flex items-center
        w-full fixed z-10 px-4 shadow-sm h-16"
    >
      <div className="font-bold text-lg">Portfolio</div>
      <div className="flex-grow"></div> {/** spacer */}
    </nav>
  );
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <SessionProvider session={session}>
    <div className="grid min-h-screen grid-rows-header bg-black-100">
      <Navbar />
      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={showSidebar} setOpen={setShowSidebar}/>
        <Component {...pageProps}/>
      </div>
    </div>
    </SessionProvider>
  );
};


export default api.withTRPC(MyApp);

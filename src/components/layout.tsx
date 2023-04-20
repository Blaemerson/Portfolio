import { PropsWithChildren, useState } from "react";
import { SideBar, TopBar } from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {

  return (
    <main>
      <div>
        <TopBar />
        <SideBar />
      </div>
      <div className="bg-slate-100 dark:bg-slate-900 flex min-h-screen w-screen justify-center px-8 py-12 sm:ps-56 md:pt-0 sm:text-justify">
        <div className="w-full xl:w-2/3">{props.children}</div>
      </div>
    </main>
  );
};

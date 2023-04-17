import type { PropsWithChildren } from "react";
import { SideBar, TopBar } from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main>
      <div>
        <TopBar />
        <SideBar />
      </div>
      <div className="flex min-h-screen w-screen justify-center px-8 py-8 sm:ps-60 sm:pt-0 sm:text-justify">
        <div className="xl:max-w-5xl sm:w-2/3 md:w-5/6">{props.children}</div>
      </div>
    </main>
  );
};

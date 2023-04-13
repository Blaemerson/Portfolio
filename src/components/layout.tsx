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
        <div className="md:max-w-6xl">{props.children}</div>
      </div>
    </main>
  );
};

import type { PropsWithChildren } from "react";
import { SideBar, TopBar } from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
      <main>
        <div>
          <TopBar />
          <SideBar />
        </div>
        <div className="w-screen px-4 pt-8 sm:ps-56 sm:pt-0 lg:text-justify">
          <div className="flex h-screen">
            <div className="h-screen w-full md:max-w-5xl">
              {props.children}
            </div>
          </div>
        </div>
      </main>

  );
}

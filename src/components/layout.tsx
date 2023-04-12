import type { PropsWithChildren } from "react";
import { SideBar, TopBar } from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
      <main>
        <div>
          <TopBar />
          <SideBar />
        </div>
        <div className="mb-4 mt-8 w-screen px-4 sm:ps-80 lg:text-justify">
          <div className="flex h-screen">
            <div className="h-screen w-full md:max-w-5xl">
              {props.children}
            </div>
          </div>
        </div>
      </main>

  );
}

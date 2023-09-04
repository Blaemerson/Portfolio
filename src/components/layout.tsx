import type { PropsWithChildren } from "react";
import { SideBar, TopBar } from "./sidebar";
import { RecentArticles } from "./article";

export const PageLayout = (props: PropsWithChildren) => {

    return (
        <main>
            <div>
                <TopBar />
                <SideBar />
            </div>
            <div className="flex min-h-screen justify-center sm:text-justify">
                <div className="md:ms-60"></div>
                <div className="my-8 sm:my-0">{props.children}</div>
                <div className="xl:me-64 md:me-8"></div>
                <div className="z-20 fixed right-24 top-8 w-36 translate-x-full invisible xl:visible transition-transform md:translate-x-0">
                  <RecentArticles />
                </div>
            </div>
        </main>
    );
};

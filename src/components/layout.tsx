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
            <div className="flex min-h-screen w-screen justify-center sm:px-8 px-1 py-12 md:ps-56 md:pt-0 sm:text-justify">
                <div className="w-full xl:w-2/3">{props.children}</div>
            </div>
        </main>
    );
};

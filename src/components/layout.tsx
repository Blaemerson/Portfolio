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
            <div className="bg-slate-100 dark:bg-[#232326] flex min-h-screen w-screen justify-center px-8 py-12 md:ps-56 md:pt-0 sm:text-justify">
                <div className="w-full xl:w-2/3">{props.children}</div>
                <div className="ps-6 py-24 hidden lg:block">
                    <RecentArticles />
                </div>
            </div>
        </main>
    );
};

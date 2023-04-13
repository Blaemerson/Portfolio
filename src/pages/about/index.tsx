import { type NextPage } from "next";

import { PageLayout } from "~/components/layout";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <h1>About Me</h1>
      <div className="w-full bg-white p-4 shadow-xl sm:mt-0">
        <div className="text-md m-4 flex items-center gap-2 md:text-xl">
          <div>
            <h3>Who I Am</h3>

            <div className="p-2" />
            <p className="text-slate-800">I&apos;m a programmer!</p>

            <div className="p-2" />
            <p className="text-slate-800">
              When I&apos;m not programming, I enjoy the outdoors, literature,
              and exploring new technologies.
            </p>

            <div className="p-2" />
            <h3>What I Do</h3>
            <div className="p-2" />
            <p className="text-slate-800">
              As a Software Engineer, I seek to build and maintain complex,
              multi-faceted applications. In addition to my experience as a
              software developer and engineer, my peers know me for facing new
              challenges with enthusiasm and a strong commitment to learn.
            </p>

            <div className="p-2" />
            <p className="text-slate-800">
              At any given time, I may be working on a number of side projects
              (this site is one of them!)
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

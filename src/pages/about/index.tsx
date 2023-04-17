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
              I received an Associate&apos;s Degree in Computer Science from Kilgore College in 2019.
              In 2022, I graduated with a Bachelor&apos;s in Computer Science from the University of Texas at Tyler.
            </p>

            <div className="p-2" />
            <p className="text-slate-800">
              When I&apos;m not developing applications, I enjoy literature, the outdoors,
              and spending time with my family.
            </p>

            <div className="p-2" />
            <h3>What I Do</h3>
            <div className="p-2" />
            <p className="text-slate-800">
              As a Software Engineer, I seek to build and maintain
              web, desktop, and mobile applications.
            </p>
            <div className="p-2" />
            <p className="text-slate-800">
              I&apos;ve worked in the following positions as a Computer Scientist:
              <div className="p-1" />
              <ul className="list-disc ps-10 text-slate-800">
                <li>Mobile Application Developer - <span className="italic">University of Texas at Tyler (2022)</span></li>
                <li>Junior Software Engineer - <span className="italic">Kilgore College (2019)</span></li>
              </ul>
            </p>

            <div className="p-2" />
            <p className="text-slate-800">
              In addition to my experience as a
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

import { type NextPage } from "next";

import { SideBar } from "~/components/sidebar";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <SideBar />
        <div className="h-screen w-screen pe-16 ps-16 sm:ps-80">
          <div className="h-screen w-full pt-2 md:max-w-4xl lg:text-justify">
            <h1 className="ms-4">About Me</h1>
            <div className="m-4 flex items-center gap-2">
              <div>
                <h3>Who I Am</h3>

                <div className="p-2" />
                <p className="text-lg text-slate-800">I&apos;m a programmer!</p>

                <div className="p-2" />
                <p className="text-lg text-slate-800">
                  When I&apos;m not programming, I enjoy the outdoors,
                  literature, and exploring new technologies.
                </p>

                <div className="p-2" />
                <h3>What I Do</h3>
                <div className="p-2" />
                <p className="text-lg text-slate-800">
                  As a Software Engineer, I seek to build and maintain complex,
                  multi-faceted applications. In addition to my experience as a
                  software developer and engineer, my peers know me for facing
                  new challenges with enthusiasm and a strong commitment to
                  learn.
                </p>

                <div className="p-2" />
                <p className="text-lg text-slate-800">
                  At any given time, I may be working on a number of side
                  projects (this site is one of them!)
                </p>

                <div className="p-2" />
                <h3>What I Know</h3>

                <div className="p-2" />
                <p className="text-lg text-slate-800">
                  The following is a list of technologies I am proficient in:
                </p>

                <div className="p-2" />
                <ul className="list-disc px-6 text-lg text-slate-800">
                  <li>Java: I developed several applications using Java.</li>
                  <div className="p-2" />
                  <li>
                    SQL: I helped design and implement a MySQL database for
                    Kilgore College.
                  </li>
                  <div className="p-2" />
                  <li>
                    Typescript + ReactJS: The tools I used to make this website!
                    In addition to these major tools, I also used NextJS, TRPC,
                    and Prisma to get things up and running. See the
                    project&apos;s
                    <a
                      className="text-blue-500"
                      href="https://github.com/Blaemerson/Portfolio"
                    >
                      {" "}
                      Github page{" "}
                    </a>
                    to learn more.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                href={`/contact`}
                className="mb-6 me-4 mt-4 flex h-16 w-48 items-center justify-center rounded-full bg-gradient-to-b from-indigo-200 to-indigo-300 p-2 text-xl font-bold text-gray-900 hover:from-indigo-100 hover:to-indigo-200 dark:text-white dark:hover:bg-gray-700"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

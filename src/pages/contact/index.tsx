import { type NextPage } from "next";

import { SideBar, TopBar } from "~/components/sidebar";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div>
          <TopBar/>
          <SideBar />
        </div>
        <div className="mt-8 mb-4 w-screen px-4 sm:ps-80">
          <h1>Contact</h1>
          <div className="mt-2 sm:mt-4 w-full shadow-xl bg-white md:max-w-4xl">
            <div className="text-md m-4 flex items-center gap-2 md:text-xl">
              <div>
                <p className="text-slate-800">
                  You can find me and my work here.
                </p>

                <div className="py-2" />
                <ul className="list-disc px-6 text-slate-800">
                  <li>Email: blakesavage99@gmail.com</li>
                  <div className="p-2" />
                  <li>
                    LinkedIn:
                    <a href="https://www.linkedin.com/in/blake-savage-492140253/">
                      {" linkedin.com/in/blake-savage "}
                    </a>
                  </li>
                  <div className="p-2" />
                  <li>
                    Github:{" "}
                    <a href="https://github.com/Blaemerson">
                      github.com/Blaemerson
                    </a>
                  </li>
                </ul>

                <div className="p-2" />
                <p className="text-slate-800">
                  Feel free to send me your messages regarding this website and
                  any of its content. I will get back to you as soon as I can
                  (usually within 24 hours).
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href={`/`}
                className="mb-6 me-4 mt-4 flex h-16 w-48 items-center justify-center rounded-full bg-gradient-to-b from-indigo-200 to-indigo-300 p-2 text-xl font-bold text-gray-900 hover:from-indigo-100 hover:to-indigo-200 dark:text-white dark:hover:bg-gray-700"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

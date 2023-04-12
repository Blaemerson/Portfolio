import { type NextPage } from "next";

import { SideBar, TopBar } from "~/components/sidebar";
import Link from "next/link";
import { PageLayout } from "~/components/layout";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <h1>Contact</h1>
      <div className="w-full bg-white p-4 shadow-xl sm:mt-0 md:max-w-4xl">
        <div className="text-md m-4 flex items-center gap-2 md:text-xl">
          <div>
            <p className="text-slate-800">You can find me and my work here.</p>

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
              Feel free to send me your messages regarding this website and any
              of its content. I will get back to you as soon as I can (usually
              within 24 hours).
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

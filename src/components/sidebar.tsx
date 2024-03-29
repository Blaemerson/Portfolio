import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const TopBar = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <div
        className="topbar"
      >
        <div className="grid grid-cols-5 ">
          <Link
            href={`/about/`}
            className="justify-center flex items-center rounded-lg p-2 m-1"
          >

            <span>About</span>
          </Link>
          <Link
            href={`/contact/`}
            className="justify-center flex items-center rounded-lg p-2 m-1"
          >
            <span>Contact</span>
          </Link>
          <Link
            href={`/`}
            className="justify-center flex items-center rounded-lg p-2 m-1"
          >
            <span>Blog</span>
          </Link>
          <Link
            href={`/projects`}
            className="justify-center flex items-center rounded-lg p-2 m-1"
          >
            <span>Projects</span>
          </Link>
          <a
            href="#"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            className="justify-center flex items-center rounded-lg p-2 m-1"
          >
            <span>
              {sessionData ? "Sign Out" : "Sign In"}
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export const SideBar = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <aside
        id="default-sidebar"
        className="sidebar"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-zinc-100 px-3 py-4 dark:bg-[#1e1e22]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={`/about/`}
                className="flex items-center rounded-lg p-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <span className="ml-3">About Me</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/contact/`}
                className="flex items-center rounded-lg p-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="ml-3">Contact</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/`}
                className="flex items-center rounded-lg p-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="ml-3">Blog</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/projects`}
                className="flex items-center rounded-lg p-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Projects</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={
                  sessionData ? () => void signOut() : () => void signIn()
                }
                className="flex items-center rounded-lg p-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap">
                  {sessionData ? "Sign Out" : "Sign In"}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

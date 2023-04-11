import { type NextPage } from "next";
import Link from "next/link";

import { SideBar, TopBar } from "~/components/sidebar";

const ProjectCard = (props: {
  name: string;
  img?: string;
  link?: string;
  desc?: string;
  tags?: string[];
}) => {
  return (
    <a href={props.link}>
      <div className="transition my-4 duration-200 ease-in-out hover:bg-white bg-gray-100 hover:shadow-xl text-md sm:text-xl text-slate-700">
        <div>
          <div className="p-4">
            {props.img ? (
              <img
                className="flex h-64 w-full items-center justify-center rounded-xl bg-white object-cover p-2"
                src={props.img}
              />
            ) : (
              <></>
            )}
            <div className="p-2 text-xl font-bold underline">
              {props.name}
            </div>
            <div className="p-2 leading-normal text-slate-600">
              {props.desc}
            </div>
            <div className="pb-2 ps-2 leading-normal text-slate-600">
              <ul className="list-disc px-4 text-slate-500">
                {props.tags ? (
                  props.tags.map((tag, i) => <li key={`${i}`}>{tag}</li>)
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div>
          <TopBar/>
          <SideBar />
        </div>
        <div className="h-screen ps-4 pe-4 sm:ps-80 lg:text-justify">
          <div className="mt-8 mb-4">
            <h1>Projects</h1>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                img="imgs/logo_onionskin_studio.png"
                link="https://github.com/Blaemerson/Flipbook-Animator"
                name="Onionskin Studio"
                desc="A program written in java for creating simple animations by drawing frames."
                tags={["Java", "JavaFX"]}
              />
              <ProjectCard
                img="imgs/logo_chicken_tender.png"
                link="https://github.com/Blaemerson/ChickenTender"
                name="Chicken Tender"
                desc="Android application for deciding where to eat as a group"
                tags={["Android", "Java", "Google Maps"]}
              />
              <ProjectCard
                img="imgs/logo_github.png"
                link="https://github.com/Blaemerson/Portfolio"
                name="My Personal Website"
                desc="Source code for this website."
                tags={["React", "Typescript", "NextJS"]}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

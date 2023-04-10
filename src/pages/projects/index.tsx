import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import { SideBar } from "~/components/sidebar";
import { Article } from "~/components/article";
import Link from "next/link";

const ProjectCard = (props: {
  name: string;
  img?: string;
  link?: string;
  desc?: string;
  tags?: string[];
}) => {
  return (
    <a href={props.link}>
      <div className="rounded-lg bg-slate-100 shadow-xl hover:bg-slate-50">
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
            <div className="p-2 text-xl font-bold text-blue-500 underline">
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
        <SideBar />
        <div className="h-screen w-screen pe-16 ps-16 sm:ps-80 lg:text-justify">
          <div className="pt-2">
            <h1>Projects</h1>
            <div className="mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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
                name="Personal Website"
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

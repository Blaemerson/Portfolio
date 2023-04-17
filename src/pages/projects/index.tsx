import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";

const ProjectCard = (props: {
  name: string;
  img?: string;
  link?: string;
  desc?: string;
  tags?: string[];
}) => {
  return (
    <a href={props.link}>
      <div className="">
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
            <div className="p-2 text-xl font-bold underline">{props.name}</div>
            <div className="p-2 leading-normal">
              {props.desc}
            </div>
            <div className="pb-2 ps-2 leading-normal">
              <ul className="list-disc px-4">
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
    <PageLayout>
      <div>
        <h1>Projects</h1>
        <div className="article">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              img="imgs/logo_onionskin_studio.png"
              link="https://github.com/Blaemerson/Flipbook-Animator"
              name="Onionskin Studio"
              desc="A program written in Java for creating simple animations by drawing frames."
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
    </PageLayout>
  );
};

export default Home;

import { type NextPage } from "next";
import Image from "next/image";
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
            <div className="article_block">
                <div className="flex p-2">
                    {props.img ? (
                        <Image
                            src={props.img}
                            className="flex h-32 w-32 items-center justify-center rounded-xl bg-white object-cover p-2"
                            alt="Your Image"
                            width={300}
                            height={400}
                        />

                    ) : (
                        <></>
                    )}
                    <div className="flex-col p-2">
                        <div className="text-xl font-bold underline">{props.name}</div>
                        <div>{props.desc}</div>
                        <div className="flex flex-col md:flex-row">
                            {props.tags ? (
                                props.tags.map((tag, i) => <li className="mx-4" key={`${i}`}>{tag}</li>)
                            ) : (
                                <></>
                            )}
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
                <div className="bg-slate-50">
                    <div className="flex flex-col">
                        <ProjectCard
                            img="/imgs/logo_onionskin_studio.png"
                            link="https://github.com/Blaemerson/Flipbook-Animator"
                            name="Onionskin Studio"
                            desc="A program written in Java for creating simple animations by drawing frames."
                            tags={["Java", "JavaFX"]}
                        />
                        <ProjectCard
                            img="/imgs/logo_chicken_tender.png"
                            link="https://github.com/Blaemerson/ChickenTender"
                            name="Chicken Tender"
                            desc="Android application for deciding where to eat as a group"
                            tags={["Android", "Java", "Google Maps API"]}
                        />
                        <ProjectCard
                            img="/imgs/logo_github.png"
                            link="https://github.com/Blaemerson/Portfolio"
                            name="My Personal Website"
                            desc="Source code for this website."
                            tags={["React", "Typescript", "NextJS", "Prisma", "tRPC"]}
                        />
                        <ProjectCard
                            img="/imgs/logo_github.png"
                            link="https://github.com/Blaemerson/sfml-mario"
                            name="SFML Mario (Tentative)"
                            desc="2D platformer imitating Super Mario Bros physics and style"
                            tags={["C++", "SFML"]}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Home;

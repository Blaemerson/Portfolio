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
                <div className="article_block p-2">
                    {props.img ? (
                        <Image
                            src={props.img}
                            className="flex h-32 w-32 items-center rounded-xl bg-white object-cover p-2"
                            alt="Your Image"
                            width={300}
                            height={400}
                        />

                    ) : (
                        <></>
                    )}
                <div className="px-1"/>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold underline">{props.name}</div>
                        <div>{props.desc}</div>
                        <div className="py-1"/>
                        <ul className="flex flex-wrap list-disc list-inside">
                            {props.tags ? (
                                props.tags.map((tag, i) => <li className="italic px-2" key={`${i}`}>{tag}</li>)
                            ) : (
                                <></>
                            )}
                        </ul>
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
                <div className="flex-col article">
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
                        <ProjectCard
                            img="/imgs/logo_webgl.png"
                            link="https://github.com/Blaemerson/js-graphics-programming"
                            name="WebGL Programming"
                            desc="5 programs for displaying 2D and 3D graphics, as well as lighting effects"
                            tags={["Javascript", "WebGL", "HTML"]}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Home;

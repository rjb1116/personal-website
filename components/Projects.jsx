import React from "react";
import Link from "next/link";
import ProjectItems from "./ProjectItems";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Projects = ({ repos }) => {
  return (
    <div id="projects" className="w-full">
      <div className="xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm mx-auto px-8 py-20">
        <p className="text-xl tracking-widest font-mono lowercase text-[#3a8844]">
          Projects
        </p>
        <h2 className="pt-4 pb-1 text-gray-700">
          what i've built and am building
        </h2>
        <p className="pb-6 italic text-sm text-gray-400">
          auto-generated from my public repositories using GitHub's api
        </p>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {repos.map((repo) => (
            <ProjectItems
              key={repo.name}
              title={repo.name}
              description={repo.description}
              backgroundImage={`https://raw.githubusercontent.com/rjb1116/${repo.name}/master/preview.png`}
              projectUrl={`https://github.com/rjb1116/${repo.name}`}
            />
          ))}
        </div>
      </div>
      <div className=" flex justify-center py-12">
        <Link href="/">
          <div className=" rounded-full p-4 border-2 border-[#3a8844]">
            <HiOutlineChevronDoubleUp size={30} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Projects;

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProjectItems = ({ title, description, backgroundImage, projectUrl }) => {
  return (
    <div className="relative flex-col h-[250px] w-[300px] mx-auto rounded-xl">
      <Image
        className="rounded-xl object-cover border-2 border-[#3a8844]"
        src={backgroundImage}
        fill
      />
      <p className="relative text-center w-full h-[10%] rounded-t-xl bg-[#3a8844] text-xl text-white font-mono">
        {title}
      </p>
      <Link
        href={projectUrl}
        className="relative bg-gray-700 opacity-0 hover:opacity-80 w-full h-[90%] p-10 rounded-b-xl text-white flex items-center justify-center"
      >
        <p className="text-center italic">{description}</p>
      </Link>
    </div>
  );
};

export default ProjectItems;

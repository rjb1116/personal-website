import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Main = () => {
  return (
    <div className="w-full h-[100vh] text-center">
      <div className="xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm p-4 w-full h-full mx-auto flex justify-center items-center">
        <div>
          <p className="mx-auto max-w-[380px] -mb-6 uppercase text-[63px] font-extrabold tracking-widest text-[#bfdcb2]">
            WELCOME
          </p>
          <h1 className=" mx-auto max-w-[345px] text-5xl text-gray-700 bg-[#bfdcb2] p-2">
            Hi, I'm <span className=" text-[#3a8844]">Reuben</span>
          </h1>
          <p className=" pt-16 text-gray-700 m-auto">
            <span className=" uppercase text-3xl font-bold">By day, </span>I'm a
            <span className="font-bold"> Machine Learning Engineer</span>.
            Checkout my
            <a href="/resume"> resumé </a>
            and
            <a href="https://www.linkedin.com/in/reuben-britto/"> LinkedIn </a>
            to learn more about my career and experience.
          </p>
          <p className=" py-4 text-gray-700 m-auto">
            <span className=" uppercase text-3xl font-bold">By night, </span>I
            enjoy building anything and everything. Check out the
            <a href="/#projects"> projects section </a>
            or peruse my
            <a href="https://github.com/rjb1116"> github </a>
            to learn more. Don't hesitate to reach out if you wanna chat about
            anything.
          </p>
          <div className="flex justify-between max-w-[200px] m-auto pt-20">
            <a href="https://www.linkedin.com/in/reuben-britto/">
              <div className="p-3 cursor-pointer hover:scale-110">
                <FaLinkedin size={40} />
              </div>
            </a>
            <a href="https://github.com/rjb1116">
              <div className="p-3 cursor-pointer hover:scale-110 ">
                <FaGithub size={40} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

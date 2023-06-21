import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/assets/rjbLogo.png";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Navbar = () => {
  const navbarLinks = [
    ["resumé", "/resume/"],
    ["projects", "/#projects"],
    ["solar tracker app", "/solartracker/"],
  ];

  const [nav, setNav] = useState(false);
  const [line, setLine] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleLine = () => {
      if (window.scrollY > 0.99) {
        setLine(true);
      } else {
        setLine(false);
      }
    };
    window.addEventListener("scroll", handleLine);
  }, []);

  return (
    <div
      className={
        line
          ? "fixed w-full h-14 bg-[#ecf0f3] border-b-2 border-[#3a8844] z-[100]"
          : "fixed w-full h-14 bg-[#ecf0f3] z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-6 2xl:px-16">
        <Link href="/">
          <Image src={logo} alt="/" width="38" />
        </Link>
        <div>
          <ul className="hidden md:flex">
            {navbarLinks.map(([title, url]) => (
              <Link key={title} href={url}>
                <li key={title} className="ml-10 text-md lowercase font-mono">
                  {title}
                </li>
              </Link>
            ))}
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <Image
                  onClick={() => setNav(false)}
                  src={logo}
                  alt="/"
                  width="38"
                />
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full border-2 border-[#3a8844] p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul>
              {navbarLinks.map(([title, url]) => (
                <Link key={title} href={url}>
                  <li
                    key={title}
                    onClick={() => setNav(false)}
                    className="py-4 text-md lowercase font-mono"
                  >
                    {title}
                  </li>
                </Link>
              ))}
            </ul>
            <div className="pt-40">
              <div className="flex justify-between px-20 my-4 w-full">
                <div className="rounded-full border-2 border-[#3a8844] p-3 cursor-pointer hover:scale-110 ease-in duration-300">
                  <FaLinkedinIn size={20} />
                </div>
                <div className="rounded-full border-2 border-[#3a8844] p-3 cursor-pointer hover:scale-110 ease-in duration-300">
                  <FaGithub size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

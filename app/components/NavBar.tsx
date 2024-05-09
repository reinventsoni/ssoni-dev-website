"use client";
import Link from "next/link";
import React from "react";
import Logo from "./uielements/Logo";
import NavLinks from "./uielements/NavLinks";
import { GithubSVGIcon, LinkedInSVGIcon, TwitterSVGIcon } from "./uielements/Icons";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <header
      className="bg-slate-300 sticky top-0 drop-shadow-xl z-10
      flex flex-col md:flex-row
      justify-between items-center
      px-4 md:px-16
      py-2
      font-medium 
      "
    >
      <div>
        <Logo />
      </div>
      <nav className="flex flex-row gap-x-6 mt-2 md:mt-0">
        <NavLinks to="/" className="">
          Home
        </NavLinks>
        {/* <NavLinks to="/projects" className="">
          Projects
        </NavLinks> */}
        <NavLinks to="/articles" className="">
          Articles
        </NavLinks>
        {/* <NavLinks to="/about" className="">
          About Me
        </NavLinks> */}
      </nav>
      <nav
        className="hidden md:flex items-center justify-center flex-wrap flex-row gap-x-6
      "
      >
        <motion.a
          href="https://www.linkedin.com"
          target={"_blank"}
          className="w-6"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <LinkedInSVGIcon />
        </motion.a>
        <motion.a
          href="https://www.twitter.com"
          target={"_blank"}
          className="w-6"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <TwitterSVGIcon />
        </motion.a>
        <motion.a
          href="https://www.medium.com"
          target={"_blank"}
          className="w-6"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <GithubSVGIcon />
        </motion.a>
      </nav>
    </header>
  );
};

export default NavBar;

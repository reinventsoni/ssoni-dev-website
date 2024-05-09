"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center">
        <MotionLink
          href="/"
          className="
        w-10 sm:w-12  
        h-10 sm:h-12 
        text-l md:text-xl 
        font:medium md:font-bold
        bg-black text-white 
        flex items-center justify-center
        rounded-full "
          whileHover={{
            backgroundColor: [
              "#121212",
              "rgba(131,58,180,1)",
              "rgba(253,29,29,1)",
              "rgba(252,176,69,1)",
              "rgba(131,58,180,1)",
              "#121212",
            ],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
            transitionEnd: {
              backgroundColor: "#121212",
            },
          }}
        >
          SS
        </MotionLink>
      </div>
      <div className="mt-1 font-bold">
        <Link href="/">Sanjay Soni</Link>
      </div>
    </div>
  );
};

export default Logo;

import Image from "next/image";
import React from "react";
import profilePic from "../../public/images/developer-pic-1.png";
import { profile } from "console";

const HeroSection = () => {
  return (
    <section className="px-32 w-full flex flex-row border-2">
      <div className="w-1/2 flex flex-col justify-center items-center relative h-[80vh] overflow-hidden">
        <Image
          src={profilePic}
          alt="Hero Image - Developer Profile"
          layout="contain"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="px-16 w-1/2 flex flex-col justify-center">
        <h1 className="capitalize text-4xl font-bold">
          Creator Mode Activated: Bringing Vision to Reality with Design and Development
        </h1>
        <p className="text-base font-medium mt-12">
          <span>
            After traversing the full path, starting as a Junior Developer to working as a Director in Big 4, I set out
            on reinventing myself and capability to create the digital products independently was the first goal.
          </span>
          <span>
            <br />
            <br />
            This space on the web is to showcase the projects, knowledge acquired and learning on that journey
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

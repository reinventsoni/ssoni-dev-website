import Image from "next/image";
import React from "react";
import profilePic from "../../public/images/developer-pic-1.png";
import { profile } from "console";

const HeroSection = () => {
  const imageStyle = {
    width: "auto",
    height: "90%",
  };
  return (
    <section className="px-6 pb-8 pt-8 flex flex-col sm:flex-row min-h-[80svh]">
      <div
        className="flex flex-row justify-center items-center
      sm:w-1/2"
      >
        <Image src={profilePic} alt="Hero Image - Developer Profile" style={imageStyle} />
      </div>
      <div className="sm:w-1/2 md:w-2/5 flex flex-col justify-center">
        <h1 className="capitalize text-2xl md:text-3xl lg:text-4xl font-extrabold text-center md:text-left ">
          Creator Mode ON: Bringing Ideas and Vision to Reality with Design and Development
        </h1>
        <p className="font-medium text-lg lg:text-xl mt-6">
          <span>
            Reinventing myself, by reigniting the capability to imagine the digital products and bring them to life by
            software design and coding
          </span>
          <span>
            <br />
            <br />
            This site is to showcase the projects, knowledge acquired and learning on that journey
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

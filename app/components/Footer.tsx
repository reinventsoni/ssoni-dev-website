import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full font-medium text-black border-black border-t-2 py-4">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:px-16">
        <span className="text-md mb-1">{new Date().getFullYear()} &copy; All Rights Reserved</span>
        <div className="flex items-center mb-1">
          Build with <span className="text-md px-1 font-bold text-pink-700">&#9825;</span>by&nbsp;
          <Link href="#" className="underline underline-offset-2 text-md">
            Sanjay Soni
          </Link>
        </div>
        <Link href="#" className="text-md mb-1">
          Say Hi!
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

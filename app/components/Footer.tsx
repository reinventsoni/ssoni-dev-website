import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full font-medium text-black border-black border-t-2 py-4">
      <div className="px-32 selection:w-full flex flex-row justify-between items-center ">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved</span>
        <div className="flex items-center ">
          Build with <span className="text-2xl px-1 font-bold text-pink-700">&#9825;</span>by&nbsp;
          <Link href="#" className="underline underline-offset-2">
            Sanjay Soni
          </Link>
        </div>
        <Link href="#">Say Hi!</Link>
      </div>
    </footer>
  );
};

export default Footer;

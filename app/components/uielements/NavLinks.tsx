"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { AnchorHTMLAttributes, HTMLAttributeReferrerPolicy, HTMLAttributes, ReactNode } from "react";
import { Url } from "url";

type LinkProps = {
  to?: string;
  children: ReactNode;
  className?: string;
};
const NavLinks = ({ to = "#", children, className }: LinkProps) => {
  const pathname = usePathname();
  return (
    <Link href={to} className={`${className} relative group`}>
      {children}
      <span
        className={`inline-block h-[2px] absolute left-0 -bottom-0.5 bg-black 
        group-hover:w-full transition-[width] ease duration-300
        ${pathname === to ? "w-full" : "w-0"}`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

export default NavLinks;

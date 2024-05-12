import { GITArticle } from "@/types";
import Image from "next/image";
import React from "react";
import source from "/images/blogs/carlos-muza-hpjSkU2UYSU-unsplash.jpg";

type Props = {
  article: GITArticle;
};

const RenderCategoryDetails = ({ article }: Props) => {
  const { frontmatter, content } = article;

  return (
    <div>
      <div className="h-[25vh] overflow-hidden relative mb-6">
        <Image
          src={"/images/blogs/emile-perron-xrVDYZRGdw4-unsplash.jpg"}
          alt={`Image for ${frontmatter.title}`}
          fill={true}
          className="object-cover object-center"
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/90 z-10"></div>
        <div className="absolute bottom-10 z-20 px-8 sm:px-16 md:px32 text-white">
          <h1 className="font-bold text-3xl capitalize mb-2">{frontmatter.title}</h1>
          <p className="text-lg">{frontmatter.description}</p>
        </div>
      </div>
      <div className="prose px-8 sm:px-16 md:px32 max-w-none mb-6">{content}</div>
    </div>
  );
};

export default RenderCategoryDetails;

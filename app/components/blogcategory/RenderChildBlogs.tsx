import React from "react";
import { GITArticle } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  article: GITArticle;
};

const RenderChildBlog = ({ article }: Props) => {
  const { frontmatter, content, gitMeta } = article;
  const publishedAt = frontmatter.publishedAt;
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="flex flex-row items-center justify-center text-dark">
        <Link href={`/blogs/${gitMeta.JSpathString}`} className="w-full h-full overflow-hidden">
          <Image
            src="/images/blogs/carlos-muza-hpjSkU2UYSU-unsplash.jpg"
            width={500}
            height={500}
            alt="Category Image"
            className="aspect-[4/3] w-full h-full object-cover object-center"
          />
        </Link>
        <div className="flex flex-col w-full mt-4 px-4">
          <Link href={`/blogs/${gitMeta.JSpathString}`} className="h-full overflow-hidden">
            <h2 className=" font-semibold text-lg capitalize">{frontmatter.title}</h2>
            <p className="font-semibold text-sm">{frontmatter.description}</p>
            <p className="text-sm mt-1">{publishedAt}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenderChildBlog;

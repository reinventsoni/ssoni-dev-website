import React from "react";
import { GITArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: GITArticle;
};

const RenderChildCategory = ({ article }: Props) => {
  const { frontmatter, content, gitMeta } = article;
  return (
    <div className="flex flex-col items-center text-dark mb-8">
      <Link href={gitMeta.JSpathString} className="h-full overflow-hidden">
        <Image
          src="/images/blogs/carlos-muza-hpjSkU2UYSU-unsplash.jpg"
          width={400}
          height={400}
          alt="Category Image"
          className="aspect-[4/3] w-full h-full object-cover object-center"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <h2 className=" font-semibold text-lg capitalize">{frontmatter.title}</h2>
        <p className="font-semibold text-sm">{frontmatter.description}</p>
      </div>
    </div>
  );
};

export default RenderChildCategory;

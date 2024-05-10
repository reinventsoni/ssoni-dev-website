import React from "react";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import { ArticleMetaData } from "@/types";

type Props = {
  articleMeta: ArticleMetaData;
};

export default function BlogListItem({ articleMeta }: Props) {
  const { id, title, publishedAt } = articleMeta;
  const formattedDate = getFormattedDate(publishedAt);

  return (
    <li className="mt-4 text-2xl">
      <Link className="underline hover:text-black/70" href={`/articles/${id}`}>
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{publishedAt}</p>
    </li>
  );
}

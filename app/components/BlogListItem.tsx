import React from "react";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import { ArticleMetaData } from "@/types";

type Props = {
  articleMeta: ArticleMetaData;
};

export default function BlogListItem({ articleMeta }: Props) {
  const { id, title, date } = articleMeta;
  //const formattedDate = getFormattedDate(date);
  return (
    <li className="mt-4 text-2xl">
      <Link className="underline hover:text-black/70" href={`/articles/${id}`}>
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{date}</p>
    </li>
  );
}
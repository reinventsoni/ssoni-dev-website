import React from "react";
import { getArticlesMetaData } from "@/lib/githubarticles";
import BlogListItem from "../components/BlogListItem";

export default async function ArticlePage() {
  // const posts = getSortedPostsData();
  const articlesMetaData = await getArticlesMetaData();
  if (!articlesMetaData) {
    return <p className="mt-10 text-center">Sorry, no posts available</p>;
  }
  return (
    <section className="mt-6 mx-auto-max-w-2l px-32">
      <h2 className="text-4xl font-bold">Articles</h2>
      <ul className="list-none p-0">
        {articlesMetaData.map((articleMeta) => (
          <BlogListItem key={articleMeta.id} articleMeta={articleMeta} />
        ))}
      </ul>
    </section>
  );
}

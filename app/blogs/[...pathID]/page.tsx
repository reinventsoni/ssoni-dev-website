import { getGITTreeItemsMetaData, getChildTreeData, getArticleByName } from "@/lib/gitArticles";
import { GITArticle } from "@/types";
import getFormattedDate from "@/lib/getFormattedDate";
import RenderBlogContent from "@/app/components/RenderBlogContent";
import RenderCategoryDetails from "@/app/components/blogcategory/RenderCategoryDetails";
import { notFound } from "next/navigation";
import React from "react";
import { type } from "os";
import RenderChildCategory from "@/app/components/blogcategory/RenderChildCategory";
import RenderChildBlog from "@/app/components/blogcategory/RenderChildBlogs";

type Props = {
  params: {
    pathID: string[];
  };
};

export default async function Page({ params: { pathID } }: Props) {
  const pathString = pathID.join("/");

  const article = await getArticleByName(pathString);
  if (!article) notFound();

  const { frontmatter, content, gitMeta } = article;

  let child: GITArticle[] = [];
  let hasChild = false;

  let categoryChild: GITArticle[] = [];
  let hasCategoryChild = false;

  let blogChild: GITArticle[] = [];
  let hasBlogChild = false;

  if (gitMeta.type == "tree") {
    const result = await getChildTreeData(gitMeta.url, gitMeta.JSpathString);
    if (!result) console.log("Child Elements not found for this Tree Node");
    if (result) {
      child = result;
      hasChild = true;

      blogChild = child.filter((obj) => obj.gitMeta.type === "blob");
      categoryChild = child.filter((obj) => obj.gitMeta.type === "tree");
      console.log("Child Blog Length: ", blogChild.length);
      // console.log("Child Blogs as follows: ", blogChild);
      // console.log("Child Category as follows:", categoryChild);
      console.log("Child Category Length: ", categoryChild.length);
    }
  }

  return (
    <>
      <section>
        <RenderCategoryDetails article={article}></RenderCategoryDetails>
      </section>
      {blogChild.length !== 0 && (
        <div className="mb-12">
          <p className="px-8 sm:px-16 md:px32 font-semibold text-lg mb-4">
            Explore following topics in current topic: {article.frontmatter.title}:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-8 sm:px-16 md:px32">
            {blogChild.map((obj) => (
              <div className="col-span-1 lg:col-span-4" key={obj.gitMeta.path}>
                <RenderChildBlog article={obj}></RenderChildBlog>
              </div>
            ))}
          </div>
        </div>
      )}
      {categoryChild.length !== 0 && (
        <div className="mb-12">
          <p className="px-8 sm:px-16 md:px32 font-semibold text-lg mb-4">Explore following subcategories / areas:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 px-8 sm:px-16 md:px32">
            {categoryChild.map((obj) => (
              <div className="col-span-1 lg:col-span-3" key={obj.gitMeta.path}>
                <RenderChildCategory article={obj}></RenderChildCategory>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

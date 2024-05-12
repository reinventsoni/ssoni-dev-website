import { GITTreeMetaData, GITTreeItemsMetaData, GITChildItems, GITArticle, GITArticleFrontMatter } from "@/types";

import { ReactElement, JSXElementConstructor } from "react";
import MDXVideo from "@/app/components/mdxcomponents/MDXVideo";
import MDXImage from "@/app/components/mdxcomponents/MDXImage";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const revalidate = 0;
const GITTreeURL = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/git/trees/${process.env.GITHUB_BRANCH}?recursive=1`;

export async function getChildTreeData(url: string, parent: string): Promise<GITArticle[] | undefined> {
  let detaillog = false;
  let childResultLog = false;

  if (detaillog) console.log("In Get Child Tree Method");
  if (detaillog) console.log("In getChildTree Method: Child Object URL Called is: ", url);
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: revalidate,
    },
  });

  if (!res.ok) return undefined;
  if (detaillog) console.log("In getChildTree Method: Child Objects have been received");

  const repoFileTree: GITTreeMetaData = await res.json();
  const treeItemsMetaData = repoFileTree.tree
    .map((obj) => {
      return {
        path: `${parent}/${obj.path}`,
        type: obj.type,
        url: obj.url,
      };
    })
    .filter((obj) => !obj.path.endsWith(".md"));
  if (detaillog) console.log("In getChildTree Method: Child Tree Metadata: \n", treeItemsMetaData);

  const childTreeMetaData: GITArticle[] = [];
  const childBlogTreeMetaData: GITArticle[] = [];
  const childCategoryTreeMetaData: GITArticle[] = [];

  for (const child of treeItemsMetaData) {
    let pathString = child.path;
    if (child.path.endsWith(".mdx")) pathString = child.path.replace(/\.mdx$/, "");
    if (detaillog) console.log("In getChildTree Method: In Child Object Loop and fetching: ", pathString);
    const childMetaData = await getArticleByName(pathString);
    if (detaillog) console.log("In getChildTree Method: Following child object received:", childMetaData);

    if (childMetaData) childTreeMetaData.push(childMetaData);
  }
  if (detaillog || childResultLog) console.log("In getChildTree Method: Child Articles: ", childTreeMetaData);

  // let childBlog = childTreeMetaData.filter((obj) => obj.gitMeta.type === "blob");
  // let childCategory = childTreeMetaData.filter((obj) => obj.gitMeta.type === "blob");
  // if (!childBlog.length)
  //   for (const child of childBlog) {
  //     console.log("Child Blog,", child);
  //     childBlogTreeMetaData.push(child);
  //   }

  // if (!childCategory.length)
  //   for (const child of childCategory) {
  //     console.log("Child Category,", child);
  //     childCategoryTreeMetaData.push(child);
  //   }

  // console.log("In getChildTree Method: Child Blogs:", childBlogTreeMetaData);
  // console.log("In getChildTree Method: Child Categories: ", childCategoryTreeMetaData);

  return childTreeMetaData;
}

export async function getGITTreeItemsMetaData(): Promise<GITTreeItemsMetaData[] | undefined> {
  const res = await fetch(GITTreeURL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: revalidate,
    },
  });

  if (!res.ok) return undefined;
  const repoFileTree: GITTreeMetaData = await res.json();
  const treeItemsMetaData = repoFileTree.tree
    .map((obj) => {
      return {
        path: obj.path,
        type: obj.type,
        url: obj.url,
      };
    })
    .filter((obj) => !obj.path.endsWith(".md"));

  return treeItemsMetaData;
}

export async function getArticleByName(pathString: string): Promise<GITArticle | undefined> {
  let detaillog = false;
  let childResultLog = false;
  const GITTreeItemsMetaData = await getGITTreeItemsMetaData();

  if (!GITTreeItemsMetaData) return undefined;
  if (detaillog) console.log("\t1. In getArticleMethod: MetaDataTree received");

  const filepattern = pathString + ".mdx";
  const folderpattern = pathString;
  if (detaillog)
    console.log(
      "\t2. In getArticleMethod: searching with Folder Pattern = ",
      folderpattern,
      "and File Pattern: ",
      filepattern
    );

  const item = GITTreeItemsMetaData.find((obj) => obj.path === filepattern || obj.path === folderpattern);
  if (detaillog) console.log("\t3. In getArticleMethod: found the element and it is:-->");
  if (!item) return undefined;

  let rawFileString = "";
  if (item.type === "tree") rawFileString = pathString + "/README.md";
  if (item.type === "blob") rawFileString = pathString + ".mdx";
  if (detaillog) console.log("\t4. PathString to query raw data: ", rawFileString);

  const GITArticleURL = `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${rawFileString}`;
  if (detaillog) console.log("\t5. Raw URL called: ", GITArticleURL);
  const res = await fetch(GITArticleURL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: revalidate,
    },
  });

  if (!res.ok) {
    return undefined;
  }
  const rawMDX = await res.text();
  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
    isPublished: string;
    tags: string[];
  }>({
    source: rawMDX,
    components: {
      MDXVideo,
      MDXImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
            },
          ],
        ],
      },
    },
  });

  const GITArticleObj: GITArticle = {
    frontmatter: {
      title: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image,
      publishedAt: frontmatter.publishedAt,
      updatedAt: frontmatter.updatedAt,
      author: frontmatter.author,
      tags: frontmatter.tags,
    },
    gitMeta: {
      type: item.type,
      path: item.path,
      JSpathString: pathString,
      url: item.url,
    },
    content,
  };
  if (detaillog || childResultLog) console.log("Checking GITArticle Object returned by getArticleByName:");
  if (detaillog || childResultLog) console.log(GITArticleObj);
  return GITArticleObj;
}

import { ArticleMetaData, Article } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import MDXImage from "@/app/components/mdxcomponents/MDXImage";
import MDXVideo from "@/app/components/mdxcomponents/MDXVideo";
import { siteMetadata } from "./siteMetaData";

type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

const revalidate = 0;

export async function getArticleByName(fileName: string): Promise<Article | undefined> {
  const res = await fetch(`https://raw.githubusercontent.com/reinventsoni/blogging/main/${fileName}`, {
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

  const id = fileName.replace(/\.mdx$/, "");

  const articleObj: Article = {
    articleMetaData: {
      id,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      updatedAt: frontmatter.updatedAt,
      author: frontmatter.author,
      tags: frontmatter.tags,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        author: frontmatter.author,
        url: siteMetadata.siteUrl + `/articles/${id}`,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedAt: frontmatter.publishedAt,
        updatedAt: frontmatter.updatedAt,
      },
    },
    content,
  };

  return articleObj;
}

export async function getArticlesMetaData(): Promise<ArticleMetaData[] | undefined> {
  const res = await fetch("https://api.github.com/repos/reinventsoni/blogging/git/trees/main?recursive=1", {
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
  const repoFileTree: FileTree = await res.json();
  const filesArray = repoFileTree.tree.map((obj) => obj.path).filter((path) => path.endsWith("mdx"));

  const articlesMeta: ArticleMetaData[] = [];
  for (const file of filesArray) {
    const article = await getArticleByName(file);
    if (article) {
      const { articleMetaData } = article;
      articlesMeta.push(articleMetaData);
    }
  }

  return articlesMeta.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

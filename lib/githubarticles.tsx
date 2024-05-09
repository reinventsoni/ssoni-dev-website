import { ArticleMetaData, Article } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

export async function getArticleByName(fileName: string): Promise<Article | undefined> {
  const res = await fetch(`https://raw.githubusercontent.com/reinventsoni/blogging/main/${fileName}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) return undefined;
  const rawMDX = await res.text();
  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{ title: string; date: string; tags: string[] }>({
    source: rawMDX,
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
      date: frontmatter.date,
      tags: frontmatter.tags,
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
      revalidate: 60,
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
  console.log(articlesMeta);
  return articlesMeta.sort((a, b) => (a.date < b.date ? 1 : -1));
}

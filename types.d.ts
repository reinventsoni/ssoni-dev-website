import { JSXElementConstructor, ReactElement } from "react";
import { Url } from "url";

// MetaData when we fetch all the elements in GIT Tree
type GITTreeMetaData = {
  tree: [
    {
      path: string;
      type: string;
      url: string;
    }
  ];
};
type GITTreeItemsMetaData = {
  path: string;
  type: string;
  url: string;
};

type GITArticleFrontMatter = {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
};

type GITArticle = {
  frontmatter: GITArticleFrontMatter;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  gitMeta: {
    path: string;
    JSpathString: string;
    type: string;
    url: string;
  };
};

type GITChildItems = { itemtype: string; article: GITArticle };

type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type ArticleMetaData = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  openGraph: {
    title: string;
    description: string;
    author: string;
    url: string;
    siteName: string;
    locale: "en_US";
    type: "article";
    publishedAt: string;
    updatedAt: string;
  };
};

type Article = {
  articleMetaData: ArticlesMetaData;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

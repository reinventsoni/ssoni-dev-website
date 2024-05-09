import { JSXElementConstructor, ReactElement } from "react";
import { Url } from "url";

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

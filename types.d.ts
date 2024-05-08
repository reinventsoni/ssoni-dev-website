import { JSXElementConstructor, ReactElement } from "react";

type BlogPost = {
  id: string;
  title: string;
  date: string;
};

type ArticleMetaData = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

type Article = {
  articleMetaData: ArticlesMetaData;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

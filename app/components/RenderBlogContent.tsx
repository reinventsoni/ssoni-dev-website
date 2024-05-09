import { JSXElementConstructor, ReactElement } from "react";

type Props = {
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

const RenderBlogContent = ({ content }: Props) => {
  return (
    <article
      className="prose prose-base md:prose-lg max-w-none
  prose-blockquote:bg-blue-100
  prose-blockquote:p-2
  prose-blockquote:border-black
  prose-blockquote:not-italic
  prose-blockquote:rounded-r-lg"
    >
      {content}
    </article>
  );
};

export default RenderBlogContent;

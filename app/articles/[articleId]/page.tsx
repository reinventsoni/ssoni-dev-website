import RenderBlogContent from "@/app/components/RenderBlogContent";
import getFormattedDate from "@/lib/getFormattedDate";
import { getArticlesMetaData, getArticleByName } from "@/lib/githubarticles";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 10;

type Props = {
  params: {
    articleId: string;
  };
};

export async function generateStaticParams() {
  const articlesMeta = await getArticlesMetaData(); //deduped
  if (!articlesMeta) return [];

  return articlesMeta.map((articleMeta) => ({
    articleId: articleMeta.id,
  }));
}

export async function generateMetadata({ params: { articleId } }: Props) {
  const article = await getArticleByName(`${articleId}.mdx`); //deduped
  if (!article) {
    return {
      title: "Post Not Found",
    };
  }

  return article.articleMetaData;
}

export default async function Article({ params: { articleId } }: Props) {
  const article = await getArticleByName(`${articleId}.mdx`);
  if (!article) notFound();

  const { articleMetaData, content } = article;
  const pubDate = getFormattedDate(articleMetaData.publishedAt);
  const tags = articleMetaData.tags.map((tag: string, i: string) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <section className="px-8 sm:px-16">
      <div>
        <h1 className="capitalize text-3xl md:text-4xl lg:text-5xl font-bold mt-12 mb-4 ">{articleMetaData.title}</h1>
        <p className="mt-0 text-sm font-semibold mb-8">Published On: {pubDate}</p>
      </div>
      <div className="grid grid-cols-12 mt-8">
        <div className="col-span-12 ">
          <RenderBlogContent content={content} />
        </div>
      </div>

      <p className="mt-16 mb-10">
        <Link href="/articles">Back to Home</Link>
      </p>
    </section>
  );
}

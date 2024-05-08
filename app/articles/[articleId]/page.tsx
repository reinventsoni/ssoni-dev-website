import getFormattedDate from "@/lib/getFormattedDate";
import { getArticlesMetaData, getArticleByName } from "@/lib/githubarticles";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

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

  return {
    title: article.articleMetaData.title,
  };
}

export default async function Article({ params: { articleId } }: Props) {
  const article = await getArticleByName(`${articleId}.mdx`);
  if (!article) notFound();

  const { articleMetaData, content } = article;
  const pubDate = getFormattedDate(articleMetaData.date);
  const tags = articleMetaData.tags.map((tag: string, i: string) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <div className="prose prose-xl">
      <h2 className="text-3xl mt-4 mb-0">{articleMetaData.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h2>Related:</h2>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}

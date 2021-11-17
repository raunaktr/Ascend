import he from "he";
import Head from "next/head";
import Image from "next/image";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";

import { getPortfolioItem, getPortfolioSlugs } from "../../lib/data";

export const getStaticPaths = async () => {
  const slugsRes = await getPortfolioSlugs();
  const slugs = slugsRes.portfolios;

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const portfolioItem = await getPortfolioItem(params.slug);
  return {
    props: {
      portfolioItem: portfolioItem.portfolios[0],
      content: await renderToString(he.decode(portfolioItem.portfolios[0].content)),
    },
  };
};

export default function Home({ portfolioItem, content }) {
  console.log(portfolioItem);

  return (
    <div>
      <Head>
        <title>{portfolioItem.title}</title>
        <meta name="description" content="{portfolioItem.description}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-6xl font-bold text-gray-900">{portfolioItem.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">{new Date(portfolioItem.date).toDateString()}</p>
          <div className="flex space-x-3 my-10">
            {portfolioItem.tags.map((tag) => (
              <span
                className="uppercase text-xs m-1 py-1.5 px-4 text-base-content bg-blue-200 rounded-2xl"
                key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="prose prose-xl mb-5">{portfolioItem.description}</p>
        <Image
          src={portfolioItem.coverImage.url}
          height={portfolioItem.coverImage.height}
          width={portfolioItem.coverImage.width}
        />
        <div className="prose prose-xl max-w-none">{hydrate(content)}</div>
      </div>
    </div>
  );
}

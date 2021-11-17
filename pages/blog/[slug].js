import he from "he";
import Head from "next/head";
import Image from "next/image";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";

import { getBlogSlugs, getPost } from "../../lib/data";

export const getStaticPaths = async () => {
  const slugsRes = await getBlogSlugs();
  const slugs = slugsRes.posts;

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: {
      post: post.posts[0],
      content: await renderToString(he.decode(post.posts[0].content)),
    },
  };
};

export default function Home({ post, content }) {
  console.log(post);
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="{post.description}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-6xl font-bold text-gray-900">{post.title}</h1>
        <div className="flex space-x-3 my-10">
          {post.tags.map((tag) => (
            <span
              className="uppercase text-xs m-1 py-1.5 px-4 text-base-content bg-blue-200 rounded-2xl"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">{new Date(post.date).toDateString()}</p>
          <div className="flex items-center">
            <p className="mr-4 text-gray-700 text-lg font-semibold">{post.author.name}</p>
            <Image
              className="mask mask-squircle"
              objectFit="cover"
              src={post.author.image.url}
              height={64}
              width={64}
            />
          </div>
        </div>
        <hr className="mt-5 mb-10" />
        <div className="prose prose-xl max-w-none">{hydrate(content)}</div>
      </div>
    </div>
  );
}

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
        <title>Ascend</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <Image
            src={post.author.image.url}
            height={post.author.image.height}
            width={post.author.image.width}
          />
          <div>{hydrate(content)}</div>
        </div>
      </div>
    </div>
  );
}
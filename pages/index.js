import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Hero from "../components/Hero/Hero";
import { getPostsAndPortfolio } from "../lib/data";

export const getStaticProps = async () => {
  const data = await getPostsAndPortfolio();
  return {
    props: {
      data,
    },
  };
};
export default function Home({ data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Ascend</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 md:grid-cols-2  max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 ">
        {data?.portfolios?.map((item) => (
          <div className="flex flex-col bg-base-200 rounded-lg p-4 m-2" key={item.slug}>
            <Link href={`/portfolio/${item.slug}`}>
              <a href="{`/portfolio/${item.slug}`}">
                <Image
                  src={item.coverImage.url}
                  height={item.coverImage.height}
                  objectFit="cover"
                  width={item.coverImage.width}
                  className="w-75 bg-gray-400 rounded-lg"
                />
              </a>
            </Link>
            <div className="flex flex-col items-start ml-4">
              <a href="{`/portfolio/${item.slug}`}">
                <Link href={`/portfolio/${item.slug}`}>
                  <h4 className="text-2xl hover:text-primary font-semibold">{item.title}</h4>
                </Link>
              </a>
            </div>
            <div className="flex flex-wrap justify-starts items-center mt-4">
              {item.tags.map((tag) => (
                <span
                  className="uppercase text-xs m-1 py-1.5 px-4 text-base-content bg-blue-200 rounded-2xl"
                  key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="mt-20 ">
          <div className="text-4xl text-gray-900 font-semibold mb-4">Recent Posts</div>
          {data?.posts?.map((post) => (
            <div key={post.slug} className="grid grid-cols-1 md:grid-cols-4 py-6">
              <div className="mb-2 md:mb-0 md:col-span-1">
                <p className="text-gray-600 text-sm">{new Date(post.date).toDateString()}</p>
              </div>
              <div className="md:col-span-3">
                <Link href={`/blog/${post.slug}`}>
                  <a className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
                    {post.title}
                  </a>
                </Link>
                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                <div className="text-sm text-gray-900 font-semibold mt-1">{post.author.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

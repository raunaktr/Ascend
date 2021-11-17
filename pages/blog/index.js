import Link from "next/link";

import { getPosts } from "../../lib/data";
export const getStaticProps = async () => {
  const data = await getPosts();
  return {
    props: {
      posts: data.posts,
    },
  };
};

export default function BlogPost({ posts }) {
  console.log(posts);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="mt-20 ">
        <div className="text-4xl text-gray-900 font-semibold mb-4">Recent Posts</div>
        {posts?.map((post) => (
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
  );
}

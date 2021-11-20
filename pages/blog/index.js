import { request } from "graphql-request";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr"; /* similar to axios and fetch. @usecase: cache and pagination*/

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);

export const getStaticProps = async () => {
  const data = await fetcher(
    "https://api-ap-northeast-1.graphcms.com/v2/ckue8do3o7mq001xne93y9st9/master",
    `
    query getPosts() {
      postsConnection(orderBy: date_DESC, first: 2, skip: 0) {
        edges {
          node {
            id
            title
            date
            slug
            description
            id
            author {
              name
            }
          }
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
    
`,
  );
  return {
    props: {
      posts: data,
    },
  };
};

export default function BlogPage({ posts }) {
  console.log(posts);
  const [searchValue, setSearchValue] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, error } = useSWR(
    [
      "https://api-ap-northeast-1.graphcms.com/v2/ckue8do3o7mq001xne93y9st9/master",
      `query getPosts($searchValue: String $skip: Int) {
        postsConnection(orderBy: date_DESC, where: {title_contains: $searchValue}, first: 2, skip: $skip) {
          edges {
            node {
              id
              title
              date
              slug
              description
              id
              author {
                name
              }
            }
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }
    `,
      searchValue,
      skip,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    { fallbackData: posts, revalidateOnFocus: true },
  );
  if (error) {
    return (
      <div>
        <h2>There was an error</h2>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      <h1 className="text-5xl text-gray-600 font-serif mb-6 font-bold">The Blog</h1>
      <div>
        <input
          type="text"
          value={searchValue}
          placeholder="Search blog posts"
          className="focus:outline-none mb-6 focus:ring-2 focus:ring-gray-900 w-full rounded-lg border h-10 pl-4 text-lg text-gray-800 border-gray-200"
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div>
        {data.postsConnection?.edges?.map((post) => (
          <div key={post.node.slug} className="grid grid-cols-1 md:grid-cols-4 py-6">
            <div className="mb-2 md:mb-0 md:col-span-1">
              <p className="text-gray-600 text-sm">{new Date(post.node.date).toDateString()}</p>
            </div>
            <div className="md:col-span-3">
              <Link href={`/blog/${post.node.slug}`}>
                <a className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
                  {post.node.title}
                </a>
              </Link>
              <p className="text-gray-700 leading-relaxed">{post.node.description}</p>
              <div className="text-sm text-gray-900 font-semibold mt-1">
                {post.node.author.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-5 justify-center items-center mt-10 ">
        <div className="btn-group">
          <button
            onClick={() => {
              setSkip(skip - 2);
            }}
            disabled={!data.postsConnection.pageInfo.hasPreviousPage}
            className="btn btn-outline disabled:btn-disabled">
            Previous
          </button>
          <button
            onClick={() => {
              setSkip(skip + 2);
            }}
            disabled={!data.postsConnection.pageInfo.hasNextPage}
            className="btn btn-outline disabled:btn-disabled">
            Next
          </button>
        </div>
        <div className="text-gray-700">
          Total Pages:
          <span className="text-primary">&nbsp;{data.postsConnection.pageInfo.pageSize}</span>
        </div>
      </div>
    </div>
  );
}

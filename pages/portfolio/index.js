import Image from "next/image";
import Link from "next/link";

import { getPortfolioItems } from "../../lib/data";
export const getStaticProps = async () => {
  const data = await getPortfolioItems();
  return {
    props: {
      portfolios: data.portfolios,
    },
  };
};

export default function Portfolio({ portfolios }) {
  return (
    <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 md:grid-cols-2  max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 ">
      {portfolios?.map((item) => (
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
                className="text-xs m-1 py-1.5 px-4 text-base-content bg-blue-200 rounded-2xl"
                key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

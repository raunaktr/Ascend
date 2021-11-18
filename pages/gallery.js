import Image from "next/image";

import { getPhotos } from "../lib/data";
import { getPlaiceholder } from "plaiceholder";

const blurImages = async (photos) => {
  const images = await Promise.all(
    photos.map(async (image) => {
      const { base64, img } = await getPlaiceholder(image.photo.url, { size: 10 });
      return {
        ...img,
        base64,
        id: image.id,
        description: image.description,
        date: image.date,
      };
    }),
  );
  return images;
};

export const getStaticProps = async () => {
  const photoResponse = await getPhotos();
  const { photos } = photoResponse;
  const blurredPhotos = await blurImages(photos);

  console.log(blurredPhotos);

  return {
    revalidate: 3600,
    props: {
      blurredPhotos,
    },
  };
};

export default function Gallery({ blurredPhotos }) {
  console.log(blurredPhotos);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 grid grid-cols-2 gap-3">
      {blurredPhotos?.map((photo) => (
        <Image
          src={photo.src}
          width={photo.width / 2}
          height={photo.height / 2}
          objectFit="cover"
          blurDataURL={photo.base64}
          placeholder="blur"
        />
      ))}
    </div>
  );
}

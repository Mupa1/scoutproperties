import { FC } from 'react';

import { hero1, hero2, hero3, hero4, hero6 } from '@/assets';

const HeroImages: FC = () => {
  const ImageBlock = ({ src }: { src: string }) => (
    <div className="relative">
      <img
        src={src}
        alt="hero images"
        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  );

  const images1 = [hero2, hero1];
  const images2 = [hero4, hero3];
  const images3 = [hero6];

  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <div className="ml-auto hero-w-space pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        {images3.map((src, index) => (
          <ImageBlock key={index} src={src} />
        ))}
      </div>
      <div className="mr-auto hero-w-space sm:mr-0 sm:pt-52 lg:pt-36">
        {images2.map((src, index) => (
          <ImageBlock key={index} src={src} />
        ))}
      </div>
      <div className="hero-w-space pt-32 sm:pt-0">
        {images1.map((src, index) => (
          <ImageBlock key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

export default HeroImages;

import { FC } from 'react';

import { aboutHeroImages } from '@/entities/about-hero-images';

import { ImageCard } from './ImageCard';

export const AboutHeroImages: FC = () => {
  const { hero1, hero2, hero3, hero4, hero6 } = aboutHeroImages;
  const images1 = [hero2, hero1];
  const images2 = [hero4, hero3];
  const images3 = [hero6];

  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <div className="ml-auto hero-w-space pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        {images3.map((src, index) => (
          <ImageCard key={index} src={src} />
        ))}
      </div>
      <div className="mr-auto hero-w-space sm:mr-0 sm:pt-52 lg:pt-36">
        {images2.map((src, index) => (
          <ImageCard key={index} src={src} />
        ))}
      </div>
      <div className="hero-w-space pt-32 sm:pt-0">
        {images1.map((src, index) => (
          <ImageCard key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

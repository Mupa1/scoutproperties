import { FC } from 'react';

import { hero1, hero2, hero3, hero4, hero6 } from '@/assets';
import SearchBar from '@/components/shared/SearchBar';

const Home: FC = () => {
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

  const HeroImages = () => {
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

  return (
    <div className="bg-white">
      <div className="relative isolate">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#8CAD2A] to-[#16539B] opacity-30"
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-normal tracking-tight text-gray-900 sm:text-6xl">
                  Find your next dream home or apartment.
                </h1>
                <p className="mt-6 pb-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Dignissim suspendisse in est ante in nibh. Sit amet aliquam id
                  diam maecenas ultricies. Elementum nibh tellus molestie nunc
                  non blandit massa. Non enim praesent elementum facilisis leo
                  vel.
                </p>
                <div className="sm:pr-24 lg:pr-0">
                  <SearchBar />
                </div>
              </div>
              <HeroImages />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

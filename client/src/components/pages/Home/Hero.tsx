import { FC } from 'react';

import HeroImages from './HeroImages';
import Search from './Search';

const Hero: FC = () => {
  return (
    <section className="bg-white h-screen overflow-hidden">
      <div className="relative isolate">
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
          <div className="flex mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
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
                  <Search />
                </div>
              </div>
              <HeroImages />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

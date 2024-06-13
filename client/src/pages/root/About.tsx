import { FC } from 'react';

import { AboutHeroImages } from '@/components/pages/About/AboutHeroImages';
import { BackgroundPatterns } from '@/components/pages/About/BackgroundPatterns';

export const About: FC = () => {
  return (
    <section>
      <div className="relative isolate">
        <BackgroundPatterns />
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h2 className="text-4xl font-normal tracking-tight sm:text-6xl">
                  The No.1 in Real Estate Properties.
                </h2>
                <p className="mt-6 pb-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Dignissim suspendisse in est ante in nibh. Sit amet aliquam id
                  diam maecenas ultricies. Elementum nibh tellus molestie nunc
                  non blandit massa. Non enim praesent elementum facilisis leo
                  vel.
                </p>
              </div>
              <AboutHeroImages />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

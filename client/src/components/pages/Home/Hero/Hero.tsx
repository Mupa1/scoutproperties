import { HeroImages } from './HeroImages';
import { Search } from './Search';

export const Hero = () => {
  return (
    <div>
      <div className="h-screen relative w-100">
        <div className="absolute top-0 left-0 z-30 h-screen w-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="w-100 text-center m-auto z-40 max-w-7xl px-12 lg:px-8">
            <h1 className="text-4xl font-normal tracking-tight text-white sm:text-6xl">
              Find your next dream home or apartment.
            </h1>
            <p className="mt-6 pb-6 m-auto text-lg leading-8 text-primary-50 sm:max-w-md lg:max-w-none">
              Dignissim suspendisse in est ante in nibh. Sit amet aliquam id
              diam maecenas ultricies. Elementum nibh tellus molestie nunc non
              blandit massa. Non enim praesent elementum facilisis leo vel.
            </p>
            <Search />
          </div>
        </div>
        <HeroImages />
      </div>
    </div>
  );
};

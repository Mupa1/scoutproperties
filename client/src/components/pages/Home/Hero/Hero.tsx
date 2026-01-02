import { HeroImages } from './HeroImages';
import { Search } from './Search';

export const Hero = () => {
  return (
    <div className="relative">
      <div className="h-screen relative w-full bg-gray-900">
        <div className="absolute top-0 left-0 z-30 h-screen w-full bg-gradient-to-b from-black/40 via-black/30 to-black/50 flex flex-col items-center justify-center">
          <div className="w-full text-center m-auto z-40 max-w-7xl px-6 sm:px-12 lg:px-8">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Find your next dream home
            </h1>
            <p className="mt-6 pb-8 m-auto text-lg sm:text-xl leading-relaxed text-gray-100 sm:max-w-2xl lg:max-w-3xl">
              Discover beautiful properties that match your lifestyle. Search by
              location, type, and preferences to find the perfect place.
            </p>
            <Search />
          </div>
        </div>
        <HeroImages />
      </div>
    </div>
  );
};

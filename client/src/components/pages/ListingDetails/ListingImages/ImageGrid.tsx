import { FC } from 'react';

export const ImageGrid: FC<{ images: string[]; onClick: () => void }> = ({
  images,
  onClick,
}) => (
  <>
    {/* Mobile: Horizontal scrollable gallery showing all images */}
    <div className="md:hidden w-full h-full relative">
      <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 h-full -mx-4 px-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[85%] sm:w-[75%] h-full snap-center rounded-lg overflow-hidden cursor-pointer group"
            onClick={onClick}
            data-testid={`image-${index}`}
          >
            <div
              className="bg-cover bg-center w-full h-full rounded-lg group-active:opacity-90 transition-opacity shadow-inner"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
        ))}
      </div>
      {/* Image counter for mobile */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm z-10">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </div>
      )}
    </div>

    {/* Desktop: Grid layout */}
    <div className="hidden md:grid group grid-cols-4 lg:grid-cols-5 w-full h-full gap-2 overflow-hidden cursor-pointer">
      <div
        className="bg-cover bg-center h-full col-span-2 lg:col-span-3 rounded-lg group-hover:opacity-90 transition-opacity shadow-inner"
        style={{ backgroundImage: `url(${images[0]})` }}
        onClick={onClick}
        data-testid="image-0"
      ></div>
      <div className="flex flex-col h-full w-full gap-2 col-span-2 lg:col-span-1">
        {images.slice(1, 3).map((img, index) => (
          <div
            key={index}
            className="bg-cover bg-center w-full h-full rounded-lg group-hover:opacity-90 transition-opacity shadow-inner"
            style={{ backgroundImage: `url(${img})` }}
            onClick={onClick}
            data-testid={`image-${index + 1}`}
          ></div>
        ))}
      </div>
      <div className="hidden lg:flex flex-col h-full w-full gap-2 lg:col-span-1">
        {images.slice(3, 5).map((img, index) => (
          <div
            key={index}
            className="bg-cover bg-center w-full h-full rounded-lg group-hover:opacity-90 transition-opacity shadow-inner"
            style={{ backgroundImage: `url(${img})` }}
            onClick={onClick}
            data-testid={`image-${index + 3}`}
          ></div>
        ))}
      </div>
      {/* Show remaining images indicator on desktop if more than 5 */}
      {images.length > 5 && (
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          +{images.length - 5} more
        </div>
      )}
    </div>
  </>
);

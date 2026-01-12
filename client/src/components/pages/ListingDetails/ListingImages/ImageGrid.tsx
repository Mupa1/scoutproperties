import { FC } from 'react';

import { getValidImages } from '@/lib/images';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage available soon%3C/text%3E%3C/svg%3E';

export const ImageGrid: FC<{
  images: string[];
  listingTitle: string;
  onOpen: () => void;
}> = ({ images, listingTitle, onOpen }) => {
  const validImages = getValidImages(images);

  const getAlt = (i: number) => `${listingTitle} – property image ${i + 1}`;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-500 text-sm">Photos will be available soon</p>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden relative h-full">
        <div className="flex h-full gap-3 overflow-x-auto snap-x snap-mandatory px-4">
          {validImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={onOpen}
              className="snap-center shrink-0 w-[85%] h-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <img
                src={img}
                alt={getAlt(i)}
                onError={handleError}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                data-testid={`image-${i}`}
              />
            </button>
          ))}
        </div>

        {/* swipe hint */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        <button
          onClick={onOpen}
          className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full"
        >
          View photos ({validImages.length})
        </button>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid relative h-full grid-cols-4 gap-2">
        {validImages.slice(0, 5).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={onOpen}
            className={`relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              src={img}
              alt={getAlt(i)}
              onError={handleError}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              data-testid={`image-${i}`}
            />
          </button>
        ))}

        <button
          onClick={onOpen}
          className="absolute bottom-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow text-sm font-medium"
        >
          View all photos ({validImages.length})
        </button>
      </div>
    </>
  );
};

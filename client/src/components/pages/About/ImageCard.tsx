import { FC } from 'react';

type ImageCardTypes = {
  src: string;
};

export const ImageCard: FC<ImageCardTypes> = ({ src }) => (
  <div className="relative">
    <img
      src={src}
      alt="hero images"
      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
    />
    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
  </div>
);

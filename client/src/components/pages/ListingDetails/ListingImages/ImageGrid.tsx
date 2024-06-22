import { FC } from 'react';

export const ImageGrid: FC<{ images: string[]; onClick: () => void }> = ({
  images,
  onClick,
}) => (
  <div className="group grid rounded-md overflow-hidden grid-cols-1 md:grid-cols-4 lg:grid-cols-5 w-full h-full gap-3 cursor-pointer">
    <div
      className="bg-cover bg-center h-full col-span-3 rounded-md group-hover:opacity-75"
      style={{ backgroundImage: `url(${images[0]})` }}
      onClick={onClick}
      data-testid="image-0"
    ></div>
    <div className="hidden md:flex flex-col h-full w-full gap-3 md:col-span-1">
      {images.slice(1, 3).map((img, index) => (
        <div
          key={index}
          className="bg-cover bg-center w-full h-full rounded-md group-hover:opacity-75"
          style={{ backgroundImage: `url(${img})` }}
          onClick={onClick}
          data-testid={`image-${index + 1}`}
        ></div>
      ))}
    </div>
    <div className="hidden lg:flex flex-col h-full w-full gap-3 md:col-span-1">
      {images.slice(3, 5).map((img, index) => (
        <div
          key={index}
          className="bg-cover bg-center w-full h-full rounded-md group-hover:opacity-75"
          style={{ backgroundImage: `url(${img})` }}
          onClick={onClick}
          data-testid={`image-${index + 3}`}
        ></div>
      ))}
    </div>
  </div>
);

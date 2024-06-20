import { FC } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { LuDot } from 'react-icons/lu';
import { MdOutlineBed } from 'react-icons/md';
import { RiMapPinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import imagePlaceholder from '@/assets/image-placeholder.svg';

type ListingCardType = {
  data: {
    id: number;
    title: string;
    images: string;
    bedroom: number;
    bathroom: number;
    price: number;
    address: string;
  };
};

export const ListingCard: FC<ListingCardType> = ({ data }) => {
  const { id, title, images, bedroom, bathroom, price, address } = data;
  return (
    <div
      key={id}
      className="listing-card group relative flex flex-col overflow-hidden rounded-lg border border-gray-100"
    >
      <Link to={`/listing-details/${id}`}>
        <div className="aspect-h-1 aspect-w-3 group-hover:opacity-75 h:60 sm:h-40">
          <img
            src={images || imagePlaceholder}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Link>
      <div className="relative flex flex-1 flex-col p-4">
        <b className="text-lg font-bold text-gray-900">{price} €</b>
        <Link
          to={`/listing-details/${id}`}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          {title}
        </Link>
        <p className="flex items-center font-bold text-sm gap-1 text-gray-500">
          <span className="listing-amenities">
            {bedroom}
            <MdOutlineBed />
          </span>
          <LuDot />
          <span className="listing-amenities">
            {bathroom}
            <LuBath />
          </span>
        </p>
        <div className="flex items-center pt-2 gap-1">
          <RiMapPinLine />
          <p className="text-sm text-gray-500 truncate hover:text-clip">
            {address}
          </p>
        </div>
        <div className="absolute top-4 right-3">
          <IoHeartOutline />
        </div>
      </div>
    </div>
  );
};

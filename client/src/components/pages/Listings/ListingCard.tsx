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
    images: string[];
    bedroom: number;
    bathroom: number;
    price: number;
    address: string;
  };
};

const ListingCard: FC<ListingCardType> = ({ data }) => {
  const { id, title, images, bedroom, bathroom, price, address } = data;
  return (
    <div
      key={id}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="aspect-h-1 aspect-w-3 bg-secondary-50 group-hover:opacity-75 h:60 sm:h-40">
        <img
          src={images[0] || imagePlaceholder}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="relative flex flex-1 flex-col p-4">
        <Link
          to={`${id}`}
          className="text-sm font-medium  text-gray-900 hover:underline"
        >
          {title}
        </Link>
        <b className="text-lg font-bold text-gray-900">{price} €</b>
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

export default ListingCard;

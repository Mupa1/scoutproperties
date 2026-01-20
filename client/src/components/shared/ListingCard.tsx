import { FC } from 'react';
import { FaBath } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import { RiMapPinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { getValidImages } from '@/lib/images';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage available soon%3C/text%3E%3C/svg%3E';

type ListingCardType = {
  data: {
    id: number;
    title: string;
    images: string[];
    bedroom: number;
    bathroom: number;
    price: number;
    address: string;
    city?: string;
    type?: 'Buy' | 'Rent';
    property?: 'Apartment' | 'House' | 'Condo' | 'Land';
  };
};

export const ListingCard: FC<ListingCardType> = ({ data }) => {
  const {
    id,
    title,
    images,
    bedroom,
    bathroom,
    price,
    address,
    city,
    type,
    property,
  } = data;
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  const validImages = getValidImages(images);
  const imageSrc = validImages[0] || PLACEHOLDER_IMAGE;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <Link
      to={`/listings/${id}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image with badge overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={title}
          onError={handleError}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {type && (
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                type === 'Rent'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4">
        {/* Price and Property Type */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formattedPrice} €
            </div>
            {property && (
              <span className="text-xs text-gray-500 font-medium">
                {property}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
          {title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <IoIosBed className="text-gray-400" size={18} />
            <span className="font-medium">{bedroom}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="text-gray-400" size={16} />
            <span className="font-medium">{bathroom}</span>
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
          <RiMapPinLine className="text-gray-400 flex-shrink-0" size={14} />
          <span className="text-sm text-gray-600 truncate">
            {city && `${city}, `}
            {address}
          </span>
        </div>
      </div>
    </Link>
  );
};

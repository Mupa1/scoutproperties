import { FC } from 'react';
import {
  FaBath,
  FaBus,
  FaParking,
  FaPencilRuler,
  FaRegEdit,
  FaSchool,
} from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { RiMapPinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { useUserContext } from '@/context/useUserContext';
import { ListingDetailsProps } from '@/types';

import { Map } from '../../shared/Map';
interface DetailsProps {
  data: ListingDetailsProps;
}

export const Details: FC<DetailsProps> = ({ data }) => {
  const { currentUser } = useUserContext();
  const { price, title, type, property, address, bedroom, bathroom, user } =
    data;

  const { parking, description, size, school, restaurant, bus } =
    data.listingDetails;

  const formattedPrice = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 mb-12">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <RiMapPinLine className="text-primary-600" size={20} />
                <p className="text-base">{address}</p>
              </div>
              {property && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-100 text-primary-700">
                    {property}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700">
                    {type}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-primary-600">
                {formattedPrice} €
              </span>
              {!property && (
                <span className="text-sm text-gray-500 mt-1">{type}</span>
              )}
            </div>
          </div>

          {/* Property Features */}
          <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <IoIosBed className="text-primary-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-semibold text-gray-900">{bedroom}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FaBath className="text-primary-600" size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold text-gray-900">{bathroom}</p>
              </div>
            </div>
            {size && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaPencilRuler className="text-primary-600" size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-semibold text-gray-900">{size} sqft</p>
                </div>
              </div>
            )}
            {parking && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaParking className="text-primary-600" size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parking</p>
                  <p className="font-semibold text-gray-900">{parking}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Description</h2>
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </div>

        {/* Nearby Amenities */}
        {(school || bus || restaurant) && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Nearby Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {school && (
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <FaSchool className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">School</p>
                      <p className="text-sm text-gray-600">
                        {school > 999
                          ? (school / 1000).toFixed(1) + 'km'
                          : school + 'm'}{' '}
                        away
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {bus && (
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <FaBus className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bus Stop</p>
                      <p className="text-sm text-gray-600">
                        {bus > 999 ? (bus / 1000).toFixed(1) + 'km' : bus + 'm'}{' '}
                        away
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {restaurant && (
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <IoRestaurant className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Restaurant</p>
                      <p className="text-sm text-gray-600">
                        {restaurant > 999
                          ? (restaurant / 1000).toFixed(1) + 'km'
                          : restaurant + 'm'}{' '}
                        away
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Location</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[400px]">
            <Map listingsData={[data]} className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          {currentUser?.id === data.userId ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <Link
                to={`/listings/edit/${data.id}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <FaRegEdit size={18} />
                Edit Listing
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.avatar ? user.avatar : '/user-placeholder.svg'}
                  alt={user.name}
                  className="h-20 w-20 rounded-full border-4 border-gray-100 mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
                {user.company && (
                  <p className="text-sm text-gray-600 mt-1">{user.company}</p>
                )}
              </div>
              <Link
                to={`mailto:${user.email}`}
                className="block w-full px-4 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Send Message
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

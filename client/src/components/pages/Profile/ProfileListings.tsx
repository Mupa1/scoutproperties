import { FC } from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/shared/ListingCard';
import { ErrorMessage, Loader } from '@/components/ui';
import { ListingsProps } from '@/types';

export const ProfileListings: FC<ListingsProps> = ({
  listingsData = [],
  isLoading,
  isError,
}) => {
  const hasListings = listingsData && listingsData.length > 0;

  return (
    <>
      <div className="flex-between mt-4">
        <h2 className="font-semibold">My Listings</h2>
        <Link to="/listings/add" className="link">
          <MdOutlineAddBox size={20} />
          Add Listing
        </Link>
      </div>
      <div
        className="h-max grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        data-testid="profile-listings"
      >
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage error="Error loading listings!" />
        ) : hasListings ? (
          listingsData.map((item) => (
            <div key={item.id}>
              <ListingCard data={item} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-16 px-6">
            <div className="text-center max-w-md">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-gray-100 p-6">
                  <HiOutlineHome className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No listings yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't created any property listings yet. Start by adding
                your first listing to showcase your properties.
              </p>
              <Link to="/listings/add">
                <button className="px-6 py-2.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium">
                  Create Your First Listing
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

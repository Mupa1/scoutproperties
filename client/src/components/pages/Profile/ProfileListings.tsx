import { FC } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/shared/ListingCard';
import { ErrorMessage, Loader } from '@/components/ui';
import { ListingsProps } from '@/types';

export const ProfileListings: FC<ListingsProps> = ({
  listingsData,
  isLoading,
  isError,
}) => {
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
        ) : (
          listingsData.map((item) => (
            <div key={item.id}>
              <ListingCard data={item} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

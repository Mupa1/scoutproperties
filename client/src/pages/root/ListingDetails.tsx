import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Details } from '@/components/pages/ListingDetails/Details';
import { ListingImages } from '@/components/pages/ListingDetails/ListingImages/ListingImages';
import { Loader } from '@/components/ui';
import { useGetListingById } from '@/lib/react-query/queries';

export const ListingDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isPending } = useGetListingById(id!);

  if (isPending) {
    return (
      <div className="min-h-screen flex-center">
        <Loader />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex-center">Listing details not found!</div>
    );
  }

  return (
    <section className="min-h-screen mt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <ListingImages images={listing.images} />
        </div>
        <Details data={listing} />
      </div>
    </section>
  );
};

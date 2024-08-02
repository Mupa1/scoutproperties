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
    <section className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ListingImages images={listing.images} />
        <Details data={listing} />
      </div>
    </section>
  );
};

import { FC } from 'react';

import { Details } from '@/components/pages/ListingDetails/Details';
import { ListingImages } from '@/components/pages/ListingDetails/ListingImages/ListingImages';
import { listingDetailsData } from '@/lib/dummy-data';

export const ListingDetailsPage: FC = () => {
  return (
    <section className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ListingImages images={listingDetailsData.images} />
        <Details />
      </div>
    </section>
  );
};

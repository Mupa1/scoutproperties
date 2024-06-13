import { FC } from 'react';

import { Footer } from '@/components/shared/Footer';
import { ListingsProps } from '@/types';

import { ListingCard } from './ListingCard';

export const Listings: FC<ListingsProps> = ({ listingsData }) => {
  return (
    <div className="grid grid-cols-1 overflow-y-scroll flex-3 w-full">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {listingsData.map((item) => (
          <div key={item.id}>
            <ListingCard data={item} />
          </div>
        ))}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

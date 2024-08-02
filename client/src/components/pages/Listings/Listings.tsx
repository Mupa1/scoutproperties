import { FC } from 'react';

import { Footer } from '@/components/shared/Footer';
import { ListingCard } from '@/components/shared/ListingCard';
import { ListingsProps } from '@/types';

export const Listings: FC<ListingsProps> = ({ listingsData }) => {
  return (
    <div className="grid grid-cols-1 flex-3 w-full overflow-hidden listings">
      <div className="overflow-y-scroll">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 sm:gap-4 2xl:grid-cols-3 overflow-y-scroll ">
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
    </div>
  );
};

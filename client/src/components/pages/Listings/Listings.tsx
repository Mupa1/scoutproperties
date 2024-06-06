import { FC } from 'react';

import { ListingsProps } from '@/types';

import ListingCard from './ListingCard';
import Map from './Map';
import SearchFilter from './SearchFilter';

const Listings: FC<ListingsProps> = ({ listingsData }) => {
  return (
    <section className="h-screen w-full">
      <SearchFilter />
      <div className="h-full flex">
        <div className="overflow-y-scroll flex-3 w-full sm:pr-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {listingsData.map((item) => (
            <div key={item.id}>
              <ListingCard data={item} />
            </div>
          ))}
        </div>
        <div className="flex-2 h-full  w-full hidden md:block overflow-y-hidden">
          <div className="w-full h-full">
            <Map listingsData={listingsData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listings;

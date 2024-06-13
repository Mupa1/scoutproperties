import { FC } from 'react';

import { Listings } from '@/components/pages/Listings/Listings';
import { Map } from '@/components/pages/Listings/Map';
import { SearchFilter } from '@/components/pages/Listings/SearchFilter';
import { Header } from '@/components/shared/Header';
import { listingsData } from '@/lib/dummy-data';

export const ListingsPage: FC = () => {
  return (
    <section className="h-screen w-full fixed">
      <Header />
      <div className="w-full">
        <div className="px-6 sticky top-20">
          <SearchFilter />
        </div>
        <div className="flex mt-20 px-6 listings">
          <div className="flex-2 h-full  w-full hidden md:block overflow-y-hidden sm:pr-2">
            <div className="w-full h-full">
              <Map listingsData={listingsData} />
            </div>
          </div>
          <Listings listingsData={listingsData} />
        </div>
      </div>
    </section>
  );
};

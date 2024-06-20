import { FC } from 'react';

import { Listings } from '@/components/pages/Listings/Listings';
import { Map } from '@/components/pages/Listings/Map';
import { SearchFilter } from '@/components/pages/Listings/SearchFilter';
import { Header } from '@/components/shared/Header';
import { listingsData } from '@/lib/dummy-data';
import { SearchFormData } from '@/types';

export const ListingsPage: FC = () => {
  const onSubmit = (data: SearchFormData) => {
    console.log('Form submitted', data);
  };

  return (
    <section className="h-screen w-full fixed px-6 md:px-8">
      <Header />
      <div className="w-full">
        <div className="sticky top-20 z-50 pt-4 md:pt-0 pb-4">
          <SearchFilter onSubmit={onSubmit} />
        </div>
        <div className="flex mt-20 md:mt-36 listings">
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

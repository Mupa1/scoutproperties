import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Listings } from '@/components/pages/Listings/Listings';
import { SearchFilter } from '@/components/pages/Listings/SearchFilter';
import { Header } from '@/components/shared/Header';
import { Map } from '@/components/shared/Map';
import { ErrorMessage, Loader } from '@/components/ui';
import { useGetListings } from '@/lib/react-query/queries';
import { QueryParams, SearchFormData } from '@/types';

export const ListingsPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query: QueryParams = {};
    params.forEach((value, key) => {
      query[key] = value;
    });
    setQueryParams(query);
  }, [location.search]);

  const {
    data: listingsData,
    isPending,
    isError,
  } = useGetListings(queryParams);

  const onSubmit = (data: SearchFormData) => {
    const newQueryParams = {
      ...queryParams,
      ...data,
    };

    const queryString = new URLSearchParams(
      Object.entries(newQueryParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)] as [string, string]),
    ).toString();

    navigate(`/listings?${queryString}`);
  };

  return (
    <section className="h-screen w-full fixed px-6 md:px-8">
      <Header />
      <div className="w-full">
        <div className="sticky top-20 z-50 pt-4 md:pt-0 pb-4">
          <SearchFilter onSubmit={onSubmit} initialValues={queryParams} />
        </div>
        <div className="mt-20 md:mt-36 listings">
          {listingsData && (
            <span>
              Found {listingsData.length}{' '}
              <b>{listingsData.length > 1 ? 'listings' : 'listing'}</b>
            </span>
          )}

          <div className="flex">
            {isPending ? (
              <Loader />
            ) : isError ? (
              <ErrorMessage error="Error loading listings!" />
            ) : (
              <>
                <div className="flex-2 h-full w-full hidden md:block overflow-y-hidden sm:pr-2">
                  <div className="w-full h-full">
                    <Map listingsData={listingsData} className="listings" />
                  </div>
                </div>
                <Listings listingsData={listingsData} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

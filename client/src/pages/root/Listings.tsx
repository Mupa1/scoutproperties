import { FC, useEffect, useRef, useState } from 'react';
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
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const badgeContainerRef = useRef<HTMLDivElement>(null);
  const [mapTop, setMapTop] = useState('164px'); // Default fallback

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

  // Calculate exact map position based on actual container heights
  useEffect(() => {
    const calculateMapTop = () => {
      const headerHeight = 80; // 5rem = 80px (pt-20)
      const filterHeight = filterContainerRef.current?.offsetHeight || 84;
      const badgeHeight = badgeContainerRef.current?.offsetHeight || 0;
      const totalHeight = headerHeight + filterHeight + badgeHeight;
      setMapTop(`${totalHeight}px`);
    };

    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      calculateMapTop();
    });

    // Recalculate on window resize and when listings data changes
    window.addEventListener('resize', calculateMapTop);
    return () => window.removeEventListener('resize', calculateMapTop);
  }, [listingsData, queryParams]);

  const onSubmit = (data: SearchFormData) => {
    const newQueryParams = {
      ...queryParams,
      ...data,
    };

    const queryString = new URLSearchParams(
      Object.entries(newQueryParams)
        .filter(([key, value]) => {
          // Filter out undefined, empty strings, and 0 values (for bedroom, minPrice)
          if (value === undefined || value === '') return false;
          if (key === 'bedroom' && (value === 0 || value === '0')) return false;
          if (key === 'minPrice' && (value === 0 || value === '0'))
            return false;
          return true;
        })
        .map(([key, value]) => [key, String(value)] as [string, string]),
    ).toString();

    navigate(`/listings?${queryString}`);
  };

  // Calculate map height based on dynamically calculated top position
  const mapTopValue = parseInt(mapTop) || 164;
  const mapHeight = `calc(100vh - ${mapTopValue}px)`;

  return (
    <section className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden pt-20">
        {/* Modern Filter Section - Fixed at top */}
        <div
          ref={filterContainerRef}
          className="flex-shrink-0 z-50 bg-white shadow-sm border-b border-gray-200"
        >
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <SearchFilter onSubmit={onSubmit} initialValues={queryParams} />
          </div>
        </div>

        {/* Results Count Badge - Fixed below filter */}
        {listingsData && listingsData.length > 0 && (
          <div
            ref={badgeContainerRef}
            className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-3 bg-white border-b border-gray-200"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {listingsData.length}{' '}
              {listingsData.length === 1 ? 'listing' : 'listings'} found
            </span>
          </div>
        )}

        {/* Content Section - Map fixed on left, listings scrollable on right */}
        <div className="flex-1 flex overflow-hidden relative">
          {isPending ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader />
            </div>
          ) : isError ? (
            <div className="flex-1 flex items-center justify-center">
              <ErrorMessage error="Error loading listings!" />
            </div>
          ) : (
            <>
              {/* Map Section - Fixed on the left, never scrolls, fills remaining height */}
              <div
                className="hidden lg:block lg:w-2/5 xl:w-1/2 flex-shrink-0 fixed left-0 border-r border-gray-200 bg-white z-10"
                style={{
                  top: mapTop,
                  height: mapHeight,
                }}
              >
                <div className="h-full w-full">
                  <Map
                    listingsData={listingsData || []}
                    className="listings h-full w-full"
                  />
                </div>
              </div>

              {/* Listings Grid - Scrollable on the right, includes footer */}
              <div className="flex-1 lg:w-3/5 xl:w-1/2 lg:ml-[40%] xl:ml-[50%] overflow-y-auto bg-gray-50">
                <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-full">
                  <Listings
                    listingsData={listingsData || []}
                    queryParams={queryParams}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

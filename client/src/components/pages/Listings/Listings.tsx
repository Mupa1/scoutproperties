import { FC } from 'react';
import { HiOutlineHome, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { Footer } from '@/components/shared/Footer';
import { ListingCard } from '@/components/shared/ListingCard';
import { Button } from '@/components/ui/Button';
import { ListingsProps, QueryParams } from '@/types';

type ListingsComponentProps = ListingsProps & {
  queryParams?: QueryParams;
};

export const Listings: FC<ListingsComponentProps> = ({
  listingsData,
  queryParams = {},
}) => {
  const hasActiveFilters =
    Object.keys(queryParams).length > 0 &&
    Object.values(queryParams).some(
      (value): value is string =>
        typeof value === 'string' && value.trim() !== '',
    );

  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listingsData && listingsData.length > 0 ? (
            listingsData.map((item) => (
              <ListingCard key={item.id} data={item} />
            ))
          ) : (
            <div className="col-span-full">
              <div className="flex items-center justify-center py-20 px-6">
                <div className="text-center max-w-lg">
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-inner">
                      {hasActiveFilters ? (
                        <HiOutlineMagnifyingGlass className="h-16 w-16 text-gray-400" />
                      ) : (
                        <HiOutlineHome className="h-16 w-16 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {hasActiveFilters
                      ? 'No listings found'
                      : 'No listings available'}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    {hasActiveFilters
                      ? "We couldn't find any properties matching your search criteria. Try adjusting your filters or browse all available listings."
                      : 'There are currently no property listings available. Check back soon for new properties or contact us for more information.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {hasActiveFilters ? (
                      <>
                        <Link to="/listings">
                          <Button
                            variant="primary"
                            className="w-full sm:w-auto px-6 py-2.5"
                          >
                            Clear Filters
                          </Button>
                        </Link>
                        <Link to="/">
                          <Button
                            variant="neutral"
                            className="w-full sm:w-auto px-6 py-2.5"
                          >
                            Back to Home
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link to="/">
                        <Button
                          variant="primary"
                          className="w-full sm:w-auto px-6 py-2.5"
                        >
                          Back to Home
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

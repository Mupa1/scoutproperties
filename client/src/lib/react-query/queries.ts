import { useQuery } from '@tanstack/react-query';

import { getListingById, getListings } from '../services/api';

export const useGetListings = (queryParams: Record<string, string>) => {
  return useQuery({
    queryKey: ['listings', queryParams],
    queryFn: getListings,
  });
};

export const useGetListingById = (listingId: string) => {
  return useQuery({
    queryKey: ['listing-details', listingId],
    queryFn: () => getListingById(listingId),
    enabled: !!listingId,
  });
};

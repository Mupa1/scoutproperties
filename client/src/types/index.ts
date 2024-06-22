type ListingsDataType = {
  id: number;
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type ListingsProps = {
  listingsData: ListingsDataType[];
  className?: string;
};

export type ListingProps = {
  listingsData: ListingsDataType;
};

export type SearchFormData = {
  type: string;
  property: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
};

export type ListingDetailsProps = {
  id: number;
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
  school: string;
  bus: string;
  restaurant: string;
  parking: string;
  size: number;
  description: string;
};

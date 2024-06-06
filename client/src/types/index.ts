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
};

export type ListingProps = {
  listingsData: ListingsDataType;
};

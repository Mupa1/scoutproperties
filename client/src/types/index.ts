export type NewUser = {
  name: string;
  email: string;
  company: string;
  password: string;
};

export type User = {
  id: string;
  company: string;
  name: string;
  email: string;
  avatar: string;
  password?: string;
};

export type ErrorType = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type ListingsDataType = {
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
  className?: string;
  listingsData: ListingsDataType[];
  isLoading?: boolean;
  isError?: boolean;
};

export type SearchFormData = {
  type: string;
  property: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedroom: number;
};

interface ListingDetails {
  school?: number;
  bus?: number;
  restaurant?: number;
  parking?: 'Available' | 'Unavailable';
  size?: number;
  description: string;
}

interface UserDetails {
  avatar: string;
  name: string;
  email: string;
  company: string;
}
export interface ListingDetailsProps {
  id: number;
  title: string;
  type: 'Buy' | 'Rent';
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
  listingDetails: ListingDetails;
  user: UserDetails;
}

interface UploadInfo {
  secure_url: string;
}

type CloudinaryEvent = 'success';

interface Event<T extends CloudinaryEvent> {
  info: UploadInfo & { secure_url: string };
  event: T;
}

interface UploadConfigProps {
  cloudName: string;
  uploadPreset: string;
  multiple?: boolean;
  maxImageFileSize?: number;
  folder?: string;
}

export interface UploadWidgetProps {
  uwConfig: UploadConfigProps;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: <T extends CloudinaryEvent>(
        options: UploadConfigProps,
        callback: (error: string, result: Event<T>) => void,
      ) => {
        open: () => void;
      };
    };
  }
}

export interface CreateListingResponse {
  id: string;
}
interface ListingData {
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  type: 'Rent' | 'Buy';
  property: 'Apartment' | 'House' | 'Condo' | 'Land';
}
export interface CreateListingData {
  listingData: ListingData;
  listingDetails: ListingDetails;
}

export type QueryParams = Record<string, string>;

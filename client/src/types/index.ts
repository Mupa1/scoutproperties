export type NewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
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
  setAvatar: (url: string) => void;
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

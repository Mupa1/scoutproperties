import { FC } from 'react';
import {
  FaBath,
  FaBus,
  FaParking,
  FaPencilRuler,
  FaSchool,
} from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { RiMapPinLine } from 'react-icons/ri';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { ListingDetailsProps } from '@/types';

import { Map } from '../../shared/Map';

interface DetailsProps {
  listingDetailsData: ListingDetailsProps;
}

const Amenities: FC<{ icon: JSX.Element; text: string }> = ({ icon, text }) => (
  <span className="listing-amenities flex items-center gap-1">
    {icon}
    {text}
  </span>
);

const GeneralInfo: FC<{ icon: JSX.Element; title: string; info: string }> = ({
  icon,
  title,
  info,
}) => (
  <div className="listing-amenities flex items-center gap-1">
    {icon}
    <span>
      <p className="font-bold -mb-3">{title}</p>
      <p>{info}</p>
    </span>
  </div>
);

export const Details: FC<DetailsProps> = ({ listingDetailsData }) => {
  const {
    price,
    title,
    address,
    bedroom,
    bathroom,
    parking,
    description,
    size,
    school,
    restaurant,
    bus,
  } = listingDetailsData;

  return (
    <div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        <div className="grid col-span-3 lg:col-span-3 gap-2">
          <div className="flex-between">
            <h3>{title}</h3>
            <h3 className="text-2xl">{price} €</h3>
          </div>
          <div className="flex items-center gap-1">
            <RiMapPinLine />
            <p className="text-sm text-gray-500 truncate hover:text-clip">
              {address}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center font-bold text-sm gap-1 text-gray-500">
            <Amenities
              icon={<IoIosBed size={16} />}
              text={`${bedroom} Bedroom(s)`}
            />
            <Amenities icon={<FaBath />} text={`${bathroom} Bathroom(s)`} />
            <Amenities icon={<FaParking />} text={parking} />
            <Amenities icon={<FaPencilRuler />} text={`${size} sqm`} />
          </div>
          <h2 className="rounded-md">
            <span className="rounded-md font-bold bg-secondary-500 text-white inline-block py-1 px-3">
              For Rent
            </span>
          </h2>
          <h3 className="pt-3">General Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center font-bold text-sm gap-1 text-gray-500">
            <GeneralInfo icon={<FaSchool />} title="School" info={school} />
            <GeneralInfo icon={<FaBus />} title="Bus" info={bus} />
            <GeneralInfo
              icon={<IoRestaurant />}
              title="Restaurant"
              info={restaurant}
            />
          </div>
          <p>{description}</p>
          <div className="h-300px">
            <Map listingsData={[listingDetailsData]} className="h-32" />
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <h3>Contact Agent</h3>
          <form>
            <Textarea placeholder="Enter your message..." id="message" />
            <Button type="submit" variant="primary" className="mt-3 ml-auto">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

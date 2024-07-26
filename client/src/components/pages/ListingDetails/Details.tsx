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
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { ListingDetailsProps } from '@/types';

import { Map } from '../../shared/Map';
interface DetailsProps {
  data: ListingDetailsProps;
}

const Amenities: FC<{ icon: JSX.Element; text: string }> = ({ icon, text }) => (
  <span className="listing-amenities flex items-center gap-1">
    {icon}
    {text}
  </span>
);

const GeneralInfo: FC<{ icon: JSX.Element; title: string; info: number }> = ({
  icon,
  title,
  info,
}) => (
  <div className="listing-amenities flex items-center gap-1">
    {icon}
    <span>
      <p className="font-bold -mb-3">{title}</p>
      <p>{info > 999 ? (info / 1000).toFixed(1) + 'km' : info + 'm'} away</p>
    </span>
  </div>
);

export const Details: FC<DetailsProps> = ({ data }) => {
  const { price, title, type, address, bedroom, bathroom, user } = data;

  const { parking, description, size, school, restaurant, bus } =
    data.listingDetails;

  return (
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
          <Amenities icon={<FaParking />} text={parking || ''} />
          <Amenities icon={<FaPencilRuler />} text={`${size || ''} sqm`} />
        </div>
        <h2 className="rounded-md">
          <span className="rounded-md font-bold bg-gray-500 text-white inline-block py-1 px-3">
            {type}
          </span>
        </h2>
        <h3 className="pt-3">General Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center font-bold text-sm gap-1 text-gray-500">
          {school && (
            <GeneralInfo icon={<FaSchool />} title="School" info={school} />
          )}

          {bus && <GeneralInfo icon={<FaBus />} title="Bus" info={bus} />}

          {restaurant && (
            <GeneralInfo
              icon={<IoRestaurant />}
              title="Restaurant"
              info={restaurant}
            />
          )}
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></p>
        <div className="h-300px">
          <Map listingsData={[data]} className="h-32" />
        </div>
      </div>
      <div className="col-span-3 lg:col-span-2 flex flex-col items-center">
        <div className="flex-center flex-col">
          <img
            src={user.avatar ? user.avatar : '/user-placeholder.svg'}
            alt="profile"
            className="h-24 w-24 rounded-full"
          />
          <p>{user.name}</p>
        </div>
        {user.company ?? <p>{user.company}</p>}
        <Link className="link mt-3 w-full" to={`mailto:${user.email}`}>
          Send Message
        </Link>
      </div>
    </div>
  );
};

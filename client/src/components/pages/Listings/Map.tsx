import { FC } from 'react';
import { LuBath } from 'react-icons/lu';
import { LuDot } from 'react-icons/lu';
import { MdOutlineBed } from 'react-icons/md';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import imagePlaceholder from '@/assets/image-placeholder.svg';
import { ListingProps, ListingsProps } from '@/types';

const MapMarker: FC<ListingProps> = ({ listingsData }) => {
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const { id, bedroom, bathroom, latitude, longitude, images, title, price } =
    listingsData;
  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        <div className="flex-3 bg-primary-50 group-hover:opacity-75">
          <img
            src={images[0] || imagePlaceholder}
            alt={title}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <>
          <Link
            className="hover:underline text-xs"
            to={`/listing-details/${id}`}
          >
            {title}
          </Link>
          <p className="flex items-center font-bold text-xs -pt-4 text-gray-500">
            <span className="listing-amenities">
              {bedroom}
              <MdOutlineBed />
            </span>
            <LuDot />
            <span className="listing-amenities">
              {bathroom}
              <LuBath />
            </span>
          </p>
          <b className="text-lg font-bold text-gray-900">{price} €</b>
        </>
      </Popup>
    </Marker>
  );
};

export const Map: FC<ListingsProps> = ({ listingsData }) => {
  const position: LatLngExpression = [49.5200765, 8.524684];
  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={false}
      className="z-10 w-full map rounded-md overflow-hidden"
      style={{ height: 'calc(100vh - 161px)' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listingsData.map((item) => (
        <MapMarker key={item.id} listingsData={item} />
      ))}
    </MapContainer>
  );
};

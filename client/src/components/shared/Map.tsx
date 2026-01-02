import { FC, useEffect, useMemo, useRef } from 'react';
import { FaBath } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import { LuDot } from 'react-icons/lu';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import imagePlaceholder from '@/assets/image-placeholder.svg';
import { ListingsDataType, ListingsProps } from '@/types';

// Component to handle map resize when container dimensions change
const MapResizeHandler: FC = () => {
  const map = useMap();

  useEffect(() => {
    // Trigger map resize after a short delay to ensure container is sized
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

interface MapProps {
  listingsData: ListingsDataType;
}

const MapMarker: FC<MapProps> = ({ listingsData }) => {
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
          <Link className="hover:underline text-xs" to={`/listings/${id}`}>
            {title}
          </Link>
          <p className="flex items-center font-bold text-xs -pt-4 text-gray-500">
            <span className="listing-amenities">
              {bedroom}
              <IoIosBed size={16} />
            </span>
            <LuDot />
            <span className="listing-amenities">
              {bathroom}
              <FaBath />
            </span>
          </p>
          <b className="text-lg font-bold text-gray-900">{price} €</b>
        </>
      </Popup>
    </Marker>
  );
};

export const Map: FC<ListingsProps> = ({ listingsData, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a completely stable key that doesn't change on re-renders
  // This prevents React 19 StrictMode from causing double initialization
  const mapKeyRef = useRef<string>(`map-${Date.now()}-${Math.random()}`);

  const position: LatLngExpression = useMemo(
    () =>
      listingsData && listingsData.length === 1
        ? [listingsData[0].latitude, listingsData[0].longitude]
        : [49.5200765, 8.524684], // Default center (Mannheim area)
    [listingsData],
  );

  // Force map resize when container is ready
  useEffect(() => {
    if (containerRef.current) {
      // Small delay to ensure container has dimensions
      const timer = setTimeout(() => {
        // Trigger window resize event to force Leaflet to recalculate
        window.dispatchEvent(new Event('resize'));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full map-container-wrapper"
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        minHeight: '400px',
      }}
    >
      <MapContainer
        key={mapKeyRef.current}
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        className={clsx(className, 'z-10')}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listingsData && listingsData.length > 0
          ? listingsData.map((item) => (
              <MapMarker key={item.id} listingsData={item} />
            ))
          : null}
      </MapContainer>
    </div>
  );
};

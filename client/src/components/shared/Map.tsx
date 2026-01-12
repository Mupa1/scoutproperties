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

import { getValidImages } from '@/lib/images';
import { ListingsDataType, ListingsProps } from '@/types';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage available soon%3C/text%3E%3C/svg%3E';

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

// Component to automatically fit bounds to show all markers
interface FitBoundsHandlerProps {
  listingsData: ListingsDataType[];
}

const FitBoundsHandler: FC<FitBoundsHandlerProps> = ({ listingsData }) => {
  const map = useMap();

  useEffect(() => {
    if (!listingsData || listingsData.length === 0) {
      return;
    }

    // Convert latitude/longitude to numbers (they might come as strings from API)
    const validListings = listingsData.filter(
      (listing) =>
        listing.latitude != null &&
        listing.longitude != null &&
        !isNaN(Number(listing.latitude)) &&
        !isNaN(Number(listing.longitude)),
    );

    if (validListings.length === 0) {
      return;
    }

    // If there's only one listing, center on it with appropriate zoom
    if (validListings.length === 1) {
      const listing = validListings[0];
      const lat = Number(listing.latitude);
      const lng = Number(listing.longitude);
      map.setView([lat, lng], 13, {
        animate: true,
        duration: 0.5,
      });
      return;
    }

    // If there are multiple listings, fit bounds to show all markers
    if (validListings.length > 1) {
      const bounds = validListings.map((listing) => [
        Number(listing.latitude),
        Number(listing.longitude),
      ] as [number, number]);

      // Add padding to the bounds for better visibility
      map.fitBounds(bounds, {
        padding: [50, 50],
        animate: true,
        duration: 0.5,
        maxZoom: 15, // Don't zoom in too much
      });
    }
  }, [map, listingsData]);

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
  const lat = Number(latitude);
  const lng = Number(longitude);
  const validImages = getValidImages(images);
  const imageSrc = validImages[0] || PLACEHOLDER_IMAGE;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className="flex-3 bg-primary-50 group-hover:opacity-75">
          <img
            src={imageSrc}
            alt={title}
            onError={handleError}
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
    () => {
      // If we have listings, use the first one as initial center
      // The FitBoundsHandler will adjust the view appropriately
      if (listingsData && listingsData.length > 0) {
        const lat = Number(listingsData[0].latitude);
        const lng = Number(listingsData[0].longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          return [lat, lng];
        }
      }
      // Default center (Mannheim area) when no listings
      return [49.5200765, 8.524684];
    },
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
        zoom={listingsData && listingsData.length > 0 ? 13 : 7}
        scrollWheelZoom={false}
        className={clsx(className, 'z-10')}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <MapResizeHandler />
        <FitBoundsHandler listingsData={listingsData || []} />
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

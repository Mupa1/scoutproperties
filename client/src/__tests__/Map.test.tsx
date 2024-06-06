import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import 'leaflet/dist/leaflet.css';

import Map from '@/components/pages/Listings/Map';
import { ListingsProps } from '@/types';

const listingsData: ListingsProps['listingsData'] = [
  {
    id: 1,
    title: 'Test Listing 1',
    images: [],
    bedroom: 2,
    bathroom: 1,
    price: 100000,
    address: 'Address 1',
    latitude: 49.52,
    longitude: 8.5246,
  },
  {
    id: 2,
    title: 'Test Listing 2',
    images: ['image-url'],
    bedroom: 3,
    bathroom: 2,
    price: 150000,
    address: 'Address 2',
    latitude: 49.53,
    longitude: 8.5346,
  },
];

vi.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }: PropsWithChildren) => (
      <div data-testid="map-container">{children}</div>
    ),
    Marker: ({ children }: PropsWithChildren) => (
      <div data-testid="marker">{children}</div>
    ),
    Popup: ({ children }: PropsWithChildren) => (
      <div data-testid="popup">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
  };
});

vi.mock('leaflet', () => ({
  Icon: () => ({}),
}));

const renderer = () =>
  render(
    <MemoryRouter>
      <Map listingsData={listingsData} />
    </MemoryRouter>,
  );

describe('Map Component', () => {
  test('renders the map container', () => {
    renderer();
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  test('renders the correct number of markers', () => {
    renderer();

    expect(screen.getAllByTestId('marker')).toHaveLength(listingsData.length);
  });

  test('renders popup content correctly for each marker', () => {
    renderer();

    listingsData.forEach((listing) => {
      expect(screen.getByText(listing.title)).toBeInTheDocument();
      expect(screen.getByText(`${listing.price} €`)).toBeInTheDocument();
      expect(screen.getAllByText(`${listing.bedroom}`)[0]).toBeInTheDocument();
      expect(screen.getAllByText(`${listing.bathroom}`)[0]).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Details } from '@/components/pages/ListingDetails/Details';

export const mockListingDetailsData = {
  id: 1,
  title: 'Apartment',
  price: 1200,
  images: ['image1', 'image2', 'image3', 'image4', 'image5'],
  bedroom: 2,
  bathroom: 1,
  size: 961,
  latitude: 49.52,
  longitude: 8.5246,
  city: 'Mannheim',
  address: 'Thomas 47, Mannheim',
  school: '200m away',
  parking: 'Parking available',
  bus: '90m away',
  restaurant: '50m away',
  description:
    'Integer finibus felis vel diam bibendum fermentum. Nunc sollicitudin mi est, ac venenatis neque iaculis a. Integer tincidunt rhoncus mi vitae gravida. Duis ut est finibus, semper turpis vitae, elementum ex. Nulla lacinia porttitor auctor. Praesent ut tellus porttitor, finibus tortor iaculis, lacinia metus. Nulla in feugiat felis. Sed porttitor dignissim lorem ut faucibus. Etiam ornare augue ante, eu tincidunt nunc hendrerit at. Etiam sit amet erat dapibus, varius dui a, consequat mi.',
};

describe('Details Component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Details listingDetailsData={mockListingDetailsData} />,
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('1200 €')).toBeInTheDocument();
    expect(screen.getByText('Thomas 47, Mannheim')).toBeInTheDocument();
    expect(screen.getByText('2 Bedroom(s)')).toBeInTheDocument();
    expect(screen.getByText('1 Bathroom(s)')).toBeInTheDocument();
    expect(screen.getByText('Parking available')).toBeInTheDocument();
    expect(screen.getByText('961 sqm')).toBeInTheDocument();
    expect(screen.getByText('For Rent')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
    expect(screen.getByText('200m away')).toBeInTheDocument();
    expect(screen.getByText('Bus')).toBeInTheDocument();
    expect(screen.getByText('90m away')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('50m away')).toBeInTheDocument();
    expect(
      screen.getByText(/Integer finibus felis vel diam bibendum fermentum/),
    ).toBeInTheDocument();
  });
});

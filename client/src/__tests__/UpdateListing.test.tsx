import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { useUpdateListing } from '@/lib/react-query/mutations';
import { useGetListingById } from '@/lib/react-query/queries';
import { UpdateListing } from '@/pages/protected/UpdateListing';
import { QueryProvider } from '@/providers/QueryProvider';
import { UploadWidgetProps } from '@/types';

vi.mock('@/lib/react-query/mutations');
vi.mock('@/lib/react-query/queries');
vi.mock('@/components/shared/UploadWidget', () => ({
  __esModule: true,
  default: ({ setState }: UploadWidgetProps) => (
    <button onClick={() => setState(['image 1', 'image 2'])}>
      Upload Image
    </button>
  ),
}));

vi.mock('react-quill', () => {
  return {
    __esModule: true,
    default: React.forwardRef(
      (
        {
          value,
          onChange,
        }: { value: string; onChange: (value: string) => void },
        ref: React.Ref<HTMLTextAreaElement>,
      ) => (
        <textarea
          ref={ref}
          aria-label="Description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    ),
  };
});

describe('UpdateListing Component', () => {
  const mockUpdateListing = vi.fn();

  const listing = {
    id: '1',
    title: 'Test Listing',
    images: ['image 1', 'image 2'],
    bedroom: 3,
    bathroom: 2,
    price: 1000,
    address: '123 Test St',
    city: 'Test City',
    latitude: '40.7128',
    longitude: '-74.0060',
    type: 'Rent',
    property: 'Apartment',
    listingDetails: {
      description: 'Test description',
      parking: 'Available',
      size: 1200,
      school: 500,
      bus: 200,
      restaurant: 100,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useUpdateListing as Mock).mockReturnValue({
      mutateAsync: mockUpdateListing,
      isPending: false,
    });

    (useGetListingById as Mock).mockReturnValue({
      data: listing,
      isLoading: false,
    });
  });

  const renderer = () =>
    render(
      <MemoryRouter initialEntries={['/listings/edit/1']}>
        <QueryProvider>
          <Routes>
            <Route path="/listings/edit/:id" element={<UpdateListing />} />
          </Routes>
        </QueryProvider>
      </MemoryRouter>,
    );

  test('renders the UpdateListing component correctly', () => {
    renderer();

    expect(
      screen.getByRole('heading', { name: /update listing/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedroom Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bathroom Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Parking/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Total Size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/School/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bus/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Restaurant/i)).toBeInTheDocument();
  });

  test('submits the form with correct data', async () => {
    renderer();

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Updated Listing' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: 1200 },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: '123 Updated St' },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'Updated City' },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Updated description' },
    });

    fireEvent.change(screen.getByLabelText(/Bedroom Number/i), {
      target: { value: 4 },
    });
    fireEvent.change(screen.getByLabelText(/Bathroom Number/i), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText(/Latitude/i), {
      target: { value: '41.7128' },
    });
    fireEvent.change(screen.getByLabelText(/Longitude/i), {
      target: { value: '-75.0060' },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: 'Buy' },
    });
    fireEvent.change(screen.getByLabelText(/Property/i), {
      target: { value: 'House' },
    });
    fireEvent.change(screen.getByLabelText(/Parking/i), {
      target: { value: 'Unavailable' },
    });
    fireEvent.change(screen.getByLabelText(/Total Size/i), {
      target: { value: 1500 },
    });
    fireEvent.change(screen.getByLabelText(/School/i), {
      target: { value: 600 },
    });
    fireEvent.change(screen.getByLabelText(/Bus/i), {
      target: { value: 300 },
    });
    fireEvent.change(screen.getByLabelText(/Restaurant/i), {
      target: { value: 200 },
    });

    fireEvent.click(screen.getByText('Upload Image'));

    fireEvent.submit(screen.getByRole('button', { name: /update listing/i }));

    await waitFor(() => {
      expect(mockUpdateListing).toHaveBeenCalledWith({
        id: '1',
        data: {
          listingData: {
            title: 'Updated Listing',
            images: ['image 1', 'image 2'],
            bedroom: 4,
            bathroom: 3,
            price: 1200,
            address: '123 Updated St',
            city: 'Updated City',
            latitude: '41.7128',
            longitude: '-75.0060',
            type: 'Buy',
            property: 'House',
          },
          listingDetails: {
            description: 'Updated description',
            parking: 'Unavailable',
            size: 1500,
            school: 600,
            bus: 300,
            restaurant: 200,
          },
        },
      });
    });
  });

  test('shows loader when the form is being submitted', async () => {
    (useUpdateListing as Mock).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    });

    renderer();

    fireEvent.submit(screen.getByTestId('update-listing-btn'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

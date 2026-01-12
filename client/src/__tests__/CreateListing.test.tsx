import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { useCreateListing } from '@/lib/react-query/mutations';
import { CreateListing } from '@/pages/protected/CreateListing';
import { QueryProvider } from '@/providers/QueryProvider';
import { UploadWidgetProps } from '@/types';

vi.mock('@/lib/react-query/mutations');
vi.mock('@/components/shared/UploadWidget', () => ({
  __esModule: true,
  default: ({ setState }: UploadWidgetProps) => (
    <button onClick={() => setState(['image 1', 'image 2'])}>
      Upload Image
    </button>
  ),
}));

vi.mock('@/components/shared/RichTextEditor', () => ({
  RichTextEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <textarea
      aria-label="Description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('CreateListing Component', () => {
  const mockCreateListing = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useCreateListing as Mock).mockReturnValue({
      mutateAsync: mockCreateListing,
      isPending: false,
    });
  });

  const renderer = () =>
    render(
      <MemoryRouter>
        <QueryProvider>
          <CreateListing />
        </QueryProvider>
      </MemoryRouter>,
    );

  test('renders the CreateListing component correctly', () => {
    renderer();

    expect(
      screen.getByRole('heading', { name: /add new post/i }),
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
      target: { value: 'Test Listing' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: 1000 },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: '123 Test St' },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'Test City' },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test description' },
    });

    fireEvent.change(screen.getByLabelText(/Bedroom Number/i), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText(/Bathroom Number/i), {
      target: { value: 2 },
    });
    fireEvent.change(screen.getByLabelText(/Latitude/i), {
      target: { value: '40.7128' },
    });
    fireEvent.change(screen.getByLabelText(/Longitude/i), {
      target: { value: '-74.0060' },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: 'Rent' },
    });
    fireEvent.change(screen.getByLabelText(/Property/i), {
      target: { value: 'Apartment' },
    });
    fireEvent.change(screen.getByLabelText(/Parking/i), {
      target: { value: 'Available' },
    });
    fireEvent.change(screen.getByLabelText(/Total Size/i), {
      target: { value: 1200 },
    });
    fireEvent.change(screen.getByLabelText(/School/i), {
      target: { value: 500 },
    });
    fireEvent.change(screen.getByLabelText(/Bus/i), {
      target: { value: 200 },
    });
    fireEvent.change(screen.getByLabelText(/Restaurant/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByText('Upload Image'));

    fireEvent.submit(screen.getByRole('button', { name: /create listing/i }));

    await waitFor(() => {
      expect(mockCreateListing).toHaveBeenCalledWith({
        listingData: {
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
        },
        listingDetails: {
          description: 'Test description',
          parking: 'Available',
          size: 1200,
          school: 500,
          bus: 200,
          restaurant: 100,
        },
      });
    });
  });

  test('shows loader when the form is being submitted', async () => {
    (useCreateListing as Mock).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    });

    renderer();

    fireEvent.submit(screen.getByTestId('create-listing-btn'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ListingImages } from '@/components/pages/ListingDetails/ListingImages/ListingImages';

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
];

describe('ListingImages', () => {
  test('renders ImageGrid correctly', () => {
    render(<ListingImages images={images} listingTitle="Test Listing" />);

    // Mobile and desktop layouts both render, so we get double the images
    const imageElements = screen.getAllByTestId(/image-\d+/);
    expect(imageElements.length).toBeGreaterThanOrEqual(images.length);
  });

  test('opens and closes ImageSlider on image click', async () => {
    render(<ListingImages images={images} listingTitle="Test Listing" />);

    // Use getAllByTestId since both mobile and desktop layouts render
    const imageElements = screen.getAllByTestId('image-0');
    fireEvent.click(imageElements[0]);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /Close image view/i });
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

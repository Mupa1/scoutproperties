import { fireEvent, render, screen } from '@testing-library/react';
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
    render(<ListingImages images={images} />);

    const imageElements = screen.getAllByTestId(/image-\d+/);
    expect(imageElements.length).toBe(images.length);
  });

  test('opens and closes ImageSlider on image click', () => {
    render(<ListingImages images={images} />);

    fireEvent.click(screen.getByTestId('image-0'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Close image view/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

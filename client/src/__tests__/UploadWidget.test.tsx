import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import UploadWidget from '@/components/shared/UploadWidget';
import { UploadWidgetProps } from '@/types';

const mockSetAvatar = vi.fn();

const defaultProps: UploadWidgetProps = {
  uwConfig: {
    cloudName: 'cloudinary-images-platform',
    uploadPreset: 'scout-properties',
    multiple: false,
    maxImageFileSize: 2000000,
    folder: 'avatars',
  },
  setAvatar: mockSetAvatar,
};

const renderer = (props = defaultProps) =>
  render(<UploadWidget {...props} />);

describe('UploadWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('adds the Cloudinary script to the document on mount', () => {
    renderer();
    expect(document.getElementById('uw')).toBeInTheDocument();
  });

  test('sets loaded state to true when script is already in the document', () => {
    const script = document.createElement('script');
    script.setAttribute('id', 'uw');
    document.body.appendChild(script);

    renderer();

    expect(screen.getByText(/Change Photo/i)).toBeInTheDocument();
  });

  test('opens the upload widget when the button is clicked', async () => {
    window.cloudinary = {
      createUploadWidget: vi.fn().mockImplementation((_, callback) => {
        return {
          open: vi.fn().mockImplementation(() => {
            callback(null, {
              event: 'success',
              info: { secure_url: 'http://example.com/image.jpg' },
            });
          }),
        };
      }),
    };

    renderer();

    fireEvent.click(screen.getByText(/Change Photo/i));

    await waitFor(() => {
      expect(mockSetAvatar).toHaveBeenCalledWith(
        'http://example.com/image.jpg',
      );
    });
  });

  test('handles upload widget error correctly', async () => {
    window.cloudinary = {
      createUploadWidget: vi.fn().mockImplementation((_, callback) => {
        return {
          open: vi.fn().mockImplementation(() => {
            callback('Upload Widget Error', null);
          }),
        };
      }),
    };

    renderer();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(screen.getByText(/Change Photo/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Error initializing upload widget. Please check your configuration.',
      );
    });
  });
});

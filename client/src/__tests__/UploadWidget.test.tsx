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
  setState: mockSetAvatar,
};

const renderer = (props = defaultProps) => render(<UploadWidget {...props} />);

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

    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
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

    fireEvent.click(screen.getByText(/Upload Image/i));

    await waitFor(() => {
      expect(mockSetAvatar).toHaveBeenCalledWith(expect.any(Function));

      const stateUpdateFn = mockSetAvatar.mock.calls[0][0];
      const prevState: string[] = [];
      const newState = stateUpdateFn(prevState);
      expect(newState).toContain('http://example.com/image.jpg');
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

    fireEvent.click(screen.getByText(/Upload Image/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Error initializing upload widget. Please check your configuration.',
      );
    });
  });
});

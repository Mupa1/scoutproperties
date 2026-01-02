import { FC, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

import { ImageGrid } from './ImageGrid';
import { ImageSlider } from './ImageSlider';

export const ListingImages: FC<{ images: string[] }> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="listing-image-wrapper h-[400px] sm:h-[500px] md:h-[600px] relative">
      <ImageGrid images={images} onClick={handleImageClick} />

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-7xl mx-auto bg-white px-4 pb-20 md:px-10 lg:pb-20">
            <ImageSlider images={images} onClose={handleClose} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

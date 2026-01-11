import { FC, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import { ImageGrid } from './ImageGrid';
import { ImageSlider } from './ImageSlider';

export const ListingImages: FC<{
  images: string[];
  listingTitle: string;
}> = ({ images, listingTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Aspect ratio wrapper */}
      <div className="aspect-[16/9] sm:aspect-[4/3] lg:aspect-[3/2] rounded-lg overflow-hidden">
        <ImageGrid
          images={images}
          listingTitle={listingTitle}
          onOpen={() => setIsOpen(true)}
        />
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-7xl bg-white rounded-lg shadow-xl">
            <DialogTitle className="sr-only">
              Images of {listingTitle}
            </DialogTitle>

            <ImageSlider
              images={images}
              listingTitle={listingTitle}
              onClose={() => setIsOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

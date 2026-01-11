import { FC } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getValidImages } from '@/lib/images';
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ImageSlider: FC<{
  images: string[];
  listingTitle: string;
  onClose: () => void;
}> = ({ images, listingTitle, onClose }) => {
  const validImages = getValidImages(images);
  return (
    <div className="relative">
      <button
        onClick={onClose}
        aria-label="Close image view"
        className="absolute right-4 top-4 z-10 bg-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <IoCloseSharp size={20} />
        <span className="sr-only">Close image view</span>
      </button>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        spaceBetween={24}
        autoplay={prefersReducedMotion ? false : { delay: 3000 }}
        className="h-[80vh]"
      >
        {validImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`${listingTitle} – image ${i + 1} of ${validImages.length}`}
              className="w-full h-full object-contain bg-black"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

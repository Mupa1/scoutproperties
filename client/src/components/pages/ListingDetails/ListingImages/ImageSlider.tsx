import { FC } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { HashNavigation, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Button } from '@/components/ui/Button';

export const ImageSlider: FC<{ images: string[]; onClose: () => void }> = ({
  images,
  onClose,
}) => (
  <div className="h-80vh">
    <Button
      variant="neutral"
      onClick={onClose}
      className="flex-1 border-0 px-0 ml-auto"
    >
      <IoCloseSharp size={20} title="Close image view" />
    </Button>

    <Swiper
      spaceBetween={30}
      hashNavigation={{ watchState: true }}
      centeredSlides
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Pagination, Navigation, HashNavigation]}
      className="mySwiper z-20 h-80vh shadow-2xl absolute top-0 left-0"
    >
      {images.map((img, index) => (
        <SwiperSlide
          key={index}
          data-hash={`slide${index + 1}`}
          data-testid={`image-slide${index}`}
        >
          <img
            className="object-cover block w-full h-full rounded-md"
            src={img}
            alt={`Slider Image ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

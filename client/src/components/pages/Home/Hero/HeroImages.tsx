import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const HeroImages = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-screen z-20 bg-white"
    >
      <SwiperSlide>
        <img
          className="swiper-slide"
          src="https://res.cloudinary.com/cloudinary-images-platform/image/upload/v1717910933/scout-properties-images/hero2_2400_xwltnu.jpg"
          alt="Hero Image 2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="swiper-slide"
          src="https://res.cloudinary.com/cloudinary-images-platform/image/upload/v1717881721/scout-properties-images/hero_2400_f5v7bz.jpg"
          alt="Hero Image 1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="swiper-slide"
          src="https://res.cloudinary.com/cloudinary-images-platform/image/upload/v1717910531/scout-properties-images/hero3_2400_ecxif7.jpg"
          alt="Hero Image 3"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="swiper-slide"
          src="https://res.cloudinary.com/cloudinary-images-platform/image/upload/v1717910766/scout-properties-images/hero4_2400_ugnbqp.jpg"
          alt="Hero Image 4"
        />
      </SwiperSlide>
    </Swiper>
  );
};

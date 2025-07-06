import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type CarouselProps = {
    images: {
        yellow: string;
        white: string;
        rose: string;
    };
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
            className="product-carousel"
        >
            <SwiperSlide>
                <img src={images.yellow} alt="Yellow Gold" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.white} alt="White Gold" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.rose} alt="Rose Gold" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Carousel;

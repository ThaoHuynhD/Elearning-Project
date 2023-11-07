import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
let sliderImg = [
    {
        src: "./image/slider/slider_1.png",
    },
    {
        src: "./image/slider/slider_2.png",
    },
    {
        src: "./image/slider/slider_3.png",
    },
    {
        src: "./image/slider/slider_4.png",
    },
    {
        src: "./image/slider/slider_5.png",
    },
    {
        src: "./image/slider/slider_2.png",
    },
    {
        src: "./image/slider/slider_4.png",
    },
];
export default function Slider() {
    let renderSliderItem = () => {
        return sliderImg.map((item, index) => {
            return (
                <SwiperSlide key={`item-${index}`}>
                    <img src={item.src} alt='...' width={100} />
                </SwiperSlide>
            );
        });
    };
    return (
        <section className='slider bg-[#f8f8f8]'>
            <div className='container p-6'>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className='mySwiper'
                >
                    {renderSliderItem()}
                </Swiper>
            </div>
        </section>
    );
}
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const HomeSlider = (props) => {
    return (
        <>
            <div className='homeSlider py-4'>
                <div className='container'>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        className="sliderHome"
                    >
                        {
                            props?.data?.length !== 0 && props?.data?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='item rounded-[20px] overflow-hidden'>
                                            <img src={item?.images[0]}
                                                alt="Banner slide" className='w-full' />
                                        </div>
                                    </SwiperSlide>);
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default HomeSlider;
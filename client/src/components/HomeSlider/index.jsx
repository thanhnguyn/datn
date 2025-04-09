import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const HomeSlider = () => {
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
                        className="sliderHome">
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src="https://serviceapi.spicezgold.com/download/1741660942872_NewProject(6).jpg"
                                    alt="Banner slide" className='w-full' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src="https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg"
                                    alt="Banner slide" className='w-full' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg"
                                    alt="Banner slide" className='w-full' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src="https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg"
                                    alt="Banner slide" className='w-full' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src="https://serviceapi.spicezgold.com/download/1741660777364_NewProject(12).jpg"
                                    alt="Banner slide" className='w-full' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default HomeSlider;
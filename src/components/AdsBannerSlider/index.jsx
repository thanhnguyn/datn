import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';

const AdsBannerSlider = (props) => {
    return (
        <div className='py-5 w-full'>
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="smlBtn"
            >
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg'}
                        link={"/"} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default AdsBannerSlider;
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import BannerBoxV2 from '../bannerBoxV2';

const AdsBannerSliderV2 = (props) => {
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
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
                        link={"/"} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default AdsBannerSliderV2;
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../bannerBoxV2';

const AdsBannerSliderV2 = (props) => {
    return (
        // <div className='py-5 w-full'>
        //     <Swiper
        //         slidesPerView={props.items}
        //         spaceBetween={10}
        //         navigation={true}
        //         modules={[Navigation]}
        //         className="smlBtn"
        //     >
        //         {
        //             props?.data?.map((item, index) => {
        //                 return (
        //                     <SwiperSlide key={index}>
        //                         <BannerBoxV2 info={item?.alignInfo} item={item} image={item?.images[0]} link={"/"} />
        //                     </SwiperSlide>
        //                 );
        //             })
        //         }
        //     </Swiper>
        // </div>
        <></>
    )
}

export default AdsBannerSliderV2;
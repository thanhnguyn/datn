import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';

const HomeCatSlider = () => {
    return (
        <>
            <div className='homeCatSlider pt-4 py-8'>
                <div className='container'>
                    <Swiper
                        slidesPerView={8}
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center 
                            justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741660962379_fash.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Fashion</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Electronics</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center 
                            justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Bags</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png" className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Footwear</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png" className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Groceries</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png" className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Beauty</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center 
                            justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661105893_well.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Wellness</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to='/'>
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center 
                            justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Jewellery</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
export default HomeCatSlider;
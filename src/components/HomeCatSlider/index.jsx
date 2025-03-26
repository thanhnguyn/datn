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
            <div className='homeCatSlider'>
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
                                <div className='item py-7 px-3 bg-white rounded-sm text-center flex items-center 
                            justify-center flex-col'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741660962379_fash.png"
                                        className='w-[60px] transition-all' />
                                    <h3 className='text-[15px] font-[500] mt-3'>Fashion</h3>
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
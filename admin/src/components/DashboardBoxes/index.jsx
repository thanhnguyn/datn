import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiPieChart } from "react-icons/fi";
import { IoStatsChartSharp } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { RiProductHuntLine } from 'react-icons/ri';
import { Navigation } from 'swiper/modules';
import { PiGift } from "react-icons/pi";

const DashboardBoxes = (props) => {
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="dashboardBoxesSlider"
            >
                <SwiperSlide>
                    <div className='box bg-[#10b981] p-5 py-6 cursor-pointer hover:bg-[#289974] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <FiPieChart className='text-[50px] text-[#fff]' />
                        <div className='info w-[70%]'>
                            <h3 className='text-white'>Total users</h3>
                            <b className='text-white text-[20px]'>{props?.users}</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box bg-[#32a0fa] p-5 py-6 cursor-pointer hover:bg-[#317ebd] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <PiGift className='text-[50px] text-[#fff]' />
                        <div className='info w-[70%]'>
                            <h3 className='text-white'>Total orders</h3>
                            <b className='text-white text-[20px]'>{props?.orders}</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box bg-[#9217fd] p-5 py-6 cursor-pointer hover:bg-[#752fb1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <RiProductHuntLine className='text-[50px] text-[#fff]' />
                        <div className='info w-[70%]'>
                            <h3 className='text-white'>Total products</h3>
                            <b className='text-white text-[20px]'>{props?.products}</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box bg-[#fa1750] p-5 py-6 cursor-pointer hover:bg-[#b72e50] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <BiCategory className='text-[50px] text-[#fff]' />
                        <div className='info w-[70%]'>
                            <h3 className='text-white text-[15px]'>Total categories</h3>
                            <b className='text-white text-[20px]'>{props?.category}</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]' />
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    )
}
export default DashboardBoxes;
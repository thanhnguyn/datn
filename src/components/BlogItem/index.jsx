import React from 'react'
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = () => {
    return (
        <div className='blogItem group'>
            <div className='imgWrapper w-full overflow-hidde rounded-md cursor-pointer relative'>
                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/lg-b-blog-7.jpg" className='w-full transition-all group-hover:scale-105 group-hover:rotate-1' alt="blog image" />
                <span className='flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[12px] font-[600]'>
                    <IoMdTime className='text-[16px]' /> 5 APRIL, 2023
                </span>
            </div>
            <div className='info py-4'>
                <h2 className='text-[15px] font-[600] text-black'>
                    <Link to="/" className='link'>
                        Lorem ispum
                    </Link>
                </h2>
                <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4'>Lorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispumLorem ispupumLorem ispumLorem ispumLorem ispum</p>
                <Link className='link font-[500] text-[14px] flex items-center gap-1'>Read more <IoIosArrowForward /></Link>
            </div>
        </div>
    )
}
export default BlogItem;
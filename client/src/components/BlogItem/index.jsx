import React from 'react'
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = (props) => {
    return (
        <div className='blogItem group'>
            <div className='imgWrapper w-full overflow-hidde rounded-md cursor-pointer relative'>
                <img src={props?.item?.images[0]} className='w-full transition-all group-hover:scale-105 group-hover:rotate-1' alt="blog image" />
                <span className='flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[12px] font-[600]'>
                    <IoMdTime className='text-[16px]' /> {props?.item?.createdAt?.split('T')[0]}
                </span>
            </div>
            <div className='info py-4'>
                <h2 className='text-[15px] font-[600] text-black'>
                    <Link to="/" className='link'>
                        <div dangerouslySetInnerHTML={{ __html: props?.item?.title?.length > 50 ? props?.item?.title?.substr(0, 50) + '...' : props?.item?.title }} />
                    </Link>
                </h2>
                <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4'>
                    <div dangerouslySetInnerHTML={{ __html: props?.item?.description?.length > 150 ? props?.item?.description?.substr(0, 150) + '...' : props?.item?.description }} />
                </p>
                <Link className='link font-[500] text-[14px] flex items-center gap-1'>Read more <IoIosArrowForward /></Link>
            </div>
        </div>
    )
}
export default BlogItem;
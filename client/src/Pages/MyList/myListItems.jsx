import { Button, Rating } from '@mui/material';
import React, { useContext } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { deleteData } from '../../utils/api';
import { MyContext } from '../../App';

const MyListItems = (props) => {
    const context = useContext(MyContext);

    const removeItem = (id) => {
        deleteData(`/api/myList/${id}`).then((res) => {
            if (res?.error === false) {
                context?.openAlertBox('success', res?.message);
                context?.getMyList();
            }
        });
    };

    return (
        <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
            <div className='img w-[15%] rounded-md overflow-hidden'>
                <Link to={`/product/${props?.item?.productId}`} className='group'>
                    <img src={props?.item?.image} className='w-full group-hover:scale-105 transition-all' />
                </Link>
            </div>
            <div className='info w-[85%] relative'>
                <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => removeItem(props?.item?._id)} />
                <span className='text-[16px]'>{props?.item?.brand}</span>
                <h3 className='text-[15px]'><Link to={`/product/${props?.item?.productId}`} className='link'>{props?.item?.productTitle?.length > 75 ? props?.item?.productTitle?.substr(0, 75) + '...' : props?.item?.productTitle}</Link></h3>
                <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

                <div className='flex items-center gap-4 mt-2 mb-2'>
                    <span className='price text-black text-[14px] font-[600]'>{props?.item?.price?.toLocaleString('vi-VN')}đ</span>
                    <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>{props?.item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                    <span className='price text-primary text-[14px] font-[600]'>{props?.item?.discount}% OFF</span>
                </div>

                <Link to={`/product/${props?.item?.productId}`}>
                    <Button className='btn-org btn-sm'>Add to cart</Button>
                </Link>
            </div>
        </div>
    )
}
export default MyListItems;
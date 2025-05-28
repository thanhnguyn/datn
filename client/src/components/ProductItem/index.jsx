import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { MyContext } from '../../App';
import { deleteData, postData } from '../../utils/api';
import { IoMdHeart } from 'react-icons/io';

const ProductItem = (props) => {

    const context = useContext(MyContext);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);

    useEffect(() => {
        const myListItem = context?.myListData?.filter((item) =>
            item.productId === props?.item?._id
        );



        if (myListItem?.length !== 0) {
            setIsAddedToMyList(true);
        } else {
            setIsAddedToMyList(false);
        }
    }, []);

    const handleAddToMyList = (item) => {
        if (context?.userData === null) {
            context?.openAlertBox('error', "You have not login.");
            return false;
        }
        if (isAddedToMyList) {
            // Tìm item trong myListData để lấy _id cần xoá
            const itemInList = context?.myListData?.find(
                (listItem) => listItem.productId === item._id
            );

            if (itemInList?._id) {
                deleteData(`/api/myList/${itemInList._id}`).then((res) => {
                    console.log(res);
                    if (res?.error === false) {
                        context?.openAlertBox('success', 'Deleted from My List.');
                        setIsAddedToMyList(false);
                        context?.getMyList();
                    } else {
                        context?.openAlertBox('error', res?.data?.message || 'Delete fail.');
                    }
                }).catch((error) => {
                    context?.openAlertBox('error', error);
                });
            } else {
                context?.openAlertBox('error', 'Product is not in My List.');
            }
        } else {
            const obj = {
                productId: item?._id,
                userId: context?.userData?._id,
                productTitle: item?.name,
                image: item?.images[0],
                rating: item?.rating,
                price: item?.price,
                oldPrice: item?.oldPrice,
                brand: item?.brand,
                discount: item?.discount
            };

            postData('/api/myList/add', obj).then((res) => {
                if (res?.error === false) {
                    context?.openAlertBox('success', res?.message);
                    setIsAddedToMyList(true);
                    context?.getMyList();
                } else {
                    context?.openAlertBox('error', res?.message);

                }
            });
        }
    };

    return (
        <div className='productItem  shadow-lg rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)]'>
            <div className='group imgWrapper w-[100%] h-[220px] overflow-hidden rounded-md relative'>
                <Link to={`/product/${props?.item?._id}`}>
                    <div className='img overflow-hidden'>
                        <img src={props?.item?.images[0]} className='w-full' />

                        <img src={props?.item?.images[1]} className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' />
                    </div>
                </Link>
                <span className='discount flex items-center absolute top-[10px] left-[10px] bg-primary text-white rounded-lg p-1 text-[12px] font-[500]'>{props?.item?.discount} %</span>
                <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100'>
                    <Button className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full text-black hover:!bg-primary hover:text-white group ${isAddedToMyList === true ? '!bg-primary' : '!bg-white'}`}
                        onClick={() => handleAddToMyList(props?.item)}
                    >
                        {
                            isAddedToMyList === true ? <IoMdHeart className='text-[18px] !text-white group-hover:text-white hover:!text-white' />
                                :
                                <FaRegHeart className='text-[18px] !text-black group-hover:text-white hover:!text-white' />
                        }
                    </Button>
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group'>
                        <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white hover:!text-white' />
                    </Button>
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group' onClick={() => context.handleOpenProductDetailsModal(true, props?.item)}>
                        <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white hover:!text-white' />
                    </Button>

                </div>
            </div>
            <div className='info p-3 py-5 relative pb-[50px] h-[190px]'>
                <h6 className='text-[13px] !font-[400]'>
                    <span className="link transition-all">{props?.item?.brand}</span>
                </h6>
                <h3 className='text-[13px] title mt-1 font-[500] mb-1 text-[rgba(0,0,0,0.9)]'>
                    <Link to={`/product/${props?.item?._id}`} className="link transition-all">{props?.item?.name?.length > 30 ? props?.item?.name?.substr(0, 30) + '...' : props?.item?.name}</Link>
                </h3>
                <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />
                <div className='flex items-center gap-2'>
                    <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>{props?.item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                    <span className='price text-primary text-[15px] font-[600]'>{props?.item?.price?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className='!absolute bottom-[15px] left-0 pl-3 pr-3 w-full'>
                    <Link to={`/product/${props?.item?._id}`}>
                        <Button
                            className='btn-org btn-border flex w-full btn-sm gap-2'
                            size='small'
                        >
                            <MdOutlineShoppingCart className='text-[18px]' /> Add to cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;
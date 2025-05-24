import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { MyContext } from '../../App';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { deleteData, editData } from '../../utils/api';

const ProductItem = (props) => {
    const [quantity, setQuantity] = useState(1); //Sai ở đây
    const [isAdded, setIsAdded] = useState(false);
    const [cartItem, setCartItem] = useState([]);

    const context = useContext(MyContext);

    const addToCart = (product, userId, quantity) => {
        context?.addToCart(product, userId, quantity);
        setIsAdded(true);
    };

    useEffect(() => {
        const item = context?.cartData?.filter((cartItem) => cartItem.productId.includes(props?.item?._id));
        if (item?.length !== 0) {
            setCartItem(item);
            setIsAdded(true);
        }
    }, [context?.cartData]);

    const minusQty = () => {
        if (quantity !== 1 && quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1);
        }

        if (quantity === 1) {
            deleteData(`/api/cart/deleteCartItem/${cartItem[0]?._id}`).then((res) => {
                setIsAdded(false);
                context?.openAlertBox('success', res?.message);
            });
        } else {
            const obj = {
                _id: cartItem[0]?._id,
                qty: quantity - 1,
                subTotal: parseInt(props?.item?.price * (quantity - 1))
            };

            editData(`/api/cart/updateQty`, obj).then((res) => {
                console.log(res);
            });
        }
    };

    const addQty = () => {
        setQuantity(quantity + 1);

        const obj = {
            _id: cartItem[0]?._id,
            qty: quantity + 1,
            subTotal: parseInt(props?.item?.price * (quantity + 1))
        };

        editData(`/api/cart/updateQty`, obj).then((res) => {
            console.log(res);
        });
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
                <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]'>{props?.item?.discount} %</span>
                <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100'>
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group'>
                        <FaRegHeart className='text-[18px] !text-black group-hover:text-white hover:!text-white' />
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
                    {
                        isAdded === false ?
                            <Button
                                className='btn-org btn-border flex w-full btn-sm gap-2'
                                size='small'
                                onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}
                            >
                                <MdOutlineShoppingCart className='text-[18px]' /> Add to cart
                            </Button>
                            :
                            <div className='flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]'>
                                <Button
                                    className='!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none '
                                    onClick={minusQty}
                                >
                                    <FaMinus className='text-[rgba(0,0,0,0.7)]' />
                                </Button>
                                <span>{quantity}</span>
                                <Button
                                    className='!min-w-[35px] !w-[35px] !h-[30px] !bg-primary !rounded-none'
                                    onClick={addQty}
                                >
                                    <FaPlus className='text-white' />
                                </Button>
                            </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default ProductItem;
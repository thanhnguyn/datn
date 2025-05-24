import { Menu, MenuItem, Rating } from '@mui/material';
import React, { useState } from 'react'
import { GoTriangleDown } from 'react-icons/go';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const CartItems = (props) => {
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setCartItems] = useState(props.size);
    const openSize = Boolean(sizeAnchorEl);

    const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props.qty);
    const openQty = Boolean(qtyAnchorEl);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        if (value !== null) {
            setCartItems(value);
        };
        setSizeAnchorEl(null);
    };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null) {
            setSelectedQty(value);
        };
    };

    return (
        <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
            <div className='img w-[15%] rounded-md overflow-hidden'>
                <Link to='/product/123' className='group'>
                    <img
                        src={props?.item?.image}
                        className='w-full group-hover:scale-105 transition-all'
                    />
                </Link>
            </div>
            <div className='info w-[85%] relative'>
                <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' />
                <span className='text-[16px]'>{props?.item?.brand}</span>
                <h3 className='text-[15px]'><Link className='link'>{props?.item?.productTitle}</Link></h3>
                <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />
                <div className='flex items-center gap-4 mt-2'>
                    {
                        props?.item?.size !== '' &&
                        <>
                            {
                                props?.productSizeData?.length !== 0 &&
                                <div className='relative'>
                                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer' onClick={handleClickSize}>
                                        Size: {selectedSize} <GoTriangleDown />
                                    </span>
                                    <Menu
                                        id="size-menu"
                                        anchorEl={sizeAnchorEl}
                                        open={openSize}
                                        onClose={() => handleCloseSize(null)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            props?.productSizeData?.map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        className={`${item?.name === selectedSize && 'selected'}`}
                                                        onClick={() => handleCloseSize(item?.name)}
                                                    >
                                                        {item?.name}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Menu>
                                </div>
                            }
                        </>
                    }
                    {
                        props?.item?.ram !== '' &&
                        <>
                            {
                                props?.productRamsData?.length !== 0 &&
                                <div className='relative'>
                                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer' onClick={handleClickSize}>
                                        RAM: {selectedSize} <GoTriangleDown />
                                    </span>
                                    <Menu
                                        id="size-menu"
                                        anchorEl={qtyAnchorEl}
                                        open={openSize}
                                        onClose={() => handleCloseSize(null)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            props?.productRamsData?.map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        className={`${item?.name === selectedSize && 'selected'}`}
                                                        onClick={() => handleClickSize(item?.name)}
                                                    >
                                                        {item?.name}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Menu>
                                </div>
                            }
                        </>
                    }
                    {
                        props?.item?.weight !== '' &&
                        <>
                            {
                                props?.productWeightData?.length !== 0 &&
                                <div className='relative'>
                                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer' onClick={handleClickSize}>
                                        WEIGHT: {selectedSize} <GoTriangleDown />
                                    </span>
                                    <Menu
                                        id="size-menu"
                                        anchorEl={qtyAnchorEl}
                                        open={openSize}
                                        onClose={() => handleCloseSize(null)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            props?.productWeightData?.map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        className={`${item?.name === selectedSize && 'selected'}`}
                                                        onClick={() => handleClickSize(item?.name)}
                                                    >
                                                        {item?.name}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Menu>
                                </div>
                            }
                        </>
                    }
                </div>

                <div className='flex items-center gap-4 mt-2'>
                    <span className='price text-black text-[14px] font-[600]'>$50.00</span>
                    <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>$58.00</span>
                    <span className='price text-primary text-[14px] font-[600]'>55% OFF</span>
                </div>
            </div>
        </div>
    )
}
export default CartItems;
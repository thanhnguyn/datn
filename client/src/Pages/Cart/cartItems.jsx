import { Menu, MenuItem, Rating } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MyContext } from '../../App';


const CartItems = (props) => {
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setCartItemsSize] = useState(props?.item?.size);
    const openSize = Boolean(sizeAnchorEl);

    const [ramAnchorEl, setRamAnchorEl] = useState(null);
    const [selectedRam, setCartItemsRam] = useState(props?.item?.ram);
    const openRam = Boolean(ramAnchorEl);

    const [weightAnchorEl, setWeightAnchorEl] = useState(null);
    const [selectedWeight, setCartItemsWeight] = useState(props?.item?.weight);
    const openWeight = Boolean(weightAnchorEl);

    const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props?.item?.quantity);
    const openQty = Boolean(qtyAnchorEl);

    const [productSizeData, setProductSizeData] = useState([]);
    const [productRamsData, setProductRamsData] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);

    const context = useContext(MyContext);

    const findDuplicateItem = (field, value) => {
        return context?.cartData?.find(item =>
            item.productId === props?.item?.productId &&
            item._id !== props?.item?._id &&
            (field === 'size' ? value === item.size : true) &&
            (field === 'ram' ? value === item.ram : true) &&
            (field === 'weight' ? value === item.weight : true)
        );
    };

    const mergeOrUpdateCartItem = async (field, value) => {
        const duplicateItem = findDuplicateItem(field, value);

        if (duplicateItem) {
            const mergedQty = duplicateItem.quantity + props?.item?.quantity;
            const mergedSubTotal = parseInt(duplicateItem.price * mergedQty);

            try {
                await Promise.all([
                    deleteData(`/api/cart/deleteCartItem/${props?.item?._id}`),
                    editData('/api/cart/updateQty', {
                        _id: duplicateItem._id,
                        qty: mergedQty,
                        subTotal: mergedSubTotal
                    })
                ]);
                await context?.getCartItems();
            } catch (err) {
                context?.openAlertBox('error', 'Có lỗi khi gộp sản phẩm.');
            }
        } else {
            try {
                await editData('/api/cart/updateQty', {
                    _id: props?.item?._id,
                    [field]: value
                });
                await context?.getCartItems();
            } catch (err) {
                context?.openAlertBox('error', 'Cập nhật thất bại.');
            }
        }
    };



    useEffect(() => {
        fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
            setProductSizeData(res?.product?.size);
            setProductRamsData(res?.product?.productRam);
            setProductWeightData(res?.product?.productWeight);
        });
    }, [props?.item]);

    useEffect(() => {
        setSelectedQty(props?.item?.quantity);
        setCartItemsSize(props?.item?.size);
        setCartItemsRam(props?.item?.ram);
        setCartItemsWeight(props?.item?.weight);
    }, [props.item]);

    const handleClickWeight = (event) => {
        setWeightAnchorEl(event.currentTarget);
    };
    const handleCloseWeight = (value) => {
        if (value !== null && value !== selectedWeight) {
            setCartItemsWeight(value);
            mergeOrUpdateCartItem('weight', value);
        }
        setWeightAnchorEl(null);
    };


    const handleClickRam = (event) => {
        setRamAnchorEl(event.currentTarget);
    };
    const handleCloseRam = (value) => {
        if (value !== null && value !== selectedRam) {
            setCartItemsRam(value);
            mergeOrUpdateCartItem('ram', value);
        }
        setRamAnchorEl(null);
    };


    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        if (value !== null && value !== selectedSize) {
            setCartItemsSize(value);
            mergeOrUpdateCartItem('size', value);
        }
        setSizeAnchorEl(null);
    };

    const updateCartItem = (field, value) => {
        const payload = {
            _id: props?.item?._id,
            [field]: value,
        };

        editData('/api/cart/updateQty', payload).then((res) => {
            console.log(`${field} updated`, res?.data?.message);
            context?.getCartItems();
        });
    };


    const handleQtyChange = (change) => {
        const newQty = selectedQty + change;

        if (newQty < 1) {
            deleteData(`/api/cart/deleteCartItem/${props?.item?._id}`).then((res) => {
                context?.getCartItems();
            });
            return;
        }

        setSelectedQty(newQty);

        const payload = {
            _id: props?.item?._id,
            qty: newQty,
            subTotal: parseInt(props?.item?.price * newQty)
        };

        editData('/api/cart/updateQty', payload).then((res) => {
            console.log(res?.data?.message);
            context?.getCartItems();
        });
    };

    const removeItem = (id) => {
        deleteData(`/api/cart/deleteCartItem/${id}`).then((res) => {
            context?.getCartItems();
        });
        return;
    };

    return (
        <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
            <div className='img w-[15%] rounded-md overflow-hidden'>
                {console.log(props?.item)}
                <Link to={`/product/${props?.item?.productId}`} className='group'>
                    <img
                        src={props?.item?.image}
                        className='w-full group-hover:scale-105 transition-all'
                    />
                </Link>
            </div>
            <div className='info w-[85%] relative'>
                <IoCloseSharp
                    className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'
                    onClick={() => removeItem(props?.item?._id)}
                />
                <span className='text-[16px]'>{props?.item?.brand}</span>
                <h3 className='text-[15px]'><Link to={`/product/${props?.item?.productId}`} className='link'>{props?.item?.productTitle}</Link></h3>
                <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />
                <div className='flex items-center justify-between'>
                    <div className='flex gap-4 mt-2'>
                        {
                            props?.item?.size !== '' &&
                            <>
                                {
                                    productSizeData?.length !== 0 &&
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
                                                productSizeData?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            className={`${item === selectedSize && 'selected'}`}
                                                            onClick={() => handleCloseSize(item)}
                                                        >
                                                            {item}
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
                                    productRamsData?.length !== 0 &&
                                    <div className='relative'>
                                        <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer' onClick={handleClickRam}>
                                            RAM: {selectedRam} <GoTriangleDown />
                                        </span>
                                        <Menu
                                            id="ram-menu"
                                            anchorEl={ramAnchorEl}
                                            open={openRam}
                                            onClose={() => handleCloseRam(null)}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {
                                                productRamsData?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            className={`${item === selectedRam && 'selected'}`}
                                                            onClick={() => handleCloseRam(item)}
                                                        >
                                                            {item}
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
                                    productWeightData?.length !== 0 &&
                                    <div className='relative'>
                                        <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer' onClick={handleClickWeight}>
                                            WEIGHT: {selectedWeight} <GoTriangleDown />
                                        </span>
                                        <Menu
                                            id="weight-menu"
                                            anchorEl={weightAnchorEl}
                                            open={openWeight}
                                            onClose={() => handleCloseWeight(null)}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {
                                                productWeightData?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            className={`${item === selectedWeight && 'selected'}`}
                                                            onClick={() => handleCloseWeight(item)}
                                                        >
                                                            {item}
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
                    <div className='flex items-center gap-2'>
                        <button
                            className='w-[24px] h-[24px] flex items-center justify-center bg-[#f1f1f1] rounded-sm'
                            onClick={() => handleQtyChange(-1)}
                        >
                            <FaMinus />
                        </button>

                        <input
                            type="number"
                            min="1"
                            className="w-[50px] text-center border border-gray-300 rounded-sm px-1 py-[2px]"
                            value={selectedQty}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                    setSelectedQty(value);
                                    editData('/api/cart/updateQty', {
                                        _id: props?.item?._id,
                                        qty: value,
                                        subTotal: parseInt(props?.item?.price * value)
                                    }).then((res) => {
                                        console.log(res?.data?.message);
                                        context?.getCartItems();
                                    });
                                }
                            }}
                        />

                        <button
                            className='w-[24px] h-[24px] flex items-center justify-center bg-primary text-white rounded-sm'
                            onClick={() => handleQtyChange(1)}
                        >
                            <FaPlus />
                        </button>
                    </div>

                </div>

                <div className='flex items-center gap-4 mt-2'>
                    <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>{props?.item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                    <span className='price text-black text-[14px] font-[600]'>{props?.item?.price?.toLocaleString('vi-VN')}đ</span>
                    <span className='price text-primary text-[14px] font-[600]'>{props?.item?.discount}% OFF</span>
                </div>
            </div>
        </div>
    )
}
export default CartItems;
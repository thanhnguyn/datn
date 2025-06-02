import React, { useContext, useEffect, useState } from 'react';
import { Menu, MenuItem, Rating } from '@mui/material';
import { GoTriangleDown } from 'react-icons/go';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';

const CartItems = ({ item }) => {
    const context = useContext(MyContext);

    const [attributes, setAttributes] = useState({});
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [anchorEls, setAnchorEls] = useState({});
    const [selectedQty, setSelectedQty] = useState(item?.quantity || 1);

    useEffect(() => {
        fetchDataFromApi(`/api/product/${item?.productId}`).then((res) => {
            const attr = res?.product?.attribute || {};
            setAttributes(attr);
        });
    }, [item?.productId]);

    useEffect(() => {
        const fetchUpdatedItem = async () => {
            try {
                const res = await fetchDataFromApi('/api/cart/get');
                if (res?.error === false) {
                    const cart = res.data || [];
                    const updatedItem = cart.find(cartItem => cartItem._id === item._id);

                    if (updatedItem) {
                        const selected = {};
                        Object.keys(attributes).forEach((key) => {
                            selected[key] = updatedItem.attribute?.[key] || (attributes[key]?.[0] || '');
                        });
                        setSelectedAttributes(selected);

                        setSelectedQty(updatedItem.quantity || 1);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi fetch cart mới nhất:', error);
            }
        };

        if (Object.keys(attributes).length > 0) {
            fetchUpdatedItem();
        }
    }, [item._id, attributes]);

    const handleOpen = (key, event) => {
        setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }));
    };

    const handleClose = (key, value) => {
        const currentValue = selectedAttributes[key];
        if (value !== null && value !== currentValue) {
            const newAttributes = { ...selectedAttributes, [key]: value };

            setSelectedAttributes(newAttributes);

            checkForDuplicateAndUpdateCart(key, value, newAttributes);
        }
        setAnchorEls((prev) => ({ ...prev, [key]: null }));
    };


    const checkForDuplicateAndUpdateCart = async (changedKey, changedValue, newAttributes) => {
        try {
            const res = await fetchDataFromApi('/api/cart/get');
            const currentCart = (res?.error === false) ? res.data : [];

            const duplicateItem = currentCart.find(cartItem =>
                cartItem.productId === item.productId &&
                cartItem._id !== item._id &&
                JSON.stringify(cartItem.attribute) === JSON.stringify(newAttributes)
            );

            if (duplicateItem) {
                const mergedQty = duplicateItem.quantity + item.quantity;
                const mergedSubTotal = parseInt(item.price * mergedQty);

                await Promise.all([
                    deleteData(`/api/cart/deleteCartItem/${item._id}`),
                    editData('/api/cart/updateQty', {
                        _id: duplicateItem._id,
                        qty: mergedQty,
                        subTotal: mergedSubTotal,
                    }),
                ]);
                context?.getCartItems();
            } else {
                await editData('/api/cart/updateQty', {
                    _id: item._id,
                    attribute: newAttributes,
                });
                context?.getCartItems();
            }
        } catch (err) {
            context?.openAlertBox('error', 'Có lỗi khi gộp sản phẩm.');
        }
    };



    const handleQtyChange = (change) => {
        const newQty = selectedQty + change;
        if (newQty < 1) {
            deleteData(`/api/cart/deleteCartItem/${item._id}`).then(() => context?.getCartItems());
            return;
        }

        setSelectedQty(newQty);
        editData('/api/cart/updateQty', {
            _id: item._id,
            qty: newQty,
            subTotal: parseInt(item.price * newQty)
        }).then(() => context?.getCartItems());
    };

    const removeItem = () => {
        deleteData(`/api/cart/deleteCartItem/${item._id}`).then(() => context?.getCartItems());
    };

    return (
        <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
            <div className='img w-[15%] rounded-md overflow-hidden'>
                <Link to={`/product/${item?.productId}`} className='group'>
                    <img src={item?.image} className='w-full group-hover:scale-105 transition-all' />
                </Link>
            </div>

            <div className='info w-[85%] relative'>
                <IoCloseSharp
                    className='cursor-pointer absolute top-0 right-0 text-[22px] link transition-all'
                    onClick={removeItem}
                />
                <span className='text-[16px]'>{item?.brand}</span>
                <h3 className='text-[15px]'><Link to={`/product/${item?.productId}`} className='link'>{item?.productTitle}</Link></h3>
                <Rating name="size-small" value={item?.rating} size="small" readOnly />

                <div className='flex items-center justify-between mt-2'>
                    <div className='flex gap-4 flex-wrap'>
                        {
                            Object.keys(attributes).map((attrKey) => (
                                <div key={attrKey} className='relative'>
                                    <span
                                        onClick={(e) => handleOpen(attrKey, e)}
                                        className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-3 rounded-md cursor-pointer'
                                    >
                                        {attrKey.toUpperCase()}: {selectedAttributes[attrKey]} <GoTriangleDown />
                                    </span>
                                    <Menu
                                        anchorEl={anchorEls[attrKey]}
                                        open={Boolean(anchorEls[attrKey])}
                                        onClose={() => handleClose(attrKey, null)}
                                    >
                                        {
                                            attributes[attrKey]?.map((val, i) => (
                                                <MenuItem
                                                    key={i}
                                                    selected={val === selectedAttributes[attrKey]}
                                                    onClick={() => handleClose(attrKey, val)}
                                                >
                                                    {val}
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>
                                </div>
                            ))
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
                            className='w-[50px] text-center border border-gray-300 rounded-sm px-1 py-[2px]'
                            value={selectedQty}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                    setSelectedQty(value);
                                    editData('/api/cart/updateQty', {
                                        _id: item._id,
                                        qty: value,
                                        subTotal: parseInt(item.price * value)
                                    }).then(() => context?.getCartItems());
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
                    <span className='line-through text-gray-500 text-[14px] font-[500]'>{item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                    <span className='text-black text-[14px] font-[600]'>{item?.price?.toLocaleString('vi-VN')}đ</span>
                    <span className='text-primary text-[14px] font-[600]'>{item?.discount}% OFF</span>
                </div>
            </div>
        </div>
    );
};

export default CartItems;

import React, { useContext, useState } from 'react'
import { QtyBox } from '../../components/QtyBox';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Button, Rating } from '@mui/material';
import { MyContext } from '../../App';

const ProductDetailsComponent = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [isQtyValid, setIsQtyValid] = useState(true);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [attributeErrors, setAttributeErrors] = useState({});

    const context = useContext(MyContext);

    const handleSelectQty = (qty) => {
        setQuantity(qty);
        if (qty <= props?.item?.countInStock && qty >= 1) {
            setIsQtyValid(true);
        } else {
            setIsQtyValid(false);
        }
    };

    const handleSelectAttribute = (type, value) => {
        setSelectedAttributes(prev => ({ ...prev, [type]: value }));
        setAttributeErrors(prev => ({ ...prev, [type]: false }));
    };

    const addToCart = (product, userId, quantity) => {
        const requiredAttrs = Object.entries(product?.attribute || {});
        const errors = {};

        for (let [key, values] of requiredAttrs) {
            if (Array.isArray(values) && values.length > 0 && !selectedAttributes[key]) {
                errors[key] = true;
            }
        }

        if (Object.keys(errors).length > 0) {
            setAttributeErrors(errors);
            context?.openAlertBox('error', 'Please select all required attributes before adding to cart.');
            return;
        }

        if (quantity > product?.countInStock) {
            context?.openAlertBox('error', `Only ${product?.countInStock} items in stock. Please reduce quantity.`);
            return;
        }

        if (!isQtyValid) {
            context?.openAlertBox('error', `Invalid quantity: only ${product?.countInStock} items in stock.`);
            return;
        }

        const productItem = {
            _id: product?._id,
            name: product?.name,
            image: product?.images[0],
            rating: product?.rating,
            price: product?.price,
            oldPrice: product?.oldPrice,
            discount: product?.discount,
            quantity,
            subTotal: parseInt(product?.price * quantity),
            productId: product?._id,
            countInStock: product?.countInStock,
            userId,
            brand: product?.brand,
            attribute: selectedAttributes
        };

        console.log('Product item to add:', productItem);

        context?.addToCart(productItem, userId, quantity);
    };


    return (
        <>
            <h1 className='text-[24px] font-[600] mb-2'>{props?.item?.name}</h1>
            <div className='flex items-center gap-3'>
                <span className='text-gray-400 text-[13px]'>
                    Brand: <span className='font-[500] text-black opacity-75'>{props?.item?.brand}</span>
                </span>

                <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />
                <span className='text-[13px] cursor-pointer'>Review ({props?.reviewsCount})</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>{props?.item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                <span className='price text-primary text-[20px] font-[600]'>{props?.item?.price?.toLocaleString('vi-VN')}đ</span>
                <span className='text-[14px]'>Available in stock: <span className='text-green-600  text-[14px] font-bold'>{props?.item?.countInStock} items</span></span>
            </div>
            <p className='mt-3 pr-10 mb-5'>{props?.item?.description}</p>
            {props?.item?.attribute &&
                Object.entries(props.item.attribute).map(([attrKey, attrValues]) => {
                    if (!Array.isArray(attrValues) || attrValues.length === 0) return null;

                    return (
                        <div key={attrKey} className='flex items-center gap-3 mt-2'>
                            <span className='text-[16px] capitalize'>
                                {attrKey.replace(/^product/, '')}:
                            </span>
                            <div className='flex items-center gap-1 actions'>
                                {attrValues.map((val, index) => (
                                    <Button
                                        key={index}
                                        className={`
                                ${selectedAttributes[attrKey] === val ? '!bg-primary !text-white' : ''}
                                ${attributeErrors[attrKey] ? '!border-2 !border-red-500' : ''}
                            `}
                                        onClick={() => handleSelectAttribute(attrKey, val)}
                                    >
                                        {val}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    );
                })
            }
            <p className='text-[14px] mt-5 mb-2 text-[#000]'>Free shipping (Est. Delivery time 2-3 days)</p>
            <div className='flex items-center gap-4 py-4'>
                <div className='qtyBoxWrapper w-[70px]'>
                    <QtyBox handleSelectQty={handleSelectQty} maxQty={props?.item?.countInStock} />
                </div>
                {
                    props?.item?.countInStock === 0 ?
                        <></>
                        :
                        <Button className='btn-org flex gap-2' onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}>
                            <MdOutlineShoppingCart className='text-[22px]' /> Add to cart
                        </Button>
                }
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'> <FaRegHeart className='text-[18px]' /> Add to wishlist</span>
                <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'> <IoGitCompareOutline className='text-[18px]' /> Add to compare</span>
            </div>
        </>
    )
}
export default ProductDetailsComponent;
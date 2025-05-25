import React, { useContext, useState } from 'react'
import { QtyBox } from '../../components/QtyBox';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Button, Rating } from '@mui/material';
import { MyContext } from '../../App';

const ProductDetailsComponent = (props) => {
    const [productRamActionIndex, setProductRamActionIndex] = useState(null);
    const [productSizeActionIndex, setProductSizeActionIndex] = useState(null);
    const [productWeightActionIndex, setProductWeightActionIndex] = useState(null);
    const [tabErrorSize, setTabErrorSize] = useState(false);
    const [tabErrorWeight, setTabErrorWeight] = useState(false);
    const [tabErrorRam, setTabErrorRam] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');

    const context = useContext(MyContext);

    const handleSelectQty = (qty) => {
        setQuantity(qty);
    };

    const handleSelectTab = (type, index, value) => {
        // setActiveTab(index);
        if (type === 'size') {
            setSelectedSize(value);
            setTabErrorSize(false);
        } else if (type === 'ram') {
            setSelectedRam(value);
            setTabErrorRam(false);
        } else if (type === 'weight') {
            setSelectedWeight(value);
            setTabErrorWeight(false);
        }
    };

    const addToCart = (product, userId, quantity) => {
        if (product?.size?.length > 0 && !selectedSize) {
            context?.openAlertBox('error', 'Please choose Size before adding to cart.');
            setTabErrorSize(true);
        }
        if (product?.productRam?.length > 0 && !selectedRam) {
            context?.openAlertBox('error', 'Please choose RAM before adding to cart.');
            setTabErrorRam(true);
        }
        if (product?.productWeight?.length > 0 && !selectedWeight) {
            context?.openAlertBox('error', 'Please choose Weight before adding to cart.');
            setTabErrorWeight(true);
        }

        const productItem = {
            _id: product?._id,
            name: product?.name,
            image: product?.images[0],
            rating: product?.rating,
            price: product?.price,
            oldPrice: product?.oldPrice,
            discount: product?.discount,
            quantity: quantity,
            subTotal: parseInt(product?.price * quantity),
            productId: product?._id,
            countInStock: product?.countInStock,
            userId: userId,
            brand: product?.brand,
            ...(selectedSize && { size: selectedSize }),
            ...(selectedRam && { ram: selectedRam }),
            ...(selectedWeight && { weight: selectedWeight })
        };

        context?.addToCart(productItem, userId, quantity);
    };

    return (
        <>
            <h1 className='text-[24px] font-[600] mb-2'>{props?.item?.name}</h1>
            <div className='flex items-center gap-3'>
                <span className='text-gray-400 text-[13px]'>
                    Brands:
                    <span className='font-[500] text-black opacity-75'>{props?.item?.brand}</span>
                </span>

                <Rating name="size-small" defaultValue={2} size="small" readOnly />
                <span className='text-[13px] cursor-pointer' onClick={props.gotoReviews}>Review ({props?.reviewsCount})</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>{props?.item?.price?.toLocaleString('vi-VN')}đ</span>
                <span className='price text-primary text-[20px] font-[600]'>{props?.item?.oldPrice?.toLocaleString('vi-VN')}đ</span>
                <span className='text-[14px]'>Available in stock: <span className='text-green-600  text-[14px] font-bold'>{props?.item?.countInStock} items</span></span>
            </div>
            <p className='mt-3 pr-10 mb-5'>{props?.item?.description}</p>
            {
                props?.item?.productRam?.length !== 0 &&
                <>
                    <div className='flex items-center gap-3'>
                        <span className='text-[16px]'>RAM: </span>
                        <div className='flex items-center gap-1 actions'>
                            {
                                props?.item?.productRam?.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={`${productRamActionIndex === index ? '!bg-primary !text-white' : ''} ${tabErrorRam === true ? '!border-2 !border-red-500' : ''}`}
                                            onClick={() => {
                                                setProductRamActionIndex(index);
                                                handleSelectTab('ram', index, item);
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    );
                                })
                            }
                        </div>
                    </div >
                    <br />
                </>
            }
            {
                props?.item?.size?.length !== 0 &&
                <>
                    <div className='flex items-center gap-3'>
                        <span className='text-[16px]'>Size: </span>
                        <div className='flex items-center gap-1 actions'>
                            {
                                props?.item?.size?.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={`${productSizeActionIndex === index ? '!bg-primary !text-white' : ''} ${tabErrorSize === true ? '!border-2 !border-red-500' : ''}`}
                                            onClick={() => {
                                                setProductSizeActionIndex(index);
                                                handleSelectTab('size', index, item);
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <br />
                </>
            }
            {
                props?.item?.productWeight?.length !== 0 &&
                <div className='flex items-center gap-3'>
                    <span className='text-[16px]'>Weight: </span>
                    <div className='flex items-center gap-1 actions'>
                        {
                            props?.item?.productWeight?.map((item, index) => {
                                return (
                                    <Button
                                        key={index}
                                        className={`${productWeightActionIndex === index ? '!bg-primary !text-white' : ''} ${tabErrorWeight === true ? '!border-2 !border-red-500' : ''}`}
                                        onClick={() => {
                                            setProductWeightActionIndex(index);
                                            handleSelectTab('weight', index, item);
                                        }}
                                    >
                                        {item}
                                    </Button>
                                );
                            })
                        }
                    </div>
                </div>
            }
            <p className='text-[14px] mt-5 mb-2 text-[#000]'>Free shipping (Est. Delivery time 2-3 days)</p>
            <div className='flex items-center gap-4 py-4'>
                <div className='qtyBoxWrapper w-[70px]'>
                    <QtyBox handleSelectQty={handleSelectQty} />
                </div>
                <Button className='btn-org flex gap-2' onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}>
                    <MdOutlineShoppingCart className='text-[22px]' /> Add to cart
                </Button>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'> <FaRegHeart className='text-[18px]' /> Add to wishlist</span>
                <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'> <IoGitCompareOutline className='text-[18px]' /> Add to compare</span>
            </div>
        </>
    )
}
export default ProductDetailsComponent;
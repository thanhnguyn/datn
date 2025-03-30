import { Breadcrumbs } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import ProductZoom from '../../components/ProductZoom';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {
    return (
        <>
            <div className='py-5'>
                <div className='container'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className='link transition !text-[14px]'
                        >
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className='link transition !text-[14px]'
                        >
                            Fashion
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            className='link transition !text-[14px]'
                        >
                            Men Opaque Casual Shirt
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className='bg-white py-5'>
                <div className='container flex gap-8'>
                    <div className='productZoomContainer w-[40%]'>
                        <ProductZoom />
                    </div>

                    <div className='productContent w-[60%]'>
                        <h1 className='text-[22px] font-[600] mb-2'>Men Opaque Casual Shirt</h1>
                        <div className='flex items-center gap-3'>
                            <span className='text-gray-400 text-[13px]'>
                                Brands:
                                <span className='font-[500] text-black opacity-75'>CLAFOUTIS</span>
                            </span>

                            <Rating name="size-small" defaultValue={2} size="small" readOnly />
                            <span className='text-[13px] cursor-pointer'>Review (5)</span>
                        </div>
                        <div className='flex items-center gap-4 mt-4'>
                            <span className='oldPrice line-through text-gray-500 text-[18px] font-[500]'>$58.00</span>
                            <span className='price text-primary text-[18px] font-[600]'>$50.00</span>
                        </div>
                        <br />
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProductDetails;
import { Breadcrumbs, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ProductZoom from '../../components/ProductZoom';
import ProductsSlider from '../../components/ProductsSlider';
import ProductDetailsComponent from '../../components/ProductDetails';
import { fetchDataFromApi } from '../../utils/api';
import Reviews from './reviews';
import { useRef } from 'react';

const ProductDetails = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [productData, setProductData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [relatedProductData, setRelatedProductData] = useState([]);

    const { id } = useParams();

    const reviewSec = useRef();

    useEffect(() => {
        fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
            if (res?.error === false) {
                setReviewsCount(res.reviews.length);
            }
        });
    }, [reviewsCount]);

    useEffect(() => {
        setIsLoading(true);
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            window.scrollTo(0, 0);
            if (res?.error === false) {
                console.log(res?.product);
                setProductData(res?.product);
                fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`).then((res) => {
                    if (res?.error === false) {
                        const filteredData = res?.products?.filter((item) => item._id !== id);
                        setRelatedProductData(filteredData);
                    }
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, 700);
            }
        });

        window.scrollTo(0, 0);
    }, [id]);

    const gotoReviews = () => {
        window.scrollTo({
            top: reviewSec?.current?.offsetTop - 100,
            behavior: 'smooth'
        })

        setActiveTab(1);
    };
    return (
        <>
            <div className='py-5'>
                <div className='container'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className='link transition !text-[14px]'
                        >
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/products?catId=${productData?.catId}`}
                            className='link transition !text-[14px]'
                        >
                            {productData?.catName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            className='link transition !text-[14px]'
                        >
                            {productData?.name}
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className='bg-white py-5'>
                {
                    isLoading === true ?
                        <div className='flex items-center justify-center min-h-[300px]'>
                            <CircularProgress />
                        </div>
                        :
                        <>
                            <div className='container flex gap-8 items-center'>
                                <div className='productZoomContainer w-[40%]'>
                                    <ProductZoom images={productData?.images} />
                                </div>

                                <div className='productContent w-[60%] pr-10 pl-10'>
                                    <ProductDetailsComponent item={productData} reviewsCount={reviewsCount} gotoReviews={gotoReviews} />

                                </div>
                            </div>

                            <div className='container pt-10'>
                                <div className='flex items-center gap-8 mb-5'>
                                    <span
                                        className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 && 'text-primary'}`}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        Description
                                    </span>
                                    <span
                                        className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && 'text-primary'}`}
                                        onClick={() => setActiveTab(1)}
                                        ref={reviewSec}
                                    >
                                        Reviews ({reviewsCount})
                                    </span>
                                </div>

                                {
                                    activeTab === 0 && (
                                        <div className='shadow-md w-full py-5 px-8 rounded-md'>
                                            {
                                                productData?.description
                                            }
                                        </div>
                                    )
                                }
                                {
                                    activeTab === 1 && (
                                        <div className='shadow-md w-[80%] py-5 px-8 rounded-md'>
                                            {
                                                productData?.length !== 0 &&
                                                <Reviews
                                                    productId={productData?._id}
                                                />
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            {
                                relatedProductData?.length !== 0 &&
                                <div className='container pt-8'>
                                    <h2 className='text-[20px] font-[600] pb-0'>Related Products</h2>
                                    <ProductsSlider items={6} data={relatedProductData} />
                                </div>
                            }
                        </>
                }


            </section>
        </>
    )
}
export default ProductDetails;
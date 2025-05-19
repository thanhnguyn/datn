import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../../components/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../../components/AdsBannerSlider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import HomeBannerV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/bannerBoxV2';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import { fetchDataFromApi } from '../../utils/api.js';
import { MyContext } from '../../App';
import ProductLoading from '../../components/ProductLoading/index.jsx';

const Home = () => {

    const [value, setValue] = React.useState(0);
    const [homeSlidesData, setHomeSlidesData] = useState([]);
    const [popularProductsData, setPopularProductsData] = useState([]);
    const [allProductsData, setAllProductsData] = useState([]);
    const [allFeaturedProductsData, setAllFeaturedProductsData] = useState([]);
    const [bannerV1Data, setBannerV1Data] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        fetchDataFromApi(('/api/homeSlides')).then((res) => {
            setHomeSlidesData(res?.data);
        });
        fetchDataFromApi(('/api/product/getAllProducts')).then((res) => {
            setAllProductsData(res?.products);
        });
        fetchDataFromApi(('/api/product/getAllFeaturedProducts')).then((res) => {
            setAllFeaturedProductsData(res?.products);
        });
        fetchDataFromApi(('/api/bannerV1')).then((res) => {
            setBannerV1Data(res?.data);
        });
    }, []);

    useEffect(() => {
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`).then((res) => {
            console.log(res);
            if (res?.error === false) {
                setPopularProductsData(res?.products);
            }
        });
    }, [context?.catData]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const filterByCatId = (id) => {
        setPopularProductsData([]);
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
            if (res?.error === false) {
                setPopularProductsData(res?.products);
            }
        });
    };

    return (
        <>
            {
                homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />
            }

            {
                context?.catData?.length !== 0 && <HomeCatSlider data={context?.catData} />
            }

            <section className='bg-white py-8'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <div className='leftSec'>
                            <h2 className='text-[20px] font-[600]'>Popular Products</h2>
                            <p className='text-[14px] font-[400] mt-0 mb-0'>Do not miss the current offers until the end of month</p>
                        </div>
                        <div className='rightSec w-[60%]'>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                {
                                    context?.catData?.length !== 0 && context?.catData?.map((cat, index) => {
                                        return (
                                            <Tab key={index} label={cat?.name} onClick={() => filterByCatId(cat?._id)} />
                                        );
                                    })
                                }
                            </Tabs>
                        </div>
                    </div>
                    {
                        popularProductsData?.length === 0 && <ProductLoading />
                    }
                    {
                        popularProductsData?.length !== 0 && <ProductsSlider items={5} data={popularProductsData} />
                    }
                </div>
            </section>

            <section className='py-6 '>
                <div className='container flex gap-5'>
                    <div className='part1 w-[70%]'>
                        {
                            allProductsData?.length !== 0 && <HomeBannerV2 data={allProductsData} />
                        }
                    </div>

                    <div className='part2 w-[30%] gap-5 flex items-center justify-between flex-col'>
                        <BannerBoxV2 info="left" image={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"} />
                        <BannerBoxV2 info="right" image={"https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"} />
                    </div>
                </div>
            </section>

            <section className='py-4 pt-2 bg-white'>
                <div className='container'>
                    <div className='freeShipping w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex items-center 
                    justify-between rounded-md mb-7'>
                        <div className='col1 flex items-center gap-4'>
                            <LiaShippingFastSolid className='text-[50px]' />
                            <span className='text-[20px] font-[600] uppercase'>Free Shipping</span>
                        </div>
                        <div className='col2'>
                            <p className='mb-0 font-[500]'>Free Delivery Now On Your First Order and over $200
                            </p>
                        </div>
                        <p className='font-bold text-[30px]'>- Only $200*</p>
                    </div>
                    {
                        bannerV1Data?.length !== 0 && <AdsBannerSliderV2 items={4} data={bannerV1Data} />
                    }
                </div>
            </section>

            <section className='py-5 pt-0 bg-white'>
                <div className='container'>
                    <h2 className='text-[20px] font-[600]'>Latest Products</h2>
                    {
                        allProductsData?.length === 0 && <ProductLoading />
                    }
                    {
                        allProductsData?.length !== 0 && <ProductsSlider items={5} data={allProductsData} />
                    }
                    <AdsBannerSlider items={3} />
                </div>
            </section>
            <section className='py-5 pt-0 bg-white'>
                <div className='container'>
                    <h2 className='text-[20px] font-[600]'>Featured Products</h2>
                    {
                        allFeaturedProductsData?.length === 0 && <ProductLoading />
                    }
                    {
                        allFeaturedProductsData?.length !== 0 && <ProductsSlider items={5} data={allFeaturedProductsData} />
                    }
                    <AdsBannerSlider items={3} />

                </div>
            </section>
            <section className='py-5 pb-8 pt-0 bg-white blogSection'>
                <div className='container'>
                    <h2 className='text-[20px] font-[600] mb-4'>
                        From the blog</h2>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className="blogSlider"
                    >
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <BlogItem />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

        </>
    )

}

export default Home;
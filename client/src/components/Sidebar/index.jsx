import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./style.css";
import { Collapse } from 'react-collapse';
import { FaAngleDown } from "react-icons/fa";
import { Button } from '@mui/material';
import { FaAngleUp } from "react-icons/fa";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';

const Sidebar = (props) => {

    const [isOpenCategoryFilter, SetIsOpenCategoryFilter] = useState(true);
    const [isOpenAvailFilter, SetIsOpenAvailFilter] = useState(true);
    const [isOpenSizeFilter, SetIsOpenSizeFilter] = useState(true);

    const [filters, setFilters] = useState({
        catId: [],
        subCatId: [],
        thirdsubCatId: [],
        minPrice: '',
        maxPrice: '',
        rating: '',
        page: 1,
        limit: 25
    });

    const [price, setPrice] = useState([0, 20000000]);

    const context = useContext(MyContext);

    const location = useLocation();

    const handleCheckboxChange = (field, value) => {
        const currentValues = filters[field] || [];
        const updatedValues = currentValues?.includes(value) ?
            currentValues.filter((item) => item !== value) : [...currentValues, value];

        setFilters((prev) => ({
            ...prev,
            [field]: updatedValues
        }));

        if (field === 'catId') {
            setFilters((prev) => ({
                ...prev,
                subCatId: [],
                thirdsubCatId: []
            }));
        }
    };

    useEffect(() => {
        const url = window.location.href;
        const queryParameters = new URLSearchParams(location.search);

        if (url.includes('catId')) {
            const categoryId = queryParameters.get('catId');
            const catArr = [];
            catArr.push(categoryId);
            filters.catId = catArr;
            filters.subCatId = [];
            filters.thirdsubCatId = [];
            filters.rating = [];
        }

        if (url.includes('subCatId')) {
            const subCategoryId = queryParameters.get('subCatId');
            const subCatArr = [];
            subCatArr.push(subCategoryId);
            filters.catId = [];
            filters.subCatId = subCatArr;
            filters.thirdsubCatId = [];
            filters.rating = [];
        }

        if (url.includes('thirdSubCatId')) {
            const thirdSubCategoryId = queryParameters.get('thirdSubCatId');
            const thirdSubCatArr = [];
            thirdSubCatArr.push(thirdSubCategoryId);
            filters.catId = [];
            filters.subCatId = [];
            filters.thirdsubCatId = thirdSubCatArr;
            filters.rating = [];
        }

        filters.page = 1;
        setTimeout(() => {
            filtersData();
        }, 200);
    }, [location]);

    const filtersData = () => {
        props.setIsLoading(true);

        postData(`/api/product/filters`, filters).then((res) => {
            props.setProductsData(res);
            props.setIsLoading(false);
            props.setTotalPages(res?.totalPages);
            window.scrollTo(0, 0);
        });
    };

    useEffect(() => {
        filters.page = props.page;
        filtersData();
    }, [filters, props.page]);

    const handleCommit = () => {
        setFilters((prev) => ({
            ...prev,
            minPrice: price[0],
            maxPrice: price[1],
        }));
    };

    return (
        <aside className='sidebar py-5 sticky top-[130px]'>
            <div className='box'>
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Shop by Category
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={() => SetIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                        {
                            isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </Button>
                </h3>
                <Collapse isOpened={isOpenCategoryFilter}>
                    <div className='scroll px-4 relative -left-[13px]'>
                        {
                            context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        value={item?._id}
                                        checked={filters?.catId?.includes(item?._id)}
                                        control={<Checkbox />}
                                        label={item?.name}
                                        onChange={() => handleCheckboxChange('catId', item?._id)}
                                        className='w-full'
                                    />
                                );
                            })
                        }
                    </div>
                </Collapse>
            </div>
            {/* <div className='box'>
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Availability
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={() => SetIsOpenAvailFilter(!isOpenAvailFilter)}>
                        {
                            isOpenAvailFilter === true ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </Button>
                </h3>
                <Collapse isOpened={isOpenAvailFilter}>
                    <div className='scroll px-4 relative -left-[13px]'>
                        <FormControlLabel control={<Checkbox size="small" />} label="Available (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="In stock (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Not available (17)" className='w-full' />
                    </div>
                </Collapse>
            </div> */}
            {/* <div className='box mt-3'>
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Size
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={() => SetIsOpenSizeFilter(!isOpenSizeFilter)}>
                        {
                            isOpenSizeFilter === true ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </Button>
                </h3>
                <Collapse isOpened={isOpenSizeFilter}>
                    <div className='scroll px-4 relative -left-[13px]'>
                        <FormControlLabel control={<Checkbox size="small" />} label="Small (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Medium (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Large (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="XL (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="XXL (17)" className='w-full' />
                    </div>
                </Collapse>
            </div> */}
            <div
                className='box mt-4'
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
            >
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Filter by Price</h3>
                <RangeSlider
                    value={price}
                    onInput={setPrice}
                    min={0}
                    max={20000000}
                    step={100000}
                />
                <div className='flex pt-4 pb-2 priceRange'>
                    <span className='text-[13px]'>
                        From: <strong className='text-dark'>{price[0].toLocaleString('vi-VN')}đ</strong>
                    </span>
                    <span className='ml-auto text-[13px]'>
                        To: <strong className='text-dark'>{price[1].toLocaleString('vi-VN')}đ</strong>
                    </span>
                </div>
            </div>
            <div className='box mt-4'>
                <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Filter by Rating</h3>
                <div className='flex items-center'>
                    <FormControlLabel
                        value={5}
                        checked={filters?.rating?.includes(5)}
                        control={<Checkbox />}
                        onChange={() => handleCheckboxChange('rating', 5)}
                    />
                    <Rating name="rating" value={5} size="small" readOnly />
                </div>
                <div className='flex items-center'>
                    <FormControlLabel
                        value={4}
                        checked={filters?.rating?.includes(4)}
                        control={<Checkbox />}
                        onChange={() => handleCheckboxChange('rating', 4)}
                    />
                    <Rating name="rating" value={4} size="small" readOnly />
                </div>
                <div className='flex items-center'>
                    <FormControlLabel
                        value={3}
                        checked={filters?.rating?.includes(3)}
                        control={<Checkbox />}
                        onChange={() => handleCheckboxChange('rating', 3)}
                    />
                    <Rating name="rating" value={3} size="small" readOnly />
                </div>
                <div className='flex items-center'>
                    <FormControlLabel
                        value={2}
                        checked={filters?.rating?.includes(2)}
                        control={<Checkbox />}
                        onChange={() => handleCheckboxChange('rating', 2)}
                    />
                    <Rating name="rating" value={2} size="small" readOnly />
                </div>
                <div className='flex items-center'>
                    <FormControlLabel
                        value={1}
                        checked={filters?.rating?.includes(1)}
                        control={<Checkbox />}
                        onChange={() => handleCheckboxChange('rating', 1)}
                    />
                    <Rating name="rating" value={1} size="small" readOnly />
                </div>
            </div>
        </aside>
    )
}
export default Sidebar;
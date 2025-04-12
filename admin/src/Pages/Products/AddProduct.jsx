import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Rating } from '@mui/material';
import UploadBox from '../../components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeature, setProductFeature] = useState('');
    const [productRams, setProductRams] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productSize, setProductSize] = useState('');

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };
    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
    };
    const handleChangeProductFeature = (event) => {
        setProductFeature(event.target.value);
    };
    const handleChangeProductRams = (event) => {
        setProductRams(event.target.value);
    };
    const handleChangeProductWeight = (event) => {
        setProductWeight(event.target.value);
    };
    const handleChangeProductSize = (event) => {
        setProductSize(event.target.value);
    };
    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8'>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4'>
                    <div className='grid grid-cols-1 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product name</h3>
                            <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product description</h3>
                            <textarea type="text" className='w-full h-[140x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 mb-3 gap-4'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat}
                                label="Category"
                                onChange={handleChangeProductCat}
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={10}>Fashion</MenuItem>
                                <MenuItem value={20}>Beauty</MenuItem>
                                <MenuItem value={30}>Wellness</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product sub category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productSubCat}
                                label="Category"
                                onChange={handleChangeProductSubCat}
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={10}>Men</MenuItem>
                                <MenuItem value={20}>Women</MenuItem>
                                <MenuItem value={30}>Kids</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product price</h3>
                            <input type="number" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product old price</h3>
                            <input type="number" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 mb-3 gap-4'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Is featured?</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productFeature}
                                label="isFeatured"
                                onChange={handleChangeProductFeature}
                            >
                                <MenuItem value={10}>True</MenuItem>
                                <MenuItem value={20}>False</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product stock</h3>
                            <input type="number" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product brand</h3>
                            <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm' />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product discount</h3>
                            <input type="number" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 mb-3 gap-4'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product RAMS</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productRams}
                                label="RAMS"
                                onChange={handleChangeProductRams}
                            >
                                <MenuItem value={''}>None</MenuItem>
                                <MenuItem value={'4GB'}>4GB</MenuItem>
                                <MenuItem value={'8GB'}>8GB</MenuItem>
                                <MenuItem value={'16GB'}>16GB</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product weight</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productWeight}
                                label="Category"
                                onChange={handleChangeProductWeight}
                            >
                                <MenuItem value={''}>None</MenuItem>
                                <MenuItem value={10}>10 kg</MenuItem>
                                <MenuItem value={20}>20 kg</MenuItem>
                                <MenuItem value={30}>30 kg</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product size</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productSize}
                                label="Category"
                                onChange={handleChangeProductSize}
                            >
                                <MenuItem value={''}>None</MenuItem>
                                <MenuItem value={'S'}>S</MenuItem>
                                <MenuItem value={'M'}>M</MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product rating</h3>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                    </div>
                    <div className='col w-full p-5 px-0'>
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Published</h3>

                        <div className='grid grid-cols-7 gap-4'>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                    <LazyLoadImage className='w-full h-full object-cover' alt={"image"} effect='blur' wrapperProps={{ style: { transitionDelay: "1s" } }} src={'https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg'} />
                                </div>
                            </div>
                            <UploadBox multiple={true} />
                        </div>
                    </div>
                </div>
                <hr />
                <br />
                <Button type='button' className='btn-blue btn-lg w-full flex gap-2'>
                    <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view
                </Button>
            </form>
        </section>
    )
}
export default AddProduct;
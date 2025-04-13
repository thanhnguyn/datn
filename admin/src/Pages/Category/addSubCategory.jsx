import React, { useState } from 'react'
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const AddSubCategory = () => {
    const [productCat, setProductCat] = useState('');
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };
    return (

        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8'>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-4 mb-3 gap-5'>
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
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub category name</h3>
                            <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' />
                        </div>
                    </div>
                    <br />

                </div>

                <div className='w-[250px]'>
                    <Button type='button' className='btn-blue btn-lg w-full flex gap-2'>
                        <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view
                    </Button>
                </div>
            </form>
        </section>
    )
}
export default AddSubCategory;
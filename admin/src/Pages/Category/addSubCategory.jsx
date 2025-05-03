import React, { useContext, useState } from 'react'
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
const AddSubCategory = () => {
    const [productCat, setProductCat] = useState('');
    const [productCat2, setProductCat2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const [formFields, setFormFields] = useState({
        name: '',
        parentCatName: null,
        parentId: null
    });

    const [formFields2, setFormFields2] = useState({
        name: '',
        parentCatName: null,
        parentId: null
    });

    const context = useContext(MyContext);

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.parentId = event.target.value;
    };

    const handleChangeProductCat2 = (event) => {
        setProductCat2(event.target.value);
        formFields2.parentId = event.target.value;
    };

    const selectedCatFun = (catName) => {
        formFields.parentCatName = catName;
    }

    const selectedCatFun2 = (catName) => {
        formFields2.parentCatName = catName;
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        const catId = productCat;
        setProductCat(catId);

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    }

    const onChangeInput2 = (e) => {
        const { name, value } = e.target;

        const catId = productCat2;
        setProductCat2(catId);

        setFormFields2(() => {
            return {
                ...formFields2,
                [name]: value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.name === "") {
            context.openAlertBox("error", "Please enter category name.");
            setIsLoading(false);
            return false;
        }

        if (productCat === 0) {
            context.openAlertBox("error", "Please select parent category.");
            setIsLoading(false);
            return false;
        }

        postData("/api/category/create", formFields).then((res) => {
            context.openAlertBox('success', res.message);
            setTimeout(() => {
                setIsLoading(false);
                context.setIsOpenFullScreenPanel({ open: false });
                fetchDataFromApi('/api/category').then((res) => {
                    context?.setCatData(res?.data);
                });
            }, 1500);
        });
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();

        setIsLoading2(true);

        if (formFields2.name === "") {
            context.openAlertBox("error", "Please enter category name.");
            setIsLoading2(false);
            return false;
        }

        if (productCat2 === 0) {
            context.openAlertBox("error", "Please select parent category.");
            setIsLoading2(false);
            return false;
        }

        postData("/api/category/create", formFields2).then((res) => {
            context.openAlertBox('success', res.message);
            setTimeout(() => {
                setIsLoading2(false);
                context.setIsOpenFullScreenPanel({ open: false });
                fetchDataFromApi('/api/category').then((res) => {
                    context?.setCatData(res?.data);
                });
            }, 1500);
        });
    }

    return (

        <section className='p-5 bg-gray-50 grid grid-cols-2 gap-10'>
            <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
                <h4 className='font-[600]'>Add sub category</h4>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-2 mb-3 gap-5'>
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
                                {
                                    context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item?._id} onClick={selectedCatFun(item?.name)}>{item?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub category name</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='name'
                                value={formFields.name}
                                onChange={onChangeInput} />
                        </div>
                    </div>
                    <br />

                </div>

                <div className='w-[250px]'>
                    <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
                        {
                            isLoading === true ? <CircularProgress color="inherit" /> : <>
                                <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view</>
                        }
                    </Button>
                </div>
            </form>

            <form action="" className='form py-3 p-8' onSubmit={handleSubmit2}>
                <h4 className='font-[600]'>Add third level category</h4>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-2 mb-3 gap-5'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product sub category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat2}
                                label="Category"
                                onChange={handleChangeProductCat2}
                            >
                                {
                                    context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                        return (
                                            item?.children?.length !== 0 && item?.children?.map((item2, index) => {
                                                return (<MenuItem key={index} value={item2?._id} onClick={selectedCatFun2(item2?.name)}>{item2?.name}</MenuItem>)
                                            })
                                        )

                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Third level category name</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='name'
                                value={formFields2.name}
                                onChange={onChangeInput2} />
                        </div>
                    </div>
                    <br />

                </div>

                <div className='w-[250px]'>
                    <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
                        {
                            isLoading2 === true ? <CircularProgress color="inherit" /> : <>
                                <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view</>
                        }
                    </Button>
                </div>
            </form>
        </section>
    )
}
export default AddSubCategory;
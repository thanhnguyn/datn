import React, { useContext, useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, CircularProgress, Rating, TextField } from '@mui/material';
import UploadBox from '../../components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AddProduct = () => {

    const [formFields, setFormFields] = useState({
        name: "",
        description: '',
        image: [],
        brand: '',
        price: '',
        oldPrice: '',
        category: '',
        catName: '',
        catId: '',
        subCatId: '',
        subCat: '',
        thirdSubCat: '',
        thirdSubCatId: '',
        countInStock: '',
        rating: '0',
        isFeatured: false,
        discount: '0',
        attribute: {},
        bannerTitleName: '',
        bannerImage: [],
        isDisplayOnHomeBanner: false
    });

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
    const [productFeature, setProductFeature] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [newAttributeKey, setNewAttributeKey] = useState('');
    const [newAttributeValues, setNewAttributeValues] = useState('');

    const [previews, setPreviews] = useState([]);
    const [bannerPreviews, setBannerPreviews] = useState([]);

    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const history = useNavigate();
    const context = useContext(MyContext);

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
        formFields.category = event.target.value;
        // formFields.catName = event.target.value;
    };

    const selectCatByName = (name) => {
        formFields.catName = name;
    };

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formFields.subCatId = event.target.value;
    };

    const selectSubCatByName = (name) => {
        formFields.subCat = name;
    };

    const handleChangeProductThirdLevelCat = (event) => {
        setProductThirdLevelCat(event.target.value);
        formFields.thirdSubCatId = event.target.value;
    };

    const selectThirdLevelCatByName = (name) => {
        formFields.thirdSubCat = name;
    };

    const handleChangeProductFeature = (event) => {
        const value = event.target.value === "true"; // ép kiểu từ chuỗi sang boolean
        setProductFeature(event.target.value);
        setFormFields(prev => ({
            ...prev,
            isFeatured: value
        }));
    };



    const onChangeInput = (e) => {
        const { name, value } = e.target;

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    }

    const setPreviewsFun = (previewsArr) => {
        const imgArr = previews;
        for (let i = 0; i < previewsArr.length; i++) {
            imgArr.push(previewsArr[i]);
        }

        setPreviews([]);
        setTimeout(() => {
            setPreviews(imgArr);
            formFields.image = imgArr;
        }, 10);
    }

    const setBannerPreviewsFun = (previewsArr) => {
        const imgArr = bannerPreviews;
        for (let i = 0; i < previewsArr.length; i++) {
            imgArr.push(previewsArr[i]);
        }

        setBannerPreviews([]);
        setTimeout(() => {
            setBannerPreviews(imgArr);
            formFields.bannerImage = imgArr;
        }, 10);
    }

    const removeProductImg = (image, index) => {
        const imageArr = [...previews];
        deleteImages(`/api/product/deleteImage?img=${image}`).then(() => {
            imageArr.splice(index, 1);
            setPreviews([]);
            setTimeout(() => {
                setPreviews(imageArr);
                setFormFields(prev => ({ ...prev, image: imageArr }));
            }, 100);
        });
    };

    const removeBannerImg = (image, index) => {
        const imageArr = [...bannerPreviews];
        deleteImages(`/api/product/deleteImage?img=${image}`).then(() => {
            imageArr.splice(index, 1);
            setBannerPreviews([]);
            setTimeout(() => {
                setBannerPreviews(imageArr);
                setFormFields(prev => ({ ...prev, bannerImage: imageArr }));
            }, 100);
        });
    };

    const handleChangeSwitch = (event) => {
        setCheckedSwitch(event.target.checked);
        setFormFields.isDisplayOnHomeBanner = event.target.checked;
    }

    const handleAddNewAttribute = () => {
        if (!newAttributeKey || !newAttributeValues) {
            context.openAlertBox("error", "Please provide attribute name and values.");
            return;
        }

        const valuesArray = newAttributeValues.split(',').map(v => v.trim());

        setFormFields(prev => ({
            ...prev,
            attribute: {
                ...prev.attribute,
                [newAttributeKey]: valuesArray
            }
        }));
        setNewAttributeKey('');
        setNewAttributeValues('');
    };

    const handleRemoveAttribute = (keyToRemove) => {
        setFormFields(prev => {
            const updatedAttributes = { ...prev.attribute };
            delete updatedAttributes[keyToRemove];
            return {
                ...prev,
                attribute: updatedAttributes
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.name === "") {
            context.openAlertBox("error", "Please enter product name.");
            setIsLoading(false);
            return false;
        }

        if (formFields.description === "") {
            context.openAlertBox("error", "Please enter product description.");
            setIsLoading(false);
            return false;
        }

        if (formFields.catId === "") {
            context.openAlertBox("error", "Please select product category.");
            setIsLoading(false);
            return false;
        }

        if (formFields.price === "") {
            context.openAlertBox("error", "Please enter product price.");
            setIsLoading(false);
            return false;
        }

        if (formFields.oldPrice === "") {
            context.openAlertBox("error", "Please enter product old price.");
            setIsLoading(false);
            return false;
        }

        if (formFields.countInStock === "") {
            context.openAlertBox("error", "Please enter product stock.");
            setIsLoading(false);
            return false;
        }

        if (formFields.brand === "") {
            context.openAlertBox("error", "Please enter product brand.");
            setIsLoading(false);
            return false;
        }

        formFields.discount = Math.floor((formFields.oldPrice - formFields.price) * 100 / formFields.oldPrice);

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please select images for product.");
            setIsLoading(false);
            return false;
        }

        postData('/api/product/create', formFields).then((res) => {
            if (res?.error === false) {
                context?.openAlertBox('success', res?.message);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({ open: false });
                    history('/products')
                }, 1000);
            } else {
                context?.openAlertBox('error', res?.message);
                setIsLoading(false);
            }
        });
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4'>
                    <div className='grid grid-cols-1 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product name</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='name'
                                value={formFields.name}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product description</h3>
                            <textarea
                                type="text"
                                className='w-full h-[140x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='description'
                                value={formFields.description}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 mb-3 gap-4'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product category</h3>
                            {
                                context?.catData?.length !== 0
                                &&
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
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                <MenuItem value={cat?._id} onClick={() => selectCatByName(cat?.name)}>{cat?.name}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product sub category</h3>
                            {
                                context?.catData?.length !== 0
                                &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productSubCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem value={subCat?._id} onClick={() => selectSubCatByName(subCat?.name)}>{subCat?.name}</MenuItem>
                                                    );
                                                })
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product third level category</h3>
                            {
                                context?.catData?.length !== 0
                                &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productThirdLevelCat}
                                    label="Third level Category"
                                    onChange={handleChangeProductThirdLevelCat}
                                >
                                    {
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                                                    return (
                                                        subCat?.children?.length !== 0 && subCat?.children?.map((thirdSubCat, index) => {
                                                            return (
                                                                <MenuItem value={thirdSubCat?._id} key={index} onClick={() => selectThirdLevelCatByName(thirdSubCat?.name)}>{thirdSubCat?.name}</MenuItem>
                                                            );
                                                        })
                                                    );
                                                })
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product price</h3>
                            <input
                                type="number"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                name='price'
                                value={formFields.price}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product old price</h3>
                            <input
                                type="number"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                name='oldPrice'
                                value={formFields.oldPrice}
                                onChange={onChangeInput}
                            />
                        </div>
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
                                <MenuItem value='true'>True</MenuItem>
                                <MenuItem value='false'>False</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product stock</h3>
                            <input
                                type="number"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                name='countInStock'
                                value={formFields.countInStock}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product brand</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm'
                                name='brand'
                                value={formFields.brand}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className='col-span-4 bg-white p-4 rounded border border-gray-200 mb-4'>
                        <h3 className='text-[16px] font-semibold text-black mb-3'>Add New Attribute</h3>
                        <div className='grid grid-cols-3 gap-4'>
                            <TextField
                                label="Attribute Name"
                                size='small'
                                value={newAttributeKey}
                                onChange={(e) => setNewAttributeKey(e.target.value)}
                                placeholder='e.g. color, material'
                            />
                            <TextField
                                label="Attribute Values (comma separated)"
                                size='small'
                                value={newAttributeValues}
                                onChange={(e) => setNewAttributeValues(e.target.value)}
                                placeholder='e.g. red, green, blue'
                            />
                            <Button
                                variant="contained"
                                onClick={handleAddNewAttribute}
                                className='bg-blue-600 text-white'
                            >
                                Add Attribute
                            </Button>
                            {Object.entries(formFields.attribute).map(([key, values]) => (
                                <div key={key} className='mt-2 flex items-center gap-2'>
                                    <div className='text-sm'>
                                        <strong>{key}:</strong> {values.join(', ')}
                                    </div>
                                    <Button
                                        type='button'
                                        className='!min-w-0 !w-6 !h-6 !bg-red-500 !text-white !rounded-full flex items-center justify-center hover:!bg-red-600'
                                        onClick={() => handleRemoveAttribute(key)}
                                    >
                                        x
                                    </Button>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='col w-full p-5 px-0'>
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Image</h3>
                        <div className='grid grid-cols-7 gap-4'>
                            {
                                previews?.length !== 0 && previews?.map((image, index) => {
                                    return (
                                        <div className='uploadBoxWrapper relative' key={index}>
                                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeProductImg(image, index)}><IoMdClose className='text-white text-[17px]' /></span>
                                            <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                                <img src={image} alt={"image"} className='w-[100px]' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <UploadBox multiple={true} name='images' url='/api/product/uploadImages' setPreviewsFun={setPreviewsFun} />
                        </div>
                    </div>
                    <div className='col w-full p-5 px-0'>
                        <div className='shadow-mg bg-white p-4 w-full'>
                            <div className='flex items-center gap-8'>
                                <h3 className='font-[700] text-[18px] mb-3'>Banner image</h3>
                                <Switch {...label} onChange={handleChangeSwitch} checked={checkedSwitch} />
                            </div>
                            <div className='grid grid-cols-7 gap-4'>
                                {
                                    bannerPreviews?.length !== 0 && bannerPreviews?.map((image, index) => {
                                        return (
                                            <div className='uploadBoxWrapper relative' key={index}>
                                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeBannerImg(image, index)}><IoMdClose className='text-white text-[17px]' /></span>
                                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                                    <img src={image} alt={"image"} className='w-[100px]' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <UploadBox multiple={false} name='images' url='/api/product/uploadBannerImage' setPreviewsFun={setBannerPreviewsFun} />
                            </div>
                            <br />
                            <h3 className='font-[700] text-[18px] mb-3'>Banner Title</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='bannerTitleName'
                                onChange={onChangeInput}
                            />

                        </div>

                    </div>

                </div>
                <hr />
                <br />
                <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
                    {
                        isLoading === true ? <CircularProgress color="inherit" /> : <>
                            <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view</>
                    }
                </Button>
            </form>
        </section >
    )
}
export default AddProduct;
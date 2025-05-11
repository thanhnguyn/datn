import React, { useContext, useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, CircularProgress, Rating } from '@mui/material';
import UploadBox from '../../components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, editData, fetchDataFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {

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
        rating: '',
        isFeatured: false,
        discount: '',
        productRam: [],
        size: [],
        productWeight: []
    });

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
    const [productFeature, setProductFeature] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productSize, setProductSize] = useState([]);

    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();
    const context = useContext(MyContext);

    useEffect(() => {
        fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then((res) => {
            setFormFields({
                name: res?.product?.name,
                description: res?.product?.description,
                images: res?.product?.images,
                brand: res?.product?.brand,
                price: res?.product?.price,
                oldPrice: res?.product?.oldPrice,
                category: res?.product?.category,
                catName: res?.product?.catName,
                catId: res?.product?.catId,
                subCatId: res?.product?.subCatId,
                subCat: res?.product?.subCat,
                thirdSubCat: res?.product?.thirdSubCat,
                thirdSubCatId: res?.product?.thirdSubCatId,
                countInStock: res?.product?.countInStock,
                rating: res?.product?.rating,
                isFeatured: res?.product?.isFeatured,
                discount: res?.product?.discount,
                productRam: res?.product?.productRam,
                size: res?.product?.size,
                productWeight: res?.product?.productWeight
            });

            setProductCat(res?.product?.catId);
            setProductSubCat(res?.product?.subCatId);
            setProductThirdLevelCat(res?.product?.thirdSubCatId);
            setProductFeature(res?.product?.isFeatured);
            setProductRams(res?.product?.productRam);
            setProductSize(res?.product?.size);
            setProductWeight(res?.product?.productWeight);

            setPreviews(res?.product?.images);
        });
    }, []);

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
        formFields.category = event.target.value;
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
        setProductFeature(event.target.value);
        formFields.isFeatured = event.target.value;
    };

    const handleChangeProductRams = (event) => {
        const { target: { value } } = event;
        setProductRams(
            typeof value === "string" ? value.split(",") : value
        );
        formFields.productRam = value;
    };
    const handleChangeProductWeight = (event) => {
        const { target: { value } } = event;
        setProductWeight(
            typeof value === "string" ? value.split(",") : value
        );
        formFields.productWeight = value;
    };
    const handleChangeProductSize = (event) => {
        const { target: { value } } = event;
        setProductSize(
            typeof value === "string" ? value.split(",") : value
        );
        formFields.size = value;
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

    const onChangeRating = (value) => {
        formFields.rating = value;
    }


    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr);
        setFormFields(prev => ({
            ...prev,
            images: previewsArr
        }));
    };


    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
            imageArr.splice(index, 1);
            setPreviews([]);

            setTimeout(() => {
                setPreviews(imageArr);
                setFormFields(prev => ({
                    ...prev,
                    images: imageArr
                }));

            }, 100);
        })
    }

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

        if (formFields.discount === "") {
            context.openAlertBox("error", "Please enter product discount.");
            setIsLoading(false);
            return false;
        }

        if (formFields.rating === "") {
            context.openAlertBox("error", "Please enter product rating.");
            setIsLoading(false);
            return false;
        }

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please select images for product.");
            setIsLoading(false);
            return false;
        }

        editData(`/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
            if (res?.data?.error === false) {
                context?.openAlertBox('success', res?.data?.message);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({ open: false });
                    history('/products')
                }, 1000);
            } else {
                context?.openAlertBox('error', res?.data?.message);
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
                                                <MenuItem value={cat?._id} key={index} onClick={() => selectCatByName(cat?.name)}>{cat?.name}</MenuItem>
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
                                                        <MenuItem value={subCat?._id} key={index} onClick={() => selectSubCatByName(subCat?.name)}>{subCat?.name}</MenuItem>
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
                                <MenuItem value={10}>True</MenuItem>
                                <MenuItem value={20}>False</MenuItem>
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
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product discount</h3>
                            <input
                                type="number"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-[10px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                name='discount'
                                value={formFields.discount}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product RAMS</h3>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productRams}
                                label="RAMS"
                                onChange={handleChangeProductRams}
                            >
                                <MenuItem value={'4GB'}>4GB</MenuItem>
                                <MenuItem value={'8GB'}>8GB</MenuItem>
                                <MenuItem value={'16GB'}>16GB</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product weight</h3>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productWeight}
                                label="Category"
                                onChange={handleChangeProductWeight}
                            >
                                <MenuItem value={10}>10 kg</MenuItem>
                                <MenuItem value={20}>20 kg</MenuItem>
                                <MenuItem value={30}>30 kg</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product size</h3>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productSize}
                                label="Category"
                                onChange={handleChangeProductSize}
                            >
                                <MenuItem value={'S'}>S</MenuItem>
                                <MenuItem value={'M'}>M</MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product rating</h3>
                            <Rating
                                name="rating"
                                value={formFields.rating}
                                onChange={(event, newValue) => onChangeRating(newValue)}
                            />
                        </div>
                    </div>
                    <div className='col w-full p-5 px-0'>
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Image</h3>

                        <div className='grid grid-cols-7 gap-4'>
                            {
                                previews?.length !== 0 && previews?.map((image, index) => {
                                    return (
                                        <div className='uploadBoxWrapper relative' key={index}>
                                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}><IoMdClose className='text-white text-[17px]' /></span>
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
        </section>
    )
}
export default EditProduct;
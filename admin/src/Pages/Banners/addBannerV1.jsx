import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, CircularProgress } from '@mui/material';
import UploadBox from '../../components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddBannerV1 = () => {

    const [formFields, setFormFields] = useState({
        catId: '',
        bannerTitle: '',
        subCatId: '',
        thirdSubCatId: '',
        price: '',
        alignInfo: ''
    });

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
    const [alignInfo, setAlignInfo] = useState('');
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();

    const context = useContext(MyContext);

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
    };

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formFields.subCatId = event.target.value;
    };

    const handleChangeProductThirdLevelCat = (event) => {
        setProductThirdLevelCat(event.target.value);
        formFields.thirdSubCatId = event.target.value;
    };

    const handleChangeAlignInfo = (event) => {
        setAlignInfo(event.target.value);
        formFields.alignInfo = event.target.value;
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

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/bannerV1/deleteImage?img=${image}`).then((res) => {
            imageArr.splice(index, 1);
            setPreviews([]);

            setTimeout(() => {
                setPreviews(imageArr);
                setFormFields.images = imageArr;
            }, 100);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.bannerTitle === "") {
            context.openAlertBox("error", "Please enter banner title.");
            setIsLoading(false);
            return false;
        }

        if (formFields.price === "") {
            context.openAlertBox("error", "Please enter price.");
            setIsLoading(false);
            return false;
        }

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please enter image.");
            setIsLoading(false);
            return false;
        }

        postData('/api/bannerV1/add', formFields).then((res) => {
            setTimeout(() => {
                setIsLoading(false);
                context.openAlertBox("success", res?.message);
                context.setIsOpenFullScreenPanel({
                    open: false
                });
                history('/bannerV1/list');
            }, 300);
        });

    }

    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-5 mb-3 gap-5'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Banner Title</h3>
                            <input
                                type="text"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='bannerTitle'
                                value={formFields.bannerTitle}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Category</h3>
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
                                                <MenuItem value={cat?._id} key={index}>{cat?.name}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub category</h3>
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
                                                        <MenuItem value={subCat?._id} key={index_}>{subCat?.name}</MenuItem>
                                                    );
                                                })
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Third level category</h3>
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
                                                        subCat?.children?.length !== 0 && subCat?.children?.map((thirdSubCat, index__) => {
                                                            return (
                                                                <MenuItem value={thirdSubCat?._id} key={index__}>{thirdSubCat?.name}</MenuItem>
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
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Align</h3>
                            {
                                context?.catData?.length !== 0
                                &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={alignInfo}
                                    label="Align Info"
                                    onChange={handleChangeAlignInfo}
                                >
                                    <MenuItem value={'left'}>Left</MenuItem>
                                    <MenuItem value={'right'}>Right</MenuItem>
                                </Select>
                            }
                        </div>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Price</h3>
                            <input
                                type="number"
                                className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='price'
                                value={formFields.price}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <br />
                    <h3 className='text-[18px] font-[500] mb-0 text-black'>Image</h3>
                    <br />
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

                        <UploadBox multiple={true} name='images' url='/api/bannerV1/uploadImages' setPreviewsFun={setPreviewsFun} />
                    </div>
                </div>

                <br />

                <div className='w-[250px]'>
                    <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
                        {
                            isLoading === true ? <CircularProgress color="inherit" /> : <>
                                <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view</>
                        }
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddBannerV1;

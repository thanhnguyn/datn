import React from 'react'
import { Button, CircularProgress } from '@mui/material';
import UploadBox from '../../components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
const AddHomeSlide = () => {
    const [formFields, setFormFields] = useState({
        images: []
    });

    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);

    const history = useNavigate();

    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr);
        setFormFields.images = previewsArr;
    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/homeSlides/deleteImage?img=${image}`).then((res) => {
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

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please enter image.");
            setIsLoading(false);
            return false;
        }

        postData("/api/homeSlides/add", formFields).then((res) => {
            context.openAlertBox('success', res.message);
            setTimeout(() => {
                setIsLoading(false);
                context.setIsOpenFullScreenPanel({ open: false });

                history('/homeSlider/list');
            }, 1500);
        });
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
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

                        <UploadBox multiple={false} name='images' url='/api/homeSlides/uploadImages' setPreviewsFun={setPreviewsFun} />
                    </div>
                </div>
                <br />

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
        </section >
    )
}
export default AddHomeSlide;
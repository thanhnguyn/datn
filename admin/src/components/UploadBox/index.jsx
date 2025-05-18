import React, { useContext, useState } from 'react'
import { FaRegImages } from "react-icons/fa6";
import { uploadImages } from '../../utils/api';
import { MyContext } from '../../App';
import { CircularProgress } from '@mui/material';

const UploadBox = (props) => {
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const context = useContext(MyContext);

    let selectedImages = [];

    const formdata = new FormData();

    const onChangeFile = async (e, apiEndpoint) => {
        try {
            setPreviews([]);
            setUploading(true);

            const files = e.target.files;
            const validImages = [];
            const formdata = new FormData();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (
                    file &&
                    (file.type === "image/jpeg" ||
                        file.type === "image/jpg" ||
                        file.type === "image/png" ||
                        file.type === "image/webp")
                ) {
                    validImages.push(file);
                    formdata.append(props?.name || 'images', file);
                } else {
                    context.openAlertBox('error', "Please select valid JPG, WEBP, JPEG or PNG images.");
                    setUploading(false);
                    return;
                }
            }

            const res = await uploadImages(apiEndpoint, formdata);
            props.setPreviewsFun(res?.data?.images || []);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };


    return (
        <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
            {
                uploading === true ?
                    <>
                        <CircularProgress />
                        <h4 className='text-center'>Uploading...</h4>
                    </>
                    :
                    <>
                        <FaRegImages className='text-[40px] opacity-35 pointer-events-none' />
                        <h4 className='text-[14px] pointer-events-none'>Image upload</h4>
                        <input
                            type="file"
                            accept='image/*'
                            multiple={props.multiple !== undefined ? props.multiple : false}
                            className='absolute top-0 left-0 w-full h-full z-50 opacity-0'
                            onChange={(e) => {
                                onChangeFile(e, props?.url)
                            }}
                            name={props?.name}
                        />
                    </>
            }
        </div>
    )
}
export default UploadBox;
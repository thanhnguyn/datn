import HomeSliderModel from "../models/homeSlider.model.js";

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true
});

var imagesArr = [];
export async function uploadImagesController(request, response) {
    try {
        imagesArr = [];

        const image = request.files;

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false
        };

        for (let i = 0; i < image?.length; i++) {
            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                }
            );
        }

        return response.status(200).json({
            images: imagesArr
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function addHomeSlideController(request, response) {
    try {
        let slide = new HomeSliderModel({
            images: imagesArr
        });

        if (!slide) {
            return response.status(500).json({
                message: 'Slide not created.',
                error: true,
                success: false
            });
        }

        slide = await slide.save();

        imagesArr = [];

        return response.status(200).json({
            message: "Slide created.",
            error: false,
            success: true,
            slide: slide
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getHomeSlidesController(request, response) {
    try {
        const slides = await HomeSliderModel.find();
        if (!slides) {
            return response.status(404).json({
                message: 'Slide not found.',
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: slides
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getSlideController(request, response) {
    try {
        const slide = await HomeSliderModel.findById(request.params.id);
        if (!slide) {
            response.status(500).json({
                message: "The slide with the given ID is not found.",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            succes: true,
            slide: slide
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function removeImageFromCloudinaryController(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {

            }
        );

        if (res) {
            return response.status(200).json({
                error: false,
                success: true,
                message: "Image deleted successfully."
            });
        }
    }

}



export async function deleteSlideController(request, response) {
    const slide = await HomeSliderModel.findById(request.params.id);
    const images = slide.images;

    for (let img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {

            });
        }
    }

    const deletedSlide = await HomeSliderModel.findByIdAndDelete(request.params.id);
    if (!deletedSlide) {
        return response.status(404).json({
            message: "Slide not found",
            success: false,
            error: true
        });
    }

    return response.status(200).json({
        success: true,
        error: false,
        message: "Slide deleted."
    });
}


export async function updateSlideController(request, response) {
    const slide = await HomeSliderModel.findByIdAndUpdate(
        request.params.id,
        {
            images: imagesArr.length > 0 ? imagesArr[0] : request.body.images
        },
        {
            new: true
        }
    );
    if (!slide) {
        return response.status(500).json({
            message: "Slide cannot be updated.",
            error: true,
            success: false
        });
    }

    imagesArr = [];

    response.status(200).json({
        error: false,
        success: true,
        slide: slide,
        message: "Slide updated successfully."
    });
}


export async function deleteMultipleSlideController(request, response) {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids)) {
        return response.status(400).json({
            error: true,
            success: false,
            message: "Invalid input"
        });
    }

    for (let i = 0; i < ids.length; i++) {
        const slide = await HomeSliderModel.findById(ids[i]);

        const images = slide.images;

        let img = '';
        for (img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split('/');
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];

            if (imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {
                    // console.log(error, result);
                })
            }
        }
    }
    try {
        await HomeSliderModel.deleteMany({
            _id: {
                $in: ids
            }
        });

        return response.status(200).json({
            message: 'Slides deleted successfully',
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
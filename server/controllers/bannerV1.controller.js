import BannerV1Model from "../models/bannerV1.model.js";

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


export async function addBannerController(request, response) {
    try {
        let banner = new BannerV1Model({
            bannerTitle: request.body.bannerTitle,
            images: imagesArr,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            thirdSubCatId: request.body.thirdSubCatId,
            price: request.body.price,
            alignInfo: request.body.alignInfo
        });
        if (!banner) {
            return response.status(500).json({
                message: "Banner not created.",
                error: true,
                success: false
            });
        }

        banner = await banner.save();

        imagesArr = [];

        return response.status(200).json({
            message: "Banner created",
            error: false,
            success: true,
            banner: banner
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getBannersController(request, response) {
    try {
        const banners = await BannerV1Model.find();

        if (!banners) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: banners
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getBannerController(request, response) {
    try {
        const banner = await BannerV1Model.findById(request.params.id);
        if (!banner) {
            response.status(500).json({
                message: "The banner with the given ID is not found.",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            succes: true,
            banner: banner
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function deleteBannerController(request, response) {
    const banner = await BannerV1Model.findById(request.params.id);
    const images = banner.images;

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

    const deletedBanner = await BannerV1Model.findByIdAndDelete(request.params.id);
    if (!deletedBanner) {
        response.status(404).json({
            message: "Banner not found",
            success: false,
            error: true
        });
    }

    response.status(200).json({
        success: true,
        error: false,
        message: "Banner deleted."
    });
}


export async function updateBannerController(request, response) {
    const banner = await BannerV1Model.findByIdAndUpdate(
        request.params.id,
        {
            bannerTitle: request.body.bannerTitle,
            images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            thirdSubCatId: request.body.thirdSubCatId,
            price: request.body.price
        },
        {
            new: true
        }
    );
    if (!banner) {
        return response.status(500).json({
            message: "Banner cannot be updated.",
            error: true,
            success: false
        });
    }

    imagesArr = [];

    response.status(200).json({
        error: false,
        success: true,
        banner: banner,
        message: "Banner updated successfully."
    });
}


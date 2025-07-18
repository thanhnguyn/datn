import ProductModel from "../models/product.model.js";

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

var bannerImage = [];
export async function uploadBannerImagesController(request, response) {
    try {
        bannerImage = [];

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
                    bannerImage.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                }
            );
        }

        return response.status(200).json({
            images: bannerImage
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function createProductController(request, response) {
    try {
        let product = new ProductModel({
            name: request.body.name,
            description: request.body.description,
            images: imagesArr,
            bannerImage: bannerImage,
            bannerTitleName: request.body.bannerTitleName,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            category: request.body.category,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            thirdsubCatId: request.body.thirdsubCatId,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            isfeatured: request.body.isfeatured,
            discount: request.body.discount,
            attribute: request.body.attribute
        });

        product = await product.save();
        if (!product) {
            return response.status(500).json({
                message: "Product not created",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        response.status(200).json({
            message: "Product created successfully.",
            error: false,
            success: true,
            product: product
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find().populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsByCatIdController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            catId: request.params.id
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsByCatNameController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            catName: request.query.catName
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsBySubCatIdController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            subCatId: request.params.id
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsBySubCatNameController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            subCat: request.query.subCat
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsByThirdLevelCatIdController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            thirdsubCatId: request.params.id
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getAllProductsByThirdLevelCatNameController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        const products = await ProductModel.find({
            thirdsubCat: request.query.thirdsubCat
        })
            .populate('category')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllProductsByPriceController(request, response) {
    let productList = [];

    if (request.query.catId !== "" && request.query.catId !== undefined) {
        const productListArr = await ProductModel.find({
            catId: request.query.catId,
        }).populate('category');

        productList = productListArr;
    }

    if (request.query.subCatId !== "" && request.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({
            subCatId: request.query.subCatId,
        }).populate('category');

        productList = productListArr;
    }

    if (request.query.thirdsubCatId !== "" && request.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.query.thirdsubCatId,
        }).populate('category');

        productList = productListArr;
    }

    const filteredProducts = productList.filter((product) => {
        if (request.query.minPrice && product.price < parseInt(+request.query.minPrice)) {
            return false;
        } else if (request.query.maxPrice && product.price > parseInt(+request.query.maxPrice)) {
            return false;
        } else return true;
    });

    return response.status(200).json({
        error: false,
        success: true,
        products: filteredProducts,
        totalPages: 0,
        page: 0
    });
}


export async function getAllProductsByRatingController(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found.",
                success: false,
                error: true
            });
        }

        let products = [];
        if (request.query.catId !== undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                catId: request.query.catId
            })
                .populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }
        if (request.query.subCatId !== undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                subCatId: request.query.subCatId
            })
                .populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }
        if (request.query.thirdsubCatId !== undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                thirdsubCatId: request.query.thirdsubCatId
            })
                .populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getProductsCountController(request, response) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if (!productsCount) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            productsCount: productsCount
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getAllFeaturedProductsController(request, response) {
    try {
        const products = await ProductModel.find({
            isfeatured: true
        });
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function deleteProductController(request, response) {
    const product = await ProductModel.findById(request.params.id).populate('category');
    if (!product) {
        return response.status(404).json({
            message: "Product not found",
            error: true,
            success: false
        });
    }

    const images = product.images;

    for (let img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];
        if (imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {

            });
        }
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(request.params.id);
    if (!deletedProduct) {
        return response.status(404).json({
            message: "Product not deleted",
            success: false,
            error: true
        });
    }

    return response.status(200).json({
        success: true,
        error: false,
        message: "Product deleted."
    });
}

export async function deleteMultipleProductController(request, response) {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids)) {
        return response.status(400).json({
            error: true,
            success: false,
            message: "Invalid input"
        });
    }

    for (let i = 0; i < ids.length; i++) {
        const product = await ProductModel.findById(ids[i]);

        const images = product.images;

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
        await ProductModel.deleteMany({
            _id: {
                $in: ids
            }
        });

        return response.status(200).json({
            message: 'Product deleted successfully',
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

export async function getProductController(request, response) {
    try {
        const product = await ProductModel.findById(request.params.id).populate('category');
        if (!product) {
            return response.status(500).json({
                error: true,
                success: false,
                message: "Product not found."
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            product: product
        });
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


export async function updateProductController(request, response) {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,
            {
                name: request.body.name,
                description: request.body.description,
                images: request.body.images,
                bannerImage: request.body.bannerImage,
                bannerTitleName: request.body.bannerTitleName,
                isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
                brand: request.body.brand,
                price: request.body.price,
                oldPrice: request.body.oldPrice,
                catId: request.body.catId,
                catName: request.body.catName,
                subCat: request.body.subCat,
                subCatId: request.body.subCatId,
                category: request.body.category,
                thirdsubCat: request.body.thirdsubCat,
                thirdsubCatId: request.body.thirdsubCatId,
                countInStock: request.body.countInStock,
                rating: request.body.rating,
                isFeatured: request.body.isFeatured,
                attribute: request.body.attribute
            },
            {
                new: true
            }
        );
        if (!product) {
            return response.status(404).json({
                message: 'The product cannot be updated.',
                status: false
            });
        }

        imagesArr = [];

        return response.status(200).json({
            message: "The product is updated.",
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

export async function filtersController(request, response) {
    const { catId, subCatId, thirdsubCatId, minPrice, maxPrice, rating, page, limit } = request.body;

    const filters = {};

    if (catId?.length) {
        filters.catId = { $in: catId };
    }

    if (subCatId?.length) {
        filters.subCatId = { $in: subCatId };
    }

    if (thirdsubCatId?.length) {
        filters.thirdsubCatId = { $in: thirdsubCatId };
    }

    if (minPrice || maxPrice) {
        filters.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity };
    }

    if (rating?.length) {
        filters.rating = { $in: rating };
    }

    try {
        const products = await ProductModel.find(filters).populate('category').skip((page - 1) * limit).limit(parseInt(limit));

        const total = await ProductModel.countDocuments(filters);

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            total: total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

const sortItems = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if (sortBy === 'name') {
            return order === 'asc' ? a.name.localeCompare(b.name) :
                b.name.localeCompare(a.name);
        }

        if (sortBy === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price
        }

        return;
    });


};
export async function sortByController(request, response) {
    const { products, sortBy, order } = request.body;
    const sortedItems = sortItems([...products?.products], sortBy, order);

    return response.status(200).json({
        error: false,
        success: true,
        products: sortedItems,
        page: 0,
        totalPages: 0
    });
}


export async function searchProductController(request, response) {
    try {
        const { query, page = 1, limit = 10 } = request.body;

        if (!query) {
            return response.status(400).json({
                error: true,
                success: false,
                message: 'Query is required.'
            });
        }

        const queryKeywords = query
            .split(' ')
            .map(keyword => keyword.trim())
            .filter(keyword => keyword.length > 0);

        // Tạo danh sách điều kiện regex (mở rộng tìm kiếm)
        const regexConditions = [];
        queryKeywords.forEach(keyword => {
            regexConditions.push(
                { name: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
                { catName: { $regex: keyword, $options: 'i' } },
                { subCat: { $regex: keyword, $options: 'i' } },
                { thirdsubCat: { $regex: keyword, $options: 'i' } }
            );
        });

        // Tìm tất cả sản phẩm thỏa mãn ít nhất một điều kiện
        const matchedProducts = await ProductModel.find({
            $or: regexConditions
        }).populate('category');

        // Tính điểm khớp cho mỗi sản phẩm
        const calculateMatchScore = (product) => {
            let score = 0;
            const fields = [product.name, product.brand, product.catName, product.subCat, product.thirdsubCat];

            queryKeywords.forEach(keyword => {
                fields.forEach(field => {
                    if (field?.toLowerCase().includes(keyword.toLowerCase())) {
                        score++;
                    }
                });
            });

            return score;
        };

        // Sắp xếp sản phẩm theo điểm khớp giảm dần
        const sortedProducts = matchedProducts
            .map(product => ({
                product,
                score: calculateMatchScore(product)
            }))
            .sort((a, b) => b.score - a.score)
            .map(item => item.product);

        // Phân trang sau khi đã sắp xếp
        const startIndex = (page - 1) * limit;
        const paginatedProducts = sortedProducts.slice(startIndex, startIndex + limit);

        return response.status(200).json({
            error: false,
            success: true,
            products: paginatedProducts,
            total: sortedProducts.length,
            page: parseInt(page),
            totalPages: Math.ceil(sortedProducts.length / limit)
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
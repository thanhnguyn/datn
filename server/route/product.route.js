import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProductController, deleteProductController, getAllFeaturedProductsController, getAllProductsController, getAllProductsByCatIdController, getAllProductsByCatNameController, getAllProductsByPriceController, getAllProductsByRatingController, getAllProductsBySubCatIdController, getAllProductsBySubCatNameController, getAllProductsByThirdLevelCatIdController, getAllProductsByThirdLevelCatNameController, getProductController, getProductsCountController, removeImageFromCloudinaryController, updateProductController, uploadImagesController, deleteMultipleProductController, createProductRAMSController, deleteProductRAMSController, updateProductRAMSController, getProductRAMSController, getProductRAMSByIdController, createProductWEIGHTController, deleteProductWEIGHTController, updateProductWEIGHTController, getProductWEIGHTController, getProductWEIGHTByIdController, createProductSIZEController, deleteProductSIZEController, updateProductSIZEController, getProductSIZEController, getProductSIZEByIdController, uploadBannerImagesController } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
productRouter.post('/uploadBannerImage', auth, upload.array('images'), uploadBannerImagesController);
productRouter.post('/create', auth, createProductController);
productRouter.get('/getAllProducts', getAllProductsController);
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatIdController);
productRouter.get('/getAllProductsByCatName', getAllProductsByCatNameController);
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatIdController);
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatNameController);
productRouter.get('/getAllProductsByThirdLevelCatId/:id', getAllProductsByThirdLevelCatIdController);
productRouter.get('/getAllProductsByThirdLevelCatName', getAllProductsByThirdLevelCatNameController);
productRouter.get('/getAllProductsByPrice', getAllProductsByPriceController);
productRouter.get('/getAllProductsByRating', getAllProductsByRatingController);
productRouter.get('/getAllProductsCount', getProductsCountController);
productRouter.get('/getAllFeaturedProducts', getAllFeaturedProductsController);
productRouter.delete('/deleteMultiple', deleteMultipleProductController);
productRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
productRouter.delete('/:id', deleteProductController);
productRouter.get('/:id', getProductController);
productRouter.put('/updateProduct/:id', auth, updateProductController);

productRouter.post('/productRAMS/create', auth, createProductRAMSController);
productRouter.delete('/productRAMS/:id', deleteProductRAMSController);
productRouter.put('/productRAMS/:id', auth, updateProductRAMSController);
productRouter.get('/productRAMS/get', getProductRAMSController);
productRouter.get('/productRAMS/:id', getProductRAMSByIdController);

productRouter.post('/productWEIGHT/create', auth, createProductWEIGHTController);
productRouter.delete('/productWEIGHT/:id', deleteProductWEIGHTController);
productRouter.put('/productWEIGHT/:id', auth, updateProductWEIGHTController);
productRouter.get('/productWEIGHT/get', getProductWEIGHTController);
productRouter.get('/productWEIGHT/:id', getProductWEIGHTByIdController);

productRouter.post('/productSIZE/create', auth, createProductSIZEController);
productRouter.delete('/productSIZE/:id', deleteProductSIZEController);
productRouter.put('/productSIZE/:id', auth, updateProductSIZEController);
productRouter.get('/productSIZE/get', getProductSIZEController);
productRouter.get('/productSIZE/:id', getProductSIZEByIdController);

export default productRouter;
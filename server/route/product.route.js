import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProductController, deleteProductController, getAllFeaturedProductsController, getAllProductsController, getAllProductsByCatIdController, getAllProductsByCatNameController, getAllProductsByPriceController, getAllProductsByRatingController, getAllProductsBySubCatIdController, getAllProductsBySubCatNameController, getAllProductsByThirdLevelCatIdController, getAllProductsByThirdLevelCatNameController, getProductController, getProductsCountController, removeImageFromCloudinaryController, updateProductController, uploadImagesController, deleteMultipleProductController } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
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
productRouter.delete('/:id', deleteProductController);
productRouter.delete('/deleteMultiple', deleteMultipleProductController);
productRouter.get('/:id', getProductController);
productRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
productRouter.put('/updateProduct/:id', auth, updateProductController);

export default productRouter;
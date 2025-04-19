import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProduct, uploadImages } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
productRouter.post('/create', auth, createProduct);
// categoryRouter.get('/', getCategories);
// categoryRouter.get('/get/count', getCategoriesCount);
// categoryRouter.get('/get/count/subCat', getSubCategoriesCount);
// categoryRouter.get('/:id', getCategory);
// categoryRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
// categoryRouter.delete('/:id', auth, deleteCategory);
// categoryRouter.put('/:id', auth, updateCategory);

export default productRouter;
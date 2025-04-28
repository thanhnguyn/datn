import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createCategoryController, deleteCategoryController, getCategoriesController, getCategoriesCountController, getCategoryController, getSubCategoriesCountController, removeImageFromCloudinaryController, updateCategoryController, uploadImagesController } from '../controllers/category.controller.js';

const categoryRouter = Router();
categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
categoryRouter.post('/create', auth, createCategoryController);
categoryRouter.get('/', getCategoriesController);
categoryRouter.get('/get/count', getCategoriesCountController);
categoryRouter.get('/get/count/subCat', getSubCategoriesCountController);
categoryRouter.get('/:id', getCategoryController);
categoryRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
categoryRouter.delete('/:id', auth, deleteCategoryController);
categoryRouter.put('/:id', auth, updateCategoryController);


export default categoryRouter;
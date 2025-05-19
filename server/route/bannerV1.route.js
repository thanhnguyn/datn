import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addBannerController, deleteBannerController, getBannerController, getBannersController, updateBannerController, uploadImagesController } from '../controllers/bannerV1.controller.js';
import { removeImageFromCloudinaryController } from '../controllers/category.controller.js';

const bannerV1Router = Router();
bannerV1Router.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
bannerV1Router.post('/add', auth, addBannerController);
bannerV1Router.get('/', getBannersController);
bannerV1Router.get('/:id', getBannerController);
bannerV1Router.delete('/deleteImage', auth, removeImageFromCloudinaryController);
bannerV1Router.delete('/:id', auth, deleteBannerController);
bannerV1Router.put('/:id', auth, updateBannerController);


export default bannerV1Router;
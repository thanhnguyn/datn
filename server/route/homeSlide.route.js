import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addHomeSlideController, deleteMultipleSlideController, deleteSlideController, getHomeSlidesController, getSlideController, removeImageFromCloudinaryController, updateSlideController, uploadImagesController } from '../controllers/homeSlider.controller.js';

const homeSlidesRouter = Router();

homeSlidesRouter.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
homeSlidesRouter.post('/add', auth, addHomeSlideController);
homeSlidesRouter.get('/', getHomeSlidesController);
homeSlidesRouter.get('/:id', getSlideController);
homeSlidesRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
homeSlidesRouter.delete('/:id', auth, deleteSlideController);
homeSlidesRouter.put('/:id', auth, updateSlideController);

export default homeSlidesRouter;
import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addBlogController, deleteBlogController, getBlogController, getBlogsController, removeImageFromCloudinaryController, updateBlogController, uploadImagesController } from '../controllers/blog.controller.js';

const blogRouter = Router();
blogRouter.post('/uploadImages', auth, upload.array('images'), uploadImagesController);
blogRouter.post('/add', auth, addBlogController);
blogRouter.get('/', getBlogsController);
blogRouter.get('/:id', getBlogController);
blogRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
blogRouter.delete('/:id', auth, deleteBlogController);
blogRouter.put('/:id', auth, updateBlogController);

export default blogRouter;
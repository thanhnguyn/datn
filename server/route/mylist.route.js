import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addToMyList, deleteFromMyList, getMyList } from '../controllers/mylist.controller.js';

const myListRouter = Router();
myListRouter.post('/add', auth, addToMyList);
myListRouter.get('/', auth, getMyList);
myListRouter.delete('/:id', auth, deleteFromMyList);

export default myListRouter;
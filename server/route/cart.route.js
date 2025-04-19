import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addItemToCart, deleteCartItem, getCartItem, updateCartItemQty } from '../controllers/cart.controller.js';

const cartRouter = Router();
cartRouter.post('/add', auth, addItemToCart);
cartRouter.get('/get', auth, getCartItem);
cartRouter.put('/updateQty', auth, updateCartItemQty);
cartRouter.delete('/deleteCartItem', auth, deleteCartItem);

export default cartRouter;
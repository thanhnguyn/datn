import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addItemToCartController, deleteCartItemController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';

const cartRouter = Router();
cartRouter.post('/add', auth, addItemToCartController);
cartRouter.get('/get', auth, getCartItemController);
cartRouter.put('/updateQty', auth, updateCartItemQtyController);
cartRouter.delete('/deleteCartItem', auth, deleteCartItemController);

export default cartRouter;
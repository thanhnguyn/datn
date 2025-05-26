import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addAddressController, deleteAddressController, editAddressController, getAddressController, getSingleAddressController } from '../controllers/address.controller.js';

const addressRouter = Router();
addressRouter.post('/add', auth, addAddressController);
addressRouter.get('/get', auth, getAddressController);
addressRouter.get('/:id', auth, getSingleAddressController);
addressRouter.put('/:id', auth, editAddressController);
addressRouter.delete('/:id', auth, deleteAddressController);

export default addressRouter;
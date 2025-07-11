import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { getTotalSalesController, captureOrderPaypalController, createOrderController, createOrderPaypalController, createOrderVnPayController, getOrderDetailsController, getTotalOrdersCountController, updateOrderStatusController, vnPayReturnController, getTotalUsersController } from '../controllers/order.controller.js';

const orderRouter = Router();
orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);
orderRouter.get('/create-order-paypal', auth, createOrderPaypalController);
orderRouter.post('/capture-order-paypal', auth, captureOrderPaypalController);
orderRouter.get('/create-order-vnpay', auth, createOrderVnPayController);
orderRouter.get('/vnpay-return', auth, vnPayReturnController);
orderRouter.put('/order-status/:id', auth, updateOrderStatusController);
orderRouter.get('/count', auth, getTotalOrdersCountController);
orderRouter.get('/sales', auth, getTotalSalesController);
orderRouter.get('/users', auth, getTotalUsersController);

export default orderRouter;
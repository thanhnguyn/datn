import OrderModel from "../models/order.model.js";
import ProductModel from '../models/product.model.js';
import paypal from '@paypal/checkout-server-sdk';
import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';

export const createOrderController = async (request, response) => {
    try {
        let order = new OrderModel({
            userId: request.body.userId,
            products: request.body.products,
            paymentId: request.body.paymentId,
            payment_status: request.body.payment_status,
            delivery_address: request.body.delivery_address,
            totalAmt: request.body.totalAmt,
            date: request.body.date
        });

        if (!order) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        for (let i = 0; i < request.body.products.length; i++) {
            await ProductModel.findByIdAndUpdate(
                request.body.products[i].productId,
                {
                    countInStock: parseInt(request.body.products[i].countInStock - request.body.products[i].quantity)
                },
                { new: true }
            );
        }
        order = await order.save();

        return response.status(200).json({
            error: false,
            success: true,
            message: 'Order placed',
            order: order
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getOrderDetailsController = async (request, response) => {
    try {
        const userId = request.userId;

        const orderList = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate('delivery_address userId');

        return response.status(200).json({
            message: 'order list',
            data: orderList,
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

function getPayPalClient() {
    const environment =
        process.env.PAYPAL_MODE === 'live'
            ? new paypal.core.LiveEnvironment(
                process.env.PAYPAL_CLIENT_ID_LIVE,
                process.env.PAYPAL_SECRET_LIVE
            )
            : new paypal.core.SandboxEnvironment(
                process.env.PAYPAL_CLIENT_ID_TEST,
                process.env.PAYPAL_SECRET_TEST
            );
    return new paypal.core.PayPalHttpClient(environment);
}

export const createOrderPaypalController = async (request, response) => {
    try {
        const req = new paypal.orders.OrdersCreateRequest();
        req.prefer('return=representation');

        req.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: request.query.totalAmount
                }
            }]
        });

        try {
            const client = getPayPalClient();
            const order = await client.execute(req);
            response.json({ id: order.result.id });
        } catch (error) {
            console.error(error);
            response.status(500).send('Error creating PayPal order');
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};



export const captureOrderPaypalController = async (request, response) => {
    try {
        const { paymentId } = request.body;

        const req = new paypal.orders.OrdersCaptureRequest(paymentId);
        req.requestBody({});

        const orderInfo = {
            userId: request.body.userId,
            products: request.body.products,
            paymentId: request.body.paymentId,
            payment_status: request.body.payment_status,
            delivery_address: request.body.delivery_address,
            totalAmt: request.body.totalAmount,
            date: request.body.date
        };

        const order = new OrderModel(orderInfo);
        await order.save();

        for (let i = 0; i < request.body.products.length; i++) {
            await ProductModel.findByIdAndUpdate(
                request.body.products[i].productId,
                {
                    countInStock: parseInt(request.body.products[i].countInStock - request.body.products[i].quantity)
                },
                { new: true }
            );
        }
        return response.status(200).json({
            success: true,
            error: false,
            order: order,
            message: 'Order placed.'
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const createOrderVnPayController = async (req, res) => {
    try {
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const vnp_TmnCode = process.env.VNP_TMNCODE; // Mã website VNPay cung cấp
        const vnp_HashSecret = process.env.VNP_HASHSECRET; // Secret key VNPay cung cấp
        let vnp_Url = process.env.VNP_URL;
        const vnp_ReturnUrl = process.env.VNP_RETURNURL;
        let orderId = moment(date).format('DDHHmmss');

        let amount = req.query.amount;
        // let bankCode = req.query.bankCode;


        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        // if (bankCode !== null && bankCode !== '') {
        //     vnp_Params['vnp_BankCode'] = bankCode;
        // }
        console.log(vnp_Params);

        vnp_Params = sortObject(vnp_Params);

        console.log(vnp_Params);
        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnp_Url += '?' + qs.stringify(vnp_Params, { encode: false });

        return res.status(200).json({
            paymentUrl: vnp_Url
        });
    } catch (error) {
        console.error('Lỗi VNPay:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const vnPayReturnController = async (req, res) => {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        const isSuccess = vnp_Params['vnp_ResponseCode'] === '00';

        return res.json({
            success: isSuccess,
            vnp_TransactionNo: vnp_Params['vnp_TransactionNo'],  // ✅ thêm dòng này
            vnp_OrderId: vnp_Params['vnp_TxnRef'],               // optional nếu cần
            vnp_Amount: vnp_Params['vnp_Amount'],                // optional nếu cần
        });
    } else {
        return res.json({ success: false });
    }
};
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
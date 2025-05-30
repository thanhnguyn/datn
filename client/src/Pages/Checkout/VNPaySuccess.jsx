// src/pages/OrderVNPaySuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import { useRef } from 'react';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const OrderVNPaySuccess = () => {
    const confirmedRef = useRef(false);

    const context = useContext(MyContext);
    const location = useLocation();
    const history = useNavigate();
    // context?.openAlertBox('success', "Order placed11.");

    useEffect(() => {
        if (confirmedRef.current) return;
        confirmedRef.current = true;

        const confirmPayment = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                };

                // Xác nhận giao dịch từ VNPay
                const res = await axios.get(
                    `${VITE_API_URL}/api/order/vnpay-return${location.search}`,
                    { headers, withCredentials: true }
                );

                if (res?.data?.success) {
                    // Lấy lại order info đã lưu trước đó
                    const savedOrder = JSON.parse(localStorage.getItem('vnpay_order_info'));

                    if (savedOrder) {
                        const response = await axios.post(`${VITE_API_URL}/api/order/create`, {
                            ...savedOrder,
                            paymentId: res.data?.vnp_TransactionNo || '', // nếu backend trả về
                            totalAmt: res.data?.vnp_Amount / 100 || savedOrder.amount || 0
                        }, { headers });
                        // Xóa cart nếu thành công
                        if (response.data?.error === false) {
                            await axios.delete(`${VITE_API_URL}/api/cart/emptyCart/${savedOrder.userId}`, { headers });
                            localStorage.removeItem('vnpay_order_info');
                            context?.getCartItems();
                            context?.openAlertBox('success', "Order placed.");
                            history('/order/success');
                        } else {
                            history('/order/fail');
                        }
                    } else {
                        console.error("Không tìm thấy thông tin đơn hàng đã lưu.");
                        history('/order/fail');
                    }
                } else {
                    history('/order/fail');
                }
            } catch (error) {
                console.error('VNPay return error:', error);
                history('/order/fail');
            }
        };

        confirmPayment();
    }, []);


    return <p>Đang xác nhận thanh toán với VNPay...</p>;
};

export default OrderVNPaySuccess;

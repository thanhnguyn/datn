import React, { useContext, useEffect, useState } from 'react'
import { Button, Radio } from '@mui/material';
import { BsFillBagCheckFill } from "react-icons/bs";
import { MyContext } from '../../App';
import { FaPlus } from 'react-icons/fa6';
import { deleteData, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VITE_APP_PAYPAL_CLIENT_ID = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;
const VITE_API_URL = import.meta.env.VITE_API_URL;
const Checkout = () => {
    const context = useContext(MyContext);
    const history = useNavigate();
    const [isChecked, setIsChecked] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedAddress(
            context?.userData?.address_details[0]?._id
        );
    }, [context?.userData])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_APP_PAYPAL_CLIENT_ID}&disable-funding=card`;
        script.async = true;
        script.onload = () => {
            window.paypal
                .Buttons(
                    {
                        createOrder: async () => {
                            const resp = await fetch(
                                'https://v6.exchangerate-api.com/v6/0c449702649c5130b0253702/latest/VND'
                            );
                            const respData = await resp.json();
                            var convertedAmount = 0;

                            if (respData.result === 'success') {
                                const usdToVndRate = respData.conversion_rates.USD;
                                convertedAmount = (totalAmount * usdToVndRate).toFixed(2);
                            }
                            const headers = {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                                'Content-Type': 'application/json',
                            }
                            const data = {
                                userId: context?.userData?._id,
                                totalAmount: convertedAmount
                            }
                            const response = await axios.get(
                                VITE_API_URL + `/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`, { headers }
                            );

                            return response?.data?.id;
                        },
                        onApprove: async (data) => {
                            onApprovePayment(data);
                        },
                        onError: (err) => {
                            history('/order/fail');
                            console.error('Paypal checkout onError:', err);
                        }
                    })
                .render('#paypal-button-container');
        };
        document.body.appendChild(script);
    }, [context?.cartData, context?.userData, selectedAddress, totalAmount]);

    const onApprovePayment = async (data) => {
        const user = context?.userData;
        const info = {
            userId: user?._id,
            products: context?.cartData,
            payment_status: 'COMPLETE',
            delivery_address: selectedAddress,
            totalAmount: totalAmount,
            date: new Date().toLocaleString('vi-VN', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
        };

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }

        const response = await axios.post(
            VITE_API_URL + "/api/order/capture-order-paypal",
            {
                ...info,
                paymentId: data.orderID
            }, { headers }
        ).then((res) => {
            context?.openAlertBox('success', res?.data?.message);
            history('/order/success');
            deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then((res) => {
                context?.getCartItems();
            })
        });

        if (response.data.success) {
            context?.openAlertBox('success', 'Order completed and saved to database.');
        }
    };

    const editAddress = (id) => {
        context?.setOpenAddressPanel(true);
        context?.setAddressMode('edit');
        context?.setAddressId(id);
    }

    const handleChange = (e, index) => {
        if (e.target.checked) {
            setIsChecked(index);
            setSelectedAddress(e.target.value);
        }
    };

    useEffect(() => {
        setTotalAmount(
            context?.cartData?.length !== 0 ?
                context?.cartData?.map(item => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0) : 0);
    }, [context?.cartData])

    const checkout = (e) => {
        e.preventDefault();

        const user = context?.userData;

        const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: '',
            payment_status: 'CASH ON DELIVERY',
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleDateString('vi-VN', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
        };

        postData(`/api/order/create`, payLoad).then((res) => {
            context?.openAlertBox('success', res?.message);
            context?.getOrdersData();
            if (res?.error === false) {
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                    context?.getCartItems();
                });
            } else {
                history('/order/fail');
                context?.openAlertBox('error', res?.message);
            }
            history('/order/success');
        })
    }

    const cashOnDelivery = (e) => {
        const user = context?.userData;

        const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: '',
            payment_status: 'CASH ON DELIVERY',
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleDateString('vi-VN', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
        };

        postData(`/api/order/create`, payLoad).then((res) => {
            context?.openAlertBox('success', res?.message);
            if (res?.error === false) {
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                    context?.getCartItems();
                });
            } else {
                context?.openAlertBox('error', res?.message);
            }
            history('/order/success');
        })
    }

    return (
        <section className='py-10'>
            <form onSubmit={checkout}>
                <div className='w-[70%] m-auto flex gap-5'>
                    <div className='leftCol w-[60%]'>
                        <div className='card bg-white shadow-md p-5 rounded-md w-full'>
                            <div className='flex items-center justify-between'>
                                <h2>Select delivery address</h2>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        context?.setAddressMode('add');
                                        context?.toggleAddressPanel(true)();
                                    }}
                                >
                                    <FaPlus />  Add new address
                                </Button>
                            </div>
                            <br />
                            <div className='flex flex-col gap-4'>
                                {
                                    context?.userData?.address_details?.length !== 0 ? context?.userData?.address_details?.map((item, index) => {
                                        return (
                                            <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index && 'bg-[#fff2f2]'}`} key={index}>
                                                <div>
                                                    <Radio size='small' onChange={(e) => handleChange(e, index)} checked={isChecked === index} value={item?._id} />
                                                </div>
                                                <div className='info'>
                                                    <span className='inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm'>{item?.addressType}</span>
                                                    <h3>{context?.userData?.name}</h3>
                                                    <p className='mt-0 mb-0'>{item?.address_line1 + ", " + item?.district + ", " + item?.city + ", " + item?.country + ", " + item?.pincode}</p>
                                                    <p className='mt-0 mb-0'>{item?.landmark}</p>
                                                    <p className='mb-0 font-[500]'>+{item?.mobile}</p>
                                                </div>
                                                <Button className='!absolute top-[15px] right-[15px]' variant='text' onClick={() => editAddress(item?._id)}>EDIT</Button>
                                            </label>
                                        );
                                    })
                                        :
                                        <>
                                            <div className='flex items-center flex-col'>
                                                <h2 className='text-center'>No address found in your account.</h2>
                                                <br />
                                                <img className='p-5' src="/address img/535239.png" alt="" />
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='rightCol w-[40%]'>
                        <div className='card shadow-md bg-white p-5 rounded-md'>
                            <h2 className='mb-4'>Your order</h2>
                            <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                                <span className='text-[14px] font-[600]'>Product</span>
                                <span className='text-[14px] font-[600]'>Subtotal</span>
                            </div>
                            <div className='mb-5 scroll max-h-[250px] overflow-y-auto overflow-x-hidden pr-2'>
                                {
                                    context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                                        return (
                                            <div className='flex items-center justify-between py-2' key={index}>
                                                <div className='part1 flex items-center gap-3'>
                                                    <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                                        <img src={item?.image} className='w-full transition-all group-hover:scale-105' alt="" />
                                                    </div>
                                                    <div className='info'>
                                                        <h4 className='text-[14px]' title={item?.productTitle}> {item?.productTitle?.length > 22 ? item?.productTitle?.substr(0, 22) + '...' : item?.productTitle}</h4>
                                                        <p className='text-[13px]'>Qty : {item?.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className='text-[14px] font-[500]'>{(item?.price * item?.quantity)?.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className='flex items-cente flex-col gap-3 mb-2'>
                                <Button type='submit' className='btn-org btn-lg w-full flex gap-2 items-center'><BsFillBagCheckFill className='text-[20px]' /> Checkout</Button>
                                <div id='paypal-button-container'></div>
                                <Button type='button' className='btn-dark btn-lg w-full flex gap-2 items-center' onClick={cashOnDelivery}>
                                    <BsFillBagCheckFill className='text-[20px]' />
                                    Cash on Delivery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default Checkout; 
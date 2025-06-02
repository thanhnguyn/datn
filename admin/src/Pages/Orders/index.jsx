import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SearchBox from '../../components/SearchBox';
import { useEffect } from 'react';
import { editData, fetchDataFromApi } from '../../utils/api.js';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App.jsx';

const Orders = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const [ordersData, setOrdersData] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [totalOrdersData, setTotalOrdersData] = useState([0]);

    const context = useContext(MyContext);

    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }

    const handleChange = (event, id) => {
        setOrderStatus(event.target.value);

        const obj = {
            id: id,
            order_status: event.target.value
        }

        editData(`/api/order/order-status/${id}`, obj).then((res) => {
            if (res?.data?.error === false) {
                context?.openAlertBox('success', res?.data?.message);
            } else {
                context?.openAlertBox('error', res?.data?.message);
            }
        });
    };

    useEffect(() => {
        fetchDataFromApi(`/api/order/order-list`).then((res) => {
            setOrdersData(res?.data);
        });
    }, [orderStatus]);

    useEffect(() => {
        fetchDataFromApi(`/api/order/order-list`).then((res) => {
            setTotalOrdersData(res?.data);
        });
    }, []);

    useEffect(() => {
        if (searchQuery !== '') {
            const filteredOrders = totalOrdersData?.filter((order) =>
                order?._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.createdAt.includes(searchQuery)
            );

            setOrdersData(filteredOrders)
        } else {
            fetchDataFromApi(`/api/order/order-list`).then((res) => {
                setOrdersData(res?.data);
            });
        }
    }, [searchQuery]);

    return (
        <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
            <div className='flex items-center justify-between px-5 py-5'>
                <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
                <div className='w-[40%]'>
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto mt-5 pb-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                &nbsp;
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Payment ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Pincode
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Total amount
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order status
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ordersData?.length > 0 && ordersData?.map((item, index) => {
                                return (
                                    <>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-[500]">
                                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]' onClick={() => isShowOrderProduct(index)}>
                                                    {
                                                        isOpenOrderProduct === index ? (
                                                            <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                        ) : (
                                                            <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                        )
                                                    }
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary font-[600]'>{item?._id}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary font-[600]'>{item?.paymentId}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary font-[600]'>{item?.payment_method}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                {item?.userId?.name}
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                {item?.delivery_address?.mobile}
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'>{item?.delivery_address?.address_line1}, {item?.delivery_address?.district}, {item?.delivery_address?.city}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                {item?.delivery_address?.pincode}
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                {item?.totalAmt}
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                {item?.userId?.email}
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary font-[600]'>{item?.userId?._id}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                {/* <Badge status={item?.order_status} /> */}
                                                <Select
                                                    labelId={`order-status-select-label-${index}`}
                                                    id={`order-status-select-${index}`}
                                                    value={item?.order_status || ''}
                                                    onChange={(event) => handleChange(event, item?._id)}
                                                    size='small'
                                                    className='w-full'
                                                >
                                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                                    <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                                                    <MenuItem value={'delivered'}>Delivered</MenuItem>
                                                </Select>
                                            </td>
                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                {item?.createdAt?.split('T')[0]}
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderProduct === index && (
                                                <tr>
                                                    <td className='pl-20' colSpan="6">
                                                        <div className="relative overflow-x-auto">
                                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product ID
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product title
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Image
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Quantity
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Price
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Subtotal
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        item?.products?.map((product, index_) => {
                                                                            return (
                                                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                                    <td className="px-6 py-4 font-[500]">
                                                                                        <span className='text-gray-600'>{product.productId}</span>
                                                                                    </td>
                                                                                    <td className="px-6 py-4 font-[500]">
                                                                                        {product.productTitle}
                                                                                    </td>

                                                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                                        <img src={product.image} className='h-[40px] w-[40px] object-cover rounded-md' />
                                                                                    </td>
                                                                                    <td className="px-6 py-4 font-[500]">
                                                                                        {product.quantity}
                                                                                    </td>
                                                                                    <td className="px-6 py-4 font-[500]">
                                                                                        {product.price.toLocaleString('vi-VN')}đ
                                                                                    </td>
                                                                                    <td className="px-6 py-4 font-[500]">
                                                                                        {product.subTotal.toLocaleString('vi-VN')}đ
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Orders;
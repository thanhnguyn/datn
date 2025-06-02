import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import { Button } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../components/Badge';
import { FaAngleUp } from 'react-icons/fa';
import { MyContext } from '../../App';

const Orders = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }

    const context = useContext(MyContext);

    useEffect(() => {
        context?.getOrdersData();
    }, []);

    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[20%]'>
                    <AccountSidebar />
                </div>

                <div className='col2 w-[80%]'>
                    <div className='shadow-md rounded-md bg-white'>
                        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                            <h2 >My orders</h2>
                            <p className='mt-0'>
                                There are <span className='font-bold text-primary'>{context?.ordersData?.length}</span> orders
                            </p>
                            <div className="relative overflow-x-auto mt-5">
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
                                            context?.ordersData?.length > 0 && context?.ordersData?.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                            <td className="px-6 py-4 font-[500]">
                                                                <Button
                                                                    className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]'
                                                                    onClick={() => isShowOrderProduct(index)}
                                                                >
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
                                                                <span className='text-primary'>{item?._id}</span>
                                                            </td>
                                                            <td className="px-6 py-4 font-[500]">
                                                                <span className='text-primary'>{item?.paymentId}</span>
                                                            </td>
                                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                {item?.payment_method}
                                                            </td>
                                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                {item?.userId?.name}
                                                            </td>
                                                            <td className="px-6 py-4 font-[500]">
                                                                {item?.delivery_address?.mobile}
                                                            </td>
                                                            <td className="px-6 py-4 font-[500]">
                                                                <span className='block w-[400px]'>{item?.delivery_address?.address_line1}, {item?.delivery_address?.district}, {item?.delivery_address?.city} </span>
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
                                                                <span className='text-primary'>{item?.userId?._id}</span>
                                                            </td>
                                                            <td className="px-6 py-4 font-[500]">
                                                                <Badge status={item?.order_status} />
                                                            </td>
                                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                {item?.createdAt?.split('T')[0]}
                                                            </td>
                                                        </tr>
                                                        {
                                                            isOpenOrderProduct === index && (
                                                                <tr>
                                                                    <td className='pl-20' colSpan={6}>
                                                                        <div className='relative overflow-x-auto'>
                                                                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                                                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                                                                    <tr>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Product ID
                                                                                        </th>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Product Title
                                                                                        </th>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Product Image
                                                                                        </th>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Quantity
                                                                                        </th>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Price
                                                                                        </th>
                                                                                        <th
                                                                                            scope='col'
                                                                                            className='px-6 py-3 whitespace-nowrap'
                                                                                        >
                                                                                            Sub Total
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        item?.products?.map((product, index_) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <span className='text-gray-600'>
                                                                                                                {product.productId}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <span className='text-gray-600'>
                                                                                                                <div className='w-[200px]'>
                                                                                                                    {product.productTitle}
                                                                                                                </div>
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <img src={product.image} className='h-[40px] w-[40px] object-cover rounded-md' />
                                                                                                        </td>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <span className='text-gray-600'>
                                                                                                                {product.quantity}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <span className='text-gray-600'>
                                                                                                                {product.price.toLocaleString('vi-VN')}đ
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className='px-6 py-4 font-[500]'>
                                                                                                            <span className='text-gray-600'>
                                                                                                                {product.subTotal.toLocaleString('vi-VN')}đ
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                    </>

                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>)
}
export default Orders;
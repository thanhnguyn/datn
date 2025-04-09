import React, { useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import { Button } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../components/Badge';
import { FaAngleUp } from 'react-icons/fa';

const Orders = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }
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
                                There are <span className='font-bold text-primary'>2</span> orders
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
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-[500]">
                                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]' onClick={() => isShowOrderProduct(0)}>
                                                    {
                                                        isOpenOrderProduct === 0 ? (
                                                            <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                        ) : (
                                                            <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                        )
                                                    }

                                                </Button>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>advadfbvcxafbsgfbvdc</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>pay_asgfwrtsbfdv</span>
                                            </td>

                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                Nguyen Cong Thanh
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                0923707056
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'>646 Thien Loi Street, Le Chan District, Haiphong City </span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                12314
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                58
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                thanh.nc2701@gmail.com
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>arhnszfgfq345gtbsfv</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <Badge status='delivered' />
                                            </td>
                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                2024-12-04
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderProduct === 0 && (
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
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            <span className='text-gray-600'>advadfbvcxafbsgfbvdc</span>
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            title_asgfwrtsbfdv
                                                                        </td>

                                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                            <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-[40px] h-[40px] object-cover rounded-md' />
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            1
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            58
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            58
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            <span className='text-gray-600'>advadfbvcxafbsgfbvdc</span>
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            title_asgfwrtsbfdv
                                                                        </td>

                                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                                            <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-[40px] h-[40px] object-cover rounded-md' />
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            1
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            58
                                                                        </td>
                                                                        <td className="px-6 py-4 font-[500]">
                                                                            58
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
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
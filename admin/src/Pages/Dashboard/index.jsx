import React, { useState } from 'react'
import DashboardBoxes from '../../components/DashboardBoxes';
import { Button } from '@mui/material';
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import Badge from '../../components/Badge';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../components/ProgressBar';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Dashboard = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }
    return (
        <>
            <div className='w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
                <div className='info'>
                    <h1 className='text-[35px] font-bold leading-10 mb-3'>Good morning,<br /> Thanh </h1>
                    <p>Here is what's happening on your store today. See the statistics at once.</p>
                    <br />
                    <Button className='btn-blue !capitalize'><FaPlus /> Add product</Button>
                </div>
                <img src="/shop-illustration.png" className='w-[250px]' />
            </div>
            <DashboardBoxes />

            <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center justify-between px-5 py-5'>
                    <h2 className='text-[18px] font-[600]'>Products</h2>
                </div>
                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" width='10%'>
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    PRODUCT
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SUB CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    BRAND
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    PRICE
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SALES
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-4 w-[350px]'>
                                        <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                            <Link to='/product/123'>
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-full group-hover:scale-105 transition-all' alt="" />
                                            </Link>
                                        </div>
                                        <div className='info w-[75%]'>
                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to='/product/123'>Men Opaque Casual Shirt</Link>
                                            </h3>
                                            <span className='text-[12px]'>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2" >Fashion</td>
                                <td className="px-6 py-2" >Men</td>
                                <td className="px-6 py-2" >CLAFOUIS</td>
                                <td className="px-6 py-2" >
                                    <div className='flex gap-1 flex-col'>
                                        <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                            $58.00
                                        </span>
                                        <span className='price text-primary text-[14px] font-[600]'>
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-2" >
                                    <p className='text-[14px] w-[150px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-4'>
                                        <Button className='!w-[35px]'></Button>
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center justify-between px-5 py-5'>
                    <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
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
                                    <span className='text-primary font-[600]'>advadfbvcxafbsgfbvdc</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className='text-primary font-[600]'>pay_asgfwrtsbfdv</span>
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
                                    <span className='text-primary font-[600]'>arhnszfgfq345gtbsfv</span>
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-[500]">
                                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]' onClick={() => isShowOrderProduct(1)}>
                                        {
                                            isOpenOrderProduct === 1 ? (
                                                <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            ) : (
                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            )
                                        }
                                    </Button>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className='text-primary font-[600]'>advadfbvcxafbsgfbvdc</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className='text-primary font-[600]'>pay_asgfwrtsbfdv</span>
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
                                    <span className='text-primary font-[600]'>arhnszfgfq345gtbsfv</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <Badge status='pending' />
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    2024-12-04
                                </td>
                            </tr>
                            {
                                isOpenOrderProduct === 1 && (
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
        </>
    )
}
export default Dashboard;
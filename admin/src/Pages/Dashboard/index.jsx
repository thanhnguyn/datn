import React, { useContext, useState } from 'react'
import DashboardBoxes from '../../components/DashboardBoxes';
import { Button, MenuItem } from '@mui/material';
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import Badge from '../../components/Badge';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../components/ProgressBar';
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from "react-icons/go";
import TooltipMUI from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from '../../App';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 150 },
    { id: 'category', label: 'CATEGORY', minWidth: 100 },
    {
        id: 'subcategory',
        label: 'SUB CATEGORY',
        minWidth: 150,
    },
    {
        id: 'price',
        label: 'PRICE',
        minWidth: 130,
    },
    {
        id: 'sales',
        label: 'SALES',
        minWidth: 100,
    },
    {
        id: 'action',
        label: 'ACTION',
        minWidth: 80,
    },
];

const Dashboard = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categoryFilterVal, setCategoryFilterVal] = useState('');

    const [chart1Data, setChart1Data] = useState([
        {
            name: "JANUARY",
            totalUsers: 4000,
            totalSales: 2400,
            amt: 2400,
        },
        {
            name: "FEBRUARY",
            totalUsers: 3000,
            totalSales: 1398,
            amt: 2210,
        },
        {
            name: "MARCH",
            totalUsers: 2000,
            totalSales: 9800,
            amt: 2290,
        },
        {
            name: "APRIL",
            totalUsers: 2780,
            totalSales: 3908,
            amt: 2000,
        },
        {
            name: "MAY",
            totalUsers: 1890,
            totalSales: 4800,
            amt: 2181,
        },
        {
            name: "JUNE",
            totalUsers: 2390,
            totalSales: 3800,
            amt: 2500,
        },
        {
            name: "JULY",
            totalUsers: 3490,
            totalSales: 4300,
            amt: 2100,
        },
        {
            name: "AUGUST",
            totalUsers: 2390,
            totalSales: 3800,
            amt: 2500,
        },
        {
            name: "SEPTEM",
            totalUsers: 2780,
            totalSales: 3908,
            amt: 2000,
        },
        {
            name: "OCTO",
            totalUsers: 1890,
            totalSales: 4800,
            amt: 2181,
        },
        {
            name: "NOVEM",
            totalUsers: 4000,
            totalSales: 2400,
            amt: 2400,
        },
        {
            name: "DECEM",
            totalUsers: 3000,
            totalSales: 1398,
            amt: 2210,
        },
    ]);

    const context = useContext(MyContext);

    const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className='w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
                <div className='info'>
                    <h1 className='text-[35px] font-bold leading-10 mb-3'>Good morning,<br /> Thanh </h1>
                    <p>Here is what's happening on your store today. See the statistics at once.</p>
                    <br />
                    <Button className='btn-blue !capitalize' onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add product"
                    })}><FaPlus /> Add product</Button>
                </div>
                <img src="/shop-illustration.png" className='w-[250px]' />
            </div>
            <DashboardBoxes />

            <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center justify-between px-5 py-5'>
                    <h2 className='text-[18px] font-[600]'>
                        Products
                        <span className='font-[400] text-[14px]'>(Tailwind Css Table)</span>
                    </h2>
                </div>

                <div className='flex items-center w-full pl-5 justify-between pr-5'>
                    <div className='col w-[20%]'>
                        <h4 className='font-[600] text-[13px] mb-2'>Category by</h4>
                        <Select
                            className='w-full'
                            size='small'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={categoryFilterVal}
                            onChange={handleChangeCatFilter}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>Kids</MenuItem>
                        </Select>
                    </div>
                    <div className='col w-[25%] ml-auto flex items-center gap-3'>
                        <Button className='btn !bg-green-600 !text-white btn-sm'>Export</Button>
                        <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: "Add product"
                        })}>Add product</Button>
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 pr-0 py-3" width='10%'>
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </th>
                                <th scope="col" className="px-0 py-3 whitespace-nowrap">
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
                                <td className="px-6 pr-0 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-0 py-2" >
                                    <div className='flex items-center gap-4 w-[300px]'>
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
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>

                            </tr>
                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 pr-0 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-0 py-2" >
                                    <div className='flex items-center gap-4 w-[300px]'>
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
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>

                            </tr>
                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 pr-0 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-0 py-2" >
                                    <div className='flex items-center gap-4 w-[300px]'>
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
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>

                            </tr>
                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 pr-0 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-0 py-2" >
                                    <div className='flex items-center gap-4 w-[300px]'>
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
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>

                            </tr>
                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 pr-0 py-2" >
                                    <div className='w-[60px]'>
                                        <Checkbox {...label} size='small' />
                                    </div>
                                </td>
                                <td className="px-0 py-2" >
                                    <div className='flex items-center gap-4 w-[300px]'>
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
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </td>
                                <td className="px-6 py-2" >
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className='flex items-center justify-end pt-5 pb-5 px-4'>
                    <Pagination count={10} color="primary" />
                </div>
            </div>

            <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center justify-between px-5 py-5'>
                    <h2 className='text-[18px] font-[600]'>
                        Products
                        <span className='font-[400] text-[14px]'>(Material UI Table)</span>
                    </h2>
                </div>
                <div className='flex items-center w-full pl-5 justify-between pr-5'>
                    <div className='col w-[20%]'>
                        <h4 className='font-[600] text-[13px] mb-2'>Category by</h4>
                        <Select
                            className='w-full'
                            size='small'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={categoryFilterVal}
                            onChange={handleChangeCatFilter}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>Kids</MenuItem>
                        </Select>
                    </div>
                    <div className='col w-[25%] ml-auto flex items-center gap-3'>
                        <Button className='btn !bg-green-600 !text-white btn-sm'>Export</Button>
                        <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: "Add product"
                        })}>Add product</Button>
                    </div>
                </div>
                <br />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                            <Link to="/product/1234" data-discover='true'>
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-full group-hover:scale-105 transition-all' alt="" />
                                            </Link>
                                        </div>
                                        <div className='info w-[75%]'>
                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/123" data-discover='true'>Men Opaque Casual Shirt</Link>
                                            </h3>
                                            <span className='text-[12px]'>Fashion</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Fashion
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex gap-1 flex-col'>
                                        <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                            $58.00
                                        </span>
                                        <span className='price text-primary text-[14px] font-[600]'>
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                            <Link to="/product/1234" data-discover='true'>
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-full group-hover:scale-105 transition-all' alt="" />
                                            </Link>
                                        </div>
                                        <div className='info w-[75%]'>
                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/123" data-discover='true'>Men Opaque Casual Shirt</Link>
                                            </h3>
                                            <span className='text-[12px]'>Fashion</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Fashion
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex gap-1 flex-col'>
                                        <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                            $58.00
                                        </span>
                                        <span className='price text-primary text-[14px] font-[600]'>
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[300px]'>
                                        <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                            <Link to="/product/1234" data-discover='true'>
                                                <img src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg" className='w-full group-hover:scale-105 transition-all' alt="" />
                                            </Link>
                                        </div>
                                        <div className='info w-[75%]'>
                                            <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                <Link to="/product/123" data-discover='true'>Men Opaque Casual Shirt</Link>
                                            </h3>
                                            <span className='text-[12px]'>Fashion</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Fashion
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex gap-1 flex-col'>
                                        <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                            $58.00
                                        </span>
                                        <span className='price text-primary text-[14px] font-[600]'>
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sales</p>
                                    <Progress value={40} type='error' />
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-1'>
                                        <TooltipMUI title="Edit product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View product details" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove product" placement="top">
                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <div className='flex items-center justify-end pt-5 pb-5 px-4'>
                    <Pagination count={10} color="primary" />
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

            <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center justify-between px-5 py-5 pb-0'>
                    <h2 className='text-[18px] font-[600]'>Total users & Total sales</h2>
                </div>
                <div className='flex items-center gap-5 px-5 py-5 pt-0'>
                    <span className='flex items-center gap-1 text-[15px]'>
                        <span className='block w-[8px] h-[8px] rounded-full bg-green-600'></span>
                        Total users
                    </span>
                    <span className='flex items-center gap-1 text-[15px]'>
                        <span className='block w-[8px] h-[8px] rounded-full bg-primary'></span>
                        Total sales
                    </span>
                </div>
                <ResponsiveContainer width={1000} height={500}>
                    <LineChart data={chart1Data} margin={{ top: 20 }} accessibilityLayer>
                        <CartesianGrid strokeDasharray="3 3" stroke='none' />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="totalUsers"
                            stroke="#8884d8"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                        ></Line>
                        <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" strokeWidth={3}></Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default Dashboard;
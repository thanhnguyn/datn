import React, { useContext, useEffect, useState } from 'react'
import DashboardBoxes from '../../components/DashboardBoxes';
import { Button, CircularProgress, MenuItem, Rating } from '@mui/material';
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import Badge from '../../components/Badge';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from "react-icons/go";
import TooltipMUI from '@mui/material/Tooltip';
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
import SearchBox from '../../components/SearchBox';
import { fetchDataFromApi } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
        id: 'rating',
        label: 'RATING',
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

    const [productData, setProductData] = useState([]);
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');

    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        getProducts();
    }, [context?.isOpenFullScreenPanel]);

    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        //Update all items checked status
        const updatedItems = productData.map((item) => ({
            ...item,
            checked: isChecked
        }));
        setProductData(updatedItems);

        //Update sorted IDS State
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            console.log(ids);
            setSortedIds(ids);
        } else {
            setSortedIds([]);
        }
    }

    const handleCheckboxChange = (e, id, index) => {
        const updatedItems = productData.map((item) =>
            item._id === id ? { ...item, checked: !item.checked } : item
        )
        setProductData(updatedItems);

        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };

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

    const getProducts = async () => {
        setIsLoading(true);
        fetchDataFromApi("/api/product/getAllProducts").then((res) => {
            let productArr = [];
            if (res?.error === false) {
                for (let i = 0; i < res?.products?.length; i++) {
                    productArr[i] = res?.products[i];
                    productArr[i].checked = false;
                }
                setTimeout(() => {
                    setProductData(productArr);
                    setIsLoading(false);
                }, 300);
            }
        });
    };

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        setProductSubCat('');
        setProductThirdLevelCat('');
        setIsLoading(true);
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        });
    };

    const handleChangeProductSubCat = (event) => {
        setProductCat('');
        setProductSubCat(event.target.value);
        setProductThirdLevelCat('');
        setIsLoading(true);
        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        });
    };

    const handleChangeProductThirdLevelCat = (event) => {
        setProductCat('');
        setProductSubCat('');
        setProductThirdLevelCat(event.target.value);
        setIsLoading(true);
        fetchDataFromApi(`/api/product/getAllProductsByThirdLevelCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        });
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

            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
                <div className='flex items-center w-full px-5 justify-between gap-4'>
                    <div className='col w-[15%]'>
                        <h4 className='font-[600] text-[13px] mb-2'>Category by</h4>
                        {
                            context?.catData?.length !== 0
                            &&
                            <Select
                                style={{ zoom: '80%' }}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat}
                                label="Category"
                                onChange={handleChangeProductCat}
                            >
                                {
                                    context?.catData?.map((cat, index) => {
                                        return (
                                            <MenuItem value={cat?._id} >{cat?.name}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col w-[15%]'>
                        <h4 className='font-[600] text-[13px] mb-2'>Sub category by</h4>
                        {
                            context?.catData?.length !== 0
                            &&
                            <Select
                                style={{ zoom: '80%' }}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productSubCat}
                                label="Sub Category"
                                onChange={handleChangeProductSubCat}
                            >
                                {
                                    context?.catData?.map((cat, index) => {
                                        return (
                                            cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                return (
                                                    <MenuItem value={subCat?._id}>{subCat?.name}</MenuItem>
                                                );
                                            })
                                        );
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col w-[20%]'>
                        <h4 className='font-[600] text-[13px] mb-2'>Third level category by</h4>
                        {
                            context?.catData?.length !== 0
                            &&
                            <Select
                                style={{ zoom: '80%' }}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productThirdLevelCat}
                                label="Third level Category"
                                onChange={handleChangeProductThirdLevelCat}
                            >
                                {
                                    context?.catData?.map((cat) => {
                                        return (
                                            cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                                                return (
                                                    subCat?.children?.length !== 0 && subCat?.children?.map((thirdSubCat, index) => {
                                                        return (
                                                            <MenuItem value={thirdSubCat?._id} key={index} >{thirdSubCat?.name}</MenuItem>
                                                        );
                                                    })
                                                );
                                            })
                                        );
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col w-[20%] ml-auto'>
                        <SearchBox />
                    </div>
                </div>
                <br />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size='small'
                                        onChange={handleSelectAll}
                                        checked={productData?.length > 0 ? productData?.every((item) => item.checked) : false}
                                    />
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

                            {
                                isLoading === false ? productData?.length !== 0 && productData?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )?.reverse()?.map((product, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <Checkbox {...label} size='small'
                                                    checked={product.checked === true ? true : false}
                                                    onChange={(e) => handleCheckboxChange(e, product._id, index)}
                                                />
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex items-center gap-4 w-[300px]'>
                                                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                                        <Link to={`/product/${product?._id}`} data-discover='true'>
                                                            <LazyLoadImage
                                                                alt={'image'}
                                                                effect='blur'
                                                                className='w-full group-hover:scale-105 transition-all'
                                                                src={product?.images[0]}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className='info w-[75%]'>
                                                        <h3 className='font-[600] text-[12px] leading-4 hover:text-primary'>
                                                            <Link to={`/product/${product?._id}`} data-discover='true'>
                                                                {product?.name}
                                                            </Link>
                                                        </h3>
                                                        <span className='text-[12px]'>{product?.brand}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                {product?.catName}
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                {product?.subCat}
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex gap-1 flex-col'>
                                                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                                        {product?.price}đ
                                                    </span>
                                                    <span className='price text-primary text-[14px] font-[600]'>
                                                        {product?.oldPrice}đ
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <p className='text-[14px] w-[100px]'><span className='font-[600]'>{product?.sale}</span> sales</p>
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <p className='text-[14px] w-[100px]'>
                                                    <Rating name='half-rating' size='small' defaultValue={product?.rating} readOnly />
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-1'>
                                                    <TooltipMUI title="Edit product" placement="top">
                                                        <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' onClick={() => {
                                                            context.setIsOpenFullScreenPanel({
                                                                open: true,
                                                                model: 'Edit product',
                                                                id: product?._id
                                                            })
                                                        }}
                                                        >
                                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                    </TooltipMUI>
                                                    <TooltipMUI title="View product details" placement="top">
                                                        <Link to={`/product/${product?._id}`}>
                                                            <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                                <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                            </Button>
                                                        </Link>
                                                    </TooltipMUI>
                                                    <TooltipMUI title="Remove product" placement="top">
                                                        <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' onClick={() => deleteProduct(product?._id)}>
                                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                    </TooltipMUI>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                    :
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <div className='flex items-center justify-center w-full min-h-[400px]'>
                                                    <CircularProgress color='inherit' />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                            }
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
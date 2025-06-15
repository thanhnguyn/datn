import React, { useContext, useEffect, useState } from 'react'
import { Button, CircularProgress, MenuItem, Rating } from '@mui/material';
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
import SearchBox from "../../components/SearchBox";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { deleteMultipleData } from '../../utils/api';
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

const Products = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productData, setProductData] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        getProducts();
    }, [context?.isOpenFullScreenPanel]);

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        const updatedItems = productData.map((item) => ({
            ...item,
            checked: isChecked
        }));
        setProductData(updatedItems);

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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProduct = (id) => {
        deleteData(`/api/product/${id}`).then((res) => {
            if (res?.data?.error === false) {
                getProducts();
                context.openAlertBox('success', res?.data?.message);
            } else {
                context.openAlertBox('error', res?.data?.message);
            }

        });
    }

    const deleteMultipleProduct = () => {
        if (sortedIds.length === 0) {
            context.openAlertBox('error', 'Please select items to be deleted.');
            return;
        }
        try {
            deleteMultipleData('/api/product/deleteMultiple', { data: { ids: sortedIds } }).then((res) => {
                if (res?.data?.error === false) {
                    getProducts();
                    context.openAlertBox('success', res?.data?.message);
                } else {
                    context.openAlertBox('error', res?.data?.message);
                }
            })
        } catch (error) {
            context.openAlertBox('error', 'Error in deleting products.');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>
                    Products
                    <span className='font-[400] text-[14px]'></span>
                </h2>

                <div className='col w-[35%] ml-auto flex items-center justify-end gap-3'>
                    {
                        sortedIds.length !== 0 &&
                        <Button variant='contained' className='btn-sm' size='small' color='error' onClick={deleteMultipleProduct}>Delete</Button>
                    }
                    <Button className='btn !bg-green-600 !text-white btn-sm'>Export</Button>
                    <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add product' })}>Add product</Button>
                </div>
            </div>
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
                                                        {product?.price?.toLocaleString('vi-VN')}đ
                                                    </span>
                                                    <span className='price text-primary text-[14px] font-[600]'>
                                                        {product?.oldPrice?.toLocaleString('vi-VN')}đ
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
                    count={productData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

        </>
    )
}
export default Products;
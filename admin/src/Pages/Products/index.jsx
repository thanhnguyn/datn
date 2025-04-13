import React, { useContext, useState } from 'react'
import { Button, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../components/ProgressBar';
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

const Products = () => {
    const [page, setPage] = useState(0);
    const [categoryFilterVal, setCategoryFilterVal] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const context = useContext(MyContext);
    const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>
                    Products
                    <span className='font-[400] text-[14px]'>(Material UI Table)</span>
                </h2>

                <div className='col w-[25%] ml-auto flex items-center justify-end gap-3'>
                    <Button className='btn !bg-green-600 !text-white btn-sm'>Export</Button>
                    <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add product' })}>Add product</Button>
                </div>
            </div>
            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>

                <div className='flex items-center w-full px-5 justify-between'>
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
            </div>

        </>
    )
}
export default Products;
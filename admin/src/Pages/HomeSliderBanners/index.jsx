import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MyContext } from "../../App";
import { useEffect } from 'react';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/api';
import { data } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 250 },
    { id: 'action', label: 'ACTION', minWidth: 100 },
];

const HomeSliderBanners = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [slidesData, setSlidesData] = useState([]);

    const [sortedIds, setSortedIds] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, [context?.isOpenFullScreenPanel]);

    const getData = (e) => {
        fetchDataFromApi('/api/homeSlides').then((res) => {
            setSlidesData(res?.data);
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const deleteSlide = (id) => {
        deleteData(`/api/homeSlides/${id}`).then((res) => {
            context.openAlertBox('success', 'Slide deleted.');
            getData();
        });
    };

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>
                    Home Slider Banners
                </h2>

                <div className='col w-[25%] ml-auto flex items-center justify-end gap-3'>
                    <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add home slide' })}>Add home slide</Button>
                </div>
            </div>
            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        width={column.minWidth}
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                slidesData?.length !== 0 && slidesData?.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell width={300}>
                                                <div className='flex items-center gap-4 w-[300px]'>
                                                    <div className='img w-full rounded-md overflow-hidden group'>
                                                        <img src={item.images[0]} className='w-full group-hover:scale-105 transition-all' />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell width={100}>
                                                <div className='flex items-center gap-1'>
                                                    <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                    </Button>
                                                    <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' onClick={() => deleteSlide(item?._id)}>
                                                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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

        </>
    )
}
export default HomeSliderBanners;
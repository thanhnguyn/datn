import React, { useContext, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from "../../components/SearchBox";
import { MyContext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { deleteMultipleData, fetchDataFromApi } from '../../utils/api';
import { Button, CircularProgress } from '@mui/material';
import Badge from '../../components/Badge';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    {
        id: 'userEmail',
        label: 'USER EMAIL',
        minWidth: 150,
    },
    {
        id: 'userPh',
        label: 'USER PHONE NUMBER',
        minWidth: 130,
    },
    {
        id: 'verifyEmail',
        label: 'EMAIL VERIFIED',
        minWidth: 130,
    },
    {
        id: 'createdAt',
        label: 'CREATED AT',
        minWidth: 130,
    },
];

const Users = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userData, setUserData] = useState([]);
    const [userTotalData, setUserTotalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedIds, setSortedIds] = useState([]);

    const context = useContext(MyContext);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        //Update all items checked status
        const updatedItems = userData.map((item) => ({
            ...item,
            checked: isChecked
        }));
        setUserData(updatedItems);

        //Update sorted IDS State
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            setSortedIds(ids);
        } else {
            setSortedIds([]);
        }
    }

    const handleCheckboxChange = (e, id, index) => {
        const updatedItems = userData.map((item) =>
            item._id === id ? { ...item, checked: !item.checked } : item
        )
        setUserData(updatedItems);

        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };

    const deleteMultipleUser = () => {
        if (sortedIds.length === 0) {
            context.openAlertBox('error', 'Please select items to be deleted.');
            return;
        }
        try {
            deleteMultipleData('/api/user/deleteMultiple', { data: { ids: sortedIds } }).then((res) => {
                if (res?.data?.error === false) {
                    getUsers();
                    context.openAlertBox('success', res?.data?.message);
                } else {
                    context.openAlertBox('error', res?.data?.message);
                }
            })
        } catch (error) {
            context.openAlertBox('error', 'Error in deleting users.');
        }
    };

    const getUsers = () => {
        setIsLoading(true);
        fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
            setUserData(res?.users);
            setUserTotalData(res?.users);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
            setUserData(res?.users);
            setUserTotalData(res?.users);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        if (searchQuery !== '') {
            const filteredItems = userTotalData?.filter((user) =>
                user?._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user?.mobile !== null && user?.mobile.includes(searchQuery.toLowerCase())
            );
            setUserData(filteredItems);
        } else {
            fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
                setUserData(res?.users);
            });
        }
    }, [searchQuery]);

    return (
        <>
            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>

                <div className='flex items-center w-full px-5 justify-between'>
                    <div className='col w-[40%]'>
                        <h2 className='text-[18px] font-[600]'>
                            User List
                        </h2>
                    </div>
                    <div className='col w-[40%] ml-auto flex gap-5'>
                        {
                            sortedIds?.length !== 0 &&
                            <Button variant='contained' className='btn-sm' size='small' color='error'
                                onClick={deleteMultipleUser}
                            >
                                Delete
                            </Button>
                        }
                        <SearchBox
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                </div>
                <br />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label}
                                        size='small'
                                        onChange={handleSelectAll}
                                        checked={userData?.length > 0 ? userData.every((item) => item.checked) : false}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <span className='whitespace-nowrap'>{column.label}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading === false && userData?.length !== 0 ?
                                    userData?.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )?.reverse()?.map((user, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    <Checkbox {...label} size='small'
                                                        checked={user.checked === true ? true : false}
                                                        onChange={(e) => handleCheckboxChange(e, user._id, index)}
                                                    />
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    <div className='flex items-center gap-4 w-[70px]'>
                                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                                            <Link to="/product/1234" data-discover='true'>
                                                                <img
                                                                    src={user?.avatar !== '' && user?.avatar !== undefined ? user?.avatar : '/avatar.jpg'}
                                                                    className='w-full group-hover:scale-105 transition-all'
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    {user?.name}
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    <span className='flex items-center gap-2'>
                                                        <MdOutlineMarkEmailRead />{user?.email}
                                                    </span>
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    <span className='flex items-center gap-2'>
                                                        <MdLocalPhone />{user?.mobile !== null && user?.mobile !== '' ? user?.mobile : '-'}
                                                    </span>
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    {user?.verify_email === true ? <Badge status='Verified' /> : <Badge status='Not Verified' />}
                                                </TableCell>
                                                <TableCell style={{ minWidth: columns.minWidth }}>
                                                    <span className='flex items-center gap-2'>
                                                        <SlCalender />{user?.createdAt?.split('T')[0]}
                                                    </span>
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
                    count={userData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

        </>
    )
}
export default Users;
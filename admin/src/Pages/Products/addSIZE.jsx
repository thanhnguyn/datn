import { Button, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';

const AddSIZE = () => {
    const [name, setName] = useState();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState('');
    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetchDataFromApi('/api/product/productSIZE/get').then((res) => {
            if (res?.error === false) {
                setData(res?.data);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (name === '' || name === undefined || name === null) {
            context.openAlertBox('error', 'Please enter product SIZE');
            setIsLoading(false);
            return false;
        }

        if (editId === "") {
            postData('/api/product/productSIZE/create', {
                name: name
            }).then((res) => {
                if (res?.error === false) {
                    context.openAlertBox('success', res?.message);
                    setTimeout(() => {
                        setIsLoading(false);
                        getData();
                        setName('');
                    }, 300);
                } else {
                    context.openAlertBox('error', res?.message);
                    setIsLoading(false);
                }
            });
        }

        if (editId !== "") {
            editData(`/api/product/productSIZE/${editId}`, {
                name: name
            }).then((res) => {
                if (res?.data?.error === false) {
                    context.openAlertBox('success', res?.data?.message);
                    setTimeout(() => {
                        setIsLoading(false);
                        getData();
                        setName('');
                        setEditId('');
                    }, 300);
                } else {
                    context.openAlertBox('error', res?.data?.message);
                    setIsLoading(false);
                }
            });
        }


    };

    const deleteItem = (id) => {
        deleteData(`/api/product/productSIZE/${id}`).then((res) => {
            getData();
            context.openAlertBox('success', 'Item deleted.');
        });
    };

    const editItem = (id) => {
        fetchDataFromApi(`/api/product/productSIZE/${id}`).then((res) => {
            setName(res?.data?.name);
            setEditId(res?.data?._id);
        });
    };

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>
                    Add product SIZE
                </h2>
            </div>
            <div className='card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]'>
                <form className='form py-3 p-6' onSubmit={handleSubmit}>
                    <div className='col mb-4'>
                        <h3 className='text-[14px] font-[500] mb-1 text-black'>Product SIZE</h3>
                        <input type="text" className='w-full h-[40px] border borer-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='name' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
                        {
                            isLoading === true ? <CircularProgress color="inherit" /> : <>
                                <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view</>
                        }
                    </Button>
                </form>
            </div>

            {
                data?.length !== 0
                &&
                <div className='card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]'>
                    <div className="relative overflow-x-auto mt-5 pb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width='60%'>
                                        Product SIZE
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width='30%'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700' key={index}>
                                                <td className="px-6 py-2" >
                                                    <span className='font-[600]'>{item?.name}</span>
                                                </td>
                                                <td className="px-6 py-2" >
                                                    <div className='flex items-center gap-1'>
                                                        <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' onClick={() => editItem(item?._id)}>
                                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                        <Button className='!w-[35px] !h-[35px] bg-[#f1f1f1] !min-w-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]' >
                                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[18px]' onClick={() => deleteItem(item?._id)} />
                                                        </Button>
                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}
export default AddSIZE;
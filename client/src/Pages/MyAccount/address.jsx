import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import Radio from '@mui/material/Radio';
import { FaRegTrashAlt } from 'react-icons/fa';

const label = { inputProps: { 'aria-label': 'Radio demo' } };

const Address = () => {
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [address, setAddress] = useState([]);
    const context = useContext(MyContext);

    const [formFields, setFormFields] = useState({
        address_line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        status: "",
        userId: "",
        isSelected: false
    });
    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }));
    }, [context?.userData]);
    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
            });
        }
    }, [context?.userData]);


    const [loading, setIsLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClose = () => {
        setIsOpenModel(false);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }));
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    };

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
            });
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.address_line1 === "") {
            context.openAlertBox("error", "Please enter address line 1.");
            return false;
        }

        if (formFields.city === "") {
            context.openAlertBox("error", "Please enter city.");
            return false;
        }

        if (formFields.state === "") {
            context.openAlertBox("error", "Please enter state.");
            return false;
        }
        if (formFields.pincode === "") {
            context.openAlertBox("error", "Please enter pincode.");
            return false;
        }
        if (formFields.country === "") {
            context.openAlertBox("error", "Please enter country.");
            return false;
        }
        if (phone === "") {
            context.openAlertBox("error", "Please enter phone number.");
            return false;
        }

        postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
            if (res?.error !== true) {
                setIsLoading(false);
                context.openAlertBox("success", res?.message);

                setIsOpenModel(false);

                fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                    setAddress(res.data);
                });


            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        });
    }

    return (
        <>
            <section className='py-10 w-full'>
                <div className='container flex gap-5'>
                    <div className='col1 w-[20%]'>
                        <AccountSidebar />
                    </div>

                    <div className='col2 w-[50%]'>
                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                            <div className='flex items-center pb-3'>
                                <h2 className='pb-0'>Address</h2>
                            </div>

                            <hr />

                            <div className='flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9]  cursor-pointer'
                                onClick={() => setIsOpenModel(true)}
                            >
                                <span className='text-[14px] font-[500]'>Add address</span>
                            </div>

                            <div className='flex gap-2 flex-col mt-4'>
                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <>
                                                <label className='group relative border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer'>
                                                    <div className='mr-auto'>
                                                        <Radio {...label} name='address'
                                                            checked={selectedValue === (
                                                                address?._id
                                                            )}
                                                            value={(address?._id)}
                                                            onClick={handleChange}
                                                        />
                                                        <span className='text-[12px]'>
                                                            {
                                                                address?.address_line1 + " " +
                                                                address?.city + " " +
                                                                address?.state + " " +
                                                                address?.country + " " +
                                                                address?.pincode
                                                            }
                                                        </span>
                                                    </div>

                                                    <span onClick={() => removeAddress(address?._id)} className='hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500  !z-50 text-white ml-auto'><FaRegTrashAlt /></span>
                                                </label>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Dialog onClose={handleClose} open={isOpenModel}>
                <DialogTitle>Add new address</DialogTitle>
                <form className='p-8 py-3 pb-5' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-5 pb-5'>
                        <div className='col w-[100%]'>
                            <TextField
                                className='w-full'
                                label="Address line 1"
                                variant="outlined"
                                size='small'
                                name='address_line1'
                                onChange={onChangeInput}
                                value={formFields.address_line1}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-5 pb-5'>
                        <div className='col w-[50%]'>
                            <TextField
                                className='w-full'
                                label="City"
                                variant="outlined"
                                size='small'
                                name='city'
                                onChange={onChangeInput}
                                value={formFields.city}
                            />
                        </div>
                        <div className='col w-[50%]'>
                            <TextField
                                className='w-full'
                                label="State"
                                variant="outlined"
                                size='small'
                                name='state'
                                onChange={onChangeInput}
                                value={formFields.state}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-5 pb-5'>
                        <div className='col w-[50%]'>
                            <TextField
                                className='w-full'
                                label="Pincode"
                                variant="outlined"
                                size='small'
                                name='pincode'
                                onChange={onChangeInput}
                                value={formFields.pincode}
                            />
                        </div>
                        <div className='col w-[50%]'>
                            <TextField
                                className='w-full'
                                label="Country"
                                variant="outlined"
                                size='small'
                                name='country'
                                onChange={onChangeInput}
                                value={formFields.country}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-5 pb-5'>
                        <div className='col w-[50%]'>
                            <PhoneInput
                                defaultCountry='vn'
                                value={phone}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields((prevState) => ({
                                        ...prevState,
                                        mobile: phone
                                    }));
                                }}
                            />
                        </div>
                        <div className='col w-[50%]'>
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size='small'
                                className='w-full'
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <Button type='submit' className='btn-org btn-lg w-full flex gap-2 items-center'>
                            Save
                        </Button>
                        <Button className='btn-org btn-border btn-lg w-full flex gap-2 items-center' onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}
export default Address;
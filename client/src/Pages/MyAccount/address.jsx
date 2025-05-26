import { Button, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn';
import AddressBox from './addressBox';

const label = { inputProps: { 'aria-label': 'Radio demo' } };

const Address = () => {
    const [phone, setPhone] = useState('');
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [address, setAddress] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [addressType, setAddressType] = useState('');
    const [mode, setMode] = useState('add');
    const [addressId, setAddressId] = useState();

    const context = useContext(MyContext);

    const [formFields, setFormFields] = useState({
        address_line1: "",
        city: "",
        district: "",
        pincode: "",
        country: "",
        mobile: "",
        userId: "",
        isSelected: false,
        landmark: '',
        addressType: ''
    });

    useEffect(() => {
        const data = getProvinces();
        setProvinces(data);
    }, []);

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
            });
        }
    }, [context?.userData]);

    const handleProvinceChange = (e) => {
        const selectedCode = e.target.value;
        const selectedProvince = provinces.find(p => p.code === selectedCode);

        setFormFields((prevState) => ({
            ...prevState,
            city: selectedProvince.name,
            district: ""
        }));

        const districts = getDistrictsByProvinceCode(selectedCode);
        setDistricts(districts);
    };

    const handleDistrictChange = (e) => {
        setFormFields((prevState) => ({
            ...prevState,
            district: e.target.value
        }));
    };

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
            });
        })
    };


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
                                onClick={() => context?.toggleAddressPanel(true)}
                            >
                                <span className='text-[14px] font-[500]'>Add address</span>
                            </div>

                            <div className='flex gap-2 flex-col mt-4'>
                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <AddressBox address={address} key={index} removeAddress={removeAddress} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
export default Address;
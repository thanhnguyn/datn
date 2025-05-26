import { Button, FormControl, FormControlLabel, FormLabel, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn';
import { MyContext } from '../../App';
const AddAddress = () => {
    onst[phone, setPhone] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [addressType, setAddressType] = useState('');
    const [mode, setMode] = useState('add');
    const [addressId, setAddressId] = useState();

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

    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);

    useEffect(() => {
        const data = getProvinces();
        setProvinces(data);
    }, []);

    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            country: "Việt Nam",
            userId: context?.userData?._id
        }));
    }, [context?.userData]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    };

    const handleChangeAddressType = (event) => {
        setAddressType(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            addressType: event.target.value
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'add') {
            setIsLoading(true);

            if (formFields.address_line1 === "") {
                context.openAlertBox("error", "Please enter address line 1.");
                return false;
            }

            if (formFields.city === "") {
                context.openAlertBox("error", "Please enter city.");
                return false;
            }

            if (formFields.district === "") {
                context.openAlertBox("error", "Please enter district.");
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
            if (formFields.addressType === "") {
                context.openAlertBox("error", "Please choose Address type.");
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
                        setFormFields({
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
                        setAddressType('');
                        setPhone('');
                    });


                } else {
                    context.openAlertBox("error", res?.message);
                    setIsLoading(false);
                }
            });
        }

        if (mode === 'edit') {
            setIsLoading(true);
            editData(`/api/address/${addressId}`, formFields, { withCredentials: true }).then((res) => {
                if (!res?.error) {
                    context.openAlertBox("success", "Address updated successfully.");
                    setIsOpenModel(false);
                    setMode("add");
                    setIsLoading(false);

                    fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                        setAddress(res.data);
                    });
                    setFormFields({
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
                    setAddressType('');
                    setPhone('');
                } else {
                    context.openAlertBox("error", res?.message || "Failed to update address.");
                    setIsLoading(false);
                }
            });
        }
    }

    const editAddress = (id) => {

        setMode('edit');
        setIsOpenModel(true);
        setAddressId(id);
        fetchDataFromApi(`/api/address/${id}`).then((res) => {
            const cityName = res?.address?.city;
            const selectedProvince = provinces.find(p => p.name === cityName);
            const provinceCode = selectedProvince?.code;

            if (provinceCode) {
                const districts = getDistrictsByProvinceCode(provinceCode);
                setDistricts(districts);
            }
            setFormFields({
                address_line1: res?.address?.address_line1,
                city: cityName,
                district: res?.address?.district,
                pincode: res?.address?.pincode,
                country: res?.address?.country,
                mobile: res?.address?.mobile,
                userId: res?.address?.userId,
                isSelected: res?.address?.isSelected,
                landmark: res?.address?.landmark,
                addressType: res?.address?.addressType
            });
            const ph = `${res?.address?.mobile}`;
            setPhone(ph || '');
            setAddressType(res?.address?.addressType || '');
        });
    };


    return (
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
                        select
                        className='w-full'
                        label="City"
                        variant="outlined"
                        size='small'
                        value={provinces.find(p => p.name === formFields.city)?.code || ''}
                        onChange={handleProvinceChange}
                        SelectProps={{ native: true }}
                    >
                        <option value=""></option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </TextField>
                </div>

                <div className='col w-[50%]'>
                    <TextField
                        select
                        className='w-full'
                        label="District"
                        variant="outlined"
                        size='small'
                        value={formFields.district}
                        onChange={handleDistrictChange}
                        SelectProps={{ native: true }}
                        disabled={districts.length === 0}
                    >
                        <option value=""></option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.name}>
                                {district.name}
                            </option>
                        ))}
                    </TextField>
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
                        value="Việt Nam"
                        InputProps={{
                            readOnly: true,
                        }}
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
                    <TextField
                        className='w-full'
                        label="Landmark"
                        variant="outlined"
                        size='small'
                        name='landmark'
                        onChange={onChangeInput}
                        value={formFields.landmark}
                    />
                </div>
            </div>
            <div className='flex gap-5 pb-5'>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Address type:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        className='flex items-center gap-5'
                        name="row-radio-buttons-group"
                        value={formFields.addressType}
                        onChange={handleChangeAddressType}
                    >
                        <FormControlLabel value="Home" control={<Radio />} label="Home" />
                        <FormControlLabel value="Office" control={<Radio />} label="Office" />
                    </RadioGroup>
                </FormControl>
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
    )
}
export default AddAddress;
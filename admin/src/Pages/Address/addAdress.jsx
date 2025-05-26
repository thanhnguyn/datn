import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import 'react-lazy-load-image-component/src/effects/blur.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn';
import TextField from '@mui/material/TextField';

const AddAddress = () => {
  const context = useContext(MyContext);

  const [phone, setPhone] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    district: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    isSelected: false
  });

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      country: "Việt Nam",
      userId: context?.userData?._id
    }));
  }, [context?.userData]);

  useEffect(() => {
    const data = getProvinces();
    setProvinces(data);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    });
  }

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
    if (phone === "") {
      context.openAlertBox("error", "Please enter phone number.");
      return false;
    }

    postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        context?.setIsOpenFullScreenPanel({
          open: false
        });

        fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
          context?.setAddress(res.data);
        });


      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  }


  return (
    <section className='p-5 bg-gray-50'>
      <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
        <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
          <div className='grid grid-cols-2 mb-3 gap-4'>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>Address line 1</h3>
              <TextField
                className='w-full'
                variant="outlined"
                size='small'
                name='address_line1'
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>City</h3>
              <TextField
                select
                className='w-full'
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
          </div>
          <div className='grid grid-cols-3 mb-3 gap-4'>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>District</h3>
              <TextField
                select
                className='w-full'
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
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>Pincode</h3>
              <TextField
                className='w-full'
                variant="outlined"
                size='small'
                name='pincode'
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>Country</h3>
              <TextField
                className='w-full'
                variant="outlined"
                size='small'
                name='country'
                value="Việt Nam"
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>
                Mobile no.
              </h3>
              <PhoneInput
                defaultCountry='vn'
                value={phone}
                disabled={isLoading === true ? true : false}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prevState) => ({
                    ...prevState,
                    mobile: phone
                  }));
                }}
              />
            </div>
          </div>
          <br />
        </div>
        <br />

        <br />

        <div className='w-[250px]'>
          <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
            <FaCloudUploadAlt className='text-[25px] text-white' />Publish and view
          </Button>
        </div>
      </form>
    </section>
  )
}
export default AddAddress;
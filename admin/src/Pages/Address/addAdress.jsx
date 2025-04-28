import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import 'react-lazy-load-image-component/src/effects/blur.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';

const AddAddress = () => {
  const context = useContext(MyContext);

  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: context?.userData?._id
  });

  useEffect(() => {
    formFields.userId = context?.userData?._id;
  }, [context?.userData]);


  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields({
      status: event.target.value
    })
  };


  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    });
  }


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
        context.openAlertBox("success", res?.data?.message);
      } else {
        context.openAlertBox("error", res?.data?.message);
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
              <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='address_line1' onChange={onChangeInput} value={formFields.address_line1} />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>City</h3>
              <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='city' onChange={onChangeInput} value={formFields.city} />
            </div>
          </div>
          <div className='grid grid-cols-3 mb-3 gap-4'>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>State</h3>
              <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='state' onChange={onChangeInput} value={formFields.state} />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>Pincode</h3>
              <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='pincode' onChange={onChangeInput} value={formFields.pincode} />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>Country</h3>
              <input type="text" className='w-full h-[40x] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='country' onChange={onChangeInput} value={formFields.country} />
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
                  setFormFields({
                    mobile: phone
                  });
                }}
              />
            </div>
            <div className='col w-[100%]'>
              <h3 className='text-[14px] font-[500] mb-1 text-black'>
                Status
              </h3>
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
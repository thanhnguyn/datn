import React, { useContext, useState } from 'react'
import { Button, Radio } from '@mui/material';
import { BsFillBagCheckFill } from "react-icons/bs";
import { MyContext } from '../../App';
import { FaPlus } from 'react-icons/fa6';

const Checkout = () => {
    const context = useContext(MyContext);
    const [isChecked, setIsChecked] = useState(0);

    const editAddress = (id) => {
        context?.setOpenAddressPanel(true);
        context?.setAddressMode('edit');
        context?.setAddressId(id);
    }

    const handleChange = (e, index) => {
        if (e.target.checked) {
            setIsChecked(index);
        }
    };

    return (
        <section className='py-10'>
            <div className='w-[70%] m-auto flex gap-5'>
                <div className='leftCol w-[60%]'>
                    <div className='card bg-white shadow-md p-5 rounded-md w-full'>
                        <div className='flex items-center justify-between'>
                            <h2>Select delivery address</h2>
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    context?.setAddressMode('add');
                                    context?.toggleAddressPanel(true)();
                                }}
                            >
                                <FaPlus />  Add new address
                            </Button>
                        </div>
                        <br />
                        <div className='flex flex-col gap-4'>
                            {
                                context?.userData?.address_details?.length !== 0 ? context?.userData?.address_details?.map((item, index) => {
                                    return (
                                        <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index ? 'bg-[#fff2f2]' : ''}`} key={index}>
                                            <div>
                                                <Radio size='small' onChange={(e) => handleChange(e, index)} checked={isChecked === index} />
                                            </div>
                                            <div className='info'>
                                                <span className='inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm'>{item?.addressType}</span>
                                                <h3>{context?.userData?.name}</h3>
                                                <p className='mt-0 mb-0'>{item?.address_line1 + ", " + item?.district + ", " + item?.city + ", " + item?.country + ", " + item?.pincode}</p>
                                                <p className='mt-0 mb-0'>{item?.landmark}</p>
                                                <p className='mb-0 font-[500]'>+{item?.mobile}</p>
                                            </div>
                                            <Button className='!absolute top-[15px] right-[15px]' variant='text' onClick={() => editAddress(item?._id)}>EDIT</Button>
                                        </label>
                                    );
                                })
                                    :
                                    <>
                                        <div className='flex items-center flex-col'>
                                            <h2 className='text-center'>No address found in your account.</h2>
                                            <br />
                                            <img className='p-5' src="/address img/535239.png" alt="" />
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className='rightCol w-[40%]'>
                    <div className='card shadow-md bg-white p-5 rounded-md'>
                        <h2 className='mb-4'>Your order</h2>
                        <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                            <span className='text-[14px] font-[600]'>Product</span>
                            <span className='text-[14px] font-[600]'>Subtotal</span>
                        </div>
                        <div className='mb-5 scroll max-h-[250px] overflow-y-auto overflow-x-hidden pr-2'>
                            {
                                context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                                    console.log(item);
                                    return (
                                        <div className='flex items-center justify-between py-2' key={index}>
                                            <div className='part1 flex items-center gap-3'>
                                                <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                                    <img src={item?.image} className='w-full transition-all group-hover:scale-105' alt="" />
                                                </div>
                                                <div className='info'>
                                                    <h4 className='text-[14px]' title={item?.productTitle}> {item?.productTitle?.length > 22 ? item?.productTitle?.substr(0, 22) + '...' : item?.productTitle}</h4>
                                                    <p className='text-[13px]'>Qty : {item?.quantity}</p>
                                                </div>
                                            </div>
                                            <span className='text-[14px] font-[500]'>{(item?.price * item?.quantity)?.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <Button className='btn-org btn-lg w-full flex gap-2 items-center'><BsFillBagCheckFill className='text-[20px]' /> Checkout</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Checkout;
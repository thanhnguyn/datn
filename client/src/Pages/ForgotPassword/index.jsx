import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';

const ForgotPassword = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);

    const context = useContext(MyContext);
    const history = useNavigate();

    return (
        <section className='section py-10'>
            <div className='container'>
                <div className='card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Forgot password</h3>
                    <form className='w-full mt-5'>
                        <div className='form-group w-full mb-5 relative'>
                            <TextField type={isPasswordShow === false ? 'password' : 'text'} id="password" label="New Password" variant="outlined" className='w-full' name='name' />
                            <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => {
                                setIsPasswordShow(!isPasswordShow)
                            }}>
                                {
                                    isPasswordShow === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                                }

                            </Button>
                        </div>
                        <div className='form-group w-full mb-5 relative'>
                            <TextField type={isPasswordShow2 === false ? 'password' : 'text'} id="confirm_password" label="Confirm Password" variant="outlined" className='w-full' name='password' />
                            <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => {
                                setIsPasswordShow2(!isPasswordShow2)
                            }}>
                                {
                                    isPasswordShow2 === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                                }

                            </Button>
                        </div>
                        <div className='flex items-center w-full mt-3 mb-3'>
                            <Button className='btn-org btn-lg w-full'>Change password</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;
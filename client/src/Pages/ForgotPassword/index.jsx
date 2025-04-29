import React, { useContext, useState } from 'react'
import { Button, TextField, CircularProgress } from '@mui/material';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);

    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    }

    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.newPassword === "") {
            context.openAlertBox("error", "Please enter new password.");
            setIsLoading(false);
            return false;
        }

        if (formFields.confirmPassword === "") {
            context.openAlertBox("error", "Please confirm new password.");
            setIsLoading(false);
            return false;
        }
        if (formFields.confirmPassword !== formFields.newPassword) {
            context.openAlertBox("error", "New password and confirm password not match.");
            setIsLoading(false);
            return false;
        }

        postData('/api/user/reset-password2', formFields).then((res) => {
            if (res?.error === false) {
                localStorage.removeItem("userEmail");
                localStorage.removeItem("actionType");
                context.openAlertBox('success', res?.message);
                setIsLoading(false);
                history('/login');
            } else {
                context.openAlertBox('error', res?.message);
            }

        });
    }

    return (
        <section className='section py-10'>
            <div className='container'>
                <div className='card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Forgot password</h3>
                    <form className='w-full mt-5' onSubmit={handleSubmit}>
                        <div className='form-group w-full mb-5 relative'>
                            <TextField
                                type={isPasswordShow === false ? 'password' : 'text'}
                                id="password"
                                label="New Password"
                                variant="outlined"
                                className='w-full'
                                name='newPassword'
                                value={formFields.newPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput}
                            />
                            <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => {
                                setIsPasswordShow(!isPasswordShow)
                            }}>
                                {
                                    isPasswordShow === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                                }

                            </Button>
                        </div>
                        <div className='form-group w-full mb-5 relative'>
                            <TextField
                                type={isPasswordShow2 === false ? 'password' : 'text'}
                                id="confirm_password"
                                label="Confirm Password"
                                variant="outlined"
                                className='w-full'
                                name='confirmPassword'
                                value={formFields.confirmPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput}
                            />
                            <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => {
                                setIsPasswordShow2(!isPasswordShow2)
                            }}>
                                {
                                    isPasswordShow2 === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                                }

                            </Button>
                        </div>
                        <div className='flex items-center w-full mt-3 mb-3'>
                            <Button type='submit' disabled={!valideValue} className='btn-org btn-lg w-full flex gap-3'>
                                {
                                    isLoading === true ? <CircularProgress color="inherit" /> : 'Change password'
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;
import { Button, CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const ChangePassword = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        <section className='bg-white w-full'>
            <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>
                <Link to='/'>
                    <img src="/vite.svg" className='w-[60px]' />
                </Link>

                <div className='flex items-center gap-0'>
                    <NavLink to='/login' exact={true} activeClassName='isActive'>
                        <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                            <CgLogIn className='text-[18px]' />Login
                        </Button>
                    </NavLink>
                    <NavLink to='/sign-up' exact={true} activeClassName='isActive'>
                        <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                            <FaRegUser className='text-[15px]' />Sign up
                        </Button>
                    </NavLink>

                </div>
            </header>
            <img src="/OIP.jpg" className='w-full fixed top-0 left-0 opacity-5' />
            <div className='loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50'>
                <div className='text-center'>
                    <img src="/vite.svg" className='m-auto' />
                </div>

                <h1 className='text-center text-[35px] font-[800] mt-4'>
                    You can change your password now.
                </h1>

                <br />

                <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>
                    <div className='form-group mb-4 w-full'>
                        <h4 className='text-[14px] font-[500] mb-1'>New password</h4>
                        <div className='relative w-full'>
                            <input
                                type={`${isPasswordShow === true ? 'text' : 'password'}`}
                                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name='newPassword'
                                value={formFields.newPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput}
                            />
                            <Button onClick={() => setIsPasswordShow(!isPasswordShow)} className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600'>
                                {
                                    isPasswordShow === true ? <>
                                        <FaEyeSlash className='text-[18px]' />
                                    </> : <>

                                        <FaRegEye className='text-[18px]' />
                                    </>
                                }
                            </Button>
                        </div>
                    </div>
                    <div className='form-group mb-4 w-full'>
                        <h4 className='text-[14px] font-[500] mb-1'>Confirm password</h4>
                        <div className='relative w-full'>
                            <input
                                type={`${isPasswordShow2 === true ? 'text' : 'password'}`}
                                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name='confirmPassword'
                                value={formFields.confirmPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput}
                            />
                            <Button onClick={() => setIsPasswordShow2(!isPasswordShow2)} className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600'>
                                {
                                    isPasswordShow2 === true ? <>
                                        <FaEyeSlash className='text-[18px]' />
                                    </> : <>

                                        <FaRegEye className='text-[18px]' />
                                    </>
                                }
                            </Button>
                        </div>
                    </div>

                    <Button type='submit' disabled={!valideValue} className='btn-blue btn-lg w-full'> {
                        isLoading === true ? <CircularProgress color="inherit" /> : 'Change password'
                    }</Button>
                </form>
            </div>
        </section>
    )
}
export default ChangePassword;
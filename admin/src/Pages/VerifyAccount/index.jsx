import { Button, CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import OtpBox from '../../components/OtpBox';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const VerifyAccount = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const history = useNavigate();

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const verifyOTP = (e) => {
        e.preventDefault();
        if (otp !== "") {
            setIsLoading(true);
            const actionType = localStorage.getItem('actionType');
            if (actionType !== 'forgot-password') {
                postData("/api/user/verifyEmail", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.error === false) {
                        context.openAlertBox("success", res?.message);
                        localStorage.removeItem("userEmail");
                        setIsLoading(false);
                        history("/login");
                    } else {
                        setIsLoading(false);
                        context.openAlertBox("error", res?.message);
                    }
                });
            } else {
                postData("/api/user/verify-forgot-password-otp", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.error === false) {
                        context.openAlertBox("success", res?.message);
                        setIsLoading(false);
                        history("/change-password");
                    } else {
                        setIsLoading(false);
                        context.openAlertBox("error", res?.message);
                    }
                });
            }
        } else {
            context.openAlertBox("error", "Please enter OTP.");
        }




    }

    return (
        <section className='bg-white w-full h-[100vh]'>
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
                    <img src="../../../public/verify3.png" className='w-[100px] m-auto' />
                </div>

                <h1 className='text-center text-[35px] font-[800] mt-4'>
                    Please verify your email
                </h1>
                <br />
                <p className='text-center text-[15px]'>OTP sent to &nbsp; <span className='text-primary font-bold'>{localStorage.getItem('userEmail')}</span></p>
                <br />
                <form onSubmit={verifyOTP}>
                    <div className='text-center flex items-center justify-center flex-col'>
                        <OtpBox length={6} onChange={handleOtpChange} />
                    </div>
                    <br />
                    <div className='w-[300px] m-auto'>
                        <Button type='submit' className='btn-blue w-full'>
                            {
                                isLoading === true ? <CircularProgress color="inherit" /> : ' Verify OTP'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default VerifyAccount;
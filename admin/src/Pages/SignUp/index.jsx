import { Button, CircularProgress, FormControlLabel } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { postData } from '../../utils/api.js';
import { MyContext } from '../../App';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from '../../firebase.jsx';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFacebook, setLoadingFacebook] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordShow, setIsPasswordShow] = useState(false);

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
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

        if (formFields.name === "") {
            context.openAlertBox("error", "Please enter full name.");
            return false;
        }

        if (formFields.email === "") {
            context.openAlertBox("error", "Please enter email.");
            return false;
        }

        if (formFields.password === "") {
            context.openAlertBox("error", "Please enter password.");
            return false;
        }

        postData("/api/user/register", formFields).then((res) => {
            if (res?.error !== true) {
                context.openAlertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email);
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                });
                history("/verify-account");
            } else {
                context.openAlertBox("error", res?.message);
            }
            setIsLoading(false);
        });
    }


    function handleClickGoogle() {
        setLoadingGoogle(true);
        authWithGoogle();
    }

    const authWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: '',
                    avatar: user.providerData[0].photoURL,
                    mobile: user.providerData[0].phoneNumber,
                    role: "USER"
                };

                postData("/api/user/authWithGoogle", fields).then((res) => {
                    if (res?.error !== true) {
                        context.openAlertBox("success", res?.message);
                        localStorage.setItem("userEmail", fields.email);
                        localStorage.setItem('accessToken', res?.data?.accessToken);
                        localStorage.setItem('refreshToken', res?.data?.refreshToken);

                        context.setIsLogin(true);

                        history("/");
                    } else {
                        context.openAlertBox("error", res?.message);
                    }
                    setIsLoading(false);
                });
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

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
                    Join us today! <br />
                    Get special benefits and stay up-to-date.
                </h1>

                <div className='flex items-center justify-center w-full mt-5 gap-4'>
                    <Button
                        size="small"
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        className='!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                    >
                        Continue with Google
                    </Button>
                </div>

                <br />

                <div className='w-full flex items-center justify-center gap-3'>
                    <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='text-[14px] font-[500]'>Or, sign up with your email</span>
                    <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
                </div>
                <br />
                <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>
                    <div className='form-group mb-4 w-full'>
                        <h4 className='text-[14px] font-[500] mb-1'>Full name</h4>
                        <input
                            type="text"
                            className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                            name="name"
                            value={formFields.name}
                            disabled={isLoading === true ? true : false}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='form-group mb-4 w-full'>
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input
                            type="email"
                            className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                            name="email"
                            value={formFields.email}
                            disabled={isLoading === true ? true : false}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='form-group mb-4 w-full'>
                        <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
                        <div className='relative w-full'>
                            <input
                                type={`${isPasswordShow === true ? 'text' : 'password'}`}
                                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name="password"
                                value={formFields.password}
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
                    <div className='form-group mb-4 w-full flex items-center justify-between'>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

                        <Link to='/forgot-password' className='text-primary font-[700] text-[15px] hover:underline hover:text-gray-700'>Forgot password?</Link>
                    </div>
                    <Button type='submit' disabled={!valideValue} className='btn-blue btn-lg w-full'>
                        {
                            isLoading === true ? <CircularProgress color="inherit" /> : 'Sign up'
                        }
                    </Button>
                </form>
            </div>
        </section>
    )
}
export default SignUp;
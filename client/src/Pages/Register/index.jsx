import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from '../../firebase.jsx';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {

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
                history("/verify");
            } else {
                context.openAlertBox("error", res?.message);
            }
            setIsLoading(false);
        });
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
                    password: 'null',
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
        <section className='section py-10'>
            <div className='container'>
                <div className='card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Register with a new account</h3>
                    <form className='w-full mt-5' onSubmit={handleSubmit}>
                        <div className='form-group w-full mb-5'>
                            <TextField
                                type='text'
                                id="name"
                                name="name"
                                value={formFields.name}
                                disabled={isLoading === true ? true : false}
                                label="Full name *"
                                variant="outlined"
                                className='w-full'
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='form-group w-full mb-5'>
                            <TextField
                                type='email'
                                id="email"
                                name="email"
                                value={formFields.email}
                                disabled={isLoading === true ? true : false}
                                label="Email id *"
                                variant="outlined"
                                className='w-full'
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='form-group w-full mb-5 relative'>
                            <TextField
                                type={isPasswordShow === false ? 'password' : 'text'}
                                id="password"
                                name="password"
                                value={formFields.password}
                                disabled={isLoading === true ? true : false}
                                label="Password *"
                                variant="outlined"
                                className='w-full'
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
                        <div className='flex items-center w-full mt-3 mb-3'>
                            <Button type='submit' disabled={!valideValue} className='btn-org btn-lg w-full flex gap-3'>
                                {
                                    isLoading === true ? <CircularProgress color="inherit" /> : 'Register'
                                }
                            </Button>
                        </div>
                        <p className='text-center'>Already have an account? <Link className='link text-[14px] font-[600] text-primary' to='/login'>Sign in</Link></p>
                        <p className='text-center font-[500]'>Or continue with social account</p>
                        <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'
                            onClick={authWithGoogle}
                        >
                            <FcGoogle className='text-[20px]' /> Continue with Google
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register;
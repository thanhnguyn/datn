import { Button, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData } from '../../utils/api';

const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        mobile: ""
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token === null) {
            history('/login');
        }
    }, [context?.isLogin]);

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            });
        }
    }, [context?.userData]);


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

        if (formFields.mobile === "") {
            context.openAlertBox("error", "Please enter phone number.");
            return false;
        }

        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            if (res?.error !== true) {
                setIsLoading(false);
                context.openAlertBox("success", res?.data?.message);
            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        });
    }


    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[20%]'>
                    <AccountSidebar />
                </div>

                <div className='col2 w-[50%]'>
                    <div className='card bg-white p-5 shadow-md rounded-md'>
                        <h2 className='pb-3'>My profile</h2>
                        <hr />
                        <form className='mt-5' onSubmit={handleSubmit}>
                            <div className='flex items-center gap-5'>
                                <div className='w-[50%]'>
                                    <TextField
                                        label="Full name"
                                        variant="outlined"
                                        size='small'
                                        className='w-full'
                                        name='name'
                                        value={formFields.name}
                                        disabled={isLoading === true ? true : false}
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className='w-[50%]'>
                                    <TextField
                                        type='email'
                                        label="Email"
                                        variant="outlined"
                                        size='small'
                                        className='w-full'
                                        name='email'
                                        value={formFields.email}
                                        disabled={true}
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center mt-4 gap-5'>
                                <div className='w-[50%]'>
                                    <TextField
                                        label="Phone number"
                                        variant="outlined"
                                        size='small'
                                        className='w-full'
                                        name='mobile'
                                        value={formFields.mobile}
                                        disabled={isLoading === true ? true : false}
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className='flex items-center gap-4'>
                                <Button type='submit' disabled={!valideValue} className='btn-org btn-lg w-[200px]'>
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" /> : 'Update profile'
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MyAccount;
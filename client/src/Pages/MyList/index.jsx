import React, { useContext } from 'react'
import MyListItems from './MyListItems';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const MyList = () => {

    const context = useContext(MyContext);

    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[20%]'>
                    <AccountSidebar />
                </div>

                <div className='col2 w-[70%]'>
                    <div className='shadow-md rounded-md bg-white'>
                        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                            <h2 >My list</h2>
                            <p className='mt-0'>
                                There are <span className='font-bold text-primary'>{context?.myListData?.length}</span> products in your My list
                            </p>
                        </div>
                        {
                            context?.myListData?.length !== 0 ?
                                context?.myListData?.map((item, index) => {
                                    return (
                                        <MyListItems key={index} item={item} />
                                    );
                                })
                                :
                                <div className='flex items-center justify-center p-20 flex-col gap-5'>
                                    <h4>My List is currently empty.</h4>
                                    <img src="/mylist img/2366110.png" alt="" />
                                    <Link to='/'>
                                        <Button className='btn-org btn-sm'>Continue shopping</Button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}
export default MyList;
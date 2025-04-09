import React from 'react'
import MyListItems from './MyListItems';
import AccountSidebar from '../../components/AccountSidebar';

const MyList = () => {
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
                                There are <span className='font-bold text-primary'>2</span> products in your My list
                            </p>
                        </div>
                        <MyListItems />
                        <MyListItems />
                        <MyListItems />
                        <MyListItems />
                        <MyListItems />
                        <MyListItems />
                        <MyListItems />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MyList;
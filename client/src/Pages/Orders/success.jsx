import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2'>
            <img src="/payment img/11338468.png" width='150' />
            <h1 className='mb-0 text-[25px]'>Your order is placed!</h1>
            <p className='mt-0'>Thanks for your payment</p>
            <Link to='/'>
                <Button className='btn-org btn-border'>Back to home</Button>
            </Link>
        </section>
    )
}
export default OrderSuccess;
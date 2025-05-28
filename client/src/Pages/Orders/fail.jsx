import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderFail = () => {
    return (
        <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2'>
            <img src="/payment img/fail order.png" width='150' />
            <h1 className='mb-0 text-[25px]'>Your order is failed!</h1>
            <p className='mt-0'>Due to some reason.</p>
            <Link to='/'>
                <Button className='btn-org btn-border'>Back to home</Button>
            </Link>
        </section>
    )
}
export default OrderFail;
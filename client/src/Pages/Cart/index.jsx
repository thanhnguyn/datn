import React from 'react'
import { Button } from '@mui/material';
import { BsBagCheckFill } from "react-icons/bs";
import CartItems from './cartItems';

const CartPage = () => {
    return (
        <section className='section py-10 pb-10'>
            <div className='container w-[80%] max-w-[80%] flex gap-5'>
                <div className='leftPart w-[70%]'>
                    <div className='shadow-md rounded-md bg-white'>
                        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                            <h2 >Your cart</h2>
                            <p className='mt-0'>
                                There are <span className='font-bold text-primary'>2</span> products in your cart
                            </p>
                        </div>
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                        <CartItems size='S' qty={1} />
                    </div>
                </div>

                <div className='rightPart w-[30%]'>
                    <div className='shadow-md rounded-md bg-white p-5'>
                        <h3 className='pb-3'>CART TOTALS</h3>
                        <hr />
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Subtotal</span>
                            <span className='text-primary font-bold'>$58</span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Shipping</span>
                            <span className='font-bold'>Free</span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Estimate for</span>
                            <span className='font-bold'>UK</span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Total</span>
                            <span className='text-primary font-bold'>$58</span>
                        </p>
                        <br />
                        <Button className='btn-org btn-lg w-full flex gap-2'>
                            <BsBagCheckFill className='text-[20px]' /> Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CartPage;
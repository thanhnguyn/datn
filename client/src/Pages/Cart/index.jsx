import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { BsBagCheckFill } from "react-icons/bs";
import CartItems from './cartItems';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const context = useContext(MyContext);
    let shippingFee;
    if (context?.cartData?.length !== 0) {
        shippingFee = 30000;
    } else shippingFee = 0;
    return (
        <section className='section py-10 pb-10'>
            <div className='container w-[80%] max-w-[80%] flex gap-5'>
                <div className='leftPart w-[70%]'>
                    <div className='shadow-md rounded-md bg-white'>
                        {
                            context?.cartData?.length !== 0 ?
                                <>
                                    <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                                        <h2 >CART</h2>
                                        <p className='mt-0'>
                                            There are <span className='font-bold text-primary'>{context?.cartData?.length}</span> products in your cart
                                        </p>
                                    </div>
                                    {
                                        context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                                            return (
                                                <CartItems key={index} item={item} />
                                            );
                                        })
                                    }
                                </>
                                :
                                <>
                                    <div className='flex items-center justify-center flex-col py-10 gap-5'>
                                        <h4>Your cart is currently empty.</h4>
                                        <img src="./cart img/empty-cart.png" className='w-[150px]' />
                                        <Link to='/'>
                                            <Button className='btn-org btn-sm'>Continue shopping</Button>
                                        </Link>
                                    </div>
                                </>

                        }
                    </div>
                </div>
                <div className='rightPart w-[30%]'>
                    <div className='shadow-md rounded-md bg-white p-5'>
                        <h3 className='pb-3'>CART TOTALS</h3>
                        <hr />
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Subtotal</span>
                            <span className='text-primary font-bold'>
                                {
                                    (context?.cartData?.length !== 0 ?
                                        context?.cartData?.map(item => item?.subTotal)
                                            .reduce((total, value) => total + value, 0) : 0)?.toLocaleString('vi-VN')
                                }đ
                            </span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Shipping</span>
                            <span className='font-bold'>{shippingFee.toLocaleString('vi-VN')}đ</span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Estimate for</span>
                            <span className='font-bold'>Hanoi</span>
                        </p>
                        <p className='flex items-center justify-between'>
                            <span className='text-[14px] font-[500]'>Total</span>
                            <span className='text-primary font-bold'>

                                {
                                    ((context?.cartData?.length !== 0 ?
                                        context?.cartData?.map(item => item?.subTotal)
                                            .reduce((total, value) => total + value, 0) : 0) + shippingFee)?.toLocaleString('vi-VN')
                                }đ
                            </span>
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
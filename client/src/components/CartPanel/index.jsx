import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteData } from '../../utils/api';

const CartPanel = (props) => {
    const context = useContext(MyContext);

    const removeItem = (id) => {
        deleteData(`/api/cart/deleteCartItem/${id}`).then((res) => {
            context?.openAlertBox('success', 'Item removed from cart.');
            context?.getCartItems();
        });
    };

    return (
        <>
            <div className='scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4'>
                {
                    props?.data?.map((item, index) => {
                        console.log(item);
                        return (
                            <div className='cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4'>
                                <div className='img w-[25%] overflow-hidden h-[80px] rounded-md'>
                                    <Link to={`/product/${item?.productId}`} className='block group'>
                                        <img src={item?.image} className='w-full group-hover:scale-105' />
                                    </Link>
                                </div>
                                <div className='info w-[75%] pr-5 relative pt-3'>
                                    <h4 className='text-[14px] font-[500]'>
                                        <Link to={`/product/${item?.productId}`} className='link transition-all'>
                                            {item?.productTitle?.length > 27 ? item?.productTitle?.substr(0, 27) + '...' : item?.productTitle}
                                        </Link>
                                    </h4>
                                    <p className='flex items-center gap-5 mt-2 mb-2'>
                                        <span>Qty : <span>{item?.quantity}</span></span>
                                        <span className='text-primary font-bold'>Price : {item?.subTotal?.toLocaleString('vi-VN')}đ</span>
                                    </p>
                                    <MdOutlineDeleteOutline
                                        className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all'
                                        onClick={() => removeItem(item?._id)}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <br />

            <div className='bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5'>

                <div className='bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col'>
                    <div className='flex items-center justify-between w-full'>
                        <span className='text-[14px] font-[600]'>{context?.cartData?.length > 1 ? context?.cartData?.length + ' items' : context?.cartData?.length + ' item'} </span>
                        <span className='text-primary font-bold'>
                            {
                                (context?.cartData?.length !== 0 ?
                                    context?.cartData?.map(item => item?.subTotal)
                                        .reduce((total, value) => total + value, 0) : 0)?.toLocaleString('vi-VN')
                            }đ
                        </span>
                    </div>
                    {/* <div className='flex items-center justify-between w-full'>
                        <span className='text-[14px] font-[600]'>Shipping</span>
                        <span className='text-primary font-bold'>$5</span>
                    </div> */}
                </div>
                <div className='bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col'>
                    <div className='flex items-center justify-between w-full'>
                        <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
                        <span className='text-primary font-bold'>
                            {
                                (context?.cartData?.length !== 0 ?
                                    context?.cartData?.map(item => item?.subTotal)
                                        .reduce((total, value) => total + value, 0) : 0)?.toLocaleString('vi-VN')
                            }đ
                        </span>
                    </div>
                </div>

                <br />
                <div className='flex items-center justify-between w-full gap-5'>
                    <Link to='/cart' className='w-[50%] d-block' >
                        <Button className='btn-org btn-lg w-full' onClick={context.toggleCartPanel(false)}>View Cart</Button>
                    </Link>
                    <Link to='/checkout' className='w-[50%] d-block'>
                        <Button className='btn-org btn-border btn-lg w-full' onClick={context.toggleCartPanel(false)}>Checkout</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default CartPanel;
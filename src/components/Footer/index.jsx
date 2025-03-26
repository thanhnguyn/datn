import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";

const Footer = () => {
    return (

        <footer className='py-6'>
            <div className='container'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='col flex items-center justify-center flex-col'>
                        <LiaShippingFastSolid className='text-[60px] ' />
                        <h3 className='text-[18px] font-[600] mt-3'>Free Shipping</h3>
                        <p className='text-[13px] font-[500]'>For all orders over $100</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
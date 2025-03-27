import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (

        <>
            <footer className='py-6 bg-[#fafafa]'>
                <div className='container'>
                    <div className='flex items-center justify-center gap-2 py-8 pb-8'>
                        <div className='col flex items-center justify-center flex-col group w-[15%]'>
                            <LiaShippingFastSolid className='text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1' />
                            <h3 className='text-[16px] font-[600] mt-3'>Free Shipping</h3>
                            <p className='text-[12px] font-[500]'>For all orders over $100</p>
                        </div>

                        <div className='col flex items-center justify-center flex-col group w-[15%]'>
                            <PiKeyReturnLight className='text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1' />
                            <h3 className='text-[16px] font-[600] mt-3'>30 Days Returns</h3>
                            <p className='text-[12px] font-[500]'>For an Exchange Product</p>
                        </div>

                        <div className='col flex items-center justify-center flex-col group w-[15%]'>
                            <BsWallet2 className='text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1' />
                            <h3 className='text-[16px] font-[600] mt-3'>Secured Payment</h3>
                            <p className='text-[12px] font-[500]'>Payment Cards Accepted</p>
                        </div>

                        <div className='col flex items-center justify-center flex-col group w-[15%]'>
                            <LiaGiftSolid className='text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1' />
                            <h3 className='text-[16px] font-[600] mt-3'>Special Gifts</h3>
                            <p className='text-[12px] font-[500]'>Our First Product Order</p>
                        </div>
                        <div className='col flex items-center justify-center flex-col group w-[15%]'>
                            <BiSupport className='text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1' />
                            <h3 className='text-[16px] font-[600] mt-3'>Support 24/7</h3>
                            <p className='text-[12px] font-[500]'>Contact us Anytime</p>
                        </div>


                    </div>
                    <br />
                    <hr />

                    <div className='footer flex py-8'>
                        <div className='part1 w-[25%] border-r border-[rgba(0,0,0,0.2)]'>
                            <h2 className='text-[18px] font-[600] mb-4'>Contact us</h2>
                            <p className='text-[13px] font-[400] pb-4'>Classyshop - Mega Super Store <br />
                                507-Union Trade Centre France</p>
                            <Link className='link text-[13px]' to='mailto:someone@example.com'>sales@yourcompany.com</Link>
                            <span className='text-[22px] font-[600] block w-full mt-3 mb-5 text-primary'>(+91) 9876-543-210</span>

                            <div className='flex items-center gap-2'>
                                <IoChatboxOutline className='text-[40px] text-primary' />
                                <span className='text-[16px] font-[600]'>
                                    Online Chat <br />
                                    Get expert help
                                </span>
                            </div>
                        </div>

                        <div className='part2 w-[40%] flex pl-8'>
                            <div className='part2_col1 w-[50%]'>
                                <h2 className='text-[18px] font-[600] mb-4'>Products</h2>
                                <ul className='list'>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Price drop</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>New products</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Best sales</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Contact us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Sitemap</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Stores</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className='part2_col2 w-[50%]'>
                                <h2 className='text-[18px] font-[600] mb-4'>Our company</h2>
                                <ul className='list'>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Delivery</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Legal Notice</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Terms and conditions of use</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>About us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Secure payment</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link to='/' className='link'>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='part2 w-[35%] flex pl-8 flex-col pr-8'>
                            <h2 className='text-[18px] font-[600] mb-4'>Subscribe to newsletter</h2>
                            <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts</p>
                            <form className='mt-5'>
                                <input type="text" className='w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]]' placeholder='Your Email Address' />
                                <Button className='btn-org'>SUBSCRIBE</Button>
                                <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy" />
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

            <div className='bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white'>
                <div className='container flex items-center justify-between'>
                    <ul className='flex items-center gap-2'>
                        <li className='list-none'>
                            <Link to='/' target="_blank" className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all'>
                                <FaFacebookF className='text-[15px]  group-hover:text-white ' />
                            </Link>
                        </li>
                        <li>
                            <Link to='/' target="_blank" className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all'>
                                <AiOutlineYoutube className='text-[20px]  group-hover:text-white' />
                            </Link>
                        </li>
                        <li>
                            <Link to='/' target="_blank" className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all'>
                                <FaPinterestP className='text-[15px]  group-hover:text-white' />
                            </Link>
                        </li>
                        <li>
                            <Link to='/' target="_blank" className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all'>
                                <FaInstagram className='text-[15px]  group-hover:text-white' />
                            </Link>
                        </li>
                    </ul>

                    <p className='text-[13px] '>© 2024 - Ecommerce Template</p>

                    <div className='flex items-center'>
                        <img src="/public/payment img/carte_bleue.png" alt="" />
                        <img src="/public/payment img/american_express.png" alt="" />
                        <img src="/public/payment img/master_card.png" alt="" />
                        <img src="/public/payment img/paypal.png" alt="" />
                        <img src="/public/payment img/visa.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
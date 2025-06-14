import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from 'react-icons/fa';
import { FiUsers } from "react-icons/fi"
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { MyContext } from '../../App';
import { PiFlagBanner } from "react-icons/pi";
import { RiBloggerLine } from "react-icons/ri";

const Sidebar = () => {
    const [submenuIndex, setSubmenuIndex] = useState(null);
    const isOpenSubMenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    }
    const context = useContext(MyContext);
    return (
        <>
            <div className={`sidebar fixed top-0 left-0 bg-[#fff] ${context.isSidebarOpened === true ? 'w-[18%]' : 'w-0 opacity-0'} h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 transition-all`}>
                <div className='py-2 w-full'>
                    <Link to='/'>
                        <img src="/vite.svg" className='w-[120px]' alt="" />
                    </Link>
                </div>
                <ul className='mt-4'>
                    <li>
                        <Link to='/'>
                            <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                                <RxDashboard className='text-[18px]' />
                                <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(1)}>
                            <FaRegImage className='text-[18px]' />
                            <span>Home slides</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 1 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <Link to='/homeSlider/list'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Home banner list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add home slide' })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Add home banner slide
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Link to='/users'>
                            <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                                <FiUsers className='text-[18px]' />
                                <span>Users</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(3)}>
                            <RiProductHuntLine className='text-[18px]' />
                            <span>Products</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 3 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <Link to='/products'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Product list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: "Add product"
                                    })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Product upload
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(4)}>
                            <TbCategory className='text-[18px]' />
                            <span>Categories</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 4 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <Link to='/category/list'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Category list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add new category' })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Add a category
                                    </Button>
                                </li>
                                <li className='w-full'>
                                    <Link to='/subCategory/list'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Sub-category list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add new sub category' })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Add a sub-category
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Link to='/orders'>
                            <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                                <IoBagCheckOutline className='text-[20px]' />
                                <span>Orders</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(5)}>
                            <PiFlagBanner className='text-[18px]' />
                            <span>Banners</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${submenuIndex === 5 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 5 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <Link to='/bannerV1/list'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Banner V1 list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: "Add banner 1"
                                    })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Add banner
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(6)}>
                            <RiBloggerLine className='text-[18px]' />
                            <span>Blog</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${submenuIndex === 6 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 6 ? true : false}>
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <Link to='/blog/list'>
                                        <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                            Blog list
                                        </Button>
                                    </Link>
                                </li>
                                <li className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3' onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: "Add blog"
                                    })}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                                        Add blog
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                            <IoMdLogOut className='text-[20px]' />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Sidebar;
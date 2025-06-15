import React from 'react'
import './style.css';
import Button from '@mui/material/Button';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeInput = (e) => {
        setSearchQuery(e.target.value);

        const obj = {
            page: 1,
            limit: 30,
            query: e.target.value
        }

        if (e.target.value !== '') {
            postData(`/api/product/search/get`, obj).then((res) => {
                context?.setSearchData(res);
            })
        }
    }

    const search = () => {
        const obj = {
            page: 1,
            limit: 30,
            query: searchQuery
        }

        if (searchQuery !== '') {
            postData(`/api/product/search/get`, obj).then((res) => {
                context?.setSearchData(res);
                history('/search');
            })
        }
    }

    return (
        <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
            <input
                type="text"
                placeholder='Search for products....'
                className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'
                value={searchQuery}
                onChange={onChangeInput}
            />
            <Button
                className='!absolute top-[5px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black'
                onClick={search}
            >
                <IoSearch className='text-[#4e4e4e] text-[22px]' />
            </Button>
        </div>
    )
}
export default Search;
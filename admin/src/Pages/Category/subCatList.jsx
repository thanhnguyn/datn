import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import { MyContext } from "../../App";
import { FaAngleDown } from 'react-icons/fa6';
import EditSubCatBox from './EditSubCatBox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'image', label: 'CATEGORY IMAGE', minWidth: 250 },
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 250 },
    { id: 'subCatName', label: 'SUB CATEGORY NAME', minWidth: 400 },
    { id: 'action', label: 'ACTION', minWidth: 100 },
];

const SubCategoryList = () => {
    const [isOpen, setIsOpen] = useState(0);
    const context = useContext(MyContext);

    const expend = (index) => {
        if (isOpen === index) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(index);
        }
    };

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>
                    Sub Category List
                </h2>

                <div className='col w-[30%] ml-auto flex items-center justify-end gap-3'>
                    <Button className='btn-blue  !text-white btn-sm' onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: 'Add new sub category' })}>Add new sub category</Button>
                </div>
            </div>
            <div className='card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white'>
                {
                    context?.catData?.length !== 0 &&
                    <ul className='w-full'>
                        {
                            context?.catData?.map((firstLevelCat, index) => {
                                return (
                                    <li className='w-full mb-1' key={index}>
                                        <div className='flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4'>
                                            <span className='font-[500] flex items-center gap-4 text-[14px]'>
                                                {firstLevelCat?.name}
                                            </span>

                                            <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto' onClick={() => expend(index)} >
                                                <FaAngleDown className={`transition-transform duration-300 ${isOpen === index ? 'rotate-180' : 'rotate-0'}`} />
                                            </Button>
                                        </div>

                                        {
                                            isOpen === index &&
                                            <>
                                                {
                                                    firstLevelCat?.children?.length !== 0 &&
                                                    <ul className='w-full'>
                                                        {
                                                            firstLevelCat?.children?.map((subCat, index_) => {
                                                                return (
                                                                    <li className='w-full py-1' key={index_}>
                                                                        <EditSubCatBox
                                                                            name={subCat?.name}
                                                                            id={subCat?._id}
                                                                            catData={context?.catData}
                                                                            index={index_}
                                                                            selectedCat={subCat?.parentId}
                                                                            selectedCatName={subCat?.parentCatName}
                                                                        />
                                                                        {
                                                                            subCat?.children?.length !== 0 &&
                                                                            <ul className='pl-4'>
                                                                                {
                                                                                    subCat?.children?.map((thirdLevel, index__) => {
                                                                                        return (
                                                                                            <li
                                                                                                key={index__}
                                                                                                className='w-full hover:bg-[#f1f1f1]'
                                                                                            >
                                                                                                <EditSubCatBox
                                                                                                    name={thirdLevel.name}
                                                                                                    catData={firstLevelCat?.children}
                                                                                                    index={index__}
                                                                                                    selectedCat={thirdLevel?.parentId}
                                                                                                    selectedCatName={thirdLevel?.parentCatName}
                                                                                                    id={thirdLevel?._id}
                                                                                                />
                                                                                            </li>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </ul>
                                                                        }
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                }
                                            </>
                                        }
                                    </li>

                                );
                            })
                        }
                    </ul>
                }
            </div>

        </>
    )
}
export default SubCategoryList;
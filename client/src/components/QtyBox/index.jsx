import { Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { MyContext } from '../../App';

export const QtyBox = (props) => {
    const [qtyVal, setQtyVal] = useState(1);
    const context = useContext(MyContext);

    const maxQty = props?.maxQty;

    const updateQty = (newQty) => {
        if (newQty < 1) {
            context?.openAlertBox('error', 'Số lượng không hợp lệ. Tối thiểu là 1.');
            return;
        }

        if (maxQty && newQty > maxQty) {
            context?.openAlertBox('error', `Chỉ còn ${maxQty} sản phẩm trong kho.`);
            return;
        }

        setQtyVal(newQty);
        props.handleSelectQty(newQty);
    }

    const plusQty = () => updateQty(qtyVal + 1);
    const minusQty = () => updateQty(qtyVal - 1);

    const handleInputChange = (e) => {
        const rawVal = e.target.value;

        if (rawVal === '' || isNaN(rawVal)) {
            setQtyVal('');
            return;
        }

        const parsed = parseInt(rawVal);
        setQtyVal(parsed);

        if (parsed >= 1 && (!maxQty || parsed <= maxQty)) {
            props.handleSelectQty(parsed);
        } else if (parsed > maxQty) {
            context?.openAlertBox('error', `Chỉ còn ${maxQty} sản phẩm trong kho.`);
        } else {
            context?.openAlertBox('error', 'Số lượng không hợp lệ. Tối thiểu là 1.');
        }
    };

    return (
        <div className='qtyBox flex items-center relative'>
            <input
                type="number"
                min="1"
                className='w-full h-[40px] p-2 pl-5 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md'
                value={qtyVal}
                onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setQtyVal(val);
                    props.handleSelectQty(val); // ✅ truyền giá trị thật sự lên cha
                }}
            />
            <div className='flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50'>
                <Button
                    className='!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]'
                    onClick={plusQty}
                >
                    <FaAngleUp className='text-[12px] opacity-55' />
                </Button>
                <Button
                    className='!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]'
                    onClick={minusQty}
                >
                    <FaAngleDown className='text-[12px] opacity-55' />
                </Button>
            </div>
        </div>
    );
};

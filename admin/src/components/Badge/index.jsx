import React from 'react'

const Badge = (props) => {
    return (
        <span
            className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize 
            ${props.status === "pending" && 'bg-primary text-white'} 
            ${props.status === "confirmed" && 'bg-[#e0e421] text-white'}
            ${props.status === "delivered" && 'bg-[#2af93b] text-white'}
            ${props.status === "Verified" && 'bg-[#2af93b] text-white'}
            ${props.status === "Not Verified" && 'bg-[#f92828] text-white'}`}>
            {props.status}
        </span>
    )
}
export default Badge;

import React from 'react'

const MyAccount = () => {
    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[25%]'>
                    <div className='cart bg-white shadow-md rounded-md p-5'>
                        <div className='w-full p-3 flex items-center justify-center flex-col'>
                            <div className='w-[110px] h-[110px] rounded-full overflow-hidden'>
                                <img src="https://th.bing.com/th/id/OIP.4Q7-yMnrlnqwR4ORH7c06AHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-full h-full object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MyAccount;
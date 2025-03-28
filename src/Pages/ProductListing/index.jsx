import React from 'react'
import Sidebar from '../../components/Sidebar';

const ProductListing = () => {
    return (
        <section className='py-8'>
            <div className='container flex gap-3'>
                <div className='sidebarWrapper'>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default ProductListing;
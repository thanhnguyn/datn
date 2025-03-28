import React from 'react'
import Sidebar from '../../components/Sidebar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const ProductListing = () => {
    return (
        <section className='py-8'>
            <div className='container'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                    >
                        Fashion
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
                </Breadcrumbs>
            </div>
            <div className='container flex gap-3'>
                <div className='sidebarWrapper w-[20%] h-full bg-white p-3'>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default ProductListing;
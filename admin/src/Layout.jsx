import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import { useContext } from 'react';
import { MyContext } from './App';
import Header from './components/Header';
import Product from './Pages/Products';
import HomeSliderBanners from './Pages/HomeSliderBanners';
import CategoryList from './Pages/Category';
import SubCategoryList from './Pages/Category/subCatList';
import Users from './Pages/Users';
import Orders from './Pages/Orders';
import Profile from './Pages/Profile';
import ProductDetails from './Pages/Products/productDetails';

const Layout = (props) => {
    const { isSidebarOpened } = useContext(MyContext);

    return (
        <section className='main'>
            <Header />
            <div className='contentMain flex'>
                <div className={`overflow-hidden sidebarWrapper ${isSidebarOpened ? 'w-[18%]' : 'w-0'} transition-all`}>
                    <Sidebar />
                </div>
                <div className={`contentRight py-4 px-5 ${isSidebarOpened ? 'w-[82%]' : 'w-[100%]'} transition-all`}>

                    {
                        props.page === "Dashboard" ? (
                            <Dashboard />
                        ) : props.page === "Product" ? (
                            <Product />
                        ) : props.page === "HomeSliderBanners" ? (
                            <HomeSliderBanners />
                        ) : props.page === "CategoryList" ? (
                            <CategoryList />
                        ) : props.page === "SubCategoryList" ? (
                            <SubCategoryList />
                        ) : props.page === "Users" ? (
                            <Users />
                        ) : props.page === "Orders" ? (
                            <Orders />
                        ) : props.page === "Profile" ? (
                            <Profile />
                        ) : props.page === "ProductDetails" ? (
                            <ProductDetails />
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Layout;

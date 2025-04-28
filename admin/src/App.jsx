import './App.css'
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from 'react';
import Login from './Pages/Login';
import Layout from './Layout'
import SignUp from './Pages/SignUp';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from 'react-icons/io';
import Slide from '@mui/material/Slide';
import AddProduct from './Pages/Products/addProduct';
import AddHomeSlide from './Pages/HomeSliderBanners/AddHomeSlide';
import AddCategory from './Pages/Category/addCategory';
import AddSubCategory from './Pages/Category/addSubCategory';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount';
import ChangePassword from './Pages/ChangePassword';
import toast, { Toaster } from 'react-hot-toast';
import { fetchDataFromApi } from './utils/api';
import AddAddress from './Pages/Address/addAdress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();
function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);

        if (res?.response?.data?.message == "You have not login.") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          openAlertBox("error", "Your session is closed.");

          setIsLogin(false);
        }
      });

    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const openAlertBox = (status, msg) => {
    if (status === 'success') {
      toast.success(msg);
    } else if (status === 'error') {
      toast.error(msg);
    }
  }

  const values = {
    isSidebarOpened,
    setIsSidebarOpened,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    openAlertBox,
    userData,
    setUserData,
    setAddress,
    address
  };
  const router = createBrowserRouter([
    {
      path: '/',
      exact: true,
      element: (
        <>
          <Layout page={'Dashboard'} />
        </>
      ),
    },
    {
      path: '/login',
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: '/sign-up',
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: '/products',
      exact: true,
      element: (
        <>
          <Layout page={'Product'} />
        </>
      ),
    },
    {
      path: '/homeSlider/list',
      exact: true,
      element: (
        <>
          <Layout page={'HomeSliderBanners'} />
        </>
      ),
    },
    {
      path: '/category/list',
      exact: true,
      element: (
        <>
          <Layout page={'CategoryList'} />
        </>
      ),
    },
    {
      path: '/subCategory/list',
      exact: true,
      element: (
        <>
          <Layout page={'SubCategoryList'} />
        </>
      ),
    },
    {
      path: '/users',
      exact: true,
      element: (
        <>
          <Layout page={'Users'} />
        </>
      ),
    },
    {
      path: '/orders',
      exact: true,
      element: (
        <>
          <Layout page={'Orders'} />
        </>
      ),
    },
    {
      path: '/forgot-password',
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: '/verify-account',
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: '/change-password',
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: '/profile',
      exact: true,
      element: (
        <>
          <Layout page={'Profile'} />
        </>
      ),
    },
  ]);

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => setIsOpenFullScreenPanel({ open: false })}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenFullScreenPanel({ open: false })}
                aria-label="close"
              >
                <IoMdClose className='text-gray-800' />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className='text-gray-800'>{isOpenFullScreenPanel?.model}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {
            isOpenFullScreenPanel?.model === "Add product" && <AddProduct />
          }
          {
            isOpenFullScreenPanel?.model === "Add home slide" && <AddHomeSlide />
          }
          {
            isOpenFullScreenPanel?.model === "Add new category" && <AddCategory />
          }
          {
            isOpenFullScreenPanel?.model === "Add new sub category" && <AddSubCategory />
          }
          {
            isOpenFullScreenPanel?.model === "Add new address" && <AddAddress />
          }
        </Dialog>

        <Toaster />

      </MyContext.Provider>
    </>
  )
}

export default App
export { MyContext };
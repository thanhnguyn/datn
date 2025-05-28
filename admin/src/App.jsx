import './App.css'
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from 'react';
import Login from './Pages/Login';
import Layout from './Layout'
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount';
import ChangePassword from './Pages/ChangePassword';
import toast, { Toaster } from 'react-hot-toast';
import { fetchDataFromApi } from './utils/api';
import ReactDOM from "react-dom/client";

const MyContext = createContext();
function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    id: ''
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

  useEffect(() => {
    fetchDataFromApi('/api/category').then((res) => {
      setCatData(res?.data);
    });
  }, []);

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
    address,
    catData,
    setCatData
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
    {
      path: '/product/:id',
      exact: true,
      element: (
        <>
          <Layout page={'ProductDetails'} />
        </>
      ),
    },
    {
      path: '/product/addRams',
      exact: true,
      element: (
        <>
          <Layout page={'AddRAMS'} />
        </>
      ),
    },
    {
      path: '/product/addWeight',
      exact: true,
      element: (
        <>
          <Layout page={'AddWEIGHT'} />
        </>
      ),
    },
    {
      path: '/product/addSize',
      exact: true,
      element: (
        <>
          <Layout page={'AddSIZE'} />
        </>
      ),
    },
    {
      path: '/bannerV1/list',
      exact: true,
      element: (
        <>
          <Layout page={'BannerV1List'} />
        </>
      ),
    },
    {
      path: '/blog/list',
      exact: true,
      element: (
        <>
          <Layout page={'BlogList'} />
        </>
      ),
    },
  ]);

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />

      </MyContext.Provider>
    </>
  )
}

export default App
export { MyContext };
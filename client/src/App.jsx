import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer';
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './Pages/ForgotPassword'
import Checkout from './Pages/Checkout'
import MyAccount from './Pages/MyAccount'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import { editData, fetchDataFromApi, postData } from './utils/api'
import Address from './Pages/MyAccount/address'
import OrderSuccess from './Pages/Orders/success'
import OrderFail from './Pages/Orders/fail'

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);

  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const [addressMode, setAddressMode] = useState('add');
  const [addressId, setAddressId] = useState('');
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {

  }, [])

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item
    });
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {}
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const toggleAddressPanel = (newOpen) => () => {
    setOpenAddressPanel(newOpen);
  };



  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      getCartItems();
      getMyList();
      getUserDetails();
      getOrdersData();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const getOrdersData = () => {
    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      setOrdersData(res?.data);
    });
  }

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      setUserData(res.data);
      if (res?.response?.data?.error === true) {
        if (res?.response?.data?.message == "You have not login.") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          openAlertBox("error", "Your session is closed.");

          setIsLogin(false);
        }
      }
    });
  };


  useEffect(() => {
    fetchDataFromApi('/api/category').then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
  }, []);

  const openAlertBox = (status, msg) => {
    if (status === 'success') {
      toast.success(msg);
    } else if (status === 'error') {
      toast.error(msg);
    }
  }

  const findDuplicateItem = (cartData, newItem) => {
    return cartData.find(item =>
      item.productId === newItem.productId &&
      item.size === newItem.size &&
      item.ram === newItem.ram &&
      item.weight === newItem.weight
    );
  };

  const mergeOrAddToCart = async (cartData, productItem, postData, editData, getCartItems, openAlertBox) => {
    const duplicateItem = findDuplicateItem(cartData, productItem);

    if (duplicateItem) {
      const newQty = duplicateItem.quantity + productItem.quantity;
      const newSubTotal = productItem.price * newQty;

      try {
        await editData('/api/cart/updateQty', {
          _id: duplicateItem._id,
          qty: newQty,
          subTotal: newSubTotal
        });
        await getCartItems();
        openAlertBox('success', 'Item added successfully.');
      } catch (error) {
        openAlertBox('error', 'Không thể cập nhật giỏ hàng');
      }

    } else {
      try {
        const res = await postData('/api/cart/add', productItem);
        if (res?.error === false) {
          openAlertBox('success', res?.message);
          await getCartItems();
        } else {
          openAlertBox('error', res?.message);
        }
      } catch (err) {
        openAlertBox('error', 'Thêm sản phẩm thất bại');
      }
    }
  };

  const addToCart = async (product, userId, quantity) => {
    if (!userId || userId === undefined || userId === '' || userId === null) {
      openAlertBox('error', 'Please login.');
      return false;
    }

    const productItem = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      userId: userId,
      brand: product?.brand,
      size: product?.size,
      ram: product?.ram,
      weight: product?.weight
    };

    await mergeOrAddToCart(
      cartData,
      productItem,
      postData,
      editData,
      getCartItems,
      openAlertBox
    );
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const getMyList = () => {
    fetchDataFromApi('/api/myList/').then((res) => {
      if (res?.error === false) {
        setMyListData(res?.data);
      }
    })
  }

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    openAddressPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    catData,
    setCatData,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    getMyList,
    myListData,
    setMyListData,
    getUserDetails,
    setAddressMode,
    addressMode,
    setAddressId,
    addressId,
    ordersData,
    getOrdersData
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/productListing"} exact={true} element={<ProductListing />} />
            <Route path={"/products"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/forgot-password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/order/success"} exact={true} element={<OrderSuccess />} />
            <Route path={"/order/fail"} exact={true} element={<OrderFail />} />
            <Route path={"/address"} exact={true} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>

  )
}

export default App;

export { MyContext };
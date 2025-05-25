import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer';
import ProductDetails from './Pages/ProductDetails'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProductZoom from './components/ProductZoom'
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from './components/ProductDetails'
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

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [openCartPanel, setOpenCartPanel] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

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

      getCartItems();

    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

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
    if (!userId) {
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

  const values = {
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
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
    getCartItems
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
            <Route path={"/address"} exact={true} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        open={openProductDetailsModal.open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productdetailsModal'
      >
        <DialogContent>
          <div className='flex items-center w-full productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] bg-[#f1f1f1]' onClick={handleCloseProductDetailsModal}>
              <IoCloseSharp className='text-[20px]' />
            </Button>
            {
              openProductDetailsModal?.item?.length !== 0 &&
              <>
                <div className='col1 w-[40%] px-3 py-8'>
                  <ProductZoom images={openProductDetailsModal?.item?.images} />
                </div>

                <div className='col2 w-[60%] py-8 px-8 pr-16 productContent'>
                  <ProductDetailsComponent item={openProductDetailsModal?.item} />
                </div>

              </>
            }
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default App;

export { MyContext };
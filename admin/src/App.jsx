import './App.css'
import React from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();
function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: ''
  });

  const values = {
    isSidebarOpened,
    setIsSidebarOpened,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel
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
        </Dialog>

      </MyContext.Provider>
    </>
  )
}

export default App
export { MyContext };
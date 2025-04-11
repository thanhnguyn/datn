import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from 'react';
import Login from './Pages/Login';
import Layout from './Layout'
import SignUp from './Pages/SignUp';

const MyContext = createContext();
function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const values = {
    isSidebarOpened,
    setIsSidebarOpened,
    isLogin,
    setIsLogin
  };
  const router = createBrowserRouter([
    {
      path: '/',
      exact: true,
      element: (
        <>
          <Layout />
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

  ]);

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  )
}

export default App
export { MyContext };
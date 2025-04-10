import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from 'react';
import Layout from './Layout';

const MyContext = createContext();
function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const values = {
    isSidebarOpened,
    setIsSidebarOpened
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
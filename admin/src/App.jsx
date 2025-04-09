import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className='sidebarWrapper w-[25%]'>
                <Sidebar />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

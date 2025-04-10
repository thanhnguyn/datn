// Layout.jsx
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import { useContext } from 'react';
import { MyContext } from './App';
import Header from './components/Header';

const Layout = () => {
    const { isSidebarOpened } = useContext(MyContext);

    return (
        <section className='main'>
            <Header />
            <div className='contentMain flex'>
                <div className={`overflow-hidden sidebarWrapper ${isSidebarOpened ? 'w-[18%]' : 'w-0'} transition-all`}>
                    <Sidebar />
                </div>
                <div className={`contentRight py-4 px-5 ${isSidebarOpened ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
                    <Dashboard />
                </div>
            </div>
        </section>
    );
};

export default Layout;

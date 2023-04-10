import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Layout = () => {
  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer />
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

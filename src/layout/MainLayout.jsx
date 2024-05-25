import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;

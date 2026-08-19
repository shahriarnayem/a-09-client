import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;
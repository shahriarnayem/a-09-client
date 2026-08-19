import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#0f172a',
            borderRadius: '12px',
            color: '#ffffff',
            padding: '14px 16px',
          },
        }}
      />
    </div>
  );
}

export default RootLayout;
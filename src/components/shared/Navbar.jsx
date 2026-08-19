import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tutors', path: '/tutors' },
  { name: 'Add Tutor', path: '/add-tutor' },
  { name: 'My Tutors', path: '/my-tutors' },
  {
    name: 'Booked Sessions',
    path: '/my-booked-sessions',
  },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 font-semibold transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/95">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            aria-label="MediQueue home"
            className="text-2xl font-black tracking-[-0.05em] text-slate-950 dark:text-white"
            to="/"
          >
            Medi<span className="text-blue-600">Queue</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => (
              <NavLink
                className={navLinkClass}
                key={link.path}
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            <Link
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              to="/login"
            >
              Log In
            </Link>

            <Link
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              to="/register"
            >
              Register
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <Menu size={23} />
            </button>
          </div>
        </nav>
      </header>

      <button
        aria-label="Close navigation menu"
        className={`fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        tabIndex={mobileMenuOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!mobileMenuOpen}
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[85%] max-w-sm flex-col bg-white shadow-2xl transition duration-300 ease-in-out dark:bg-slate-950 ${
          mobileMenuOpen
            ? 'visible translate-x-0'
            : 'invisible translate-x-full'
        }`}
        id="mobile-navigation"
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Link
            aria-label="MediQueue home"
            className="text-2xl font-black tracking-[-0.05em] text-slate-950 dark:text-white"
            onClick={() => setMobileMenuOpen(false)}
            to="/"
          >
            Medi<span className="text-blue-600">Queue</span>
          </Link>

          <button
            aria-label="Close navigation menu"
            className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <NavLink
                className={mobileNavLinkClass}
                key={link.path}
                onClick={() => setMobileMenuOpen(false)}
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-200 p-5 dark:border-slate-800">
          <Link
            className="rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
            to="/login"
          >
            Log In
          </Link>

          <Link
            className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            onClick={() => setMobileMenuOpen(false)}
            to="/register"
          >
            Register
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
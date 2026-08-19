import {
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
  X,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const publicNavigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tutors', path: '/tutors' },
];

const privateNavigationLinks = [
  { name: 'Add Tutor', path: '/add-tutor' },
  { name: 'My Tutors', path: '/my-tutors' },
  {
    name: 'Booked Sessions',
    path: '/my-booked-sessions',
  },
];

function Navbar() {
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();

  const accountMenuRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [accountMenuOpen, setAccountMenuOpen] =
    useState(false);
  const [profileImageFailed, setProfileImageFailed] =
    useState(false);

  const userPhoto = user?.photoURL;

  const navigationLinks = user
    ? [...publicNavigationLinks, ...privateNavigationLinks]
    : publicNavigationLinks;

  const displayName =
    user?.displayName || user?.email || 'Your account';

  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setProfileImageFailed(false);
  }, [userPhoto]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, []);

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

  const handleLogOut = async () => {
    try {
      await logOut();

      setAccountMenuOpen(false);
      setMobileMenuOpen(false);
      toast.success('You have been logged out.');
    } catch {
      toast.error('We could not log you out. Please try again.');
    }
  };

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

  const renderAvatar = (className, iconSize) => {
    if (userPhoto && !profileImageFailed) {
      return (
        <img
          alt={displayName}
          className={`${className} object-cover`}
          onError={() => setProfileImageFailed(true)}
          referrerPolicy="no-referrer"
          src={userPhoto}
        />
      );
    }

    return (
      <span
        className={`${className} flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400`}
      >
        <UserRound size={iconSize} />
      </span>
    );
  };

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

            {user ? (
              <div
                className="relative"
                ref={accountMenuRef}
              >
                <button
                  aria-expanded={accountMenuOpen}
                  aria-label="Open account menu"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2 text-slate-700 transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500"
                  onClick={() =>
                    setAccountMenuOpen(
                      (currentValue) => !currentValue
                    )
                  }
                  title={displayName}
                  type="button"
                >
                  {renderAvatar(
                    'size-8 rounded-lg',
                    17
                  )}

                  <ChevronDown
                    className={`transition-transform ${
                      accountMenuOpen ? 'rotate-180' : ''
                    }`}
                    size={16}
                  />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                    <div className="border-b border-slate-200 px-2 pb-3 dark:border-slate-700">
                      <p className="truncate font-bold text-slate-950 dark:text-white">
                        {user.displayName || 'MediQueue member'}
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <button
                      className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                      onClick={handleLogOut}
                      type="button"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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

        <div className="border-t border-slate-200 p-5 dark:border-slate-800">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {renderAvatar('size-11 rounded-xl', 21)}

                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-950 dark:text-white">
                    {user.displayName || 'MediQueue member'}
                  </p>

                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                onClick={handleLogOut}
                type="button"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
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
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
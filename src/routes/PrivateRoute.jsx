import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        aria-live="polite"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4"
        role="status"
      >
        <span className="size-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Checking your account...
        </p>
      </div>
    );
  }

  if (!user) {
    const requestedPath = `${location.pathname}${location.search}${location.hash}`;

    return (
      <Navigate
        replace
        state={{ from: requestedPath }}
        to="/login"
      />
    );
  }

  return children;
}

export default PrivateRoute;
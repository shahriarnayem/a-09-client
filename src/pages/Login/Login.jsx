import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router';
import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';

function Login() {
  useDocumentTitle('Login | MediQueue');

  const {
    user,
    loading,
    loginUser,
    loginWithGoogle,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const requestedPath = location.state?.from || '/';

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email').trim();
    const password = formData.get('password');

    try {
      await loginUser(email, password);

      toast.success('Welcome back!');
      navigate(requestedPath, { replace: true });
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);

    try {
      await loginWithGoogle();

      toast.success('Welcome back!');
      navigate(requestedPath, { replace: true });
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        aria-live="polite"
        className="flex min-h-[65vh] flex-col items-center justify-center gap-4"
        role="status"
      >
        <span className="size-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Preparing your account...
        </p>
      </div>
    );
  }

  if (user) {
    return <Navigate replace to={requestedPath} />;
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Welcome back
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Log in to your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Continue discovering tutors and managing your
              learning sessions.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                htmlFor="login-email"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={19}
                />

                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  id="login-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                htmlFor="login-password"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={19}
                />

                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type={showPassword ? 'text' : 'password'}
                />

                <button
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting && (
                <LoaderCircle
                  className="animate-spin"
                  size={19}
                />
              )}

              Log In
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Or
            </span>

            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
            onClick={handleGoogleLogin}
            type="button"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white text-sm font-black text-blue-600 shadow">
              G
            </span>

            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-300">
            Don&apos;t have an account?{' '}
            <Link
              className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              state={{ from: requestedPath }}
              to="/register"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
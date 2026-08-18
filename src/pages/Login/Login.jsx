import { LogIn } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Login() {
  useDocumentTitle('Log In | MediQueue');

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-16 text-white">
      <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-400">
          <LogIn size={25} />
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight">
          Welcome back
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          Sign in to manage tutors, bookings, and upcoming learning sessions.
        </p>
      </section>
    </main>
  );
}

export default Login;
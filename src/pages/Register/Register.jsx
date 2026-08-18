import { UserPlus } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Register() {
  useDocumentTitle('Create Account | MediQueue');

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-16 text-white">
      <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-400">
          <UserPlus size={25} />
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight">
          Create your account
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          Join MediQueue and begin building a learning experience that fits your
          goals.
        </p>
      </section>
    </main>
  );
}

export default Register;
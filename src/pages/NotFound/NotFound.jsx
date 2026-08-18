import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function NotFound() {
  useDocumentTitle('Page Not Found | MediQueue');

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-16 text-white">
      <section className="w-full max-w-xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-500/10 text-blue-400">
          <SearchX size={30} />
        </span>

        <p className="mt-7 font-bold uppercase tracking-[0.2em] text-blue-400">
          Error 404
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-slate-400">
          The page you are looking for may have moved or no longer exists.
        </p>

        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500"
          to="/"
        >
          <ArrowLeft size={18} />
          Return Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
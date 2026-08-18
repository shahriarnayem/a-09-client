import { ArrowRight, CalendarCheck, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const benefits = [
  {
    icon: Search,
    title: 'Find your match',
    description: 'Explore tutors based on subjects, experience, and availability.',
  },
  {
    icon: CalendarCheck,
    title: 'Choose your time',
    description: 'Select a convenient date and reserve your preferred session.',
  },
  {
    icon: ShieldCheck,
    title: 'Learn confidently',
    description: 'Manage your sessions through one simple and secure account.',
  },
];

function Home() {
  useDocumentTitle('MediQueue | Find and Book Expert Tutors');

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Learning Made Personal
          </p>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Find the right tutor for your learning goals
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Connect with experienced tutors and book personalized sessions at a
            time that works for you.
          </p>

          <Link
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500"
            to="/tutors"
          >
            Explore Tutors
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {benefits.map(({ description, icon: Icon, title }) => (
            <article
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              key={title}
            >
              <span className="mb-5 grid size-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon size={22} />
              </span>

              <h2 className="text-xl font-bold">{title}</h2>

              <p className="mt-3 leading-7 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
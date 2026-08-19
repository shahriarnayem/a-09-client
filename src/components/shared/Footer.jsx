import { Globe2, Mail } from 'lucide-react';
import { Link } from 'react-router';

const exploreLinks = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Find Tutors',
    path: '/tutors',
  },
  {
    label: 'Add Tutor',
    path: '/add-tutor',
  },
];

const accountLinks = [
  {
    label: 'My Tutors',
    path: '/my-tutors',
  },
  {
    label: 'Booked Sessions',
    path: '/my-booked-sessions',
  },
  {
    label: 'Log In',
    path: '/login',
  },
];

function FooterLinks({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            className="text-sm text-slate-400 transition hover:text-white"
            to={link.path}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              aria-label="MediQueue home"
              className="text-2xl font-black tracking-[-0.05em] text-white"
              to="/"
            >
              Medi<span className="text-blue-400">Queue</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Discover experienced tutors, choose the right learning session,
              and move closer to your goals with confidence.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-black uppercase tracking-wider">
              Explore
            </h2>

            <FooterLinks links={exploreLinks} />
          </div>

          <div>
            <h2 className="mb-5 text-sm font-black uppercase tracking-wider">
              Account
            </h2>

            <FooterLinks links={accountLinks} />
          </div>

          <div>
            <h2 className="mb-5 text-sm font-black uppercase tracking-wider">
              Get in Touch
            </h2>

            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a
                  className="inline-flex items-center gap-3 transition hover:text-white"
                  href="mailto:hello@mediqueue.com"
                >
                  <Mail className="text-blue-400" size={17} />
                  hello@mediqueue.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Globe2 className="text-blue-400" size={17} />
                Available worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MediQueue. All rights reserved.</p>

          <p>Personal learning, made simpler.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Search,
  Users,
  Video,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router';
import HeroSlider from '../../components/home/HeroSlider';
import TutorCard from '../../components/tutors/TutorCard';
import API_BASE_URL from '../../config/api';

const learningSteps = [
  {
    id: 1,
    icon: Search,
    title: 'Find the right tutor',
    description:
      'Explore tutor profiles and choose someone who matches your language and learning goals.',
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Choose your session',
    description:
      'Check the available sessions and select an option that fits comfortably into your routine.',
  },
  {
    id: 3,
    icon: Video,
    title: 'Start learning',
    description:
      'Join your session, practice with confidence, and continue building your skills.',
  },
];

const benefits = [
  'Clear tutor profiles and session details',
  'Flexible options for different schedules',
  'Supportive one-to-one learning',
  'Simple booking and session management',
];

const Home = () => {
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [errorMessage, setErrorMessage] =
    useState('');

  const loadTutors = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tutors?sort=latest&limit=6`
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            'Tutors could not be loaded.'
        );
      }

      setTutors(
        Array.isArray(responseData.tutors)
          ? responseData.tutors
          : []
      );
    } catch {
      setErrorMessage(
        'We could not load the tutors right now. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Home | MediQueue';
    loadTutors();
  }, [loadTutors]);

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <HeroSlider />
      </div>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Meet your next tutor
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Tutors ready to help you grow
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                Discover supportive tutors and choose a
                session that matches your goals and
                schedule.
              </p>
            </div>

            <Link
              to="/tutors"
              className="inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Explore all tutors
              <ArrowRight size={19} />
            </Link>
          </div>

          {isLoading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="aspect-[4/3] animate-pulse bg-slate-200 dark:bg-slate-800" />

                    <div className="space-y-4 p-6">
                      <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-11 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="mt-10 rounded-3xl border border-rose-200 bg-rose-50 px-6 py-10 text-center dark:border-rose-900/60 dark:bg-rose-950/30">
              <p className="text-rose-700 dark:text-rose-300">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={loadTutors}
                className="mt-5 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading &&
            !errorMessage &&
            tutors.length === 0 && (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
                <BookOpen
                  size={36}
                  className="mx-auto text-emerald-500"
                />

                <h3 className="mt-4 text-xl font-bold">
                  New tutors are coming soon
                </h3>

                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Please visit again to discover new
                  learning opportunities.
                </p>
              </div>
            )}

          {!isLoading &&
            !errorMessage &&
            tutors.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tutors.map((tutor) => (
                  <TutorCard
                    key={tutor._id}
                    tutor={tutor}
                  />
                ))}
              </div>
            )}
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Simple from the beginning
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Start learning in three easy moves
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Choose your tutor, select a session, and
              begin learning with confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {learningSteps.map(
              ({ id, icon: Icon, title, description }) => (
                <article
                  key={id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <Icon size={23} />
                    </span>

                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                      0{id}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85"
              alt="Students enjoying a learning session"
              className="aspect-[4/3] h-full w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/85 p-5 text-white backdrop-blur">
              <div className="flex items-center gap-3">
                <Users className="text-emerald-400" />

                <p className="font-semibold">
                  Learn at a pace that feels right for you
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Learning made personal
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A comfortable way to build real confidence
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Every learner has different goals, routines,
              and challenges. Choose the tutor and schedule
              that make learning feel natural and
              achievable.
            </p>

            <ul className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/tutors"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500"
            >
              Find Your Tutor
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
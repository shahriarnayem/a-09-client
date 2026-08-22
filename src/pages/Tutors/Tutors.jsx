import {
  BookOpen,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import TutorCard from '../../components/tutors/TutorCard';
import API_BASE_URL from '../../config/api';

const initialFilters = {
  search: '',
  language: '',
  minPrice: '',
  maxPrice: '',
  minReview: '',
  availableOnly: false,
  sort: 'latest',
};

const TutorsSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="aspect-[4/3] animate-pulse bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-4 p-6">
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

const Tutors = () => {
  const [draftFilters, setDraftFilters] =
    useState(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState(initialFilters);
  const [tutors, setTutors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestVersion, setRequestVersion] =
    useState(0);

  useEffect(() => {
    document.title = 'Tutors | MediQueue';
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadTutors = async () => {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();

      if (appliedFilters.search.trim()) {
        params.set(
          'search',
          appliedFilters.search.trim()
        );
      }

      if (appliedFilters.language.trim()) {
        params.set(
          'language',
          appliedFilters.language.trim()
        );
      }

      if (appliedFilters.minPrice !== '') {
        params.set(
          'minPrice',
          appliedFilters.minPrice
        );
      }

      if (appliedFilters.maxPrice !== '') {
        params.set(
          'maxPrice',
          appliedFilters.maxPrice
        );
      }

      if (appliedFilters.minReview !== '') {
        params.set(
          'minReview',
          appliedFilters.minReview
        );
      }

      if (appliedFilters.availableOnly) {
        params.set('availableOnly', 'true');
      }

      params.set('sort', appliedFilters.sort);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/tutors?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Unable to load tutors.'
          );
        }

        setTutors(
          Array.isArray(data.tutors)
            ? data.tutors
            : []
        );

        setTotal(
          Number.isFinite(Number(data.total))
            ? Number(data.total)
            : 0
        );
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setTutors([]);
          setTotal(0);
          setError(
            'We could not load the tutors right now. Please try again.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadTutors();

    return () => {
      controller.abort();
    };
  }, [appliedFilters, requestVersion]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [name]:
        type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setAppliedFilters({
      ...draftFilters,
    });
  };

  const handleReset = () => {
    setDraftFilters({
      ...initialFilters,
    });

    setAppliedFilters({
      ...initialFilters,
    });
  };

  const hasActiveFilters =
    appliedFilters.search !== '' ||
    appliedFilters.language !== '' ||
    appliedFilters.minPrice !== '' ||
    appliedFilters.maxPrice !== '' ||
    appliedFilters.minReview !== '' ||
    appliedFilters.availableOnly ||
    appliedFilters.sort !== 'latest';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <BookOpen size={17} />
              Learn with confidence
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Find a tutor who fits your goals
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Explore friendly instructors, compare
              their experience, and choose a session
              that works for you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <SlidersHorizontal size={21} />
            </span>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Refine your search
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose the options that matter most
                to you.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Search
              </label>

              <div className="relative">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="search"
                  name="search"
                  type="search"
                  value={draftFilters.search}
                  onChange={handleChange}
                  placeholder="Search by name or subject"
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="language"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Language
              </label>

              <input
                id="language"
                name="language"
                type="text"
                value={draftFilters.language}
                onChange={handleChange}
                placeholder="For example, Spanish"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="sort"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Sort by
              </label>

              <select
                id="sort"
                name="sort"
                value={draftFilters.sort}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="latest">
                  Newest first
                </option>
                <option value="oldest">
                  Oldest first
                </option>
                <option value="price-low">
                  Price: low to high
                </option>
                <option value="price-high">
                  Price: high to low
                </option>
                <option value="rating-high">
                  Highest rated
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="minPrice"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Minimum price
              </label>

              <input
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                value={draftFilters.minPrice}
                onChange={handleChange}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="maxPrice"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Maximum price
              </label>

              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                value={draftFilters.maxPrice}
                onChange={handleChange}
                placeholder="Any price"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="minReview"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Minimum rating
              </label>

              <select
                id="minReview"
                name="minReview"
                value={draftFilters.minReview}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="">Any rating</option>
                <option value="4.5">
                  4.5 and above
                </option>
                <option value="4">
                  4.0 and above
                </option>
                <option value="3.5">
                  3.5 and above
                </option>
                <option value="3">
                  3.0 and above
                </option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                <input
                  name="availableOnly"
                  type="checkbox"
                  checked={
                    draftFilters.availableOnly
                  }
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                />
                Available sessions only
              </label>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Search size={18} />
              Show tutors
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RotateCcw size={18} />
              Clear filters
            </button>
          </div>
        </form>

        <div className="mb-7 mt-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Meet your next tutor
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Available tutors
            </h2>
          </div>

          {!loading && !error && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {total}{' '}
              {total === 1
                ? 'tutor found'
                : 'tutors found'}
            </p>
          )}
        </div>

        {loading && <TutorsSkeleton />}

        {!loading && error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-14 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Something went wrong
            </h3>

            <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setRequestVersion(
                  (currentVersion) =>
                    currentVersion + 1
                )
              }
              className="mt-6 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950"
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          tutors.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Users size={28} />
              </span>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                No tutors matched your search
              </h3>

              <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-300">
                Try changing one or two options to
                discover more tutors.
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  View all tutors
                </button>
              )}
            </div>
          )}

        {!loading &&
          !error &&
          tutors.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {tutors.map((tutor) => (
                <TutorCard
                  key={tutor._id}
                  tutor={tutor}
                />
              ))}
            </div>
          )}
      </section>
    </main>
  );
};

export default Tutors;
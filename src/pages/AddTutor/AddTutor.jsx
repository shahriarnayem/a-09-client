import {
  BookOpen,
  CheckCircle2,
  Clock,
  DollarSign,
  Image,
  Languages,
  LoaderCircle,
  Star,
  User,
} from 'lucide-react';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthContext from '../../contexts/AuthContext';
import API_BASE_URL from '../../config/api';

const initialFormData = {
  name: '',
  image: '',
  language: '',
  price: '',
  review: '',
  availableSlots: '',
  description: '',
};

const AddTutor = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState(
    initialFormData
  );
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'Add Tutor | MediQueue';
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!user) {
      setError(
        'Please sign in before adding a tutor.'
      );
      return;
    }

    const price = Number(formData.price);
    const review = Number(formData.review);
    const availableSlots = Number(
      formData.availableSlots
    );

    if (!Number.isFinite(price) || price <= 0) {
      setError(
        'Please enter a valid session price.'
      );
      return;
    }

    if (
      !Number.isFinite(review) ||
      review < 0 ||
      review > 5
    ) {
      setError(
        'The rating must be between 0 and 5.'
      );
      return;
    }

    if (
      !Number.isInteger(availableSlots) ||
      availableSlots < 0
    ) {
      setError(
        'Available sessions must be a whole number.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const tokenResponse = await fetch(
        `${API_BASE_URL}/api/auth/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        }
      );

      const tokenData =
        await tokenResponse.json();

      if (
        !tokenResponse.ok ||
        !tokenData.accessToken
      ) {
        throw new Error(
          tokenData.message ||
            'Your session could not be confirmed.'
        );
      }

      const tutorResponse = await fetch(
        `${API_BASE_URL}/api/tutors`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenData.accessToken}`,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            image: formData.image.trim(),
            language:
              formData.language.trim(),
            price,
            review,
            description:
              formData.description.trim(),
            availableSlots,
          }),
        }
      );

      const tutorData =
        await tutorResponse.json();

      if (!tutorResponse.ok) {
        throw new Error(
          tutorData.message ||
            'The tutor profile could not be added.'
        );
      }

      setSuccess(
        `${formData.name.trim()} has been added successfully.`
      );

      setFormData({
        ...initialFormData,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <BookOpen size={17} />
            Share your knowledge
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Add a new tutor
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Create a welcoming profile and help learners
            find the right support for their goals.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />
                {success}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Tutor information
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Add clear and accurate details for
                learners to review.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Tutor name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sofia Bennett"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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

                <div className="relative">
                  <Languages
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="language"
                    name="language"
                    type="text"
                    required
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="Spanish"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Profile image URL
                </label>

                <div className="relative">
                  <Image
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.example.com/tutor.jpg"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Session price
                </label>

                <div className="relative">
                  <DollarSign
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="45"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Rating
                </label>

                <div className="relative">
                  <Star
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="review"
                    name="review"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="4.8"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="availableSlots"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Available sessions
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="availableSlots"
                    name="availableSlots"
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={
                      formData.availableSlots
                    }
                    onChange={handleChange}
                    placeholder="6"
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  About the tutor
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows="6"
                  minLength="20"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the tutor's teaching style, experience, and approach."
                  className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                  Adding tutor
                </>
              ) : (
                <>
                  <BookOpen size={19} />
                  Add tutor
                </>
              )}
            </button>
          </form>

          <aside className="h-fit rounded-3xl bg-slate-900 p-6 text-white dark:ring-1 dark:ring-slate-800">
            <h2 className="text-xl font-bold">
              A helpful profile includes
            </h2>

            <div className="mt-6 space-y-5">
              {[
                'A clear and friendly profile photo',
                'An accurate session price',
                'Current session availability',
                'A short and welcoming introduction',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <p className="text-sm leading-6 text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {user && (
              <div className="mt-8 border-t border-slate-700 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Adding as
                </p>

                <p className="mt-2 break-words text-sm font-medium text-white">
                  {user.displayName || user.email}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AddTutor;
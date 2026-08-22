import {
  ArrowRight,
  Clock,
  Languages,
  Star,
} from 'lucide-react';
import { Link } from 'react-router';

const TutorCard = ({ tutor }) => {
  const {
    _id,
    name,
    image,
    language,
    price,
    review,
    description,
    availableSlots,
  } = tutor;

  const numericPrice = Number(price);
  const numericReview = Number(review);
  const numericSlots = Number(availableSlots);

  const formattedPrice = Number.isFinite(
    numericPrice
  )
    ? `$${numericPrice}`
    : '$0';

  const formattedReview = Number.isFinite(
    numericReview
  )
    ? numericReview.toFixed(1)
    : '0.0';

  const slots = Number.isFinite(numericSlots)
    ? numericSlots
    : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur dark:bg-slate-950/90 dark:text-slate-100">
          <Languages size={15} />
          {language}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {name}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Star
                size={16}
                className="fill-amber-400 text-amber-400"
              />

              <span className="font-semibold">
                {formattedReview}
              </span>

              <span>rating</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {formattedPrice}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              per session
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Clock size={17} />

          <span>
            {slots}{' '}
            {slots === 1
              ? 'session available'
              : 'sessions available'}
          </span>
        </div>

        <Link
          to={`/tutors/${_id}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
        >
          Book Session
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
};

export default TutorCard;
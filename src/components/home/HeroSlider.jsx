import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    eyebrow: 'Personal guidance',
    title: 'Learn with guidance that fits your goals',
    description:
      'Connect with experienced tutors, choose a comfortable schedule, and make steady progress at your own pace.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 2,
    eyebrow: 'Confident conversations',
    title: 'Turn every session into meaningful progress',
    description:
      'Practice with supportive tutors who make learning clear, practical, and enjoyable.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 3,
    eyebrow: 'Flexible learning',
    title: 'Make learning work around your schedule',
    description:
      'Find available sessions that suit your routine and continue learning wherever you feel comfortable.',
    image:
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1800&q=85',
  },
];

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const sliderInterval = window.setInterval(() => {
      setActiveSlide(
        (currentSlide) =>
          (currentSlide + 1) % slides.length
      );
    }, 6000);

    return () => {
      window.clearInterval(sliderInterval);
    };
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide - 1 + slides.length) %
        slides.length
    );
  };

  const showNextSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide + 1) % slides.length
    );
  };

  return (
    <section
      className="relative isolate min-h-[620px] overflow-hidden rounded-[2rem] bg-slate-950 md:min-h-[560px]"
      aria-label="Featured learning opportunities"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeSlide
              ? 'z-10 opacity-100'
              : 'pointer-events-none z-0 opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="relative z-20 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 md:min-h-[560px] md:px-12 lg:px-16">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {slide.eyebrow}
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {slide.description}
              </p>

              <Link
                to="/tutors"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Browse Tutors
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={showPreviousSlide}
        className="absolute bottom-8 right-24 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
        aria-label="Show previous slide"
      >
        <ChevronLeft size={21} />
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        className="absolute bottom-8 right-10 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
        aria-label="Show next slide"
      >
        <ChevronRight size={21} />
      </button>

      <div className="absolute bottom-9 left-8 z-30 flex gap-2 md:left-12">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeSlide
                ? 'w-8 bg-emerald-400'
                : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
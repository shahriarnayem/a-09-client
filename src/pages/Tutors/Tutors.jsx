import useDocumentTitle from '../../hooks/useDocumentTitle';

const tutors = [
  {
    name: 'Amelia Rahman',
    subject: 'Mathematics',
    experience: '6 years of experience',
  },
  {
    name: 'Daniel Carter',
    subject: 'English Literature',
    experience: '8 years of experience',
  },
  {
    name: 'Sophia Ahmed',
    subject: 'Computer Science',
    experience: '5 years of experience',
  },
];

function Tutors() {
  useDocumentTitle('Find Tutors | MediQueue');

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-3 font-bold text-blue-600">Explore Tutors</p>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Find someone who understands your goals
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Compare experience, subjects, and availability to find your ideal
            learning partner.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              key={tutor.name}
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-blue-100 font-black text-blue-700">
                {tutor.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')}
              </div>

              <h2 className="mt-5 text-xl font-bold">{tutor.name}</h2>

              <p className="mt-2 font-semibold text-blue-600">{tutor.subject}</p>

              <p className="mt-2 text-slate-500">{tutor.experience}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Tutors;
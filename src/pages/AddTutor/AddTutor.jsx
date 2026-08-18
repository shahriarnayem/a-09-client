import { GraduationCap } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function AddTutor() {
  useDocumentTitle('Add Tutor | MediQueue');

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-16">
      <section className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-14">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-100 text-blue-700">
          <GraduationCap size={30} />
        </span>

        <p className="mt-6 font-bold text-blue-600">Share Your Knowledge</p>

        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Help students achieve more
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-slate-600">
          Create a detailed tutor profile and connect with students searching
          for your expertise.
        </p>
      </section>
    </main>
  );
}

export default AddTutor;
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafbfd] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#009966]/15 mb-2 tracking-tighter select-none" aria-hidden="true">404</div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-3">Page Not Found</h1>
        <p className="text-slate-500 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#009966] text-white font-medium px-7 py-3 rounded-lg hover:bg-[#008855] transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

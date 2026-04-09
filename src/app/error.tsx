'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue !</h2>
      <p className="text-slate-600 mb-6">{error.message || 'Impossible de charger la page.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}

'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-red-600 font-bold">Erreur de chargement</h2>
      <button 
        onClick={() => reset()}
        className="mt-4 bg-slate-800 text-white px-4 py-2 rounded"
      >
        Réessayer
      </button>
    </div>
  );
}
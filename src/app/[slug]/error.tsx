'use client';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) {
  return (
    <div className="p-8 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
      <p className="text-gray-600 mb-6">
        {error.message || "Une erreur s'est produite lors du chargement de la page."}
      </p>
      <button 
        onClick={() => reset()}
        className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}

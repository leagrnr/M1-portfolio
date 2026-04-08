'use client';

import { useActionState } from 'react';
import { submitContact } from '@/actions/contactActions';

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input name="name" placeholder="Nom" required className="border p-2" />
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <textarea name="message" placeholder="Message" required className="border p-2" />
      
      <button 
        disabled={isPending}
        className="bg-blue-600 text-white p-2 disabled:bg-gray-400"
      >
        {isPending ? 'Envoi...' : 'Envoyer'}
      </button>

      {state && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  );
}
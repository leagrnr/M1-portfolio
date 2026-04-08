import { ContactForm } from '@/components/ContactForm';

export const metadata = { title: 'Contactez-nous' };

export default function ContactPage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>
      <p className="mb-8">Remplissez le formulaire ci-dessous pour nous envoyer un message.</p>
      
      {/* Intégration de notre formulaire client qui possède l'interactivité */}
      <ContactForm />
    </main>
  );
}
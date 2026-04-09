import { getPageBySlug } from '@/services/pageService';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function Home() {
  const page = await getPageBySlug('homepage-chris');
  if (!page) {
    throw new Error('La page "homepage-chris" est introuvable.');
  }
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        <BlocksRenderer content={page.content} />
      </div>
    </main>
  );
}
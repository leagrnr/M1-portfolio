import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getPageBySlug } from '@/services/pageService';

type Params = Promise<{ slug: string }>;

export default async function DynamicPage(props: { params: Params }) {
  const { slug } = await props.params;
  
  console.log(`DEBUG: DynamicPage rendering [/${slug}]`);

  const page = await getPageBySlug(slug);

  if (!page) {
    throw new Error(`La page "/${slug}" est introuvable.`);
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

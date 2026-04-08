import { strapiClient } from '@/lib/graphql-client';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

const GET_PAGES = `
query GetMyPages($pagesFilters: PageFiltersInput) {
  pages(filters: $pagesFilters) {
    documentId
    title
    content
    slug
    locale
  }
}
`

type PageResponse = {
  pages: { 
    documentId: string; 
    title: string; 
    slug: string; 
    content: BlocksContent; 
    locale: string 
  }[];
};


export default async function Home() {
  console.log("DEBUG: Home component rendering [/]");

  try {
    const data = await strapiClient.request<PageResponse>(GET_PAGES, {
      pagesFilters: {
        owner_tag: { eq: process.env.NEXT_PUBLIC_OWNER_TAG },
        slug: { containsi: "homepage" },
      }
    });

    const page = data.pages[0];

    if (!page) {
      return (
        <div className="p-8">
          <h1 className="text-xl font-bold">Ma page Home()</h1>
          <p className="mt-4">Aucune page avec le slug "home" trouvée pour "{process.env.NEXT_PUBLIC_OWNER_TAG}".</p>
        </div>
      );
    }

    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
        <div className="prose lg:prose-xl max-w-none">
          <BlocksRenderer content={page.content} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("DEBUG: Error fetching home page:", error);
    return (
      <div className="p-8 text-red-600">
        <h1 className="text-xl font-bold">Erreur de chargement</h1>
        <pre className="mt-4 p-4 bg-red-50 rounded text-sm overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}
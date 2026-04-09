import { strapiClient } from '@/lib/graphql-client';

export default async function HomePage() {

  const GET_PAGE = `query GetPage($slug: String!, $owner: String!) {
    pages(filters: { slug: { eq: $slug }, owner_tag: { eq: $owner } }, locale: "fr") {
      title
    }
  }`;

  const data: any = await strapiClient.request(GET_PAGE, {
    slug: 'aide-chris',
    owner: process.env.NEXT_PUBLIC_OWNER_TAG
  });
  return <h1>{data.pages[0]?.title}</h1>;
}
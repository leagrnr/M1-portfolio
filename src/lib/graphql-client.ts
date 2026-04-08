import { GraphQLClient } from 'graphql-request';

const url = process.env.STRAPI_GRAPHQL_URL;
const token = process.env.STRAPI_API_TOKEN;

if (!url || !token) {
  throw new Error('GraphQL configuration missing in .env.local');
}

export const strapiClient = new GraphQLClient(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
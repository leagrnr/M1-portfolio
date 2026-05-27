export function strapiUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
  return `${base}${path}`;
}
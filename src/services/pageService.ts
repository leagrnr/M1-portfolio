import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PageSchema, type Page } from '@/schemas/page';

const PAGES_DIR = path.join(process.cwd(), 'src/content/pages');

function readPageFile(filename: string): Page | null {
  try {
    const filePath = path.join(PAGES_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return PageSchema.parse({ ...data, content });
  } catch {
    return null;
  }
}

export async function getPages(locale: string = 'fr'): Promise<Page[]> {
  if (!fs.existsSync(PAGES_DIR)) return [];
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.md'));
  return files
    .map((f) => readPageFile(f))
    .filter((p): p is Page => p !== null && p.locale === locale);
}

export async function getPageBySlug(slug: string, locale: string = 'fr'): Promise<Page | undefined> {
  const page = readPageFile(`${slug}.md`);
  if (!page || page.locale !== locale) return undefined;
  return page;
}

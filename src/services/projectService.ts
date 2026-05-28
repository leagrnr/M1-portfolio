import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectSchema, type Project } from '@/schemas/project';

const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects');

function readProjectFile(filename: string): Project | null {
  try {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return ProjectSchema.parse({ ...data, content });
  } catch {
    return null;
  }
}

export async function getProjects(locale: string = 'fr'): Promise<Project[]> {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md'));
  return files
    .map((f) => readProjectFile(f))
    .filter((p): p is Project => p !== null && p.locale === locale)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export async function getProjectById(documentId: string, locale: string = 'fr'): Promise<Project | null> {
  if (!fs.existsSync(PROJECTS_DIR)) return null;
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const project = readProjectFile(file);
    if (project && project.documentId === documentId && project.locale === locale) return project;
  }
  return null;
}

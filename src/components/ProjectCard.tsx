import { Project } from '@/types/strapi';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-slate-600">{project.excerpt}</p>
    </article>
  );
}
import { getProjects } from '@/services/projectService';
import { ProjectCard } from '@/components/ProjectCard';

export default async function ProjectsPage() {
  const data = await getProjects();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.projects.map((p) => (
          <ProjectCard key={p.documentId} project={p} />
        ))}
      </div>
    </main>
  );
}
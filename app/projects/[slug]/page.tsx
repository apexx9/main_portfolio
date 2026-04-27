// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/project-detail';
import { projects, getProjectSlugs } from '@/lib/projects';

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({
    slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  const nextProject = project.nextProject ? projects[project.nextProject] : null
  const prevProject = project.prevProject ? projects[project.prevProject] : null

  return <ProjectDetail project={project} nextProject={nextProject} prevProject={prevProject} />
}
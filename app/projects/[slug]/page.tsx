// app/projects/[slug]/page.tsx
import { getProjectBySlug, getProjects } from '@/lib/notion'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/project-detail'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params  // ← await
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | ronny.tech`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params  // ← await
  const project = await getProjectBySlug(slug)
  const allProjects = await getProjects()

  if (!project) notFound()

  const currentIndex = allProjects.findIndex(p => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return <ProjectDetail project={project} prevProject={prevProject} nextProject={nextProject} />
}
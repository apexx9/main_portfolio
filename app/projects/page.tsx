// app/projects/page.tsx
import { getProjects } from '@/lib/notion'
import { ProjectsGrid } from '@/components/projects-grid'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsGrid projects={projects} />
}
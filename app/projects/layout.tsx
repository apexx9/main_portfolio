// app/projects/layout.tsx
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Projects | ronny.tech',
  description: 'Explore my portfolio of work.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      
      {children}
      
    </>
  )
}
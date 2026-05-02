// app/blog/layout.tsx
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Blog | ronny.tech',
  description: 'Thoughts on design, development, and technology.',
}

export default function BlogLayout({
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
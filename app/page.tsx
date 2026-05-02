// app/page.tsx - Rearranged layout
import Hero from '@/components/Hero'
import Marquee from '@/components/marquee'
import { WorkGrid } from '@/components/work-grid'
import { CTADivider } from '@/components/cta-divider'
import About from '@/components/about'
import { Contact } from '@/components/contact'
import { getBlogPosts } from '@/lib/notion'
import { BlogSection } from '@/components/blog-section'
import { getProjects } from '@/lib/notion'

export default async function Home() {

  const blogPosts = await getBlogPosts()
  const projects = await getProjects()
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <WorkGrid projects={projects} />
        <CTADivider />
        <About />
        <BlogSection posts={blogPosts} />
        <Contact />
      </main>
    </>
  )
}
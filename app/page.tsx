// app/page.tsx - Rearranged layout
import Hero from '@/components/Hero'
import Marquee from '@/components/marquee'
import { WorkGrid } from '@/components/work-grid'
import { CTADivider } from '@/components/cta-divider'
import About from '@/components/about'
import Experience from '@/components/experience'
import { Contact } from '@/components/contact'
import { getBlogPosts, getProjects, getExperiences } from '@/lib/notion'
import { BlogSection } from '@/components/blog-section'

export default async function Home() {

  const blogPosts = await getBlogPosts()
  const projects = await getProjects()
  const experiences = await getExperiences()
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <WorkGrid projects={projects} />
        <CTADivider />
        <About />
        <Experience experiences={experiences} />
        <BlogSection posts={blogPosts} />
        <Contact />
      </main>
    </>
  )
}
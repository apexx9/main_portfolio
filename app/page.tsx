// app/page.tsx - Rearranged layout
import Hero from '@/components/Hero'
import Marquee from '@/components/marquee'
import { WorkGrid } from '@/components/work-grid'
import { CTADivider } from '@/components/cta-divider'
import About from '@/components/about'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <WorkGrid />
        <CTADivider />
        <About />
        <Contact />
      </main>
    </>
  )
}
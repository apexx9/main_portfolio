// components/work-grid.tsx - Fixed spacing
'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { getFeaturedProjects } from '@/lib/projects'

export function WorkGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter();
  const featuredProjects = getFeaturedProjects();

  const changeRoute = (link: string) => {
    router.push(link);
  }

  return (
    <section ref={containerRef} id="work" className="py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="space-y-1 mb-24">
          <p className="text-xs font-medium tracking-[0.1em] text-white/20 uppercase font-dm">Selected Work</p>
          <div className="w-12 h-px bg-yellow-400/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group relative cursor-pointer block"
              data-hover
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.76, 0, 0.24, 1]
                }}
              >
              <div 
                className="aspect-[4/3] overflow-hidden relative rounded-lg"
                style={{ backgroundColor: project.color }}
              >
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                  }}
                />
                
                {/* Project number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/[0.02] text-[12rem] font-syne font-bold leading-none" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
                    0{index + 1}
                  </p>
                </div>
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="text-center space-y-4">
                    <span className="text-sm font-medium tracking-[0.15em] uppercase px-10 py-4 rounded-full border border-white/20 text-white font-dm hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-3">
                      <svg className="w-4 h-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Project
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl lg:text-3xl font-syne font-semibold tracking-tight" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/25 uppercase tracking-[0.1em] font-dm">{project.category}</p>
                </div>
                <span className="text-sm text-white/15 font-dm mt-1">{project.year}</span>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <button
            data-hover
            className="px-10 py-4 rounded-full border border-white/8 text-sm font-medium uppercase tracking-[0.15em] text-white/30 hover:text-white hover:border-white/20 transition-all duration-300 font-dm inline-flex items-center gap-3"
            onClick={() => changeRoute('/projects')}
          >
            <svg className="w-4 h-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
              <line x1="15" y1="3" x2="15" y2="21"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="3" y1="15" x2="21" y2="15"/>
            </svg>
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  )
}
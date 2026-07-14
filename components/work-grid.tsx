// components/work-grid.tsx - Homepage featured projects
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  year: string
  description: string
  color: string
  coverImage: string | null
}

interface WorkGridProps {
  projects: Project[]
}

export function WorkGrid({ projects }: WorkGridProps) {
  // Show only first 4 projects
  const displayedProjects = projects.slice(0, 4)

  if (!displayedProjects.length) return null

  return (
    <section id="work" className="py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="space-y-1 mb-24">
          <p className="text-xs font-medium tracking-[0.1em] text-white/50 uppercase font-dm">Selected Work</p>
          <div className="w-12 h-px bg-yellow-400/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <Link
            href="/projects"
            className="px-10 py-4 rounded-full border border-white/15 text-sm font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-dm inline-flex items-center gap-3"
            data-hover
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Subtle parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative cursor-pointer block"
      data-hover
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
      >
        <div 
          ref={ref}
          className="aspect-[4/3] overflow-hidden relative rounded-lg"
          style={{ backgroundColor: project.color || '#1a1a1a' }}
        >
          {project.coverImage ? (
            <motion.img
              style={{ y, scale: 1.15 }}
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-[1.2] transition-transform duration-700"
            />
          ) : (
            <>
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
                <p className="text-white/[0.02] text-[12rem] font-syne font-bold leading-none select-none">
                  0{index + 1}
                </p>
              </div>
            </>
          )}
          
          {/* Hover overlay */}
          <motion.div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
            <span className="text-sm font-medium tracking-[0.15em] uppercase px-10 py-4 rounded-full border border-white/20 text-white font-dm hover:bg-white/5 transition-all duration-300">
              View Project
            </span>
          </motion.div>
        </div>

        <div className="mt-8 flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl lg:text-3xl font-syne font-semibold tracking-tight group-hover:text-yellow-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 uppercase tracking-[0.1em] font-dm">{project.category}</p>
          </div>
          <span className="text-sm text-white/40 font-dm mt-1">{project.year}</span>
        </div>
      </motion.div>
    </Link>
  )
}


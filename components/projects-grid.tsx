// components/projects-grid.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, FolderX } from 'lucide-react'

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

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  // Get unique categories from projects
  const allCategories = ['All', ...new Set(projects.map(p => p.category))]

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <main className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-xs font-medium tracking-[0.15em] text-white/20 uppercase mb-6 font-dm">
              Portfolio
            </p>
            <h1 className="font-syne text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] text-white tracking-tight">
              Selected<br />
              <span className="text-white/15">work.</span>
            </h1>

            {/* Category Filter */}
            {allCategories.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-12">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-dm transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-white text-black font-medium'
                        : 'border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20'
                    }`}
                    data-hover
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block"
                    data-hover
                  >
                    {/* Image / Placeholder */}
                    <div
                      className="aspect-[16/10] rounded-xl overflow-hidden relative mb-6"
                      style={{ backgroundColor: project.color || '#1a1a1a' }}
                    >
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-8xl font-syne font-bold text-white/[0.03] select-none">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      )}

                      {/* Grid pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '60px 60px',
                        }}
                      />

                      {/* Year badge */}
                      <div className="absolute top-6 right-6">
                        <span className="text-xs font-dm text-white/15 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                          {project.year}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <motion.div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-sm font-medium tracking-[0.15em] uppercase px-10 py-4 rounded-full border border-white/20 text-white font-dm">
                          View Project
                        </span>
                      </motion.div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl lg:text-2xl font-syne font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-white/25 uppercase tracking-[0.1em] font-dm mb-3">
                        {project.category}
                      </p>
                      <p className="text-sm text-white/35 font-dm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-6">
                <FolderX className="w-6 h-6 text-white/10" />
              </div>
              <h3 className="font-syne text-xl font-bold text-white/30 mb-2">No projects found</h3>
              <p className="text-white/20 font-dm text-sm">
                {projects.length === 0
                  ? 'Projects will appear here once added to Notion.'
                  : 'No projects match this category.'}
              </p>
              {activeCategory !== 'All' && (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="mt-4 text-sm text-white/40 hover:text-white transition-colors font-dm"
                  data-hover
                >
                  View all projects
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

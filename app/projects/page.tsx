// app/projects/page.tsx - Projects listing page
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { getAllProjects, getCategories, getProjectsByCategory } from '@/lib/projects'

export default function ProjectsPage() {
  const allProjects = getAllProjects()
  const categories = getCategories()
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredProjects = getProjectsByCategory(selectedCategory)

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

            <div className="flex flex-wrap gap-3 mt-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-dm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'border border-white/6 text-white/40 hover:text-white hover:border-white/20'
                  }`}
                  data-hover
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
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
                  {/* Project Image/Card */}
                  <div
                    className="aspect-[16/10] rounded-xl overflow-hidden relative mb-6"
                    style={{ backgroundColor: project.color }}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                      }}
                    />

                    {/* Project number */}
                    <div className="absolute top-6 left-6">
                      <span className="text-5xl font-syne font-bold text-white/[0.04]">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="absolute top-6 right-6">
                      <span className="text-xs font-dm text-white/10 bg-black/30 px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <motion.div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-sm font-medium tracking-[0.15em] uppercase px-10 py-4 rounded-full border border-white/20 text-white font-dm inline-flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View Project
                      </span>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl lg:text-2xl font-syne font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <svg
                        className="w-5 h-5 text-white/10 group-hover:text-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1 flex-shrink-0"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                    <p className="text-xs text-white/25 uppercase tracking-[0.1em] font-dm mb-3">
                      {project.category}
                    </p>
                    <p className="text-sm text-white/35 font-dm leading-relaxed">
                      {project.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button
              className="px-10 py-4 rounded-full border border-white/6 text-sm font-medium uppercase tracking-[0.15em] text-white/30 hover:text-white hover:border-white/20 transition-all duration-300 font-dm inline-flex items-center gap-3"
              data-hover
            >
              <svg className="w-4 h-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
                <polyline points="12 18 12 12 8 10"/>
              </svg>
              Load More Projects
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-syne text-[clamp(28px,4vw,52px)] font-bold leading-[1.15] max-w-3xl mx-auto mb-12"
          >
            Have a similar project
            <br />
            <span className="text-white/20">in mind?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/#contact"
              className="btn-yellow inline-flex items-center gap-3 px-8 py-4 text-sm font-dm"
              data-hover
            >
              <span className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              Start a project
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
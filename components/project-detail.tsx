// components/project-detail.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Project } from '@/lib/projects'

interface ProjectDetailProps {
  project: Project
  nextProject: Project | null
  prevProject: Project | null
}

export function ProjectDetail({ project, nextProject, prevProject }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])

  return (
    <main ref={containerRef} className="bg-[#0A0A0A]">
      {/* Back Button */}
      <div className="fixed top-24 left-6 lg:left-12 z-30">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300 group"
          data-hover
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span className="text-xs font-medium tracking-[0.1em] uppercase font-dm">Back to work</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, backgroundColor: project.color }}
          className="absolute inset-0"
        >
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Project number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[20vw] font-syne font-bold text-white/[0.02] select-none">
              {project.year}
            </span>
          </div>
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-xs font-medium tracking-[0.15em] text-white/40 uppercase mb-6 font-dm">
              {project.category} — {project.year}
            </p>
            <h1 className="font-syne text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.95] text-white tracking-tight">
              {project.title}
            </h1>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-3 bg-white/20 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Project Info */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Meta */}
            <div className="space-y-8">
              {[
                ...(project.client ? [{ label: 'Client', value: project.client }] : []),
                ...(project.role ? [{ label: 'Role', value: project.role }] : []),
                ...(project.duration ? [{ label: 'Duration', value: project.duration }] : []),
                { label: 'Year', value: project.year },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] mb-1 font-dm">{item.label}</p>
                  <p className="text-sm text-white/60 font-dm">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Overview */}
            <div className="lg:col-span-2 space-y-12">
              {project.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-syne text-2xl font-bold mb-4 text-white">Overview</h3>
                  <p className="text-white/50 font-dm leading-relaxed">{project.overview}</p>
                </motion.div>
              )}

              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-syne text-2xl font-bold mb-4 text-white">Challenge</h3>
                  <p className="text-white/50 font-dm leading-relaxed">{project.challenge}</p>
                </motion.div>
              )}

              {project.approach && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-syne text-2xl font-bold mb-4 text-white">Approach</h3>
                  <p className="text-white/50 font-dm leading-relaxed">{project.approach}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-syne text-3xl lg:text-4xl font-bold mb-16 text-white"
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(project.features || []).map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6 hover:border-white/10 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:bg-yellow-400/20 transition-colors">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="text-sm text-white/60 font-dm">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-syne text-3xl lg:text-4xl font-bold mb-16 text-white"
            viewport={{ once: true }}
          >
            Tech Stack
          </motion.h2>

          <div className="flex flex-wrap gap-3">
            {(project.techStack || []).map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 rounded-full border border-white/[0.06] text-sm text-white/40 font-dm hover:border-yellow-400/30 hover:text-white transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Live Links */}
      <section className="py-24 lg:py-32 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="btn-yellow gap-3 px-8 py-4 text-sm font-dm inline-flex items-center justify-center"
                data-hover
              >
                <span className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </span>
                Visit Live Site
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="px-8 py-4 rounded-full border border-white/[0.08] text-sm text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 font-dm inline-flex items-center justify-center gap-3"
                data-hover
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source Code
              </motion.a>
            )}
          </div>
        </div>
      </section>

      {/* Next / Prev Navigation */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
                data-hover
              >
                <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] mb-4 font-dm">Previous Project</p>
                <h3 className="font-syne text-2xl lg:text-3xl font-bold text-white/40 group-hover:text-white transition-colors duration-300">
                  {prevProject.title}
                </h3>
                <p className="text-sm text-white/20 mt-1 font-dm">{prevProject.category}</p>
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group text-right"
                data-hover
              >
                <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] mb-4 font-dm">Next Project</p>
                <h3 className="font-syne text-2xl lg:text-3xl font-bold text-white/40 group-hover:text-white transition-colors duration-300">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-white/20 mt-1 font-dm">{nextProject.category}</p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
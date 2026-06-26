// components/project-detail.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, ExternalLink, Github } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  year: string
  client: string
  role: string
  duration: string
  description: string
  overview: string
  challenge: string
  approach: string
  features: string[]
  techStack: string[]
  liveUrl: string
  githubUrl: string
  color: string
  coverImage: string | null
}

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300 group"
          data-hover
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-xs font-medium tracking-[0.1em] uppercase font-dm">Back to work</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, backgroundColor: project.color }}
          className="absolute inset-0"
        >
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-40"
            />
          )}

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
            <div className="space-y-8">
              {[
                { label: 'Client', value: project.client },
                { label: 'Role', value: project.role },
                { label: 'Duration', value: project.duration },
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

            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="font-syne text-2xl font-bold mb-4 text-white">Overview</h3>
                <p className="text-white/50 font-dm leading-relaxed">{project.overview}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-syne text-2xl font-bold mb-4 text-white">Challenge</h3>
                <p className="text-white/50 font-dm leading-relaxed">{project.challenge}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-syne text-2xl font-bold mb-4 text-white">Approach</h3>
                <p className="text-white/50 font-dm leading-relaxed">{project.approach}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {project.features.length > 0 && (
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
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6 hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:bg-yellow-400/20 transition-colors">
                    <Check className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-sm text-white/60 font-dm">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.techStack.length > 0 && (
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
              {project.techStack.map((tech, index) => (
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
      )}

      {/* Links */}
      {(project.liveUrl || project.githubUrl) && (
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
                    <ExternalLink className="w-4 h-4" />
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
                  <Github className="w-5 h-5" />
                  View Source Code
                </motion.a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Next / Prev Navigation */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
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
                href={`/projects/${nextProject.slug}`}
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

// components/blog-card.tsx - For home page and blog listing
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  slug: string
  description: string
  publishedDate: string
  tags: string[]
  coverImage: string | null
  index?: number
}

export function BlogCard({ title, slug, description, publishedDate, tags, coverImage, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      viewport={{ once: true }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block"
        data-hover
      >
        {/* Image */}
        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-[#111111] border border-white/[0.04] relative">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-syne font-bold text-white/[0.03] select-none">
                B
              </span>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
            <span className="text-xs font-medium tracking-[0.15em] uppercase px-8 py-3 rounded-full border border-white/20 text-white font-dm">
              Read Article
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] text-white/25 uppercase tracking-[0.08em] font-dm bg-white/[0.02] px-2.5 py-1 rounded-full border border-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-syne text-lg lg:text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/35 font-dm leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Date & Read */}
        <div className="flex items-center gap-2 text-xs text-white/15 font-dm">
          <span>{formattedDate}</span>
          <span className="text-white/10">·</span>
          <span className="group-hover:text-white/40 transition-colors duration-300">
            Read more →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
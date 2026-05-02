// components/blog-section.tsx - Home page blog section
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogCard } from './blog-card'

interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  publishedDate: string
  tags: string[]
  featured: boolean
  coverImage: string | null
  content: string
  createdAt: string
  updatedAt: string
}

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  // Show only latest 3 posts
  const latestPosts = posts.slice(0, 3)

  if (!latestPosts.length) return null

  return (
    <section className="py-40 relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-[0.1em] text-white/20 uppercase font-dm">
              Latest Thoughts
            </p>
            <div className="w-12 h-px bg-yellow-400/20" />
          </div>
          
          <Link
            href="/blog"
            className="text-xs font-medium text-white/30 hover:text-white transition-colors duration-300 font-dm tracking-[0.05em]"
            data-hover
          >
            View all articles →
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {latestPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              description={post.description}
              publishedDate={post.publishedDate}
              tags={post.tags}
              coverImage={post.coverImage}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
// components/blog-list.tsx - Blog listing page component
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
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

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState('All')

  // Get unique tags
  const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))]

  const filteredPosts = activeTag === 'All'
    ? posts
    : posts.filter(post => post.tags.includes(activeTag))

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-xs font-medium tracking-[0.15em] text-white/20 uppercase mb-6 font-dm">
              Journal
            </p>
            <h1 className="font-syne text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] text-white tracking-tight">
              Thoughts &<br />
              <span className="text-white/15">insights.</span>
            </h1>

            <p className="text-white/40 font-dm text-base max-w-lg mt-8 leading-relaxed">
              Sharing knowledge about design, development, and the creative process.
            </p>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2 mt-10">
              {allTags.map((tag, index) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-dm transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-white text-black font-medium'
                      : 'border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20'
                  }`}
                  data-hover
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredPosts.map((post, index) => (
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
          ) : (
            <div className="text-center py-20">
              <p className="text-white/20 font-dm">No posts found for this tag.</p>
              <button
                onClick={() => setActiveTag('All')}
                className="mt-4 text-sm text-white/40 hover:text-white transition-colors font-dm"
                data-hover
              >
                View all posts
              </button>
            </div>
          )}

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-white/10" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3 className="font-syne text-xl font-bold text-white/30 mb-2">No posts yet</h3>
              <p className="text-white/20 font-dm text-sm">Check back soon for new articles.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
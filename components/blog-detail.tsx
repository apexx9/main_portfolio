// components/blog-detail.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

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

interface BlogDetailProps {
  post: BlogPost
}

export function BlogDetail({ post }: BlogDetailProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const readingTime = Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200))

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        })
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Back Button */}
      <div className="fixed top-24 left-6 lg:left-12 z-30">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300 group"
          data-hover
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-xs font-medium tracking-[0.1em] uppercase font-dm">Back</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="pt-40 pb-16 lg:pt-48 lg:pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="text-[11px] text-white/30 uppercase tracking-[0.08em] font-dm bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.05] hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-syne text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-white/40 font-dm text-base lg:text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-white/20 font-dm">
              <span>{formattedDate}</span>
              <span className="text-white/10">·</span>
              <span>{readingTime} min read</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 mb-16"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl border border-white/[0.04]"
          />
        </motion.div>
      )}

      {/* Article Content */}
      <article className="pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Share / Back */}
      <div className="border-t border-white/5 py-16">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-white/30 hover:text-white transition-colors duration-300 font-dm"
            data-hover
          >
            ← All articles
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/15 font-dm uppercase tracking-wider">Share</span>
            
            {/* Share Button (mobile) */}
            <button
              onClick={handleShare}
              className="sm:hidden text-sm text-white/25 hover:text-white/60 transition-colors duration-300 font-dm"
            >
              Share
            </button>

            {/* Copy Link Button (desktop) */}
            <button
              onClick={handleCopyLink}
              className={`hidden sm:block text-sm transition-all duration-300 font-dm ${
                copied 
                  ? 'text-yellow-400' 
                  : 'text-white/25 hover:text-white/60'
              }`}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

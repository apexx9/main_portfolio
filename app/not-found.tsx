// app/not-found.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large 404 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[30vw] font-syne font-bold text-white/[0.015] select-none">
          404
        </span>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-yellow-400/5 border border-yellow-400/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-yellow-400/60" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          <h1 className="font-syne text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-white/35 font-dm text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-10">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-yellow gap-3 px-8 py-4 text-sm font-dm inline-flex items-center justify-center"
              data-hover
            >
              <span className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-full border border-white/[0.08] text-sm text-white/40 hover:text-white hover:border-white/20 transition-all duration-300 font-dm inline-flex items-center justify-center"
              data-hover
            >
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
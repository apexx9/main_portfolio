// components/hero.tsx - Fixed buttons, removed trusted by
'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from './button'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const letterAnimation = {
    hidden: { y: 200, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.3 + i * 0.02,
      },
    }),
  }

  const title = "Creative Developer"
  const subtitle = "Crafting digital experiences with precision & care"

  return (
    <section 
      ref={containerRef} 
      className="min-h-[80vh] flex items-center relative overflow-hidden"
    >
      {/* Amini-style concentric rings background */}
      <motion.div 
        className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[700px] h-[700px] opacity-[0.12] pointer-events-none hero-rings-container"
        initial={{ scale: 0.8, y: 50 }}
        whileInView={{ scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
          <circle cx="350" cy="350" r="80" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          <circle cx="350" cy="350" r="140" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          <circle cx="350" cy="350" r="200" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          <circle cx="350" cy="350" r="265" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          <circle cx="350" cy="350" r="330" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          <line x1="350" y1="20" x2="350" y2="680" stroke="rgba(245,200,66,0.3)" strokeWidth="0.8"/>
          <line x1="20" y1="350" x2="680" y2="350" stroke="rgba(245,200,66,0.3)" strokeWidth="0.8"/>
          <line x1="145" y1="145" x2="555" y2="555" stroke="rgba(245,200,66,0.2)" strokeWidth="0.8"/>
          <line x1="555" y1="145" x2="145" y2="555" stroke="rgba(245,200,66,0.2)" strokeWidth="0.8"/>
          <circle cx="350" cy="85" r="3" fill="rgba(245,200,66,0.4)"/>
          <circle cx="615" cy="350" r="3" fill="rgba(245,200,66,0.4)"/>
          <circle cx="350" cy="615" r="3" fill="rgba(245,200,66,0.4)"/>
          <circle cx="85" cy="350" r="3" fill="rgba(245,200,66,0.4)"/>
        </svg>
      </motion.div>

      <motion.div 
        className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-12 w-full"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 3.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left: Headline */}
          <div className="space-y-12">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 3.6, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="font-syne text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-bold tracking-tight"
                style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
              >
                {title}
              </motion.h1>
            </div>

            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 3.8, duration: 0.8 }}
            >
              <p className="text-white/40 text-lg lg:text-xl font-light max-w-xl leading-relaxed font-dm">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {/* Right: CTA Group */}
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.0, duration: 0.8 }}
            className="flex flex-col items-start lg:items-end gap-5"
          >
            <motion.p 
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ delay: 4.1, duration: 0.8 }}
              className="text-[11px] text-white/30 tracking-[0.2em] uppercase font-dm"
            >
              Available for work
            </motion.p>
            <div className="flex items-center gap-4">
              <Button 
                href="#work" 
                variant="primary"
                className="group"
              >
                View Projects
              </Button>
              <Button 
                href="#contact" 
                variant="secondary"
                icon="contact"
              >
                Contact me
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated noise texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        animate={{ 
          backgroundPosition: ['0px 0px', '256px 256px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </section>
  )
}
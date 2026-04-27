'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from './logo'

export function Loading() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // Non-linear progress for more natural feel
        const increment = Math.random() * 15
        return Math.min(prev + increment, 100)
      })
    }, 150)

    // Exit loading after progress completes
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => setIsLoading(false), 800)
    }, 2500)

    return () => {
      clearInterval(timer)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center"
        >
          {/* Background grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <Logo variant="symbol" size="lg" animated={true} />
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center space-y-8"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="text-xs font-light tracking-[0.3em] uppercase text-white/20"
              >
                Loading experience
              </motion.p>

              {/* Progress bar */}
              <div className="w-48 h-px bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/10 via-yellow-400/50 to-yellow-400"
                  animate={{ 
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                className="text-[10px] font-light tracking-[0.2em] text-white/10"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Decorative rings - Amini style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.05, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none"
            >
              <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin" style={{ animationDuration: '30s' }}>
                <circle cx="150" cy="150" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
                <circle cx="150" cy="150" r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
                <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none"/>
                <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(245,200,66,0.2)" strokeWidth="0.5"/>
                <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(245,200,66,0.2)" strokeWidth="0.5"/>
              </svg>
            </motion.div>
          </div>

          {/* Exit animation overlay */}
          {isExiting && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#0A0A0A] origin-left"
              style={{ zIndex: 20 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'icon' | 'symbol'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export function Logo({ 
  variant = 'full', 
  size = 'md', 
  animated = false,
  className = '' 
}: LogoProps) {
  
  const sizeClasses = {
    sm: {
      container: 'text-base',
      icon: 'w-5 h-5',
      dot: 'w-1 h-1',
    },
    md: {
      container: 'text-lg lg:text-xl',
      icon: 'w-6 h-6 lg:w-7 lg:h-7',
      dot: 'w-1.5 h-1.5',
    },
    lg: {
      container: 'text-2xl lg:text-3xl',
      icon: 'w-8 h-8 lg:w-10 lg:h-10',
      dot: 'w-2 h-2',
    },
  }

  const sizes = sizeClasses[size]

  // Animated dot pulse
  const dotVariants: Variants = {
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  if (variant === 'icon') {
    return (
      <Link href="/" className={`inline-flex items-center gap-0.5 ${className}`}>
        {/* Stylized R */}
        <motion.div
          initial={animated ? { rotate: -90, opacity: 0 } : false}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`${sizes.icon} relative flex items-center justify-center`}
        >
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer square */}
            <motion.rect
              initial={animated ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              x="2" y="2" width="28" height="28" rx="4"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-white"
            />
            {/* R letterform */}
            <motion.path
              initial={animated ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            />
          </svg>
        </motion.div>
        
        {/* Animated dot */}
        <motion.div
          variants={dotVariants}
          animate={animated ? "pulse" : undefined}
          transition={animated ? { repeat: Infinity } : undefined}
          className={`${sizes.dot} rounded-full bg-yellow-400`}
        />
      </Link>
    )
  }

  if (variant === 'symbol') {
    return (
      <motion.div
        initial={animated ? { scale: 0, rotate: -180 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`${sizes.icon} relative ${className}`}
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background square */}
          <rect x="1" y="1" width="38" height="38" rx="6" fill="#0A0A0A" stroke="currentColor" strokeWidth="2" className="text-white/10"/>
          
          {/* Tech grid lines */}
          <line x1="1" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-white/5"/>
          <line x1="25" y1="20" x2="39" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-white/5"/>
          <line x1="20" y1="1" x2="20" y2="15" stroke="currentColor" strokeWidth="0.5" className="text-white/5"/>
          <line x1="20" y1="25" x2="20" y2="39" stroke="currentColor" strokeWidth="0.5" className="text-white/5"/>
          
          {/* R letterform */}
          <path
            d="M12 28V12h8.5c3 0 5.5 2.5 5.5 5.5s-2.5 5-5.5 5H16l4 5.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
          
          {/* Yellow accent dot */}
          <circle cx="28" cy="28" r="2.5" fill="#f5c842"/>
        </svg>
      </motion.div>
    )
  }

  // Full logo (default)
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 group ${className}`}
      data-hover
    >
      {/* Icon part */}
      <div className={`${sizes.icon} relative`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.rect
            initial={animated ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            x="2" y="2" width="28" height="28" rx="4"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white group-hover:text-yellow-400 transition-colors duration-300"
          />
          <motion.path
            initial={animated ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white group-hover:text-yellow-400 transition-colors duration-300"
          />
        </svg>
      </div>

      {/* Text part */}
      <div className="flex items-baseline">
        <motion.span
          initial={animated ? { x: -10, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`${sizes.container} font-syne font-extrabold tracking-[0.08em] uppercase`}
          style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
        >
          ronny
        </motion.span>
        <motion.span
          initial={animated ? { x: -10, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`${sizes.container} font-syne font-light tracking-[0.08em] uppercase text-white/40`}
          style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
        >
          .tech
        </motion.span>

        {/* Subtle animated dot */}
        <motion.div
          variants={dotVariants}
          animate={animated ? "pulse" : undefined}
          transition={animated ? { repeat: Infinity } : undefined}
          className={`${sizes.dot} rounded-full bg-yellow-400 ml-0.5 mb-0.5`}
        />
      </div>
    </Link>
  )
}

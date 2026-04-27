// components/nav.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

const menuLinks = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#work' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  secondary: [
    { label: 'Twitter', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.3,
      },
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.08,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  }

  const overlayVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 28px) 32px)',
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 28px) 32px)',
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.8 }}
      className="fixed top-0 left-0 right-0 z-40"
    >
      {/* Navbar background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled || isMobileOpen
          ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.04]' 
          : 'bg-transparent'
      }`} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo variant="full" size="sm" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-xs font-light tracking-[0.06em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                  data-hover
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.3 }}
            >
              <Link
                href="/#contact"
                className="text-xs font-medium text-white border border-white/30 hover:border-white/60 px-5 py-2 rounded-full hover:bg-white/5 transition-all duration-200"
                data-hover
              >
                Book a call
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-4">
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="absolute left-0 top-0 h-[1.5px] bg-white origin-center rounded-full"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0, x: -20, width: '0%' } : { opacity: 1, x: 0, width: '60%' }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-[7px] h-[1.5px] bg-white/60 rounded-full"
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -7, width: '100%' } : { rotate: 0, y: 0, width: '80%' }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="absolute right-0 bottom-0 h-[1.5px] bg-white/40 origin-center rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Expanding circle overlay */}
            <motion.div
              initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
              exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#0A0A0A]"
            />

            {/* Grid pattern on overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full px-6 py-24">
              {/* Top section - empty for spacing */}
              <div />

              {/* Navigation Links */}
              <nav className="space-y-1">
                {menuLinks.main.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.1 + i * 0.08,
                      ease: [0.76, 0, 0.24, 1]
                    }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="group flex items-center gap-4 py-3"
                    >
                      <span className="text-[10px] text-white/15 font-dm tracking-[0.2em] uppercase w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-4xl sm:text-5xl font-syne font-bold text-white/80 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
                        {item.label}
                      </span>
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-yellow-400 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 + menuLinks.main.length * 0.08,
                  ease: [0.76, 0, 0.24, 1]
                }}
                className="space-y-8"
              >
                {/* CTA */}
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-yellow inline-flex items-center gap-3 px-8 py-4 text-sm font-dm w-full sm:w-auto justify-center"
                >
                  <span className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                  Start a project
                </Link>

                {/* Social & Contact */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.04]">
                  <div className="flex gap-6">
                    {menuLinks.secondary.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-xs text-white/25 hover:text-white/60 transition-colors duration-300 font-dm tracking-wider"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <a
                    href="mailto:aaronnartey001@gmail.com"
                    className="text-xs text-white/20 hover:text-white/50 transition-colors duration-300 font-dm"
                  >
                    aaronnartey001@gmail.com
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-[10px] text-white/10 font-dm">
                  © {new Date().getFullYear()} ronny.tech
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
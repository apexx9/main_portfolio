// components/nav.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { getSocials } from '@/lib/socials'
import { ArrowRight, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' }
]

const menuLinks = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#work' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Blog', href: '/blog' }
  ],
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateScrollState)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsMobileOpen(false))
    return () => window.cancelAnimationFrame(id)
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
          ? 'bg-[#0A0A0A]/88 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.03)]' 
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
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50 text-white"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, scale: 0.9, rotate: 15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
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
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  Start a project
                </Link>

                {/* Social & Contact */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.04]">
                  <div className="flex gap-6">
                    {getSocials().map(social => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="text-xs text-white/25 hover:text-white/60 transition-colors duration-300 font-dm tracking-wider"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
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

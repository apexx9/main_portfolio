// components/footer.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Logo } from './logo'
import { getSocials } from '@/lib/socials'
import { subscribeToNewsletter } from '@/lib/api'
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react'

export default function Footer() {
  const date = new Date().getFullYear()
  const socials = getSocials()
  
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Africa/Accra', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    updateClock()
    const intervalId = setInterval(updateClock, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setMessage('')

    const result = await subscribeToNewsletter(email)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } else {
      setStatus('error')
      setMessage(result.message)
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <footer id="contact" className="bg-[#111111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="mb-6">
              <Logo variant="full" size="md" animated={false} />
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm font-dm">
              Creating digital experiences that blend beauty with functionality. 
              Let&apos;s build something remarkable together.
            </p>
          </div>

          <div>
            <p className="font-syne text-sm font-semibold mb-4" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
              Subscribe to my newsletter
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center bg-white/5 border border-white/10 rounded-full pl-5 pr-1.5 py-1.5 max-w-md focus-within:border-white/30 transition-colors">
              <Mail className="w-4 h-4 text-white/40 mr-3 flex-shrink-0" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-transparent border-none outline-none text-[16px] md:text-sm text-white placeholder:text-white/50 font-dm disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-10 h-10 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/50 text-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 flex-shrink-0"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            
            {/* Status Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-yellow-400/80 mt-2 font-dm"
                >
                  {message}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-400/80 mt-2 font-dm"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-[10px] tracking-[0.06em] uppercase text-white/40 mt-3 font-dm">
              By subscribing you agree to the terms and conditions
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/50 mb-5" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>Links</p>
            <ul className="space-y-3">
              {['Home', 'Work', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors font-dm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/50 mb-5" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>Services</p>
            <ul className="space-y-3">
              {['Web Design', 'Development', 'Branding'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors font-dm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/50 mb-5" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>Resources</p>
            <ul className="space-y-3">
              {['Blog', 'Case Studies', 'FAQ'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors font-dm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-widest uppercase text-white/50 mb-5" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>Socials</p>
            <ul className="space-y-3">
              {socials.map(social => (
                <li key={social.name}>
                  <Link 
                    href={social.url} 
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 font-dm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4 text-white/50" />
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-white/15 gap-4">
          <p className="text-xs text-white/40 font-dm">
            © {date} ronny.tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {time && (
              <p className="text-xs text-white/40 font-dm tracking-widest uppercase">
                Accra, GH • {time}
              </p>
            )}
            <span className="text-[10px] font-dm tracking-[0.2em] text-white/60 uppercase border border-white/10 px-3 py-1 rounded-full bg-white/5">
              Creator
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

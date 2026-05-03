'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from './logo'
import { getSocials } from '@/lib/socials'

export default function Footer() {
  const date = new Date().getFullYear();
  const socials = getSocials();
  return (
    <footer id="contact" className="bg-[#111111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="mb-6">
              <Logo variant="full" size="md" animated={false} />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              Creating digital experiences that blend beauty with functionality. 
              Let's build something remarkable together.
            </p>
          </div>

          <div>
            <p className="font-syne text-sm font-semibold mb-4">
              Subscribe to my newsletter
            </p>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full pl-5 pr-1.5 py-1.5 max-w-md focus-within:border-white/30 transition-colors">
              <svg className="text-white/40 mr-3" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
              />
              <button className="w-10 h-10 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
                <svg fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <p className="text-[10px] tracking-[0.06em] uppercase text-white/20 mt-3">
              By subscribing you agree to the terms and conditions
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Links</p>
            <ul className="space-y-3">
              {['Home', 'Work', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Services</p>
            <ul className="space-y-3">
              {['Web Design', 'Development', 'Branding'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Resources</p>
            <ul className="space-y-3">
              {['Blog', 'Case Studies', 'FAQ'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-[11px] font-bold tracking-widest uppercase text-white/30 mb-5">Socials</p>
            <ul className="space-y-3">
              {socials.map(social => (
                <li key={social.name}>
                  <Link 
                    href={social.url} 
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span dangerouslySetInnerHTML={{ __html: social.icon }} />
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-white/20 mt-16 pt-8 border-t border-white/5">
          © {date} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

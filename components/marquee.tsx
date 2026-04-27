// components/marquee.tsx - With Font Awesome icons
'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

const skills = [
  { name: 'React', icon: 'fa-react' },
  { name: 'Next.js', icon: 'fa-js' },
  { name: 'TypeScript', icon: 'fa-js' },
  { name: 'Tailwind CSS', icon: 'fa-css3' },
  { name: 'Node.js', icon: 'fa-node-js' },
  { name: 'Python', icon: 'fa-python' },
  { name: 'Docker', icon: 'fa-docker' },
  { name: 'AWS', icon: 'fa-aws' },
  { name: 'Figma', icon: 'fa-figma' },
  { name: 'Git', icon: 'fa-git-alt' },
]

export default function Marquee() {
  return (
    <div className="py-20 border-y border-white/[0.03] overflow-hidden bg-[#0A0A0A] relative">
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
      />
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left direction */}
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="flex gap-0 whitespace-nowrap mb-12"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 py-3 group cursor-default"
          >
            <i className={`fa-brands ${skill.icon} text-2xl text-white/10 group-hover:text-white/60 transition-all duration-500`} />
            <span className="text-xl lg:text-2xl font-syne font-light tracking-tight text-white/10 group-hover:text-white/40 transition-all duration-500" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
              {skill.name}
            </span>
            <span className="ml-8 text-white/[0.03] text-2xl">•</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 - Right direction */}
      <motion.div
        animate={{ x: [-1920, 0] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="flex gap-0 whitespace-nowrap"
      >
        {[...skills.reverse(), ...skills.reverse()].map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 py-3 group cursor-default"
          >
            <i className={`fa-brands ${skill.icon} text-2xl text-white/10 group-hover:text-white/60 transition-all duration-500`} />
            <span className="text-xl lg:text-2xl font-syne font-light tracking-tight text-white/10 group-hover:text-white/40 transition-all duration-500" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
              {skill.name}
            </span>
            <span className="ml-8 text-white/[0.03] text-2xl">•</span>
          </div>
        ))}
      </motion.div>

          </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiFigma, SiGit } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const skills = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: FaAws },
  { name: 'Figma', icon: SiFigma },
  { name: 'Git', icon: SiGit },
]

const repeatedSkills = [...skills, ...skills]
const reversedSkills = [...skills].reverse()
const repeatedReversedSkills = [...reversedSkills, ...reversedSkills]

export default function Marquee() {
  return (
    <div className="py-20 border-y border-white/[0.03] overflow-hidden bg-[#0A0A0A] relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        className="flex w-max gap-0 whitespace-nowrap mb-12 will-change-transform transform-gpu"
      >
        {repeatedSkills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-3 px-8 py-3 group cursor-default shrink-0"
            >
              <Icon className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-all duration-500" />
              <span
                className="text-xl lg:text-2xl font-syne font-light tracking-tight text-white/10 group-hover:text-white/40 transition-all duration-500"
                style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
              >
                {skill.name}
              </span>
              <span className="ml-8 text-white/[0.03] text-2xl">•</span>
            </div>
          )
        })}
      </motion.div>

      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{
          x: {
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        className="flex w-max gap-0 whitespace-nowrap will-change-transform transform-gpu"
      >
        {repeatedReversedSkills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-3 px-8 py-3 group cursor-default shrink-0"
            >
              <Icon className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-all duration-500" />
              <span
                className="text-xl lg:text-2xl font-syne font-light tracking-tight text-white/10 group-hover:text-white/40 transition-all duration-500"
                style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
              >
                {skill.name}
              </span>
              <span className="ml-8 text-white/[0.03] text-2xl">•</span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

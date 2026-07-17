'use client'

import { motion } from 'framer-motion'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiFigma, SiGit, SiPostgresql, SiRedis, SiPrisma } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const skills = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Redis', icon: SiRedis },
  { name: 'Prisma', icon: SiPrisma },
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
    <section className="py-24 border-y border-white/[0.03] overflow-hidden bg-[#0A0A0A] relative">
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        className="flex w-max gap-0 whitespace-nowrap mb-10 will-change-transform transform-gpu"
      >
        {repeatedSkills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-4 px-10 py-4 group cursor-default shrink-0"
            >
              <Icon className="w-6 h-6 text-white/8 group-hover:text-white/50 transition-all duration-700 ease-out" />
              <span
                className="text-2xl lg:text-3xl font-syne font-light tracking-tight text-white/8 group-hover:text-white/35 transition-all duration-700 ease-out"
                style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
              >
                {skill.name}
              </span>
              <span className="ml-10 text-white/[0.02] text-3xl font-light">•</span>
            </div>
          )
        })}
      </motion.div>

      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{
          x: {
            duration: 30,
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
              className="flex items-center gap-4 px-10 py-4 group cursor-default shrink-0"
            >
              <Icon className="w-6 h-6 text-white/8 group-hover:text-white/50 transition-all duration-700 ease-out" />
              <span
                className="text-2xl lg:text-3xl font-syne font-light tracking-tight text-white/8 group-hover:text-white/35 transition-all duration-700 ease-out"
                style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
              >
                {skill.name}
              </span>
              <span className="ml-10 text-white/[0.02] text-3xl font-light">•</span>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}

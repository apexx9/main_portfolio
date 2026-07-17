'use client'

import { useEffect } from 'react'
import { NotionExperience } from '@/lib/notion'

interface ExperienceProps {
  experiences: NotionExperience[]
}

export default function Experience({ experiences }: ExperienceProps) {
  useEffect(() => {
    console.log('Experience component mounted, experiences:', experiences)
  }, [experiences])

  return (
    <section id="experience" className="py-16 md:py-32 relative border-t border-white/5 bg-red-500/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div>
          <div className="mb-12 md:mb-20">
            <p className="text-xs font-medium tracking-[0.1em] text-white/50 uppercase mb-4 md:mb-8 font-dm">Experience</p>
            <h2 className="font-syne text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
              My Journey.
            </h2>
          </div>

          <div className="space-y-4">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-t border-white/5 first:border-t-0 hover:bg-white/[0.02] transition-colors p-4 md:p-6 rounded-2xl"
                >
                  <div className="md:w-1/4 shrink-0 font-dm flex flex-col">
                    <p className="text-sm text-white/50 mb-1">{exp.duration}</p>
                    <p className="text-lg font-medium text-white">{exp.company}</p>
                    
                    {exp.logo && (
                      <div className="mt-6 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                        {exp.logo.startsWith('http') || exp.logo.startsWith('data:') ? (
                           <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-cover" />
                        ) : (
                           <span className="text-3xl">{exp.logo}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="md:w-3/4 space-y-4 flex flex-col justify-center">
                    <h3 className="font-syne text-2xl font-bold text-white" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>{exp.role}</h3>
                    <p className="text-white/70 font-light leading-relaxed text-base font-dm max-w-2xl whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white/50 text-center py-12 font-dm">
                <p>No experiences added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

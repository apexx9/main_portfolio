'use client'

import { motion } from 'framer-motion'
import { Button } from './button'

export function CTADivider() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-syne text-[clamp(28px,4vw,52px)] font-bold leading-[1.15] max-w-3xl mx-auto mb-12"
          style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
        >
          <span className="text-white/30">Ready to </span>
          unleash the potential of
          <br />
          your next project<span className="text-yellow-400">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            href="#contact" 
            variant="primary"
            className="px-8 py-4"
          >
            Start a project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

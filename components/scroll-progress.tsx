'use client'

import { motion, useScroll } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'

export function ScrollProgress() {
  const isDesktop = useMediaQuery('(min-width: 769px)')
  const { scrollYProgress } = useScroll()

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-yellow-400 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

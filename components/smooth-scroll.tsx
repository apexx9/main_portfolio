'use client'

import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const Lenis = ReactLenis as unknown as React.ComponentType<{
    root?: boolean
    options?: {
      lerp?: number
      duration?: number
      smoothWheel?: boolean
    }
    children?: React.ReactNode
  }>

  return (
    <Lenis root options={{ 
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true
    }}>
      {children}
    </Lenis>
  )
}

// lib/socials.ts - Centralized social links data

import type { LucideIcon } from 'lucide-react'
import { Dribbble, Github, Instagram, Linkedin, Twitter } from 'lucide-react'

export interface Social {
  name: string
  url: string
  icon: LucideIcon
}

export const socials: Social[] = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/apexxxx_9',
    icon: Twitter,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/apexx9',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/apexx9',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/__aaro.nn',
    icon: Instagram,
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/apexx9',
    icon: Dribbble,
  },
]

export function getSocials(): Social[] {
  return socials
}

'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: 'arrow' | 'contact'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  icon = 'arrow',
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center gap-3 font-semibold text-sm rounded-full transition-all duration-300 font-dm"
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-[#1a1200] hover:scale-[1.02] px-7 py-3.5",
    secondary: "text-white/50 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-6 py-3.5"
  }

  const icons = {
    arrow: (
      <span className="w-7 h-7 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black/30 transition-colors">
        <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </span>
    ),
    contact: (
      <span className="w-7 h-7 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black/30 transition-colors">
        <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </span>
    )
  }

  const buttonContent = (
    <>
      {variant === 'primary' && icons.arrow}
      <span>{children}</span>
      {variant === 'secondary' && icon === 'contact' && icons.contact}
    </>
  )

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variants[variant]} ${className} group`}
        data-hover
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className} group`}
      onClick={onClick}
      disabled={disabled}
      data-hover
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  )
}

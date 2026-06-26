// components/contact.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { submitContactForm } from '@/lib/api'
import { Button } from './button'
import { AlertCircle, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
  budget: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const budgetOptions = [
    { value: 'under-5k', label: 'Under $5k', description: 'Small project or MVP' },
    { value: '5k-10k', label: '$5k - $10k', description: 'Standard website or app' },
    { value: '10k-25k', label: '$10k - $25k', description: 'Complex platform' },
    { value: '25k-50k', label: '$25k - $50k', description: 'Enterprise solution' },
    { value: '50k-plus', label: '$50k+', description: 'Large-scale system' },
    { value: 'not-sure', label: 'Not sure yet', description: 'We can figure it out together' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedBudget = budgetOptions.find(opt => opt.value === formData.budget)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      budget: selectedBudget?.label || formData.budget,
    })

    if (result.success) {
      setIsSubmitted(true)
      setSubmitSuccess(result.message)
      setFormData({ name: '', email: '', company: '', message: '', budget: '' })
    } else {
      setSubmitError(result.message)
    }
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-40 relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left: Contact Info */}
          <div>
            <div className="space-y-1 mb-12">
              <p className="text-xs font-medium tracking-[0.1em] text-white/20 uppercase font-dm">Contact</p>
              <div className="w-12 h-px bg-yellow-400/20" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-syne text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
                Let&apos;s work<br />
                <span className="text-white/20">together.</span>
              </h2>

              <p className="text-white/40 text-base font-light leading-relaxed max-w-md font-dm">
                Have a project in mind? I&apos;d love to hear about it. 
                Fill out the form and I&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6 pt-8 border-t border-white/5">
                <div>
                  <p className="text-xs text-white/20 uppercase tracking-[0.1em] mb-2 font-dm">Email</p>
                  <a 
                    href="mailto:aaronnartey001@gmail.com" 
                    className="text-lg text-white/60 hover:text-yellow-400 transition-colors duration-300 font-dm"
                    data-hover
                  >
                    aaronnartey001@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/20 uppercase tracking-[0.1em] mb-2 font-dm">Location</p>
                  <p className="text-lg text-white/40 font-dm">Available worldwide</p>
                </div>
                <div>
                  <p className="text-xs text-white/20 uppercase tracking-[0.1em] mb-2 font-dm">Social</p>
                  <div className="flex gap-6">
                    {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map(social => (
                      <a
                        key={social}
                        href="#"
                        className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300 font-dm"
                        data-hover
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  {/* Animated Check Circle */}
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-8 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1
                    }}
                  >
                    {/* Background circle
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-400/10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    /> */}
                    
                    {/* Outer ring
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    /> */}
                    
                    <CheckCircle2 className="w-10 h-10 text-yellow-400 relative z-10" />
                  </motion.div>

                  {/* Success Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <motion.h3 
                      className="font-syne text-2xl font-bold mb-4"
                      style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      Message sent!
                    </motion.h3>
                    <motion.p 
                      className="text-white/40 font-dm max-w-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                    >
                      {submitSuccess || "Thanks for reaching out. I'll get back to you within 24 hours."}
                    </motion.p>
                  </motion.div>

                  {/* Send Another Button */}
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-sm text-white/40 hover:text-white transition-colors font-dm"
                    data-hover
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2.5 font-dm font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-transparent border ${errors.name ? 'border-red-500/30' : 'border-white/[0.06]'} rounded-xl px-5 py-4 text-white placeholder:text-white/8 font-dm text-sm focus:outline-none focus:border-white/20 transition-all duration-300 hover:border-white/10`}
                      data-hover
                    />
                    {errors.name && (
                      <p className="text-red-400/50 text-[11px] mt-2 font-dm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2.5 font-dm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-transparent border ${errors.email ? 'border-red-500/30' : 'border-white/[0.06]'} rounded-xl px-5 py-4 text-white placeholder:text-white/8 font-dm text-sm focus:outline-none focus:border-white/20 transition-all duration-300 hover:border-white/10`}
                      data-hover
                    />
                    {errors.email && (
                      <p className="text-red-400/50 text-[11px] mt-2 font-dm">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2.5 font-dm font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full bg-transparent border border-white/[0.06] rounded-xl px-5 py-4 text-white placeholder:text-white/8 font-dm text-sm focus:outline-none focus:border-white/20 transition-all duration-300 hover:border-white/10"
                      data-hover
                    />
                  </div>

                  {/* Budget Dropdown */}
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2.5 font-dm font-medium">
                      Budget Range
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-transparent border rounded-xl px-5 py-4 text-left flex items-center justify-between transition-all duration-300 ${
                          isDropdownOpen 
                            ? 'border-yellow-400/30 bg-white/[0.02]' 
                            : 'border-white/[0.06] hover:border-white/10'
                        }`}
                        data-hover
                      >
                        {selectedBudget ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-white text-sm font-dm">{selectedBudget.label}</span>
                            <span className="text-white/20 text-[11px] font-dm">{selectedBudget.description}</span>
                          </div>
                        ) : (
                          <span className="text-white/20 text-sm font-dm">Select budget range</span>
                        )}
                        <motion.div
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 flex-shrink-0 text-white/20"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 4, scaleY: 1 }}
                            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute z-50 w-full mt-2 bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-xl"
                            style={{ transformOrigin: 'top' }}
                          >
                            <div className="px-5 py-3 border-b border-white/[0.04]">
                              <p className="text-[10px] text-white/15 uppercase tracking-[0.1em] font-dm font-medium">
                                Select your budget
                              </p>
                            </div>

                            <div className="py-1">
                              {budgetOptions.map((option) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, budget: option.value }))
                                    setIsDropdownOpen(false)
                                  }}
                                  className={`w-full text-left px-5 py-3.5 transition-all duration-200 group relative ${
                                    formData.budget === option.value 
                                      ? 'bg-yellow-400/5' 
                                      : 'hover:bg-white/[0.02]'
                                  }`}
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className={`text-sm font-dm block transition-colors duration-200 ${
                                        formData.budget === option.value 
                                          ? 'text-yellow-400' 
                                          : 'text-white/70 group-hover:text-white'
                                      }`}>
                                        {option.label}
                                      </span>
                                      <span className="text-[11px] text-white/20 font-dm mt-0.5 block">
                                        {option.description}
                                      </span>
                                    </div>
                                    {formData.budget === option.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-4 flex-shrink-0 text-yellow-400"
                                      >
                                        <Check className="w-4 h-4" />
                                      </motion.div>
                                    )}
                                  </div>

                                  {formData.budget === option.value && (
                                    <motion.div
                                      layoutId="activeBudget"
                                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-yellow-400 rounded-r-full"
                                      transition={{ duration: 0.2 }}
                                    />
                                  )}
                                </motion.button>
                              ))}
                            </div>

                            <div className="px-5 py-3 border-t border-white/[0.04] bg-white/[0.01]">
                              <p className="text-[10px] text-white/10 font-dm">
                                Budgets are flexible — let&apos;s discuss what works best
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2.5 font-dm font-medium">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={5}
                        maxLength={1000}
                        className={`w-full bg-transparent border ${errors.message ? 'border-red-500/30' : 'border-white/[0.06]'} rounded-xl px-5 py-4 text-white placeholder:text-white/8 font-dm text-sm focus:outline-none focus:border-white/20 transition-all duration-300 resize-none hover:border-white/10`}
                        data-hover
                      />
                      <div className="absolute bottom-3 right-4">
                        <span className="text-[10px] text-white/10 font-dm tabular-nums">
                          {formData.message.length}/1000
                        </span>
                      </div>
                    </div>
                    {errors.message && (
                      <p className="text-red-400/50 text-[11px] mt-2 font-dm">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Error */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 overflow-hidden"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                          <p className="text-red-400/70 text-sm font-dm">{submitError}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="w-1/2 !px-6 !py-3 !text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

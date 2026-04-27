// lib/projects.ts - Centralized project data

export interface Project {
  title: string
  category: string
  year: string
  slug: string
  color: string
  excerpt?: string
  client?: string
  role?: string
  duration?: string
  heroImage?: string
  overview?: string
  challenge?: string
  approach?: string
  features?: string[]
  techStack?: string[]
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
  nextProject?: string
  prevProject?: string
}

export const projects: Record<string, Project> = {
  'digital-experience': {
    title: 'Digital Experience',
    category: 'Web Design',
    year: '2024',
    slug: 'digital-experience',
    color: '#1a1a1a',
    excerpt: 'A complete digital transformation for a leading tech company.',
    client: 'TechVision Inc.',
    role: 'Lead Designer & Developer',
    duration: '12 weeks',
    heroImage: '/project-1.jpg',
    overview: 'A complete digital transformation for a leading tech company, reimagining their online presence with a focus on user experience and modern design principles.',
    challenge: 'The client needed to modernize their outdated platform while maintaining their brand identity. The challenge was to create something fresh yet familiar, improving performance without sacrificing the features their users loved.',
    approach: 'We started with extensive user research, creating detailed personas and journey maps. The design system was built from the ground up using a component-based architecture, ensuring consistency across all touchpoints.',
    features: [
      'Responsive design system',
      'Real-time data visualization',
      'Advanced search functionality',
      'Multi-language support',
      'Dark mode interface',
      'Accessibility WCAG 2.1 AA compliant',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'PostgreSQL'],
    gallery: ['/project-1.jpg', '/project-2.jpg', '/project-3.jpg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    nextProject: 'brand-identity',
    prevProject: 'e-commerce-platform',
  },
  'brand-identity': {
    title: 'Brand Identity',
    category: 'Branding',
    year: '2024',
    slug: 'brand-identity',
    color: '#0d0d0d',
    excerpt: 'Complete brand identity design for an innovative startup.',
    client: 'NovaStart',
    role: 'Brand Designer',
    duration: '8 weeks',
    heroImage: '/project-2.jpg',
    overview: 'Complete brand identity design for an innovative startup, including logo design, brand guidelines, and marketing materials.',
    challenge: 'The startup was entering a crowded market and needed to stand out. Their brand needed to convey innovation, trust, and approachability simultaneously.',
    approach: 'Through collaborative workshops, we defined the brand personality and visual direction. Every element was designed to tell their unique story.',
    features: [
      'Logo design system',
      'Brand guidelines documentation',
      'Marketing collateral',
      'Social media templates',
      'Business card design',
      'Email signature templates',
    ],
    techStack: ['Figma', 'Illustrator', 'After Effects'],
    gallery: ['/project-2.jpg', '/project-3.jpg', '/project-1.jpg'],
    liveUrl: 'https://example.com',
    nextProject: 'mobile-interface',
    prevProject: 'digital-experience',
  },
  'mobile-interface': {
    title: 'Mobile Interface',
    category: 'UI/UX',
    year: '2023',
    slug: 'mobile-interface',
    color: '#151515',
    excerpt: 'A health and wellness app with an intuitive interface.',
    client: 'HealthTrack',
    role: 'UI/UX Designer',
    duration: '16 weeks',
    heroImage: '/project-3.jpg',
    overview: 'A health and wellness app designed to help users track their fitness goals with an intuitive and engaging interface.',
    challenge: 'Health apps often overwhelm users with data. The challenge was to present complex health metrics in a simple, digestible way that motivates rather than intimidates.',
    approach: 'We focused on progressive disclosure, showing users only what they need when they need it. Gamification elements were subtly integrated to encourage consistent usage.',
    features: [
      'Personalized dashboard',
      'Activity tracking',
      'Nutrition logging',
      'Progress visualization',
      'Social challenges',
      'Wearable device integration',
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'Node.js'],
    gallery: ['/project-3.jpg', '/project-1.jpg', '/project-2.jpg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    nextProject: 'e-commerce-platform',
    prevProject: 'brand-identity',
  },
  'e-commerce-platform': {
    title: 'E-Commerce Platform',
    category: 'Development',
    year: '2023',
    slug: 'e-commerce-platform',
    color: '#1f1f1f',
    excerpt: 'A high-performance e-commerce platform handling thousands of transactions.',
    client: 'ShopFlow',
    role: 'Full Stack Developer',
    duration: '20 weeks',
    heroImage: '/project-4.jpg',
    overview: 'A high-performance e-commerce platform built from scratch, handling thousands of daily transactions with ease.',
    challenge: 'The existing platform was slow and couldn\'t scale. We needed to rebuild the entire architecture while migrating data without any downtime.',
    approach: 'We implemented a microservices architecture with server-side rendering for optimal performance. The migration was done incrementally to ensure zero data loss.',
    features: [
      'Product management system',
      'Shopping cart & checkout',
      'Payment gateway integration',
      'Order tracking',
      'Inventory management',
      'Analytics dashboard',
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Stripe', 'AWS'],
    gallery: ['/project-4.jpg', '/project-2.jpg', '/project-3.jpg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    nextProject: 'digital-experience',
    prevProject: 'mobile-interface',
  },
  'saas-dashboard': {
    title: 'SaaS Dashboard',
    category: 'Web Design',
    year: '2023',
    slug: 'saas-dashboard',
    color: '#121212',
    excerpt: 'Analytics dashboard for a B2B SaaS platform.',
    client: 'DataFlow',
    role: 'Product Designer',
    duration: '14 weeks',
    overview: 'Analytics dashboard for a B2B SaaS platform with complex data visualization.',
    challenge: 'Making complex data accessible and actionable for non-technical users.',
    approach: 'Designed a progressive disclosure interface with customizable widgets.',
    features: ['Real-time analytics', 'Custom widgets', 'Export functionality', 'Team collaboration'],
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
  },
  'fintech-app': {
    title: 'Fintech App',
    category: 'UI/UX',
    year: '2022',
    slug: 'fintech-app',
    color: '#0a0a0a',
    excerpt: 'Mobile banking experience redesign for a fintech startup.',
    client: 'FinanceHub',
    role: 'UX Designer',
    duration: '12 weeks',
    overview: 'Mobile banking experience redesign for a fintech startup.',
    challenge: 'Simplifying complex financial operations for mobile users.',
    approach: 'Conducted user research and created simplified navigation patterns.',
    features: ['Biometric authentication', 'Instant transfers', 'Budget tracking', 'Investment portfolio'],
    techStack: ['React Native', 'TypeScript', 'Node.js'],
  },
  'portfolio-cms': {
    title: 'Portfolio CMS',
    category: 'Development',
    year: '2022',
    slug: 'portfolio-cms',
    color: '#181818',
    excerpt: 'Headless CMS built for creative professionals.',
    client: 'CreativeFlow',
    role: 'Full Stack Developer',
    duration: '16 weeks',
    overview: 'Headless CMS built for creative professionals.',
    challenge: 'Creating flexible content management for diverse creative portfolios.',
    approach: 'Built modular content types with customizable fields.',
    features: ['Dynamic content types', 'Media management', 'Version control', 'API-first design'],
    techStack: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS'],
  },
  'restaurant-platform': {
    title: 'Restaurant Platform',
    category: 'Web Design',
    year: '2022',
    slug: 'restaurant-platform',
    color: '#141414',
    excerpt: 'Online ordering and reservation system for restaurants.',
    client: 'TableBook',
    role: 'Full Stack Developer',
    duration: '18 weeks',
    overview: 'Online ordering and reservation system for restaurants.',
    challenge: 'Integrating multiple restaurant workflows into one platform.',
    approach: 'Created modular architecture with restaurant-specific customizations.',
    features: ['Online ordering', 'Table reservations', 'Menu management', 'Customer analytics'],
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
  },
}

// Helper functions
export function getAllProjects(): Project[] {
  return Object.values(projects)
}

export function getFeaturedProjects(): Project[] {
  return Object.values(projects).slice(0, 4)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects[slug]
}

export function getProjectSlugs(): string[] {
  return Object.keys(projects)
}

export function getCategories(): string[] {
  const categories = new Set(Object.values(projects).map(p => p.category))
  return ['All', ...Array.from(categories)]
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return getAllProjects()
  return getAllProjects().filter(p => p.category === category)
}

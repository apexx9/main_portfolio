import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Cursor } from '@/components/cursor'
import { Loading } from '@/components/loading'
import Nav from '@/components/Navbar'
import Footer from '@/components/footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'ronny.tech | Creative Developer',
  description: 'Premium portfolio showcasing creative development and design',
  keywords: ['creative developer', 'web development', 'UI/UX design', 'React', 'Next.js', 'TypeScript', 'portfolio', 'frontend developer', 'design systems'],
  authors: [{ name: 'Ronny' }],
  creator: 'Ronny',
  publisher: 'ronny.tech',
  metadataBase: new URL('https://ronny.tech'),
  openGraph: {
    title: 'ronny.tech | Creative Developer',
    description: 'Premium portfolio showcasing creative development and design with modern web technologies',
    url: 'https://ronny.tech',
    siteName: 'ronny.tech',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ronny.tech - Creative Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ronny.tech | Creative Developer',
    description: 'Premium portfolio showcasing creative development and design',
    images: ['/og-image.png'],
    creator: '@ronny',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        <Loading />
        <Cursor />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}

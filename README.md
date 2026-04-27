# Portfolio Website

A modern, responsive portfolio website built with Next.js and Tailwind CSS, inspired by the Amini AI design system.

## Features

- 🎨 **Modern Design**: Dark theme with yellow accent colors and dotted background pattern
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Optimized with Next.js and Tailwind CSS
- 🎯 **SEO Ready**: Proper meta tags and semantic HTML
- 🔄 **Animations**: Smooth transitions and interactive elements

## Tech Stack

- **Framework**: Next.js 16.1.6
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Images**: Next.js Image Optimization
- **Icons**: Lucide React

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Personal Information

Update the following files with your information:

1. **app/layout.tsx** - Update metadata (title, description, author)
2. **app/page.tsx** - Update content sections
3. **app/components/Navbar.tsx** - Update navigation brand name

### Colors

The color scheme is defined in `app/globals.css`:
- Primary accent: `#F5C84C` (yellow)
- Background: `#0d0d0d` (dark)
- Text: `#ffffff` (white)
- Secondary text: `#a0a0a0` (gray)

### Sections

The portfolio includes the following sections:
- **Hero**: Introduction with animated text
- **About**: Personal description and skills
- **Projects**: Featured work showcase
- **Skills**: Technical abilities
- **Contact**: Contact information and links

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Assets

All images and fonts are stored in the `public/` directory:
- `public/images/` - Portfolio images and assets
- `public/fonts/` - Custom fonts

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript

## License

This project is open source and available under the [MIT License](LICENSE).

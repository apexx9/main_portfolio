import { getProjects, getBlogPosts } from '@/lib/notion'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ronny.tech'

  try {
    // Fetch dynamic data
    const [projects, posts] = await Promise.all([
      getProjects(),
      getBlogPosts()
    ])

    const projectUrls = projects.map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const blogUrls = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      ...projectUrls,
      ...blogUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback sitemap with static pages
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]
  }
}

// lib/notion.ts — Fixed to match your database
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const PROJECTS_DATABASE_ID = process.env.NOTION_PROJECTS_DATABASE_ID || ''
export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID || ''

// ─── Types ────────────────────────────────────────────

export interface NotionProject {
  id: string
  title: string
  slug: string
  category: string
  year: string
  client: string
  role: string
  duration: string
  description: string
  overview: string
  challenge: string
  approach: string
  features: string[]
  techStack: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  color: string
  order: number
  coverImage: string | null
  createdAt: string
  updatedAt: string
}

export interface NotionBlogPost {
  id: string
  title: string
  slug: string
  description: string
  publishedDate: string
  tags: string[]
  featured: boolean
  coverImage: string | null
  content: string
  createdAt: string
  updatedAt: string
}

// ─── Helper: Parse a Notion page into a project ──────

function parseProjectPage(page: any): NotionProject {
  const properties = page.properties || {}

  // Handle Year — it's a Date type, not Select
  const yearDate = properties.Year?.date?.start || ''
  const yearFormatted = yearDate ? new Date(yearDate).getFullYear().toString() : ''

  // Handle empty title (page has no title)
  const title = properties.Title?.title?.[0]?.plain_text || 'Untitled'

  return {
    id: page.id,
    title,
    slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
    category: properties.Category?.select?.name || '',
    year: yearFormatted,
    client: properties.Client?.rich_text?.[0]?.plain_text || '',
    role: properties.Role?.rich_text?.[0]?.plain_text || '',
    duration: properties.Duration?.rich_text?.[0]?.plain_text || '',
    description: properties.Description?.rich_text?.[0]?.plain_text || '',
    overview: properties.Overview?.rich_text?.[0]?.plain_text || '',
    challenge: properties.Challenge?.rich_text?.[0]?.plain_text || '',
    approach: properties.Approach?.rich_text?.[0]?.plain_text || '',
    features: properties.Features?.multi_select?.map((f: any) => f.name) || [],
    techStack: properties['Tech Stack']?.multi_select?.map((t: any) => t.name) || [],
    liveUrl: properties['Live URL']?.url || '',
    githubUrl: properties['Github URL']?.url || '',
    featured: properties.Featured?.checkbox || false,
    color: properties.Color?.rich_text?.[0]?.plain_text || '#1a1a1a',
    order: properties.Order?.number || 0,
    coverImage: page.cover?.external?.url || page.cover?.file?.url || null,
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  }
}

// ─── Helper: Parse a Notion page into a blog post ────

function parseBlogPage(page: any): NotionBlogPost {
  const properties = page.properties || {}

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
    slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
    description: properties.Description?.rich_text?.[0]?.plain_text || '',
    publishedDate: properties.Published?.date?.start || '',
    tags: properties.Tags?.multi_select?.map((t: any) => t.name) || [],
    featured: properties.Featured?.checkbox || false,
    coverImage: page.cover?.external?.url || page.cover?.file?.url || null,
    content: '',
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  }
}

// ─── Projects API ────────────────────────────────────

export async function getProjects(): Promise<NotionProject[]> {
  if (!PROJECTS_DATABASE_ID) {
    console.error('PROJECTS_DATABASE_ID is not set')
    return []
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${PROJECTS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          sorts: [
            { property: 'Order', direction: 'ascending' },
          ],
          page_size: 10,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Notion API error:', data)
      return []
    }

    const projects = (data.results || []).map(parseProjectPage)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<NotionProject | null> {
  if (!PROJECTS_DATABASE_ID) return null

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${PROJECTS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          filter: {
            property: 'Slug',
            rich_text: { equals: slug },
          },
        }),
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    if (!data.results?.length) return null

    return parseProjectPage(data.results[0])
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// ─── Blog API ────────────────────────────────────────

export async function getBlogPosts(): Promise<NotionBlogPost[]> {
  if (!BLOG_DATABASE_ID) return []

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${BLOG_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          sorts: [{ property: 'Published', direction: 'descending' }],
          filter: {
            property: 'Published',
            date: { is_not_empty: true },
          },
        }),
      }
    )

    if (!response.ok) {
      console.error('Notion API error:', await response.json())
      return []
    }

    const data = await response.json()
    return (data.results || []).map(parseBlogPage)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<NotionBlogPost | null> {
  if (!BLOG_DATABASE_ID) return null

  try {
    const queryResponse = await fetch(
      `https://api.notion.com/v1/databases/${BLOG_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          filter: {
            property: 'Slug',
            rich_text: { equals: slug },
          },
        }),
      }
    )

    if (!queryResponse.ok) return null

    const queryData = await queryResponse.json()
    if (!queryData.results?.length) return null

    const page = queryData.results[0]

    const blocksResponse = await fetch(
      `https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    )

    let content = ''
    if (blocksResponse.ok) {
      const blocksData = await blocksResponse.json()
      content = await renderBlocksToHTML(blocksData.results || [])
    }

    const post = parseBlogPage(page)
    return { ...post, content }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// ─── Block Renderers ─────────────────────────────────

async function renderBlocksToHTML(blocks: any[]): Promise<string> {
  let html = ''

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        html += `<p>${await renderRichText(block.paragraph?.rich_text || [])}</p>`
        break
      case 'heading_1':
        html += `<h1>${await renderRichText(block.heading_1?.rich_text || [])}</h1>`
        break
      case 'heading_2':
        html += `<h2>${await renderRichText(block.heading_2?.rich_text || [])}</h2>`
        break
      case 'heading_3':
        html += `<h3>${await renderRichText(block.heading_3?.rich_text || [])}</h3>`
        break
      case 'bulleted_list_item':
        html += `<li>${await renderRichText(block.bulleted_list_item?.rich_text || [])}</li>`
        break
      case 'numbered_list_item':
        html += `<li>${await renderRichText(block.numbered_list_item?.rich_text || [])}</li>`
        break
      case 'code':
        html += `<pre><code>${await renderRichText(block.code?.rich_text || [])}</code></pre>`
        break
      case 'image': {
        const imageUrl = block.image?.external?.url || block.image?.file?.url
        if (imageUrl) html += `<img src="${imageUrl}" alt="" />`
        break
      }
      case 'divider':
        html += '<hr />'
        break
      case 'quote':
        html += `<blockquote>${await renderRichText(block.quote?.rich_text || [])}</blockquote>`
        break
      default:
        break
    }
  }

  return html
}

async function renderRichText(richTextArr: any[]): Promise<string> {
  if (!richTextArr) return ''
  return richTextArr
    .filter((t: any) => t.type === 'text')
    .map((t: any) => {
      let text = t.text?.content || ''
      if (t.annotations?.bold) text = `<strong>${text}</strong>`
      if (t.annotations?.italic) text = `<em>${text}</em>`
      if (t.annotations?.code) text = `<code>${text}</code>`
      if (t.href) text = `<a href="${t.href}">${text}</a>`
      return text
    })
    .join('')
}
// app/blog/page.tsx
import { getBlogPosts } from '@/lib/notion'
import { BlogList } from '@/components/blog-list'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogList posts={posts} />
}
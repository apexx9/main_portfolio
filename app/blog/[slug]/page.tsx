// app/blog/[slug]/page.tsx
import { getBlogPostBySlug } from '@/lib/notion'
import { notFound } from 'next/navigation'
import { BlogDetail } from '@/components/blog-detail'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params  // ← await the Promise
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | ronny.tech`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params  // ← await the Promise
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()
  return <BlogDetail post={post} />
}
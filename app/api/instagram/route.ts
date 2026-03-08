import { NextResponse } from 'next/server'

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN

const cache = {
  lastFetch: 0,
  posts: [] as any[],
}

const CACHE_DURATION = 1800000 // 30 minutes

async function fetchInstagramPosts() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.warn('INSTAGRAM_ACCESS_TOKEN is not set')
    return []
  }

  const timeSinceLastFetch = Date.now() - cache.lastFetch
  if (timeSinceLastFetch <= CACHE_DURATION && cache.posts.length > 0) {
    return cache.posts
  }

  // Fetch recent media from the Instagram Graph API
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,media_type,timestamp&limit=16&access_token=${INSTAGRAM_ACCESS_TOKEN}`

  const response = await fetch(url)

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Instagram API error:', response.status, errorBody)

    // If token is expired, return cached posts if available
    if (cache.posts.length > 0) {
      return cache.posts
    }
    return []
  }

  const data = await response.json()

  // Filter to only IMAGE and CAROUSEL_ALBUM types (skip VIDEO-only posts)
  const posts = (data.data || [])
    .filter((item: any) => item.media_type !== 'VIDEO')
    .map((item: any) => ({
      id: item.id,
      src: item.media_url,
      thumbnail: item.thumbnail_url || item.media_url,
      url: item.permalink,
      caption: item.caption || '',
      width: 1080,
      height: 1080,
    }))

  cache.lastFetch = Date.now()
  cache.posts = posts

  return posts
}

export async function GET() {
  try {
    const posts = await fetchInstagramPosts()
    return NextResponse.json(posts, { status: 200 })
  } catch (error: any) {
    console.error('Instagram fetch error:', error.message)
    // Return cached posts if available, otherwise empty array
    if (cache.posts.length > 0) {
      return NextResponse.json(cache.posts, { status: 200 })
    }
    return NextResponse.json([], { status: 200 })
  }
}

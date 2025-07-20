import { NextResponse } from 'next/server'

// * this is updated - grab from icognito network api call -
const query_hash = 'd4d88dc1500312af6f937f7b804c68c3'
const user_id = '13112419'
const num_of_posts = 16

const url = `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"id":"${user_id}","first":${num_of_posts}}`

const cache = {
  lastFetch: 0,
  posts: [] as any[],
}

// cache the ig data
async function getPosts() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  // 30 minutes
  const cacheDuration = 1800000
  if (timeSinceLastFetch <= cacheDuration) {
    return cache.posts
  }
  const data = await fetch(url).then(res => res.json())
  const posts = trimPostInformation(data)
  cache.lastFetch = Date.now()
  cache.posts = posts
  return posts
}

function trimPostInformation(response: any) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge: any) => {
    if (!edge.node.dimensions) {
      console.log('no dimensions?', edge.node)
    }
    const post = {
      src: edge.node.display_url,
      width: edge.node.dimensions.width,
      height: edge.node.dimensions.height,
      thumbnail: edge.node.thumbnail_src,
      url: `https://instagram.com/p/${edge.node.shortcode}`,
      caption: edge.node.edge_media_to_caption.edges[0].node.text,
      id: edge.node.id,
    }
    return post
  })
}

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
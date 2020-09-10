// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * Instagram Serverless Posts Fetcher
 */
const query_hash = 'bfa387b2992c3a52dcbe447467b4b771'
const user_id = '13112419'
const num_of_posts = 16

const url = `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"id":"${user_id}","first":${num_of_posts}}`

const cache = {
  lastFetch: 0,
  posts: [],
}

// todo: check nextjs cache details
async function getPosts() {
  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts
  }
  const data = await fetch(url).then(res => res.json())
  const posts = trimPostInformation(data)
  cache.lastFetch = Date.now()
  cache.posts = posts
  return posts
}

function trimPostInformation(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map(edge => ({
    src: edge.node.thumbnail_src,
    thumbnail: edge.node.thumbnail_resources[2].src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0].node.text,
    id: edge.node.id,
  }))
}

export default async (req, res) => {
  const posts = await getPosts()
  res.statusCode = 200
  res.json(posts)
}

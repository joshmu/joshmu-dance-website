const MetaTags = () => {
  return (
    <>
      {/* HTML Meta Tags */}
      <title>Josh Mu</title>
      <meta
        name='description'
        content='The official website for professional dance artist Josh Mu.'
      />

      {/* Google / Search Engine Tags */}
      <meta itemprop='name' content='Josh Mu' />
      <meta
        itemprop='description'
        content='The official website for professional dance artist Josh Mu.'
      />
      <meta itemprop='image' content='https://joshmu.com/assets/avatar.jpg' />

      {/* Facebook Meta Tags */}
      <meta property='og:url' content='https://joshmu.com' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Josh Mu' />
      <meta
        property='og:description'
        content='The official website for professional dance artist Josh Mu.'
      />
      <meta
        property='og:image'
        content='https://joshmu.com/assets/avatar.jpg'
      />

      {/* Twitter Meta Tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='Josh Mu' />
      <meta
        name='twitter:description'
        content='The official website for professional dance artist Josh Mu.'
      />
      <meta
        name='twitter:image'
        content='https://joshmu.com/assets/avatar.jpg'
      />

      {/* Meta Tags Generated via http://heymeta.com</meta> */}
    </>
  )
}

export default MetaTags

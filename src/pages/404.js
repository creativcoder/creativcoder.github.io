import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Yikes!</h1>
    <img src="https://media.giphy.com/media/3oEdvbRHem1psqd7a0/giphy.gif"></img>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Let's go <a href="/">home</a>?</p>
  </Layout>
)

export default NotFoundPage

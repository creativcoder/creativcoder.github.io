import React from 'react'
import style from '../styles/newsletter.module.css'

const Footer = ({}) => (
  <footer style={style.newsletter}>
    <div>
      <p>
        Hey, welcome! I write about Rust, Web, Backend engineering, Distributed systems and more. <br />
        Want to stay updated on my next post? Consider subscribing!</p>
      <iframe src="https://creativcoder.substack.com/embed" width="380" height="320" frameBorder="0" scrolling="no"></iframe>
    </div>
  </footer>
)

export default Footer

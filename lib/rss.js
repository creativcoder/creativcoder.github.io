

import { getAllPosts } from "./mdxator";
import { writeFileSync } from "fs";
import RSS from "rss";

const username = "creativcoder";

// adapted from: https://dev.to/j471n/how-to-add-rss-feed-in-nextjs-blog-34j1
export default async function getRSS() {
  const siteURL = "http://localhost:3000";
  const posts = getAllPosts();

  const feed = new RSS({
    title: username,
    description: "a curious tech blog",
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${username}`,
  });

  posts.map((post) => {
    feed.item({
      title: post.meta.title,
      url: `${siteURL}/blog/${post.meta.slug}`,
      date: post.meta.date,
      description: post.meta.excerpt,
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

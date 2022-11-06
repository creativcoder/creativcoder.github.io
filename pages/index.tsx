import { getAllPosts, PostMeta } from "../lib/mdxator";
import React, { useState } from "react";
import { FeaturedPosts } from "../components/Featured";
import Hero from "../components/Hero";
import getRSS from "../lib/rss";
import Subscription from "../components/Subscription";

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
      <Subscription />
    </>
  );
}

export function getStaticProps() {
  let _ = getRSS();
  const posts = getAllPosts()
    .slice(0, 9)
    .map((post) => post.meta);
  return {
    props: {
      posts,
    },
  };
}

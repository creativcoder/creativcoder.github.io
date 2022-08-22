import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "posts");

// Adapted from: https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
function readingTime(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time.toString() + "min";
}

export interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  author: string;
  readingTime: string;
}

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*mdx`);

  return paths.map((path: string) => {
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const [slug, _ext] = filename.split(".");
    return slug;
  });
};

export const getAllPostMeta = () => {
  let posts = getAllPosts();
  return posts.map((p) => p.meta);
};

export const getAllPosts = () => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (new Date(a.meta.date) > new Date(b.meta.date)) return 1;
      if (new Date(a.meta.date) < new Date(b.meta.date)) return -1;
      return 0;
    })
    .reverse();

  return posts;
};

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);

  const { content, data } = matter(source);

  return {
    content,
    meta: {
      excerpt: data.excerpt ?? "",
      slug,
      title: data.title ?? "slug",
      tags: (data.tags ?? []).sort(),
      date: data.date.toString() ?? new Date().toString(),
      author: data.author ?? "",
      readingTime: readingTime(content),
    },
  };
};

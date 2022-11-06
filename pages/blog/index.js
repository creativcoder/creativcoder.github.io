import Link from "next/link";
import { getAllPosts } from "../../lib/mdxator";
import { format } from "date-fns";

// This page lists all blog posts

export function PostCard({ post }) {
  return (
    <article className="space-y-3" key={post.slug}>
      <Link href={`blog/${post.slug}`}>
        <a className="cursor-pointer mb-4 text-3xl tracking-tight text-black md:text-3xl dark:text-white">
          {post.title}
        </a>
      </Link>

      {/* tags */}
      <div className="flex space-x-2">
        {post.tags.map((t) => (
          <Link href={`tags/${t}`} key={t}>
            <a
              href={`tags/${t}`}
              className="skew-x-30 border-black pr-2 text-[15px]"
            >
              {t}
            </a>
          </Link>
        ))}
      </div>

      {/* author,reading time etc */}
      <div className="flex justify-start space-x-2 p-2 w-full mt-2 md:flex-row md:items-center items-center flex-row">
        <div className="flex items-center">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {format(new Date(post.date), "do MMMM Y")}&nbsp;&nbsp;/
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {post.readingTime}&nbsp;
        </p>
      </div>
    </article>
  );
}

export default function Blog({ posts }) {
  return (
    <div className="flex flex-col space-y-10 md:max-w-6xl p-6">
      <p className="text-3xl font-bold">All posts</p>
      <p className="text-sm">
        I mostly write about Rust, web technologies, compilers and databases
      </p>
      <input
        aria-label="Search articles"
        type="text"
        placeholder="search integration coming soon" // TODO
        className="block
        w-full
        px-4
        py-2
        text-gray-900 
        bg-white border 
        border-gray-200 
        rounded-md 
        dark:border-gray-900 
        focus:ring-blue-500 
        focus:border-blue-500 
        dark:bg-gray-800 
        dark:text-gray-100"
      ></input>
      {posts.map((p) => (
        <PostCard post={p} key={p.slug} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  let posts = getAllPosts().map((post) => post.meta);
  return {
    props: {
      posts,
    },
  };
}

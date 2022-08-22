import Link from "next/link";
import { PostMeta } from "../lib/mdxator";
import { motion } from "framer-motion";

export const FeaturedPosts = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1.0 }}
    >
      <h1 className="ml-4 mb-6 font-bold text-2xl md:text-2xl tracking-tight text-black dark:text-white">
        Recent posts
      </h1>
      <a className="flex md:flex-row flex-col flex-1">
        {posts.slice(0, 4).map((p) => {
          return (
            <Link href={`/blog/${p.slug}`} key={p.slug}>
              <motion.div
                transition={{ delay: 0.001 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                className="p-6 md:rounded-lg md:w-1/3 space-x-1 dark:shadow-md hover:shadow-lg md:mr-2 cursor-pointer bg-[#EFF6FF] dark:bg-[#2b2e30]"
              >
                <p className="text-lg font-bold block">{p.title}</p>
                <p className="mt-3 text-md h-12 overflow-hidden text-ellipsis">
                  {p.excerpt}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </a>

      {/* Read all posts button */}
      <Link legacyBehavior href="/blog">
        <div className="ml-3 flex mt-5 text-gray-600 font-bold dark:text-gray-400 leading-7 dark:hover:text-gray-200 h-auto">
          <a className="flex cursor-pointer border-l-slate-500 hover:text-slate-800 p-2 transition-all items-center">
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              ></path>
            </svg>
          </a>
        </div>
      </Link>
    </motion.div>
  );
};

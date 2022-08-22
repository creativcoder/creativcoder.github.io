import { serialize } from "next-mdx-remote/serialize";
import { getPostFromSlug, getSlugs } from "../../lib/mdxator";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import { format } from "date-fns";
import Giscus from "@giscus/react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.css";
import {useTheme} from 'next-themes'

const Post = ({ post }) => {
  const { theme, setTheme } = useTheme();
  return (
    <article
      className="dark:text-slate-200 
      dark:prose-headings:text-slate-200 
      dark:prose-code:text-slate-200 
      dark:prose-blockquote:text-slate-200  
      dark:prose-strong:text-slate-100 
      dark:prose-pre:bg-zinc-900
      dark:prose-pre:shadow-md
      dark:prose-pre:border-gray-600
      dark:prose-pre:border-[1.4px]
      dark:prose-a:text-slate-200
      prose prose-xl 
      flex 
      flex-col 
      mx-auto 
      max-w-6xl 
      justify-center 
      pl-6 
      pr-6 
      prose-p:m-3 
      prose-headings:mb-3
    prose-headings:mt-3 
    prose-a:font-bold
    prose-img:rounded-lg 
    prose-img:m-auto 
    prose-img:w-full
    prose-img:shadow-lg
    prose-code:font-jetbrains
    prose-pre:p-0
    prose-a:no-underline
    prose-h1:text-4xl 
    prose-h1:pl-2 
    prose-h2:pl-2 
    prose-blockquote:border-slate-600 
    prose-h2:text-xl"
    >
      {/* post detail meta */}
      <div className="flex flex-col">
        <p className="text-4xl font-bold">{post.meta.title}</p>
        <div className="pt-3 flex justify-between flex-row-reverse">
          <div className="flex items-center space-x-2">
            {/* <Clock className="inline" size={15} /> */}
            <p className="text-sm">
              {format(new Date(post.meta.date), "do MMMM Y")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <PenTool className="inline" size={15} /> */}
            <p className="text-sm tracking-wide">
              {post.meta.author} / {post.meta.readingTime}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <hr className="mb-8 h-px bg-gray-400 border-0 dark:bg-gray-500 w-full"></hr>
        </div>
      </div>

      <MDXRemote {...post.source} components={{ Image }} />
      <div className="flex justify-center">
          <hr className="mb-8 h-px bg-gray-400 border-0 dark:bg-gray-500 w-full"></hr>
        </div>
      <p className="text-sm font-bold">
        Want to share feedback, or discuss further ideas? Feel free to leave a
        comment here! Please follow Rust&apos;s code of conduct. This comment
        thread directly maps to a discussion on GitHub, so you can also comment
        there if you prefer.
      </p>
      <Giscus
        id="comments"
        repo="creativcoder/creativcoder.github.io"
        repoId="MDEwOlJlcG9zaXRvcnk1MTc2NjUxNg=="
        category="Comments"
        categoryId="DIC_kwDOAxXk9M4CSOvj"
        mapping="pathname"
        strict="1"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme= {theme==="light"?"light":"dark_dimmed"}
        lang="en"
        loading="lazy"
      />
    </article>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  let { content, meta } = getPostFromSlug(slug);
  let mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });

  return {
    props: { post: { source: mdxSource, meta: meta } },
  };
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  let slugs = getSlugs();

  return {
    paths: slugs.map((s) => ({
      params: {
        slug: s,
      },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

export default Post;

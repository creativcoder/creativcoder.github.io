import { getAllPosts } from "../../lib/mdxator";
import { PostCard } from "../blog";

export default function TagPage({ slug, posts }) {
  return (
    <div className="flex flex-col space-y-10 md:max-w-6xl p-6">
      
      <p className="text-3xl">All posts tagged: <span className="bg-slate-50 rounded-full px-2">{slug}</span></p>
      
      <br />
      {posts.map((p) => (
        <PostCard post={p} key={p.slug}/>
      ))}
    </div>
  );
}

export function getStaticProps({ params }) {
  const slug = params.slug;
  const posts = getAllPosts().filter((post) => post.meta.tags.includes(slug));
  return {
    props: { slug, posts: posts.map((p) => p.meta) },
  };
}

export function getStaticPaths() {
  const posts = getAllPosts();
  const tags = new Set(posts.map((post) => post.meta.tags).flat());

  const paths = Array.from(tags).map((tag) => ({ params: { slug: tag } }));
  return {
    paths,
    fallback: false,
  };
}

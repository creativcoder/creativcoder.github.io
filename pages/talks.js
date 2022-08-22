import Link from "next/link";

export default function Talks() {
  return (
    <div className="p-4">
      <p className="text-3xl ml-2">Talks</p>
      <p className="ml-2 mb-4">This page lists all of my talks and sessions:</p>
      <div className="text-sm space-y-4 flex-col">
        <Link href="https://docs.google.com/presentation/d/1A8adP6xSxB2dmfVlPVCHvNX5W8wiKXx9h_D9La0SI3o/edit">
          <p className="cursor-pointer font-bold border-l-2 dark:border-l-slate-300 border-l-slate-400 px-4 py-6">
            Visualizing graphs in Rust using physics
          </p>
        </Link>
        <Link href="https://www.meetup.com/RustBLR/events/263246490/">
          <p className="cursor-pointer font-bold border-l-2 dark:border-l-slate-300 border-l-slate-400 px-4 py-6">
            Tale of WebAssembly and Rust (July 2019)
          </p>
        </Link>
        <Link href="https://creativcoder.github.io/post/rust_community_bangalore/">
          <p className="cursor-pointer font-bold border-l-2 dark:border-l-slate-300 border-l-slate-400 px-4 py-6">
            From Python to Rust - Rustox meetup
          </p>
        </Link>
        <Link href="http://opensource101.github.io/contributing_to_servo/#/">
          <p className="cursor-pointer font-bold border-l-2 dark:border-l-slate-300 border-l-slate-400 px-4 py-6">
            Contributing to Servo
          </p>
        </Link>
      </div>
    </div>
  );
}

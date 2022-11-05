import { useState, useEffect } from "react";
import Link from "next/link";
import { RiHomeLine, RiYoutubeLine } from "react-icons/ri";
import { BiPen } from "react-icons/bi";
import { CgDarkMode, CgProfile } from "react-icons/cg";
import { MdRssFeed } from "react-icons/md";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Book, Command, Feather, Home, User, X, Youtube } from "react-feather";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the theme UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <button
        className="border-slate-400 pl-2 mr-4 outline-none"
        onClick={() => {
          if (theme == "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        <CgDarkMode size={24} />
      </button>
    </>
  );
}

export const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  function toggleMenu() {
    setMobileMenu(!mobileMenu);
  }

  return (
    <nav className="bg-[#f6f8f9] dark:bg-[#2b2e30] dark:shadow-md m-3 rounded-lg shadow-sm backdrop-filter backdrop-blur-md bg-opacity-40 sticky top-0 mt-10">
      <div className="mx-auto p-4">
        <div className="flex justify-between">
          <Link href="/">
            <div className="cursor-pointer flex space-x-2 items-center">
              <div>
                <img
                  src="/logo_v3.svg"
                  width={26}
                  className={`pt-0.5 ${theme === "light" ? "" : "invert"}`}
                ></img>
              </div>
              <div className="text-lg dark:text-white hidden md:block">
                creativcoder
              </div>
            </div>
          </Link>
          <div className="flex items-center pr-2">
            <ul className="hidden md:flex md:space-x-4 pr-3">
              <Link href="/blog">
                <a className="hover:text-slate-500 dark:text-slate-200 text-slate-700 transition flex items-center">
                  <BiPen size={24} />
                </a>
              </Link>
              <Link href="https://youtube.com/@creativcoder">
                <a className="hover:text-slate-500 dark:text-slate-200 text-slate-700 transition flex items-center">
                  <RiYoutubeLine size={24} />
                </a>
              </Link>
              <Link href="/feed.xml">
                <a className="hover:text-slate-500 dark:text-slate-200 text-slate-700 transition flex items-center">
              <MdRssFeed size={24}/>
              </a>
              </Link>
              <Link href="/about">
                <a className="hover:text-slate-500 dark:text-slate-200 text-slate-700 transition flex items-center">
                  <CgProfile size={24} />
                </a>
              </Link>
            </ul>
            <ThemeSwitcher />
            <Command
              size={20}
              className="md:hidden block"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {mobileMenu ? (
        <motion.div
          transition={{ delay: 0.01 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 inset-x-0 p-1 transform origin-top-right sm:hidden"
        >
          <div className="rounded-xl shadow-xl pl-4 pr-4 pt-2 text-slate-200 bg-gray-800">
            <div className="flex items-center justify-center mt-1">
              <hr className="w-20" />
            </div>
            <div className="flex flex-row justify-between items-center mt-3 mb-3">
              <Command />
              <X onClick={toggleMenu} />
            </div>
            <div className="pt-6 space-y-10 pb-6">
              <Link href="/">
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <Home />
                  <p className="pt-1">Home</p>
                </div>
              </Link>

              <Link href="/blog">
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <Feather />
                  <p className="pt-1">Blog</p>
                </div>
              </Link>
              <Link href="https//youtube.com/@creativcoder">
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <Youtube />
                  <p className="pt-1">Channel</p>
                </div>
              </Link>
              <Link href="/talks">
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <Book />
                  <p className="pt-1">Talks</p>
                </div>
              </Link>
              <Link href="mailto:creativcoders@gmail.com">
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <User />
                  <p className="pt-1">Say hi</p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </nav>
  );
};

import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      initial={{
        opacity: 0.5,
        backgroundColor: theme === "light" ? "#242729" : "#E2E8F0",
      }}
      animate={{
        opacity: 1.0,
        backgroundColor: theme === "light" ? "#E2E8F0" : "#242729",
      }}
      className="flex min-h-screen w-screen overflow-hidden flex-col items-center dark:bg-[#242729] bg-slate-200 backdrop"
    >
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-12 w-screen sticky">
        <Nav />
        <div>{children}</div>
        <Footer />
      </div>
    </motion.div>
  );
}

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsHandIndex } from "react-icons/bs";

function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen ">
        <p className="text-slate-700 dark:text-slate-300 text-center">
          Oops! this page doesn&apos;t exist
        </p>
        <motion.div
          transition={{ delay: 0.1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer"
        >
          <Link href="/">
            <Image src="/crab-icon-2.png" alt="me" width={300} height={200} />
          </Link>
        </motion.div>
        <p className="text-slate-700 dark:text-slate-300 text-center">Click ferris to go home</p>
      </div>
    </>
  );
}

export default NotFound;

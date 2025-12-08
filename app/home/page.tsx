"use client";
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import Navbar from "../NavBar";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cool-story");
  };

  return (
    <>
      <Navbar />
      <main className="w-screen h-screen relative ">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/Background-home.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <motion.section
          className="absolute m-5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center select-none cursor-pointer z-10"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onClick={handleClick}
        >
          <motion.h3
            className="text-left text-purple-600 dark:text-purple-400"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            want to be part of a
          </motion.h3>
          <h1 className="text-left text-purple-700 dark:text-purple-500 hover:text-purple-800 dark:hover:text-purple-400 transition-colors">
            COOL <br /> STORY?
          </h1>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}

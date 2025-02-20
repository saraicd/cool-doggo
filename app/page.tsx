"use client";
import Footer from "./Footer";
import Lamp from "./Lamp";
import CoolDoggo from "./../public/cool-doggo_square-full.svg";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [shrink, setShrink] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShrink(true);
    setTimeout(() => {
      router.push("/menu");
    }, 800);
  };

  return (<>
      <Lamp/>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative inline-block group">
          <motion.div
            className="image w-[150px] cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={shrink ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={handleClick}
          >
            <CoolDoggo  />
          </motion.div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-white text-sm bg-black rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Click me for a nugget of wisdom
          </span>
        </main>
        <Footer/>
      </div>
    </>);
}

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
      router.push("/home");
    }, 800);
  };

  return (<>
    <motion.div
      initial={{ y: "-100vh", opacity: 0 }} 
      animate={shrink ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}  
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Lamp />
    </motion.div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative inline-block group">
        <motion.svg
          className="image w-[150px] cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={shrink ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2 }} 
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleClick}
        >
          <CoolDoggo  />
        </motion.svg>
      </main>
      <Footer/>
    </div>
  </>);
}

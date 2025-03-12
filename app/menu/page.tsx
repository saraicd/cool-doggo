"use client";
import { Suspense, useState } from "react";
import Footer from "../Footer";
import Lamp from "../Lamp";
import {Balloons} from "./Balloons";
import Navbar from "../NavBar";
import { motion } from "framer-motion";

export default function Menu(){
  const [freeBalloons, setFreeBalloons] = useState(false);

  
  return (<>
    <Lamp />
    <Navbar/>
    <main className="w-screen h-screen relative z-[1]" >
      <Suspense fallback={<></>}>
        <motion.div
          className="w-full h-full absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 1}}
        >
          <Balloons freeBalloons={freeBalloons}/>
        </motion.div>
      </Suspense>
      <motion.section
        className="absolute m-5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center cursor-pointer"
        initial={{ opacity: 0, x: "100%" }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1.5, ease: "easeOut" }} 
        whileHover={ !freeBalloons ? { scale: 1.1, transition: { duration: 0.2 } } : {}}
      >
        <h1 className="text-left text-purple-700" onClick={()=> setFreeBalloons(true)}>COOL <br /> STORY</h1>
      </motion.section>
      <motion.section
        className="absolute m-5 pr-10 top-1/3 left-2/1 text-4xl font-bold text-center z-[-5]"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut", delay: 3 } }
      >
        <h1 className="text-left text-black-700" >COMING <br /> SOON.</h1>
      </motion.section>
    </main>
    <Footer/>
  </>);
};
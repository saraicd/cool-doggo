"use client";
import { Suspense } from "react";
import Footer from "../Footer";
import Lamp from "../Lamp";
import {ThreeD} from "./ThreeD";
import Navbar from "../NavBar";
import { motion } from "framer-motion";

export default function Menu(){

  return (<>
    <Lamp/>
    <Navbar/>
    <main className="w-screen h-screen relative" >
      <Suspense fallback={<></>}>
        <motion.div
          className="w-full h-full absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 1}}
        >
          <ThreeD />
        </motion.div>
      </Suspense>
      <motion.section
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center"
        initial={{ opacity: 0, x: "100%" }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1.5, ease: "easeOut" }} 
      >
        <h1 className="text-left text-purple-700">COMING <br /> SOON.</h1>
      </motion.section>
    </main>
    <Footer/>
  </>);
};
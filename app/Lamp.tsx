"use client";
import { useTheme } from "./ThemeProvider";
import LampIcon from "./../public/cool-doggo_lamp-1.svg";
import { motion } from "framer-motion";


export default function Lamp(){

  const { toggleTheme } = useTheme();

  return (
    <motion.div
      drag
      className=" fixed-image image"
      onClick={ () => {
        toggleTheme();
      }}
      >
        <LampIcon  />
    </motion.div>
  )
};
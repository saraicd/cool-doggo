"use client";
import { useTheme } from "./ThemeProvider";
import LampIcon from "./../public/cool-doggo_lamp-1.svg";


export default function Lamp(){

  const { toggleTheme } = useTheme();

  return (
    <div
      className=" fixed-image image"
      onClick={ () => {
        toggleTheme();
      }}
      >
        <LampIcon  />
  </div>
  )
}
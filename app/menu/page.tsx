"use client";
import Footer from "../Footer";
import Lamp from "../Lamp";
import Quote from "./quote";
import ThreeD from "./ThreeD";

export default function Menu(){

  return (<>
    <Lamp/>
    <div className="relative min-h-screen flex flex-col items-center justify-between p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-0 left-0 w-full h-[80%] -z-10">
        <ThreeD/>
      </div>
      <Footer/>
    </div>
  </>);
};
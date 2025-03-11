"use client";
import { motion } from 'framer-motion';
import CoolDoggoHome from "./../public/cool-doggo_HOME.svg";
import CoolDoggoText from "./../public/cool-doggo_TEXT.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full flex justify-end  px-6 py-4  z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <motion.svg
            className="image cursor-pointer  h-7 justify-end"
            whileHover={{ scale: 1.1 }} 
            onClick={handleClick}
        >
            <CoolDoggoText  />
        </motion.svg>
        {/* <motion.svg
            className="image cursor-pointer w-10 h-7 "
            whileHover={{ scale: 1.1 }} 
            onClick={handleClick}
        >
            <CoolDoggoHome  />
        </motion.svg> */}
    </motion.nav>
  );
};

export default Navbar;


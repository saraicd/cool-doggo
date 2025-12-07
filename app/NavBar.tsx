"use client";
import { motion } from "framer-motion";
import CoolDoggoLogo from "./../public/cool-doggo_SIMPLE.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full flex justify-end items-start px-6 py-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <motion.svg
        className="image cursor-pointer w-12 h-12"
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
      >
        <CoolDoggoLogo />
      </motion.svg>
    </motion.nav>
  );
};

export default Navbar;

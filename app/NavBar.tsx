"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import CoolDoggoLogo from "./../public/cool-doggo_SIMPLE.svg";
import BehanceIcon from "./../public/behance.svg";
import LinkedinIcon from "./../public/linkedin.svg";
import GitHubIcon from "./../public/gitHub.svg";
import Footer from "./Footer";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigationItems = [
    { name: "Home", path: "/home" },
    { name: "Cool Story", path: "/cool-story" },
    { name: "About", path: "/cool-story/about" },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ width: 80 }}
        animate={{ width: isExpanded ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full  border-r z-50 flex flex-col overflow-hidden transition-colors ${
          isExpanded
            ? "backdrop-blur-md bg-white/20  dark:bg-black/50 border-purple-300 dark:border-purple-700"
            : "bg-transparent border-transparent"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center justify-center h-20  flex-shrink-0 transition-colors`}
        >
          <motion.svg
            className={`cursor-pointer w-12 h-12  image`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <CoolDoggoLogo />
          </motion.svg>
        </div>

        {/* Navigation Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 py-6 overflow-hidden"
            >
              <ul className="space-y-2 px-3">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <motion.button
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full flex items-center justify-center px-4 py-3 transition-all  ${
                          isActive ? " text-white" : " dark:text-purple-300  "
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-semibold text-sm whitespace-nowrap">
                          {item.name}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Theme Toggle Footer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3"
            >
              <motion.button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-purple-100/50 dark:bg-purple-900/30 hover:bg-purple-200/70 dark:hover:bg-purple-800/50 transition-colors mb-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold text-sm text-purple-700 dark:text-purple-300 whitespace-nowrap">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </motion.button>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spacer to prevent content from going under sidebar */}
      <div className="w-20" />
    </>
  );
};

export default Navbar;

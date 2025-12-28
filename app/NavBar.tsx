"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import CoolDoggoLogo from "./../public/cool-doggo_SIMPLE.svg";
import BehanceIcon from "./../public/behance.svg";
import LinkedinIcon from "./../public/linkedin.svg";
import GitHubIcon from "./../public/gitHub.svg";
import Footer from "./Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useLanguage } from "./lib/LanguageContext";
import { t } from "./lib/i18n";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();

  const navigationItems = [
    { name: t("home", language), path: "/home" },
    { name: t("coolStory", language), path: "/cool-story" },
    { name: t("store", language), path: "/store" },
    { name: t("about", language), path: "/cool-story/about" },
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
            ? "backdrop-blur-md bg-white/20  dark:bg-black/50 border-purple-700"
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
              className="flex-1 py-6 overflow-hidden flex flex-col"
            >
              <ul className="space-y-2 px-3 flex-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <motion.button
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full flex items-center justify-center px-4 py-3 transition-all relative ${
                          isActive
                            ? "text-purple-700"
                            : " text-black dark:text-white"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className=" text-sm whitespace-nowrap">
                          {item.name}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>

              {/* Language Switcher */}
              <div className="pb-4">
                <LanguageSwitcher />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Footer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3"
            >
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

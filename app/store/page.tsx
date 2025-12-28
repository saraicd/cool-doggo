"use client";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import { useLanguage } from "../lib/LanguageContext";
import { t } from "../lib/i18n";

export default function StorePage() {
  const { language } = useLanguage();
  return (
    <PageLayout>
      <div className="relative min-h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          <source src="/videos/background.webm" type="video/webm" />
        </video>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className=" text-right md:text-6xl  text-purple-700 dark:text-purple-400 mb-4">
                {t("storeTitle", language)}
              </h2>
              <p className="text-xl text-right text-gray-600 dark:text-gray-300">
                {t("merchandiseComingSoon", language)}
              </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-700 shadow-lg"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  {t("storeNotAvailableYet", language)}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {t("workingOnMerchandise", language)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("stayTuned", language)}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

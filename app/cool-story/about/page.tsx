"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/navigation";
import { useTheme } from "../../ThemeProvider";
import Button from "../../components/Button";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

export default function AboutPage() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <PageLayout>
      <div className="relative min-h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/background-about.mp4" type="video/mp4" />
          <source src="/videos/background-about.webm" type="video/webm" />
        </video>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className=" text-right mt-5 md:text-6xl text-purple-700 dark:text-purple-400 mb-4">
                {t("aboutPageTitle", language)}
              </h2>
              <p className="text-xl text-right text-gray-600 dark:text-gray-300">
                {t("aboutPageSubtitle", language)}
              </p>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8 mb-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  {t("howCoolStoryWorks", language)}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      1
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step1", language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      2
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step2", language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      3
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step3", language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      4
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step4", language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      5
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step5", language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      6
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("step6", language)}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Rules Section */}
              <motion.div
                variants={fadeInUp}
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  {t("theRules", language)}
                </h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule1", language)}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule2", language)}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule3", language)}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule4", language)}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule5", language)}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      {t("rule6", language)}
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Why Section */}
              <motion.div
                variants={fadeInUp}
                className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  {t("whyCoolStory", language)}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("whyCoolStoryText1", language)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("whyCoolStoryText2", language)}
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp} className="text-center pt-8">
                <Button
                  onClick={() => router.push("/cool-story")}
                  variant="primary"
                  size="md"
                >
                  {t("startContributing", language)}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

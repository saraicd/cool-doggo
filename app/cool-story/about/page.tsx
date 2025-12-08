"use client";
import { motion } from "framer-motion";
import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/navigation";
import { useTheme } from "../../ThemeProvider";
import Button from "../../components/Button";

export default function AboutPage() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

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
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
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
                About the Project
              </h2>
              <p className="text-xl text-right text-gray-600 dark:text-gray-300">
                Collaborative storytelling, one contribution at a time
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
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-300 dark:border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  How Cool Story Works
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      1
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Find a story on the main page
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      2
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Enter the access code to join
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      3
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Read what others have written
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      4
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Add your part (10-500 characters)
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      5
                    </div>
                    <div className="flex-shrink-0 text-purple-400">→</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Watch the story grow!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Rules Section */}
              <motion.div
                variants={fadeInUp}
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-300 dark:border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  The Rules
                </h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      Each contribution must be between 10-500 characters
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      You can contribute once every 15 minutes to give others a
                      chance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      Previous entries are blurred to keep the story fresh and
                      exciting
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      Stories have a maximum number of entries before completion
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      ✓
                    </span>
                    <span>
                      Be creative, respectful, and build on others'
                      contributions
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Why Section */}
              <motion.div
                variants={fadeInUp}
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-300 dark:border-purple-700 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                  Why Cool Story?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Cool Story is all about collective creativity. By limiting
                  what you can see and when you can contribute, we create an
                  environment where every voice matters and stories can take
                  unexpected, delightful turns.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  You'll receive the completed story via email once it reaches
                  its maximum entries. It's like a creative time capsule that
                  you helped build!
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp} className="text-center pt-8">
                <Button
                  onClick={() => router.push("/cool-story")}
                  variant="primary"
                  size="lg"
                >
                  Start Contributing →
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

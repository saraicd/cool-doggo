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
              <h2 className="text-5xl mt-5 md:text-6xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                About Cool Story
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
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
                  How It Works
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Find a Story
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Browse active stories on the main page. Each story has a
                        unique theme and access code.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Enter the Code
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get the access code from a friend or community. Click on
                        a story and enter the code to join.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Read the Story
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Read what others have written. Only the latest entry is
                        fully visible to keep things exciting!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Add Your Part
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Write 10-500 characters to continue the story. Be
                        creative and build on what came before!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Wait for the Next Part
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        After contributing, you can contribute again after 15
                        minutes. Watch the story grow!
                      </p>
                    </div>
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

"use client";
import { motion } from "framer-motion";
import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/navigation";
import { useTheme } from "../../ThemeProvider";

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
              <div className="flex justify-between items-start mb-6">
                <button
                  onClick={() => router.push("/cool-story")}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-2"
                >
                  ← Back to Stories
                </button>

                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                About Cool Story
              </h1>
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
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-lg"
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
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-lg"
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
                className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-lg"
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
                <button
                  onClick={() => router.push("/cool-story")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
                >
                  Start Contributing →
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

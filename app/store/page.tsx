"use client";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

export default function StorePage() {
  return (
    <PageLayout>
      <div className="relative min-h-screen">
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
                Store
              </h2>
              <p className="text-xl text-right text-gray-600 dark:text-gray-300">
                Cool Doggo merchandise coming soon
              </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-300 dark:border-purple-700 shadow-lg"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  Store Not Available Yet
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  We're working hard to bring you awesome Cool Doggo
                  merchandise! Check back soon for updates.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay tuned for exclusive items, limited editions, and more
                  surprises.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Story } from "../lib/types";

interface StoryCardProps {
  story: Story;
  index: number;
}

export default function StoryCard({ story, index }: StoryCardProps) {
  const router = useRouter();
  const isActive = story.status === "active";
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const handleCardClick = () => {
    if (!isActive) return;
    setShowCodeInput(true);
    setError("");
    setInputCode("");
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toLowerCase() === story.accessCode.toLowerCase()) {
      router.push(`/cool-story/${story.accessCode}`);
    } else {
      setError("Incorrect access code. Please try again.");
      setInputCode("");
    }
  };

  const handleClose = () => {
    setShowCodeInput(false);
    setError("");
    setInputCode("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: isActive ? 1.02 : 1 }}
      >
        <div
          className={`block p-6 rounded-2xl border-2 transition-all ${
            isActive
              ? "border-purple-500 hover:border-purple-600 hover:shadow-lg cursor-pointer bg-purple-50 dark:bg-purple-900/20"
              : "border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
          }`}
          onClick={handleCardClick}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {story.title}
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${
                isActive
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : story.status === "completed"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {story.status}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {story.description}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Access code required</span>
            {story.maxEntries && (
              <span>Max: {story.maxEntries} entries</span>
            )}
          </div>

          {isActive && (
            <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold text-sm">
              Click to contribute →
            </div>
          )}
        </div>
      </motion.div>

      {/* Code Input Modal */}
      <AnimatePresence>
        {showCodeInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                {story.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enter the access code to contribute to this story
              </p>

              <form onSubmit={handleSubmitCode}>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-white dark:bg-purple-900/30 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none mb-4"
                  autoFocus
                />

                {error && (
                  <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

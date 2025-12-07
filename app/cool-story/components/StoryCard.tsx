"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Story } from "../lib/types";

interface StoryCardProps {
  story: Story;
  index: number;
}

export default function StoryCard({ story, index }: StoryCardProps) {
  const isActive = story.status === "active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: isActive ? 1.02 : 1 }}
    >
      <Link
        href={`/cool-story/${story.accessCode}`}
        className={`block p-6 rounded-lg border-2 transition-all ${
          isActive
            ? "border-purple-500 hover:border-purple-600 hover:shadow-lg cursor-pointer bg-white dark:bg-gray-800"
            : "border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
        }`}
        onClick={(e) => {
          if (!isActive) e.preventDefault();
        }}
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
          <span>Code: {story.accessCode}</span>
          {story.maxEntries && (
            <span>Max: {story.maxEntries} entries</span>
          )}
        </div>

        {isActive && (
          <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold text-sm">
            Click to contribute →
          </div>
        )}
      </Link>
    </motion.div>
  );
}

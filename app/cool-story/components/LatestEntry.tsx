"use client";
import { motion } from "framer-motion";
import type { StoryEntry } from "../lib/types";

interface LatestEntryProps {
  entry: StoryEntry;
}

export default function LatestEntry({ entry }: LatestEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-purple-700 dark:text-purple-300">
            {entry.username}
          </span>
          <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
            Latest Entry
          </span>
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {new Date(entry.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p className="text-gray-900 dark:text-gray-100 leading-relaxed text-lg">
        {entry.text}
      </p>
    </motion.div>
  );
}

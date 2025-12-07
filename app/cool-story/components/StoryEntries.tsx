"use client";
import { motion } from "framer-motion";
import type { StoryEntry } from "../lib/types";

interface StoryEntriesProps {
  entries: StoryEntry[];
}

export default function StoryEntries({ entries }: StoryEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No entries yet. Be the first to start the story!</p>
      </div>
    );
  }

  // Separate previous entries from the latest one
  const previousEntries = entries.slice(0, -1);
  const latestEntry = entries[entries.length - 1];

  return (
    <div className="space-y-6">
      {/* Previous entries combined in a blurred story page */}
      {previousEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg z-10 pointer-events-none" />

          {/* Previous story content */}
          <div className="relative space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
              Previous Story ({previousEntries.length} {previousEntries.length === 1 ? 'entry' : 'entries'})
            </h3>
            {previousEntries.map((entry, index) => (
              <div key={entry._id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {entry.username}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm">{entry.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Latest entry - clear and prominent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 shadow-lg"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-purple-700 dark:text-purple-300">
              {latestEntry.username}
            </span>
            <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
              Latest Entry
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {new Date(latestEntry.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-gray-900 dark:text-gray-100 leading-relaxed text-lg">
          {latestEntry.text}
        </p>
      </motion.div>
    </div>
  );
}

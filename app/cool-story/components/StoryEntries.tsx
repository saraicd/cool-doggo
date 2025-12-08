"use client";
import { motion } from "framer-motion";
import type { StoryEntry } from "../lib/types";
import LatestEntry from "./LatestEntry";

interface StoryEntriesProps {
  entries: StoryEntry[];
}

export default function StoryEntries({ entries }: StoryEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p className="text-lg">
          No entries yet. Be the first to start the story!
        </p>
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
          className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700"
        >
          {/* Previous story content */}
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
              Previous Story ({previousEntries.length}{" "}
              {previousEntries.length === 1 ? "entry" : "entries"})
            </h3>
            <div className="relative">
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-sm z-10 pointer-events-none" />

              {/* Entries content */}
              <div className="relative p-2">
                {previousEntries.map((entry, index) => (
                  <div key={entry._id} className="mb-4">
                    <p className="text-sm">{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <LatestEntry entry={latestEntry} />
    </div>
  );
}

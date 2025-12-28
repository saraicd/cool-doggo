"use client";
import { motion } from "framer-motion";
import type { StoryEntry, StoryStatus } from "../lib/types";
import LatestEntry from "./LatestEntry";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

interface StoryEntriesProps {
  entries: StoryEntry[];
  status?: StoryStatus;
}

export default function StoryEntries({ entries, status = "active" }: StoryEntriesProps) {
  const { language } = useLanguage();
  const isCompleted = status === "completed";

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p className="text-lg">
          {t('noEntriesYet', language)}
        </p>
      </div>
    );
  }

  // If story is completed, show all entries without blur
  if (isCompleted) {
    return (
      <div className="space-y-6">
        {/* Completed story banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-700 text-center"
        >
          <p className="text-green-800 dark:text-green-300 font-semibold">
            ✓ {t('storyCompleted', language)}
          </p>
        </motion.div>

        {/* All entries visible without blur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg space-y-6"
        >
          {entries.map((entry, index) => (
            <div key={entry._id} className="pb-4 border-b border-purple-300 dark:border-purple-700 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <span className="text-base font-bold text-purple-700 dark:text-purple-300">
                  {entry.username}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                {entry.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Active story - show previous entries blurred and latest entry visible
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
              {t('previousEntries', language)} ({previousEntries.length}{" "}
              {previousEntries.length === 1 ? t('entries', language).slice(0, -1) : t('entries', language)})
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

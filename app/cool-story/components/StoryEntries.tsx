"use client";
import { Fragment } from "react";
import { motion } from "framer-motion";
import type { StoryEntry, StoryStatus } from "../lib/types";
import LatestEntry from "./LatestEntry";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

interface StoryEntriesProps {
  entries: StoryEntry[];
  status?: StoryStatus;
}

export default function StoryEntries({
  entries,
  status = "active",
}: StoryEntriesProps) {
  const { language } = useLanguage();
  const isCompleted = status === "completed";

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p className="text-lg">{t("noEntriesYet", language)}</p>
      </div>
    );
  }

  // If story is completed, show all entries without blur
  if (isCompleted) {
    return (
      <div className="space-y-6">
        {/* All entries visible without blur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg"
        >
          <div className="flex justify-end mb-4">
            <StatusBadge status={status} />
          </div>
          <div className="text-gray-900 dark:text-gray-100 leading-relaxed text-lg">
            {entries.map((entry, index) => (
              <Fragment key={entry._id}>
                {/* Add indentation at the start of each paragraph (index 0, 5, 10, etc.) */}
                {index % 5 === 0 && (
                  <span className="inline-block w-8"></span>
                )}
                <span
                  className="relative group/entry inline cursor-help touch-manipulation transition-all duration-200 hover:text-purple-700 dark:hover:text-purple-400 hover:scale-105"
                  onClick={(e) => {
                    // Toggle tooltip on mobile tap
                    const tooltip = e.currentTarget.querySelector('.tooltip');
                    if (tooltip) {
                      tooltip.classList.toggle('opacity-0');
                      tooltip.classList.toggle('invisible');
                      tooltip.classList.toggle('opacity-100');
                      tooltip.classList.toggle('visible');
                    }
                  }}
                >
                  {entry.text}
                  {index < entries.length - 1 && " "}
                  {/* Tooltip */}
                  <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-purple-900 dark:bg-purple-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/entry:opacity-100 group-hover/entry:visible transition-all duration-200 whitespace-nowrap z-10 shadow-lg pointer-events-none">
                    <span className="font-semibold">{entry.username}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {/* Arrow pointing down */}
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-purple-900 dark:bg-purple-800 rotate-45"></span>
                  </span>
                </span>
                {/* Add paragraph break every 5 entries */}
                {(index + 1) % 5 === 0 && index < entries.length - 1 && (
                  <>
                    <br className="block" />
                    <br className="block" />
                  </>
                )}
              </Fragment>
            ))}
          </div>
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
              {t("previousEntries", language)} ({previousEntries.length}{" "}
              {previousEntries.length === 1
                ? t("entries", language).slice(0, -1)
                : t("entries", language)}
              )
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

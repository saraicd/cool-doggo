"use client";
import type { StoryStatus } from "../lib/types";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

interface StatusBadgeProps {
  status: StoryStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { language } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case "completed":
        return {
          label: t("statusCompleted", language),
          className: "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-700 text-green-800 dark:text-green-300",
          icon: "✓"
        };
      case "archived":
        return {
          label: t("statusArchived", language),
          className: "bg-gray-100 dark:bg-gray-900/30 border-gray-500 dark:border-gray-700 text-gray-800 dark:text-gray-300",
          icon: "📦"
        };
      case "active":
      default:
        return {
          label: t("statusActive", language),
          className: "bg-purple-100 dark:bg-purple-900/30 border-purple-500 dark:border-purple-700 text-purple-800 dark:text-purple-300",
          icon: "✨"
        };
    }
  };

  const { label, className, icon } = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-semibold text-sm ${className}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}

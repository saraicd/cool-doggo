"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Story } from "../lib/types";
import Button from "../../components/Button";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

interface StoryCardProps {
  story: Story;
  index: number;
}

export default function StoryCard({ story, index }: StoryCardProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const isActive = story.status === "active";
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const handleCardClick = () => {
    if (!isActive) return;

    // Check if access code is already stored in localStorage
    const storageKey = `accessCode_${story.accessCode}`;
    const storedCode = localStorage.getItem(storageKey);

    if (storedCode && storedCode.toLowerCase() === story.accessCode.toLowerCase()) {
      // Auto-navigate if code is already stored
      router.push(`/cool-story/${story.accessCode}`);
    } else {
      // Show modal to enter code
      setShowCodeInput(true);
      setError("");
      // Load stored code if available to pre-fill
      setInputCode(storedCode || "");
    }
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toLowerCase() === story.accessCode.toLowerCase()) {
      // Save to localStorage for future access
      const storageKey = `accessCode_${story.accessCode}`;
      localStorage.setItem(storageKey, inputCode.trim());
      router.push(`/cool-story/${story.accessCode}`);
    } else {
      setError(t('incorrectAccessCode', language));
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
          className={`p-6 rounded-2xl border transition-all h-64 flex flex-col ${
            isActive
              ? "border-purple-500 hover:border-purple-600 hover:shadow-lg cursor-pointer backdrop-blur-md bg-purple-900/20 dark:bg-purple-900/20"
              : "border-purple-500 dark:border-gray-600 opacity-60 cursor-not-allowed backdrop-blur-md bg-purple-50/50 dark:bg-gray-900"
          }`}
          onClick={handleCardClick}
        >
          <div className="flex items-start mb-3">
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {story.title}
            </h3>
          </div>

          <p className="text-gray-500 text-md mb-4">{story.description}</p>

          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            {story.maxEntries && <span>{t('maxEntries', language)}: {story.maxEntries} {t('entries', language)}</span>}
          </div>

          {isActive && (
            <div className="mt-auto">
              <Button
                variant="ghost"
                size="sm"
                className="w-full pointer-events-none"
              >
                {t('clickToContribute', language)}
              </Button>
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
                {t('enterAccessCode', language)}
              </p>

              <form onSubmit={handleSubmitCode}>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setError("");
                  }}
                  placeholder={t('accessCodePlaceholder', language)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-purple-900/30 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none mb-4"
                  autoFocus
                />

                {error && (
                  <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                  >
                    {t('submit', language)}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleClose}
                    variant="secondary"
                    size="md"
                    className="flex-1"
                  >
                    {t('cancel', language)}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { editStoryWithEditCode, APIError } from "../lib/api";
import type { StoryStatus, EditLimitedData } from "../lib/types";
import Button from "../../components/Button";
import { useLanguage } from "../../lib/LanguageContext";
import { t } from "../../lib/i18n";

interface EditStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessCode: string;
  currentDescription: string;
  currentStatus: StoryStatus;
  onSuccess: () => void;
}

export default function EditStoryModal({
  isOpen,
  onClose,
  accessCode,
  currentDescription,
  currentStatus,
  onSuccess,
}: EditStoryModalProps) {
  const { language } = useLanguage();
  const [stage, setStage] = useState<"auth" | "edit">("auth");
  const [editCode, setEditCode] = useState("");
  const [description, setDescription] = useState(currentDescription);
  const [status, setStatus] = useState<StoryStatus>(currentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ description?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStage("auth");
      // Load edit code from localStorage if available
      const storageKey = `editCode_${accessCode}`;
      const storedCode = localStorage.getItem(storageKey);
      console.log(
        "Loading edit code from localStorage:",
        storageKey,
        storedCode
      );
      setEditCode(storedCode || "");
      setDescription(currentDescription);
      setStatus(currentStatus);
      setError(null);
      setFieldErrors({});
      setSuccessMessage(null);
      setIsSubmitting(false);
    }
  }, [isOpen, currentDescription, currentStatus, accessCode]);

  const handleClose = () => {
    onClose();
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCode.trim()) {
      setError("Please enter an edit code");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Validate edit code by making a minimal API call
      console.log("HERE");
      // We'll send empty data to just test authentication
      await editStoryWithEditCode(accessCode, {}, editCode.trim());
      // If successful, save to localStorage and move to edit stage
      const storageKey = `editCode_${accessCode}`;
      const codeToSave = editCode.trim();
      console.log("Saving edit code to localStorage:", storageKey, codeToSave);
      localStorage.setItem(storageKey, codeToSave);
      console.log("Saved! Verifying:", localStorage.getItem(storageKey));
      setStage("edit");
      setError(null);
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 401) {
          setError("Edit code is required");
        } else if (err.status === 403) {
          setError(
            "Invalid edit code or this story does not allow edit code access"
          );
        } else if (err.status === 404) {
          setError("Story not found");
        } else if (err.status === 400) {
          // 400 might mean validation error, but we sent empty data
          // So if we get here, the edit code was validated
          // Save to localStorage and move to edit stage
          localStorage.setItem(`editCode_${accessCode}`, editCode.trim());
          setStage("edit");
          setError(null);
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);
    setIsSubmitting(true);

    const data: EditLimitedData = {
      description: description.trim(),
      status,
    };

    try {
      const response = await editStoryWithEditCode(accessCode, data, editCode);
      setSuccessMessage(response.message);

      // Wait 1.5 seconds, then close and reload
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
    } catch (err) {
      if (err instanceof APIError) {
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes("description")) {
          setFieldErrors({ description: err.message });
        } else if (err.status === 401 || err.status === 403) {
          setError(
            "Authentication failed. Please try again with a valid edit code."
          );
          // Return to auth stage
          setTimeout(() => {
            setStage("auth");
            setEditCode("");
          }, 2000);
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const descCharCount = description.length;
  const isDescValid = descCharCount <= 500;

  return (
    <AnimatePresence>
      {isOpen && (
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
            transition={{ duration: 0.3 }}
            className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {stage === "auth" ? (
              // Stage 1: Edit Code Authentication
              <>
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                  {t('editStoryTitle', language)}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('enterEditCode', language)}
                </p>

                <form onSubmit={handleAuthSubmit}>
                  <input
                    type="text"
                    value={editCode}
                    onChange={(e) => {
                      setEditCode(e.target.value);
                      setError(null);
                    }}
                    placeholder={t('editCodePlaceholder', language)}
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('verifying', language) : t('continue', language)}
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
              </>
            ) : (
              // Stage 2: Edit Form
              <>
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                  {t('editStoryTitle', language)}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('updateStoryDescription', language)}
                </p>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-xl mb-4">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 p-3 rounded-xl mb-4">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('description', language)}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setFieldErrors((prev) => ({
                          ...prev,
                          description: undefined,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      maxLength={500}
                      rows={3}
                      className="w-full px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white resize-none overflow-hidden"
                    />
                    {fieldErrors.description && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                        {fieldErrors.description}
                      </p>
                    )}
                    <p
                      className={`text-xs mt-1 ${
                        isDescValid
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {descCharCount}/500 {t('characters', language)}
                    </p>
                  </div>

                  {/* Status Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('status', language)}
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as StoryStatus)}
                      className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                    >
                      <option value="active">{t('statusActive', language)}</option>
                      <option value="completed">{t('statusCompleted', language)}</option>
                      <option value="archived">{t('statusArchived', language)}</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      variant="white"
                      size="md"
                      className="flex-1 font-bold"
                      disabled={isSubmitting || !isDescValid}
                    >
                      {isSubmitting ? t('saving', language) : t('saveChanges', language)}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleClose}
                      variant="ghost"
                      size="md"
                      className="flex-1"
                    >
                      {t('cancel', language)}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

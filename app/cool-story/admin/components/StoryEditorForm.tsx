"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { editStory, APIError } from '../../lib/api';
import type { Story, StoryStatus, EditStoryData } from '../../lib/types';
import Button from '../../../components/Button';
import { useLanguage } from '../../../lib/LanguageContext';
import { t } from '../../../lib/i18n';

interface StoryEditorFormProps {
  story: Story;
  adminKey: string;
  onSuccess: () => void;
  onLogout: () => void;
}

export default function StoryEditorForm({
  story,
  adminKey,
  onSuccess,
  onLogout,
}: StoryEditorFormProps) {
  const { language } = useLanguage();
  const [title, setTitle] = useState(story.title);
  const [description, setDescription] = useState(story.description);
  const [status, setStatus] = useState<StoryStatus>(story.status);
  const [maxEntries, setMaxEntries] = useState<string>(
    story.maxEntries?.toString() || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    description?: string;
    maxEntries?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const data: EditStoryData = {
      title: title.trim(),
      description: description.trim(),
      status,
      maxEntries: maxEntries ? parseInt(maxEntries) : null,
    };

    try {
      const response = await editStory(story.accessCode, data, adminKey);
      setSuccessMessage(response.message);

      // Reload after 1.5 seconds to show updated data
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      if (err instanceof APIError) {
        // Handle field-specific errors
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes('title')) {
          setFieldErrors({ title: err.message });
        } else if (errorMsg.includes('description')) {
          setFieldErrors({ description: err.message });
        } else if (errorMsg.includes('entries')) {
          setFieldErrors({ maxEntries: err.message });
        } else if (err.status === 401 || err.status === 403) {
          setError('Authentication failed. Please login again.');
          setTimeout(onLogout, 2000);
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleCharCount = title.length;
  const descCharCount = description.length;
  const isTitleValid = titleCharCount > 0 && titleCharCount <= 100;
  const isDescValid = descCharCount <= 500;

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg space-y-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
          {t('storyEditor', language)}
        </h3>
        <Button type="button" onClick={onLogout} variant="ghost" size="sm">
          {t('logout', language)}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-xl">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 p-3 rounded-xl">
          {successMessage}
        </div>
      )}

      {/* Story Info Display */}
      <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-300 dark:border-purple-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Access Code:</strong> {story.accessCode}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Created:</strong>{' '}
          {new Date(story.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Title Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('title', language)} *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setFieldErrors((prev) => ({ ...prev, title: undefined }));
          }}
          required
          maxLength={100}
          className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
        />
        {fieldErrors.title && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
            {fieldErrors.title}
          </p>
        )}
        <p
          className={`text-xs mt-1 ${
            isTitleValid
              ? 'text-gray-600 dark:text-gray-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {titleCharCount}/100 {t('characters', language)}
        </p>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('description', language)}
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setFieldErrors((prev) => ({ ...prev, description: undefined }));
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
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
              ? 'text-gray-600 dark:text-gray-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {descCharCount}/500 {t('characters', language)}
        </p>
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('status', language)} *
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

      {/* Max Entries Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('maxEntriesLabel', language)}
        </label>
        <input
          type="number"
          value={maxEntries}
          onChange={(e) => {
            setMaxEntries(e.target.value);
            setFieldErrors((prev) => ({ ...prev, maxEntries: undefined }));
          }}
          min="1"
          className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
        />
        {fieldErrors.maxEntries && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
            {fieldErrors.maxEntries}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isTitleValid || !isDescValid}
        variant="white"
        size="md"
        className="w-full font-bold"
      >
        {isSubmitting ? t('saving', language) : t('saveChanges', language)}
      </Button>
    </motion.form>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createStory, APIError } from "../lib/api";
import type { CreateStoryData } from "../lib/types";
import Button from "../../components/Button";

interface CreateStoryFormProps {
  adminKey: string;
  onSuccess: () => void;
}

export default function CreateStoryForm({
  adminKey,
  onSuccess,
}: CreateStoryFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [maxEntries, setMaxEntries] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    accessCode?: string;
  }>({});

  const validateForm = () => {
    const errors: { title?: string; accessCode?: string } = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    } else if (title.length > 100) {
      errors.title = "Title must be 100 characters or less";
    }

    if (!accessCode.trim()) {
      errors.accessCode = "Access code is required";
    } else if (!/^[A-Z0-9-]+$/.test(accessCode.toUpperCase())) {
      errors.accessCode =
        "Access code must contain only letters, numbers, and hyphens";
    }

    if (description.length > 500) {
      errors.title = "Description must be 500 characters or less";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const data: CreateStoryData = {
      title: title.trim(),
      description: description.trim() || undefined,
      accessCode: accessCode.trim().toUpperCase(),
      maxEntries: maxEntries ? parseInt(maxEntries) : null,
    };

    try {
      const response = await createStory(data, adminKey);

      setSuccess(
        `Story "${response.story.title}" created successfully! Access code: ${response.story.accessCode}`
      );

      // Clear form
      setTitle("");
      setDescription("");
      setAccessCode("");
      setMaxEntries("");

      // Call success callback after a delay
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 401 || err.status === 403) {
          setError("Invalid admin key. Access denied.");
        } else if (err.status === 409) {
          setError("A story with this access code already exists.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to create story. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-purple-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">
        Create New Story
      </h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg"
        >
          <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg"
        >
          <p className="text-green-800 dark:text-green-300 font-medium">
            {success}
          </p>
        </motion.div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Story Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors ${
            fieldErrors.title
              ? "border-red-300 dark:border-red-700"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="Enter story title"
          disabled={isSubmitting}
        />
        {fieldErrors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.title}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {title.length}/100 characters
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none transition-colors"
          placeholder="Describe what this story is about"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description.length}/500 characters
        </p>
      </div>

      <div>
        <label
          htmlFor="accessCode"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Access Code *
        </label>
        <input
          type="text"
          id="accessCode"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white uppercase transition-colors ${
            fieldErrors.accessCode
              ? "border-red-300 dark:border-red-700"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="e.g., FAMILY-2025"
          disabled={isSubmitting}
        />
        {fieldErrors.accessCode && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.accessCode}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Use letters, numbers, and hyphens only
        </p>
      </div>

      <div>
        <label
          htmlFor="maxEntries"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Max Entries (optional)
        </label>
        <input
          type="number"
          id="maxEntries"
          value={maxEntries}
          onChange={(e) => setMaxEntries(e.target.value)}
          min="1"
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="Leave empty for unlimited"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Leave empty for unlimited entries
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-lg"
      >
        {isSubmitting ? "Creating Story..." : "Create Story"}
      </Button>
    </motion.form>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitEntryWithRetry, APIError } from "../lib/api";
import type { SubmitEntryData } from "../lib/types";

interface ContributeFormProps {
  accessCode: string;
  previousEntryId: string | null;
  onSuccess: () => void;
  isActive: boolean;
}

export default function ContributeForm({
  accessCode,
  previousEntryId,
  onSuccess,
  isActive,
}: ContributeFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  // Check for rate limit in localStorage
  useEffect(() => {
    const storedLimit = localStorage.getItem("coolStoryRateLimit");
    if (storedLimit) {
      const limitTime = parseInt(storedLimit);
      if (Date.now() < limitTime) {
        setRateLimitedUntil(limitTime);
      } else {
        localStorage.removeItem("coolStoryRateLimit");
      }
    }
  }, []);

  // Countdown timer for rate limit
  useEffect(() => {
    if (!rateLimitedUntil) return;

    const interval = setInterval(() => {
      if (Date.now() >= rateLimitedUntil) {
        setRateLimitedUntil(null);
        localStorage.removeItem("coolStoryRateLimit");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const data: SubmitEntryData = {
      accessCode,
      username: username.trim(),
      contactEmail: email.trim(),
      text: text.trim(),
      previousEntryId,
    };

    try {
      await submitEntryWithRetry(data);

      // Clear form
      setUsername("");
      setEmail("");
      setText("");

      // Set rate limit (15 minutes)
      const limitTime = Date.now() + 15 * 60 * 1000;
      setRateLimitedUntil(limitTime);
      localStorage.setItem("coolStoryRateLimit", limitTime.toString());

      // Notify parent to refresh
      onSuccess();
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);

        // Handle rate limit
        if (err.status === 429) {
          const limitTime = Date.now() + 15 * 60 * 1000;
          setRateLimitedUntil(limitTime);
          localStorage.setItem("coolStoryRateLimit", limitTime.toString());
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = text.length;
  const isValidLength = charCount >= 10 && charCount <= 500;

  if (!isActive) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">
          This story is no longer accepting contributions.
        </p>
      </div>
    );
  }

  if (rateLimitedUntil) {
    const remainingMs = rateLimitedUntil - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 60000);

    return (
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-2 border-purple-300 dark:border-purple-700">
        <p className="text-purple-700 dark:text-purple-300 text-center">
          You can contribute again in <strong>{remainingMinutes}</strong> minute{remainingMinutes !== 1 ? 's' : ''}.
        </p>
        <p className="text-sm text-purple-600 dark:text-purple-400 text-center mt-2">
          Rate limit: 1 contribution per 15 minutes
        </p>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-purple-300 dark:border-purple-700 space-y-4"
    >
      <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">
        Add Your Part
      </h3>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Your Name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={2}
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Used to send you the completed story
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="text"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
        >
          Your Story Contribution
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          minLength={10}
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Continue the story..."
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            10-500 characters
          </p>
          <p
            className={`text-sm font-semibold ${
              isValidLength
                ? "text-green-600 dark:text-green-400"
                : charCount > 500
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {charCount}/500
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isValidLength}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Contribution"}
      </button>
    </motion.form>
  );
}

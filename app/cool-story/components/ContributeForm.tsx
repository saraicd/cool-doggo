"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitEntryWithRetry, APIError } from "../lib/api";
import type { SubmitEntryData } from "../lib/types";
import Button from "../../components/Button";
import ShareStoryButton from "./ShareStoryButton";

interface ContributeFormProps {
  accessCode: string;
  previousEntryId: string | null;
  onSuccess: () => void;
  isActive: boolean;
  storyTitle: string;
}

export default function ContributeForm({
  accessCode,
  previousEntryId,
  onSuccess,
  isActive,
  storyTitle,
}: ContributeFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    text?: string;
  }>({});
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
    setFieldErrors({});
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
        // Check if error message contains field-specific info
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes("name")) {
          setFieldErrors({ username: err.message });
        } else if (errorMsg.includes("email")) {
          setFieldErrors({ email: err.message });
        } else if (
          errorMsg.includes("text") ||
          errorMsg.includes("contribution")
        ) {
          setFieldErrors({ text: err.message });
        } else {
          setError(err.message);
        }

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
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl text-center">
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
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-700">
        <p className="text-purple-700 dark:text-purple-300 text-center">
          ! You can contribute again in <strong>{remainingMinutes}</strong>{" "}
          minute
          {remainingMinutes !== 1 ? "s" : ""}.
        </p>

        <div className="text-right mt-4">
          <ShareStoryButton accessCode={accessCode} storyTitle={storyTitle} />
        </div>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
          Add Your Part
        </h3>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
            }}
            required
            minLength={2}
            maxLength={50}
            className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
            placeholder="Your name"
          />
          {fieldErrors.username && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">
              {fieldErrors.username}
            </p>
          )}
        </div>

        <div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
            placeholder="Email (optional - to receive completed story)"
          />
          {fieldErrors.email && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <textarea
          id="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFieldErrors((prev) => ({ ...prev, text: undefined }));
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          required
          minLength={10}
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white resize-none overflow-hidden"
          placeholder="Continue the story..."
        />
        {fieldErrors.text && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
            {fieldErrors.text}
          </p>
        )}
        <div className="flex justify-between items-center mt-1">
          <p
            className={`text-xs ${
              isValidLength
                ? "text-gray-600 dark:text-gray-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {charCount}/500 characters
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isValidLength}
        variant="white"
        size="md"
        className="w-full font-bold"
      >
        {isSubmitting ? "Submitting..." : "Submit Contribution"}
      </Button>
    </motion.form>
  );
}

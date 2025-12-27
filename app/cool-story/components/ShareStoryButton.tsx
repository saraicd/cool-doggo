"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";

interface ShareStoryButtonProps {
  accessCode: string;
  storyTitle: string;
}

export default function ShareStoryButton({
  accessCode,
  storyTitle,
}: ShareStoryButtonProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/cool-story/${accessCode}`;
    const message = `Check out this Cool Story: "${storyTitle}"\n\n${url}\n\nJoin the collaborative storytelling adventure!`;

    try {
      await navigator.clipboard.writeText(message);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <Button onClick={handleShare} variant="primary" size="sm">
        Share this Story
      </Button>

      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
          >
            ✓ Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

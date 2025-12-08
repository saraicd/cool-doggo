"use client";
import { useState, useEffect } from "react";
import { getStories } from "./lib/api";
import StoryCard from "./components/StoryCard";
import PageLayout from "../components/PageLayout";
import type { Story } from "./lib/types";

function StoriesList() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStories()
      .then(setStories)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={`loading-${i}`}
            className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          No stories available yet.
        </h2>
        <p className="text-gray-500 dark:text-gray-500 mt-2">
          Check back soon for new collaborative stories!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story, index) => (
        <StoryCard key={story._id} story={story} index={index} />
      ))}
    </div>
  );
}

export default function CoolStoryPage() {
  return (
    <PageLayout>
      <div className="p-8 sm:p-20 relative">
        {/* Balloons are now in the root layout */}

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-right mb-12">
            <h1 className="text-5xl  text-purple-700 dark:text-purple-400 mb-4">
              Cool Story
            </h1>
            <p className="text-md text-black dark:text-white   mb-6">
              Join the collaborative storytelling adventure! Each person adds
              the next part of the story.
            </p>
            <a
              href="/cool-story/about"
              className="inline-block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold underline"
            >
              How does this work? →
            </a>
          </div>

          <StoriesList />
        </div>
      </div>
    </PageLayout>
  );
}

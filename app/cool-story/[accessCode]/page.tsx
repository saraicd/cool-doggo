"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageLayout from "../../components/PageLayout";
import StoryEntries from "../components/StoryEntries";
import ContributeForm from "../components/ContributeForm";
import EditStoryModal from "../components/EditStoryModal";
import Button from "../../components/Button";
import { getStory, APIError } from "../lib/api";
import type { StoryWithEntries } from "../lib/types";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const accessCode = params.accessCode as string;

  const [storyData, setStoryData] = useState<StoryWithEntries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadStory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStory(accessCode);
      setStoryData(data);

      // Scroll to bottom after loading to show latest entry
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
        if (err.status === 404) {
          setTimeout(() => router.push("/cool-story"), 3000);
        }
      } else {
        setError("Failed to load story. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory();
  }, [accessCode]);

  const handleSubmitSuccess = () => {
    // Reload story after successful submission
    loadStory();
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="p-8 sm:p-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !storyData) {
    return (
      <PageLayout>
        <div className="p-8 sm:p-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-2">Error</h2>
              <p>{error || "Story not found"}</p>
              {error?.includes("not found") && (
                <p className="mt-4 text-sm">Redirecting to stories list...</p>
              )}
            </motion.div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const { story, entries } = storyData;
  const latestEntryId =
    entries.length > 0 ? entries[entries.length - 1]._id : null;
  const isActive = story.status === "active";

  return (
    <PageLayout>
      <div className="relative min-h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/background-home.mp4" type="video/mp4" />
          <source src="/videos/background-home.webm" type="video/webm" />
        </video>

        <div className="relative z-10 p-8 sm:p-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex justify-end items-start mb-4">
                <h2 className=" md:text-5xl  text-purple-700 dark:text-purple-400">
                  {story.title}
                </h2>
              </div>

              {story.description && (
                <>
                  <p className="text-lg text-right text-gray-600 dark:text-gray-300">
                    {story.description}
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => setShowEditModal(true)}
                      variant="ghost"
                      size="sm"
                    >
                      Edit Story
                    </Button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Story Entries */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <StoryEntries entries={entries} />
              <div ref={bottomRef} />
            </motion.div>

            {/* Contribute Form */}
            <div className="mt-4 mb-8">
              <ContributeForm
                accessCode={accessCode}
                previousEntryId={latestEntryId}
                onSuccess={handleSubmitSuccess}
                isActive={isActive}
                storyTitle={story.title}
              />
            </div>
          </div>
        </div>

        {/* Edit Story Modal */}
        <EditStoryModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          accessCode={accessCode}
          currentDescription={story.description}
          currentStatus={story.status}
          onSuccess={() => {
            setShowEditModal(false);
            loadStory();
          }}
        />
      </div>
    </PageLayout>
  );
}

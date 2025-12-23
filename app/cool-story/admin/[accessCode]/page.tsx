"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageLayout from '../../../components/PageLayout';
import AdminLogin from '../components/AdminLogin';
import StoryEditorForm from '../components/StoryEditorForm';
import { useAdminAuth } from '../lib/useAdminAuth';
import { getStory, APIError } from '../../lib/api';
import type { Story } from '../../lib/types';

export default function AdminStoryPage() {
  const params = useParams();
  const router = useRouter();
  const accessCode = params.accessCode as string;
  const { adminKey, isAuthenticated, login, logout } = useAdminAuth();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStory(accessCode);
      // Extract just the story metadata (without entries)
      setStory({
        _id: data.story._id || '',
        title: data.story.title,
        description: data.story.description,
        accessCode: accessCode,
        status: data.story.status,
        createdAt: data.story.createdAt || new Date().toISOString(),
        completedAt: data.story.completedAt || null,
        maxEntries: data.story.maxEntries || null,
      } as Story);
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
        if (err.status === 404) {
          setTimeout(() => router.push('/cool-story'), 3000);
        }
      } else {
        setError('Failed to load story. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory();
  }, [accessCode]);

  const handleLoginSuccess = (key: string) => {
    login(key);
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditSuccess = () => {
    loadStory(); // Reload story to show updated data
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="p-8 sm:p-20">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !story) {
    return (
      <PageLayout>
        <div className="p-8 sm:p-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-2">Error</h2>
              <p>{error || 'Story not found'}</p>
              {error?.includes('not found') && (
                <p className="mt-4 text-sm">Redirecting to stories list...</p>
              )}
            </motion.div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative min-h-screen">
        {/* Video Background - same as other pages */}
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
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                Story Editor
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{story.title}</p>
            </motion.div>

            {/* Conditional Rendering: Login or Editor */}
            {!isAuthenticated ? (
              <AdminLogin onLogin={handleLoginSuccess} />
            ) : (
              <StoryEditorForm
                story={story}
                adminKey={adminKey!}
                onSuccess={handleEditSuccess}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

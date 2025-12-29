"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";

interface Story {
  _id: string;
  title: string;
  description: string;
  accessCode: string;
  status: "active" | "completed" | "archived";
  maxEntries?: number;
  createdAt: string;
}

export default function AdminPage() {
  // View state
  const [view, setView] = useState<"create" | "edit" | "delete">("create");

  // Create form state
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    accessCode: "",
    editCode: "",
    maxEntries: "",
    adminKey: "",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    accessCode: "",
    title: "",
    description: "",
    status: "active" as "active" | "completed" | "archived",
    maxEntries: "",
    editCode: "",
    adminKey: "",
  });

  // Delete form state
  const [deleteForm, setDeleteForm] = useState({
    accessCode: "",
    adminKey: "",
  });

  // Stories list for dropdown
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch stories when switching to edit or delete view
  useEffect(() => {
    if (view === "edit" || view === "delete") {
      fetchStories();
    }
  }, [view]);

  const fetchStories = async () => {
    setLoadingStories(true);
    try {
      const response = await fetch(
        "https://cool-story-api-production.up.railway.app/stories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }
      const data = await response.json();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stories");
    } finally {
      setLoadingStories(false);
    }
  };

  const handleStorySelect = (accessCode: string) => {
    const selectedStory = stories.find((s) => s.accessCode === accessCode);
    if (selectedStory) {
      setEditForm({
        ...editForm,
        accessCode: selectedStory.accessCode,
        title: selectedStory.title,
        description: selectedStory.description,
        status: selectedStory.status,
        maxEntries: selectedStory.maxEntries?.toString() || "",
        editCode: "", // Edit code is not returned by API for security, leave blank
      });
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://cool-story-api-production.up.railway.app/story/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": createForm.adminKey,
          },
          body: JSON.stringify({
            title: createForm.title,
            description: createForm.description,
            accessCode: createForm.accessCode,
            editCode: createForm.editCode,
            maxEntries: createForm.maxEntries
              ? parseInt(createForm.maxEntries)
              : undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to create story. Check your admin key."
        );
      }

      const data = await response.json();
      setMessage(
        `Story created successfully! Access code: ${createForm.accessCode}`
      );

      // Reset form except admin key
      setCreateForm({
        ...createForm,
        title: "",
        description: "",
        accessCode: "",
        editCode: "",
        maxEntries: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `https://cool-story-api-production.up.railway.app/story/${editForm.accessCode}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": editForm.adminKey,
          },
          body: JSON.stringify({
            title: editForm.title,
            description: editForm.description,
            status: editForm.status,
            maxEntries: editForm.maxEntries
              ? parseInt(editForm.maxEntries)
              : null,
            editCode: editForm.editCode || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to update story. Check your admin key."
        );
      }

      setMessage("Story updated successfully!");
      // Reset form except admin key
      setEditForm({
        ...editForm,
        accessCode: "",
        title: "",
        description: "",
        status: "active",
        maxEntries: "",
        editCode: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update story");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Confirm deletion
    const selectedStory = stories.find((s) => s.accessCode === deleteForm.accessCode);
    if (!selectedStory) return;

    const confirmed = window.confirm(
      `⚠️ WARNING: This will permanently delete "${selectedStory.title}" and ALL its entries!\n\nThis action cannot be undone. Are you absolutely sure?`
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `https://cool-story-api-production.up.railway.app/story/${deleteForm.accessCode}/delete`,
        {
          method: "DELETE",
          headers: {
            "X-Admin-Key": deleteForm.adminKey,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to delete story. Check your admin key."
        );
      }

      const data = await response.json();
      setMessage(
        `Story deleted successfully! ${data.deleted?.entriesDeleted || 0} entries removed.`
      );

      // Reset form except admin key and refresh stories list
      setDeleteForm({
        ...deleteForm,
        accessCode: "",
      });
      fetchStories();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen p-8 sm:p-20">
        <div className="max-w-2xl ">
          {/* Header with View Switcher */}
          <h1 className="text-5xl text-right text-purple-700 dark:text-purple-400 mb-4">
            Admin Panel
          </h1>
          <div className="flex justify-end mb-8">
            <div className="flex gap-2">
              <Button
                variant={view === "create" ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setView("create");
                  setMessage("");
                  setError("");
                }}
              >
                Create Story
              </Button>
              <Button
                variant={view === "edit" ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setView("edit");
                  setMessage("");
                  setError("");
                }}
              >
                Edit Story
              </Button>
              <Button
                variant={view === "delete" ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setView("delete");
                  setMessage("");
                  setError("");
                }}
              >
                Delete Story
              </Button>
            </div>
          </div>

          {/* Global Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-300"
            >
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-300"
            >
              {error}
            </motion.div>
          )}

          {/* Create Story Form */}
          {view === "create" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-purple-900/20 backdrop-blur-md border border-purple-700 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
                Create New Story
              </h2>
              <form onSubmit={handleCreateSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={createForm.title}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, title: e.target.value })
                    }
                    placeholder="Story title"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the story"
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Access Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Access Code *
                  </label>
                  <input
                    type="text"
                    value={createForm.accessCode}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        accessCode: e.target.value,
                      })
                    }
                    placeholder="STORY-CODE"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Code that participants will use to access the story
                  </p>
                </div>

                {/* Edit Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Edit Code *
                  </label>
                  <input
                    type="text"
                    value={createForm.editCode}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, editCode: e.target.value })
                    }
                    placeholder="EDIT-CODE"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Code to edit the story later
                  </p>
                </div>

                {/* Max Entries */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Max Entries (Optional)
                  </label>
                  <input
                    type="number"
                    value={createForm.maxEntries}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        maxEntries: e.target.value,
                      })
                    }
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Admin Key */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Admin Key *
                  </label>
                  <input
                    type="password"
                    value={createForm.adminKey}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, adminKey: e.target.value })
                    }
                    placeholder="Enter admin key"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Required to authenticate the story creation
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Story"}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Edit Story Form */}
          {view === "edit" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-purple-900/20 backdrop-blur-md border border-purple-700 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
                Edit Existing Story
              </h2>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                {/* Select Story Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Select Story *
                  </label>
                  {loadingStories ? (
                    <div className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl bg-white dark:bg-purple-900/30 text-gray-500 dark:text-gray-400">
                      Loading stories...
                    </div>
                  ) : (
                    <select
                      value={editForm.accessCode}
                      onChange={(e) => handleStorySelect(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                    >
                      <option value="">-- Choose a story to edit --</option>
                      {stories.map((story) => (
                        <option key={story._id} value={story.accessCode}>
                          {story.title} ({story.accessCode}) - {story.status}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Select the story you want to edit
                  </p>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    placeholder="Story title"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the story"
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        status: e.target.value as
                          | "active"
                          | "completed"
                          | "archived",
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Active: accepting contributions | Completed: read-only |
                    Archived: hidden
                  </p>
                </div>

                {/* Max Entries */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Max Entries (Optional)
                  </label>
                  <input
                    type="number"
                    value={editForm.maxEntries}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        maxEntries: e.target.value,
                      })
                    }
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Edit Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Edit Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={editForm.editCode}
                    onChange={(e) =>
                      setEditForm({ ...editForm, editCode: e.target.value })
                    }
                    placeholder="NEW-EDIT-CODE or leave empty to remove"
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Update the edit code or leave empty to remove it
                  </p>
                </div>

                {/* Admin Key */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Admin Key *
                  </label>
                  <input
                    type="password"
                    value={editForm.adminKey}
                    onChange={(e) =>
                      setEditForm({ ...editForm, adminKey: e.target.value })
                    }
                    placeholder="Enter admin key"
                    required
                    className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Required to authenticate the story update
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Story"}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Delete Story Form */}
          {view === "delete" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-red-900/20 backdrop-blur-md border border-red-700 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-6">
                Delete Story
              </h2>
              <div className="mb-6 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-300">
                <p className="font-semibold">⚠️ Warning: This action is irreversible!</p>
                <p className="text-sm mt-2">
                  Deleting a story will permanently remove it and all its entries from the database.
                </p>
              </div>
              <form onSubmit={handleDeleteSubmit} className="space-y-6">
                {/* Select Story Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Select Story to Delete *
                  </label>
                  {loadingStories ? (
                    <div className="w-full px-4 py-3 border border-red-300 dark:border-red-700 rounded-xl bg-white dark:bg-red-900/30 text-gray-500 dark:text-gray-400">
                      Loading stories...
                    </div>
                  ) : (
                    <select
                      value={deleteForm.accessCode}
                      onChange={(e) =>
                        setDeleteForm({ ...deleteForm, accessCode: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-red-300 dark:border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-red-900/30 text-gray-900 dark:text-white"
                    >
                      <option value="">-- Choose a story to delete --</option>
                      {stories.map((story) => (
                        <option key={story._id} value={story.accessCode}>
                          {story.title} ({story.accessCode}) - {story.status}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Select the story you want to permanently delete
                  </p>
                </div>

                {/* Admin Key */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Admin Key *
                  </label>
                  <input
                    type="password"
                    value={deleteForm.adminKey}
                    onChange={(e) =>
                      setDeleteForm({ ...deleteForm, adminKey: e.target.value })
                    }
                    placeholder="Enter admin key"
                    required
                    className="w-full px-4 py-3 border border-red-300 dark:border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-red-900/30 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Required to authenticate the story deletion
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Story Permanently"}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

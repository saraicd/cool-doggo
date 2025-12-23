export type StoryStatus = "active" | "completed" | "archived";

export interface Story {
  _id: string;
  title: string;
  description: string;
  accessCode: string;
  status: StoryStatus;
  createdAt: string;
  completedAt: string | null;
  maxEntries: number | null;
}

export interface StoryEntry {
  _id: string;
  storyId: string;
  text: string;
  username: string;
  createdAt: string;
  previousEntryId: string | null;
}

export interface StoryWithEntries {
  story: {
    title: string;
    description: string;
    status: StoryStatus;
  };
  entries: StoryEntry[];
}

export interface LatestEntryResponse {
  story: {
    title: string;
    description: string;
    status: StoryStatus;
  };
  latestEntry: StoryEntry | null;
}

export interface SubmitEntryData {
  accessCode: string;
  username: string;
  contactEmail: string;
  text: string;
  previousEntryId: string | null;
}

export interface SubmitEntryResponse {
  message: string;
  entry?: {
    id: string;
    text: string;
    username: string;
    createdAt: string;
  };
  latestId?: string; // For race condition (409)
}

export interface EditStoryData {
  title?: string;
  description?: string;
  status?: StoryStatus;
  maxEntries?: number | null;
}

export interface EditStoryResponse {
  message: string;
  story: Story;
}

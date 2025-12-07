import type {
  Story,
  StoryWithEntries,
  LatestEntryResponse,
  SubmitEntryData,
  SubmitEntryResponse,
} from './types';

const API_BASE = 'https://cool-story-api-production.up.railway.app';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new APIError(
      data.message || 'An error occurred',
      response.status,
      data
    );
  }

  return data;
}

export async function getStories(): Promise<Story[]> {
  const response = await fetch(`${API_BASE}/stories`, {
    cache: 'no-store',
  });
  return handleResponse<Story[]>(response);
}

export async function getStory(accessCode: string): Promise<StoryWithEntries> {
  const response = await fetch(`${API_BASE}/story/${accessCode}/all`, {
    cache: 'no-store',
  });
  return handleResponse<StoryWithEntries>(response);
}

export async function getLatestEntry(
  accessCode: string
): Promise<LatestEntryResponse> {
  const response = await fetch(`${API_BASE}/story/${accessCode}/latest`, {
    cache: 'no-store',
  });
  return handleResponse<LatestEntryResponse>(response);
}

export async function submitEntry(
  data: SubmitEntryData
): Promise<SubmitEntryResponse> {
  const response = await fetch(`${API_BASE}/story/entry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<SubmitEntryResponse>(response);
}

export async function submitEntryWithRetry(
  data: SubmitEntryData,
  maxRetries = 3
): Promise<SubmitEntryResponse> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(`${API_BASE}/story/entry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Handle race condition
      if (response.status === 409) {
        retries++;
        if (retries >= maxRetries) {
          throw new APIError(
            'Unable to submit after multiple attempts. Please refresh the page.',
            409,
            result
          );
        }

        // Get the new latest entry
        const latestData = await getLatestEntry(data.accessCode);
        data.previousEntryId = latestData.latestEntry?._id || null;

        // Wait a bit before retrying
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }

      if (!response.ok) {
        throw new APIError(
          result.message || 'An error occurred',
          response.status,
          result
        );
      }

      return result;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred', 500);
    }
  }

  throw new APIError('Max retries exceeded', 500);
}

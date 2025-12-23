# Cool Story API Documentation

## Base URL
```
https://cool-story-api-production.up.railway.app
```

---

## 🔑 Authentication

This API uses a multi-level authentication system:

### 1. Access Codes
Each story has a unique **access code** that must be provided when:
- Submitting new entries
- Accessing story content (reading entries)

### 2. Edit Codes (Optional)
Stories can optionally have an **edit code** that allows limited editing permissions:
- Update story description
- Change story status (active/completed/archived)
- **Cannot** change title, maxEntries, accessCode, or editCode

Edit codes are perfect for giving trusted users (like story recipients) limited control without full admin access.

### 3. Admin API Key
Full administrative access using the `X-Admin-Key` header:
- Create new stories
- Full edit permissions (all fields)
- Manage edit codes

---

## 📋 API Endpoints

### Health Check

#### `GET /story/test`
Check if the API is running.

**Response:**
```
Test successful.
```

---

### Story Management

#### `GET /stories`
Get all available stories.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Family Summer Adventure 2025",
    "description": "Our collaborative family vacation story",
    "accessCode": "FAM-2025",
    "status": "active",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "maxEntries": 100
  }
]
```

**Status Codes:**
- `200` - Success

---

#### `POST /story/create`
Create a new story (admin endpoint - requires API key).

**Headers:**
```
X-Admin-Key: your-super-secret-admin-key-here
```

**Request Body:**
```json
{
  "title": "Family Summer Adventure 2025",
  "description": "Our collaborative family vacation story",
  "accessCode": "FAM-2025",
  "maxEntries": 100,
  "editCode": "EDIT-FAM-2025"
}
```

**Fields:**
- `title` (required): Story title (max 100 chars)
- `description` (optional): Story description (max 500 chars)
- `accessCode` (required): Unique access code (will be converted to uppercase)
- `maxEntries` (optional): Maximum number of entries allowed (null = unlimited)
- `editCode` (optional): Optional code that allows limited editing access (description & status only)

**Response:**
```json
{
  "message": "Story created successfully!",
  "story": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Family Summer Adventure 2025",
    "accessCode": "FAM-2025",
    "editCode": "EDIT-FAM-2025",
    "status": "active"
  }
}
```

**Status Codes:**
- `201` - Story created successfully
- `400` - Missing required fields or access code already exists
- `401` - Missing admin API key
- `403` - Invalid admin API key
- `500` - Server error

**Example (curl):**
```bash
curl -X POST https://cool-story-api-production.up.railway.app/story/create \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-super-secret-admin-key-here" \
  -d '{
    "title": "Family Summer Adventure 2025",
    "description": "Our collaborative family vacation story",
    "accessCode": "FAM-2025",
    "maxEntries": 100,
    "editCode": "EDIT-FAM-2025"
  }'
```

**Example (PowerShell):**
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Admin-Key" = "your-super-secret-admin-key-here"
}
$body = @{
    title = "Family Summer Adventure 2025"
    description = "Our collaborative family vacation story"
    accessCode = "FAM-2025"
    maxEntries = 100
    editCode = "EDIT-FAM-2025"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://cool-story-api-production.up.railway.app/story/create" `
  -Method Post -Headers $headers -Body $body
```

---

#### `PUT /story/:accessCode/edit`
Edit an existing story (admin endpoint - requires API key).

**Note:** This endpoint preserves the story's ID, access code, and creation date. Only the editable fields can be modified.

**Headers:**
```
X-Admin-Key: your-super-secret-admin-key-here
```

**URL Parameters:**
- `accessCode`: The story's access code (case-insensitive)

**Request Body (all fields optional):**
```json
{
  "title": "Family Summer Adventure 2025 - Updated",
  "description": "Our updated collaborative family vacation story",
  "status": "completed",
  "maxEntries": 150,
  "editCode": "NEW-EDIT-CODE"
}
```

**Fields:**
- `title` (optional): Updated story title (max 100 chars)
- `description` (optional): Updated story description (max 500 chars)
- `status` (optional): Story status - must be `'active'`, `'completed'`, or `'archived'`
- `maxEntries` (optional): Updated maximum number of entries (null = unlimited)
- `editCode` (optional): Update or remove edit code (set to empty string or null to remove)

**Response:**
```json
{
  "message": "Story updated successfully!",
  "story": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Family Summer Adventure 2025 - Updated",
    "description": "Our updated collaborative family vacation story",
    "accessCode": "FAM-2025",
    "editCode": "NEW-EDIT-CODE",
    "status": "completed",
    "maxEntries": 150,
    "completedAt": "2025-01-20T15:30:00.000Z",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Story updated successfully
- `400` - Invalid status value
- `401` - Missing admin API key
- `403` - Invalid admin API key
- `404` - Story not found with that access code
- `500` - Server error

**Important Notes:**
- When changing status to `'completed'`, the `completedAt` field is automatically set to the current date/time
- The story's `_id`, `accessCode`, and `createdAt` are never modified
- Only provide the fields you want to update; omitted fields remain unchanged

**Example (curl):**
```bash
curl -X PUT https://cool-story-api-production.up.railway.app/story/FAM-2025/edit \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-super-secret-admin-key-here" \
  -d '{
    "status": "completed",
    "maxEntries": 150
  }'
```

**Example (PowerShell):**
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Admin-Key" = "your-super-secret-admin-key-here"
}
$body = @{
    status = "completed"
    maxEntries = 150
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://cool-story-api-production.up.railway.app/story/FAM-2025/edit" `
  -Method Put -Headers $headers -Body $body
```

---

#### `PUT /story/:accessCode/edit-limited`
Edit a story with limited permissions using an edit code.

**Note:** This endpoint allows users with an edit code to update **only** the description and status. They cannot change the title, maxEntries, accessCode, editCode, or ID.

**Headers:**
```
X-Edit-Code: EDIT-FAM-2025
```

**URL Parameters:**
- `accessCode`: The story's access code (case-insensitive)

**Request Body (at least one field required):**
```json
{
  "description": "Updated story description",
  "status": "completed"
}
```

**Fields:**
- `description` (optional): Updated story description (max 500 chars)
- `status` (optional): Story status - must be `'active'`, `'completed'`, or `'archived'`

**Response:**
```json
{
  "message": "Story updated successfully!",
  "story": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Family Summer Adventure 2025",
    "description": "Updated story description",
    "accessCode": "FAM-2025",
    "status": "completed",
    "completedAt": "2025-01-20T15:30:00.000Z",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Story updated successfully
- `400` - Invalid status value or no fields provided
- `401` - Missing edit code
- `403` - Invalid edit code or story doesn't allow edit code access
- `404` - Story not found with that access code
- `500` - Server error

**Important Notes:**
- The edit code must be set on the story (via admin create or edit endpoint) for this to work
- Users with edit codes cannot modify the title, maxEntries, accessCode, or editCode
- When changing status to `'completed'`, the `completedAt` field is automatically set
- This is perfect for giving trusted users limited editing ability without full admin access

**Example (curl):**
```bash
curl -X PUT https://cool-story-api-production.up.railway.app/story/FAM-2025/edit-limited \
  -H "Content-Type: application/json" \
  -H "X-Edit-Code: EDIT-FAM-2025" \
  -d '{
    "description": "Updated story description",
    "status": "completed"
  }'
```

**Example (PowerShell):**
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Edit-Code" = "EDIT-FAM-2025"
}
$body = @{
    description = "Updated story description"
    status = "completed"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://cool-story-api-production.up.railway.app/story/FAM-2025/edit-limited" `
  -Method Put -Headers $headers -Body $body
```

---

### Story Entries

#### `GET /story/:accessCode/all`
Get a story with all its entries.

**URL Parameters:**
- `accessCode`: The story's access code (case-insensitive)

**Example:**
```
GET /story/FAM-2025/all
```

**Response:**
```json
{
  "story": {
    "title": "Family Summer Adventure 2025",
    "description": "Our collaborative family vacation story",
    "status": "active"
  },
  "entries": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "storyId": "507f191e810c19729de860ea",
      "text": "Once upon a time, our family embarked on an incredible adventure...",
      "username": "Sarah",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "previousEntryId": null
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "storyId": "507f191e810c19729de860ea",
      "text": "The journey took us through mountains and valleys...",
      "username": "Dad",
      "createdAt": "2025-01-15T11:00:00.000Z",
      "previousEntryId": "507f1f77bcf86cd799439011"
    }
  ]
}
```

**Notes:**
- Entries are sorted by creation date (oldest first)
- Contact emails are NOT included in the response for privacy

**Status Codes:**
- `200` - Success
- `404` - Story not found
- `500` - Server error

---

#### `GET /story/:accessCode/latest`
Get the latest entry for a story.

**URL Parameters:**
- `accessCode`: The story's access code (case-insensitive)

**Example:**
```
GET /story/FAM-2025/latest
```

**Response:**
```json
{
  "story": {
    "title": "Family Summer Adventure 2025",
    "description": "Our collaborative family vacation story",
    "status": "active"
  },
  "latestEntry": {
    "_id": "507f1f77bcf86cd799439012",
    "storyId": "507f191e810c19729de860ea",
    "text": "The journey took us through mountains and valleys...",
    "username": "Dad",
    "createdAt": "2025-01-15T11:00:00.000Z",
    "previousEntryId": "507f1f77bcf86cd799439011"
  }
}
```

**Notes:**
- If no entries exist, `latestEntry` will be `null`

**Status Codes:**
- `200` - Success
- `404` - Story not found
- `500` - Server error

---

#### `POST /story/entry`
Submit a new story entry.

**Request Body:**
```json
{
  "accessCode": "FAM-2025",
  "username": "Sarah",
  "contactEmail": "sarah@example.com",
  "text": "Once upon a time, our family embarked on an incredible adventure that would change our lives forever...",
  "previousEntryId": "507f1f77bcf86cd799439011"
}
```

**Fields:**
- `accessCode` (required): Story access code
- `username` (required): Contributor's name (2-50 chars)
- `contactEmail` (optional): Valid email address (for sending completed story)
- `text` (required): Story contribution (10-500 chars)
- `previousEntryId` (required): ID of the previous entry (use `null` for first entry)

**Response:**
```json
{
  "message": "Your contribution has been added!",
  "entry": {
    "id": "507f1f77bcf86cd799439013",
    "text": "Once upon a time...",
    "username": "Sarah",
    "createdAt": "2025-01-15T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Entry created successfully
- `400` - Missing required fields or invalid data
- `401` - Invalid access code
- `403` - Story is completed/archived or max entries reached
- `409` - Race condition (someone else added an entry, reload and retry)
- `429` - Rate limit exceeded (wait 15 minutes)
- `500` - Server error

**Rate Limiting:**
- 1 submission per 15 minutes per IP address

**Race Condition Handling:**
If you receive a `409` status code, it means someone submitted an entry between when you loaded the story and when you tried to submit. The response will include:

```json
{
  "message": "Someone already added the next part. Please reload the story.",
  "latestId": "507f1f77bcf86cd799439014"
}
```

You should:
1. Reload the story
2. Get the new latest entry ID
3. Retry submission with the updated `previousEntryId`

---

## 🔒 CORS Policy

The API accepts requests from:
- `https://www.cooldoggo.com`
- `https://cooldoggo.com`
- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite local development)

---

## 📊 Data Models

### Story
```typescript
{
  _id: string;
  title: string;
  description: string;
  accessCode: string;
  editCode: string | null;  // Optional - allows limited editing if set
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  completedAt: Date | null;
  maxEntries: number | null;
}
```

### Story Entry
```typescript
{
  _id: string;
  storyId: string;
  text: string;
  username: string;
  contactEmail?: string;  // Optional - Only stored, never returned in GET requests
  createdAt: Date;
  previousEntryId: string | null;
}
```

---

## 🎯 Common Use Cases

### 1. Display a Story Page

```javascript
// Get story with all entries
const response = await fetch('https://cool-story-api-production.up.railway.app/story/FAM-2025/all');
const data = await response.json();

console.log(data.story.title); // "Family Summer Adventure 2025"
console.log(data.entries.length); // Number of entries

// Display entries
data.entries.forEach(entry => {
  console.log(`${entry.username}: ${entry.text}`);
});
```

### 2. Submit a New Entry

```javascript
// First, get the latest entry ID
const latestResponse = await fetch('https://cool-story-api-production.up.railway.app/story/FAM-2025/latest');
const latestData = await latestResponse.json();
const previousId = latestData.latestEntry?._id || null;

// Submit new entry
const submitResponse = await fetch('https://cool-story-api-production.up.railway.app/story/entry', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    accessCode: 'FAM-2025',
    username: 'Sarah',
    contactEmail: 'sarah@example.com', // Optional
    text: 'The adventure continued as they reached the mountain peak...',
    previousEntryId: previousId,
  }),
});

const result = await submitResponse.json();

if (submitResponse.ok) {
  console.log('Success!', result.message);
} else {
  console.error('Error:', result.message);
}
```

### 3. Handle Race Conditions

```javascript
async function submitEntryWithRetry(entryData) {
  try {
    const response = await fetch('https://cool-story-api-production.up.railway.app/story/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData),
    });

    const result = await response.json();

    if (response.status === 409) {
      // Race condition - reload and retry
      alert('Someone just added to the story! Reloading...');

      // Get new latest entry
      const latestResponse = await fetch(`https://cool-story-api-production.up.railway.app/story/${entryData.accessCode}/latest`);
      const latestData = await latestResponse.json();

      // Retry with new previousEntryId
      entryData.previousEntryId = latestData.latestEntry?._id || null;
      return submitEntryWithRetry(entryData);
    }

    return result;
  } catch (error) {
    console.error('Error submitting entry:', error);
    throw error;
  }
}
```

---

## ⚠️ Error Handling

All error responses follow this format:

```json
{
  "message": "Error description here",
  "error": "Detailed error message (only in development)"
}
```

**Common Errors:**

| Status Code | Message | Solution |
|-------------|---------|----------|
| 400 | "Username is required to contribute" | Provide username field |
| 400 | "Text must be at least 10 characters long" | Make text longer |
| 401 | "Invalid access code" | Check the access code is correct |
| 403 | "This story is completed" | Story is no longer accepting entries |
| 404 | "Story not found with that access code" | Verify the access code exists |
| 409 | "Someone already added the next part" | Reload story and retry with new previousEntryId |
| 429 | "Too many submissions" | Wait 15 minutes before submitting again |

---

## 🚀 Getting Started (Quick Example)

```javascript
// 1. Get all stories
const stories = await fetch('https://cool-story-api-production.up.railway.app/stories')
  .then(res => res.json());

// 2. Pick a story
const storyCode = stories[0].accessCode;

// 3. Get the full story
const story = await fetch(`https://cool-story-api-production.up.railway.app/story/${storyCode}/all`)
  .then(res => res.json());

// 4. Get latest entry ID
const latest = await fetch(`https://cool-story-api-production.up.railway.app/story/${storyCode}/latest`)
  .then(res => res.json());

// 5. Submit a new entry
const result = await fetch('https://cool-story-api-production.up.railway.app/story/entry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    accessCode: storyCode,
    username: 'Your Name',
    contactEmail: 'your@email.com',
    text: 'Your story contribution here...',
    previousEntryId: latest.latestEntry?._id || null,
  }),
}).then(res => res.json());

console.log(result.message); // "Your contribution has been added!"
```

---

## 📞 Support

For questions or issues, contact the API administrator or open an issue in the repository.

---

## 🔄 Version History

- **v1.0.0** (2025-01) - Initial release with multi-story support and access code authentication

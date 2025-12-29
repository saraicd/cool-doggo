<p align="center">
  <img src="./public/cool-doggo.png" alt="Image Alt Text" />
</p>

## Cool Doggo

Cool Doggo wasn’t just any dog—he was effortlessly cool. He roamed the city, turning heads wherever he went. When he wasn’t mastering kickflips at the skate park, he could be found lounging at the local café, pretending to read Camus while secretly hoping for belly rubs. Life was a grand adventure, and Cool Doggo knew that the best way to deal with the mysteries of existence was with a wagging tail and a well-timed nap in the sun.

Up to this day, Doggo is waiting for his story to be written and unfolded.

## About this repository

This is a creative portfolio project that combines interactive storytelling, 3D animations, and modern web technologies. It features the **Cool Story** collaborative storytelling platform and an interactive 3D Cool Doggo character.

Check it out live: [Cool Doggo](https://www.cooldoggo.com)

## Features

## Libraries

- [React](https://www.https://www.npmjs.com/package/react).
- [Motion for React](https://www.npmjs.com/package/framer-motion).
- [React Three Fiber](https://r3f.docs.pmnd.rs/).
- [React Three Drei](https://drei.docs.pmnd.rs/).

### Interactive Portfolio

- 🐕 3D animated Cool Doggo character
- 💡 Advice generator integration
- 🌙 Dark mode support
- ✨ Smooth animations and transitions

## Tech Stack

### Core Technologies

- **Next.js 16.0.7** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### Animation & 3D

- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics with Three.js

### Backend & Database

- **MongoDB** - Database for stories and entries
- **Next.js API Routes** - Serverless API endpoints

### Internationalization

- Custom i18n system supporting Portuguese and English

## Project Structure

```
cool-doggo/
├── app/
│   ├── cool-story/          # Collaborative storytelling feature
│   │   ├── [accessCode]/    # Dynamic story pages
│   │   ├── components/      # Story-specific components
│   │   └── lib/            # Story API and types
│   ├── components/          # Shared UI components
│   ├── lib/                # i18n and context providers
│   ├── store/              # Merchandise page
│   └── home/               # Main landing page
├── public/                  # Static assets and videos
└── README.md
```

## APIs

- **Advice Slip JSON API** - [https://api.adviceslip.com/](https://api.adviceslip.com/)
- **Cool Story API** - Internal Next.js API routes for story management

## Getting Started on your Local Environment

### Prerequisites

- Node.js 20+ installed
- MongoDB database (local or cloud instance)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/saraicd/cool-doggo.git
cd cool-doggo
```

2. **Install Node.js 20 (if needed):**

```bash
nvm install 20
nvm use 20
```

3. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
```

5. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Cool Story Usage

### For Participants

1. Request an access code from a story owner
2. Navigate to the Cool Story page
3. Click on the story card and enter the access code
4. Read the latest entry
5. Add your contribution (10-500 characters)
6. Wait 15 minutes before contributing again

### For Story Creators

1. Create a story with a unique access code
2. Share the access code with participants
3. Use edit codes to manage story settings
4. Mark stories as completed when finished
5. View the complete narrative with all contributions

## Contributing

This is a personal portfolio project. Feedback and suggestions are welcome! Feel free to open an issue.

## Contact

- **Website**: [cooldoggo.com](https://www.cooldoggo.com)
- **GitHub**: [@saraicd](https://github.com/saraicd)
- **LinkedIn**: [Sara Domingues](https://www.linkedin.com/in/sara-domingues-b73b8985/)
- **Behance**: [GuidaSMoranes](https://www.behance.net/GuidaSMoranes)

## License

This project is for portfolio and educational purposes.

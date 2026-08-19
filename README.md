# Lumina Learning Platform

Lumina is a polished, responsive learning management experience for students and instructors. It turns the supplied LMS project blueprint into a portfolio-ready product demo with course discovery, progress tracking, lesson delivery, quiz feedback, AI-assisted study planning, and instructor analytics.

## Highlights

### Student experience

- Personalized learning dashboard with goals, streaks, progress, scores, and certificates
- Searchable course catalog with category filters and useful empty states
- My Learning and learning calendar views
- Immersive course player with module navigation and lesson notes
- Multiple-choice knowledge check with instant scoring feedback
- AI Study Coach prompts and contextual study-plan responses
- Responsive layouts for desktop, tablet, and mobile

### Instructor experience

- Role preview switch between student and instructor views
- Learner, completion, assessment, and rating metrics
- Weekly engagement visualization
- AI-generated engagement insight and learner nudge action
- Course performance table with published and draft states

## Technology

- React 19
- TypeScript
- vinext / Vite
- Cloudflare Workers-compatible server output
- Plain responsive CSS with accessible focus states and reduced-motion support

## Run locally

Prerequisite: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. To validate a production build:

```bash
npm test
```

## Product walkthrough

1. Start on **Overview** and continue Product Design Foundations.
2. Move between lessons, answer the Quick Check, and mark a lesson complete.
3. Open **Explore** and search or filter the course library.
4. Ask the **AI Study Coach** for a study plan.
5. Switch to **Instructor** to review engagement and course performance.
6. Resize to tablet or mobile to see the adaptive navigation and layouts.

## Architecture

```text
app/
  layout.tsx       Site metadata and root layout
  page.tsx         LMS screens, state, and interactions
  globals.css      Design system and responsive layouts
public/            Static brand and social assets
tests/             Rendered application checks
worker/            Cloudflare-compatible worker entry
```

## Current scope

This repository is a high-fidelity, interactive MVP front end. The project guide’s production backend path—JWT authentication, role authorization, MongoDB models, Express services, and durable API persistence—is intentionally left as the next engineering phase rather than simulated with insecure client-side storage.

## Roadmap

- Express and MongoDB API with validated course, enrollment, progress, quiz, and attempt models
- Secure JWT authentication with student, instructor, and admin authorization
- Real media uploads and lesson assets
- Persisted notes, quiz attempts, and learner analytics
- Certificate generation and completion records

## Quality

The interface includes keyboard focus treatment, semantic controls, responsive behavior, helpful feedback, empty states, and reduced-motion support. `npm test` builds the deployment artifact and verifies the key LMS surfaces in server-rendered output.

# Thaheen Mini Offline LMS

A small Arabic-first offline learning management system built with Angular 18 as part of the Thaheen frontend take-home task.

The application allows students to browse courses, navigate sequential lessons, watch bundled videos, resume playback, and persist their learning progress locally.

## Features

### Courses

- Browse bundled offline courses
- Course thumbnail, instructor, lesson count, and progress percentage
- Continue Watching section for the most recently watched unfinished lesson
- Search courses by course title or instructor name

### Course Details

- Sections and lessons
- Lesson duration
- Lesson states:
  - Not started
  - In progress
  - Completed
- Sequential lesson unlocking
- Locked lessons cannot be accessed directly by URL

### Video Player

- Custom HTML5 video controls
- Play / pause
- Seek bar
- Current time and duration
- Fullscreen
- Playback speeds: 1x, 1.25x, 1.5x, and 2x
- Resume from the last watched position
- Automatic completion when playback reaches 90%
- Next lesson navigation
- Broken video error state

### Bonus Features

- Course search/filter
- Keyboard shortcuts:
  - Space: play / pause
  - Left arrow: seek backward 5 seconds
  - Right arrow: seek forward 5 seconds
- Remember the last selected playback speed

### UX

- Arabic-first interface
- RTL layout
- Responsive desktop and mobile layouts
- Loading, empty, not-found, locked, and video-error states

---

## Running the Application

### Requirements

- Node.js
- npm
- Angular CLI 18+

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

All course data, images, and videos are bundled locally. The application does not depend on a backend or external API.

---

## Architecture

The application is organized around feature components and a small core layer.

```text
src/app/
├── core/
│   ├── guards/
│   ├── models/
│   ├── services/
│   └── storage/
│
├── features/
│   ├── courses/
│   │   ├── components/
│   │   └── pages/
│   │
│   └── lessons/
│       ├── components/
│       └── pages/
│
└── app.routes.ts
```

Routes are lazy-loaded using standalone Angular components.

### State Management

Angular Signals are used for local reactive state.

For this application, Signals provide a lightweight solution without introducing unnecessary global state-management complexity.

`ProgressService` is the single source of truth for learning progress and owns the progress business rules, including:

- Resume position
- Lesson completion
- Sequential unlocking
- Course progress calculation
- Continue Watching selection

### Persistence Abstraction

Persistence is kept separate from progress business logic.

```text
Components
    ↓
ProgressService
    ↓
PROGRESS_STORAGE
    ↓
ProgressStorage
    ↓
LocalStorageProgressService
```

`ProgressService` does not access `localStorage` directly.

The current implementation uses `LocalStorageProgressService`, which implements the `ProgressStorage` contract. This allows the persistence implementation to be replaced later with an API-backed implementation without coupling UI components to the storage mechanism.

### Course Data

Course data is loaded from:

```text
src/assets/data/courses.json
```

using Angular `HttpClient`.

Videos and thumbnails are also bundled under `src/assets`, keeping the application fully offline.

### Routing and Access Control

The main routes are:

```text
/courses
/courses/:courseId
/courses/:courseId/lessons/:lessonId
```

Lesson routes use a functional route guard.

The guard verifies sequential lesson access even when a user enters a lesson URL directly. Locked lessons redirect to the course page with a friendly message.

Invalid lesson IDs are handled separately with a dedicated not-found state.

---

## Progress Rules

A lesson has one of three derived states:

```text
Not started
In progress
Completed
```

The status itself is not persisted. It is derived from the saved lesson progress to avoid duplicated or contradictory state.

A lesson becomes completed when its playback position reaches at least 90% of the video duration.

Course progress is calculated as:

```text
completed lessons / total lessons × 100
```

A lesson is unlocked only when the previous lesson has been completed. The first lesson of a course is always unlocked.

---

## Testing

Run the full test suite with:

```bash
ng test --watch=false
```

The project includes tests covering the required progress business rules:

- 90% lesson completion threshold
- Sequential lesson unlocking
- Course progress percentage calculation

Component smoke tests also verify that the main application components can be created with their required dependencies.

For a production build:

```bash
ng build
```

---

## Trade-offs and Known Limitations

### Completion tracking

For the scope of this task, the 90% completion rule is based on the current playback position reaching 90% of the video duration.

A production LMS could instead track watched time ranges to prevent seeking directly near the end of a video from satisfying the completion rule.

### Local persistence

Progress is stored locally for this offline implementation. The storage abstraction was intentionally introduced so this can later be replaced with server-side persistence.

### Course data

The application uses bundled static JSON as required by the task. In a production system, course content would normally come from a backend or content-management API.

### Scope

The implementation prioritizes the required learning journey, clean state handling, routing, persistence, tests, responsive RTL UX, and maintainable TypeScript over adding a large number of optional features.



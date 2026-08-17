# CollabBoard Client

The React frontend for CollabBoard, a collaborative Kanban task board.

## Tech Stack

- React 18
- Vite
- React Router 6
- Jest + React Testing Library

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Project Structure

```
src/
├── components/
│   ├── common/           # Shared UI primitives (Button, Card, Modal, Input)
│   ├── board/            # Board-specific components (Board, Column, TaskCard, AddTaskForm)
│   └── layout/           # Layout components (Header, Sidebar)
├── pages/                # Route-level page components
├── context/              # React Context providers
├── hooks/                # Custom hooks
├── services/             # API and WebSocket clients
├── data/                 # Mock data
├── utils/                # Helper functions
├── tests/                # Test files
├── App.jsx               # Root component with routing
├── App.css               # Global styles
└── main.jsx              # Application entry point
```

## Features

- Kanban board with To Do, In Progress, and Done columns
- Add, delete, and move tasks between columns
- Task detail view with deep linking
- 404 catch-all route
- Shared Button component with variants
- BoardContext for state management
- useReducer for task state (added, moved, deleted actions)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the board.

# CollabBoard

A progressively built collaborative Kanban task board. Manage tasks across columns, track progress, and organize team workflows.

## Tech Stack

- **Frontend:** React 18, Vite, React Router 6
- **Backend:** Express, MongoDB (Mongoose)
- **State:** React Context, useReducer
- **Styling:** CSS
- **Testing:** Jest, React Testing Library

## Project Structure

```
CollabBoard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Shared UI primitives (Button, ThemeToggle, UserProfile)
│   │   │   ├── board/       # Board-specific components (Board, Column, TaskCard, AddTaskForm)
│   │   │   └── layout/      # Layout components (Header, Sidebar, AppLayout)
│   │   ├── pages/           # Route-level pages (Board, TaskDetail, NotFound)
│   │   ├── context/         # React Context providers (Board, Filter, User, Theme)
│   │   ├── constants/       # Shared constants
│   │   ├── data/            # Mock data
│   │   ├── hooks/           # Custom hooks
│   │   ├── reducers/        # State reducers
│   │   ├── routes/          # Route definitions
│   │   ├── services/        # API client
│   │   ├── utils/           # Helper functions
│   │   ├── tests/           # Client-side tests
│   │   ├── App.jsx          # Root component with routing
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Application entry point
│   └── package.json
├── server/                  # Express API server
│   ├── config.js            # App configuration
│   ├── server.js            # Server entry point
│   ├── db/                  # Database connection
│   ├── models/              # Mongoose schemas
│   ├── repositories/        # Data access layer
│   ├── services/            # Business logic
│   ├── controllers/         # Request handlers
│   ├── routes/              # Route definitions
│   ├── middleware/          # Express middleware
│   ├── mockdata/            # Server-side mock data
│   └── package.json
├── .env                     # Environment variables (git-ignored)
├── .env.example             # Environment template
└── package.json             # Root scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (optional — only needed for the backend API)

### Installation

```bash
# Install root/backend dependencies
npm install

# Install client dependencies
cd client
npm install
```

### Backend Environment

Create a `.env` file in the project root (or copy `.env.example`):

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Development

**Frontend only (with mock data):**

```bash
cd client
npm run dev
```

Open http://localhost:5173. The board loads with pre-seeded mock tasks and works without the backend.

**Frontend + Backend:**

```bash
# Terminal 1 — start backend API server (runs on http://localhost:5000)
npm run dev

# Terminal 2 — start frontend dev server (runs on http://localhost:5173)
cd client
npm run dev
```

## Scripts

### Root (Server)

- `npm run dev` — Start backend API server with nodemon
- `npm start` — Start backend API server in production mode

### Client

- `npm run dev` — Start development server (http://localhost:5173)
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm test` — Run tests

## Features

- Kanban board with To Do, In Progress, and Done columns
- Add, delete, and move tasks between columns
- Task detail view with deep linking
- 404 catch-all route
- Shared UI components (Button, ThemeToggle, UserProfile)
- Context-based state management
- Dark/light theme toggle
- Responsive UI
- Mock data available for frontend-only development

## License

MIT

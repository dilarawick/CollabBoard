# CollabBoard

A progressively built collaborative Kanban task board. Manage tasks across columns, track progress, and organize team workflows.

## Tech Stack

- **Frontend:** React 18, Vite, React Router 6
- **State:** React Context, useReducer
- **Styling:** CSS Modules / plain CSS
- **Testing:** Jest, React Testing Library

## Project Structure

```
CollabBoard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Shared UI primitives (Button, ThemeToggle, UserProfile)
│   │   │   ├── board/       # Board-specific components (Board, Column, TaskCard, AddTaskForm, FilterBar, BoardCounter)
│   │   │   └── layout/      # Layout components (Header, Sidebar, AppLayout)
│   │   ├── pages/           # Route-level pages (Landing, Login, Signup, Board, TaskDetail, NotFound)
│   │   ├── context/         # React Context providers (Task, Filter, User, Theme)
│   │   ├── constants/       # Shared constants
│   │   ├── data/            # Mock data
│   │   ├── reducers/        # State reducers
│   │   └── routes/          # Route definitions
│   └── tests/               # Client-side tests
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Install root/backend dependencies
npm install

# Install client dependencies
cd client
npm install
```

### Backend Environment

Create a `.env` file in the project root:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

You can copy from `.env.example` and replace placeholders with your own MongoDB values.

### Development

```bash
# Start backend API server
npm run dev

# Start the frontend dev server
cd client
npm run dev
```

Open http://localhost:5173 to view the app.

## Scripts

### Client

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Features

- Kanban board with To Do, In Progress, and Done columns
- Add, delete, and move tasks between columns
- Task detail view with deep linking
- 404 catch-all route
- Shared UI components (Button, ThemeToggle)
- Context-based state management
- Dark/light theme toggle
- Responsive UI

## License

MIT

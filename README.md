# CollabBoard

A progressively built full-stack collaborative Kanban task board. Teams can create boards, manage tasks across columns, and see teammates' changes update live.

## Tech Stack

- **Frontend:** React 18, Vite, React Router 6
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Real-time:** Socket.io
- **Testing:** Jest, React Testing Library, Supertest
- **DevOps:** Docker, Docker Compose, GitHub Actions

## Project Structure

```
CollabBoard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API and WebSocket clients
│   │   ├── data/           # Mock data
│   │   └── utils/          # Helper functions
│   └── tests/              # Client-side tests
└── server/                 # Express backend
    ├── src/
    │   ├── models/         # Mongoose schemas
    │   ├── controllers/    # Business logic
    │   ├── routes/         # API routes
    │   ├── middleware/     # Auth, validation, error handling
    │   └── services/       # Socket.io, caching
    └── tests/              # Server-side tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Docker & Docker Compose (optional, for containerized setup)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-org>/CollabBoard.git
cd CollabBoard

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development

```bash
# Terminal 1: Start the backend
cd server
npm run dev

# Terminal 2: Start the frontend
cd client
npm run dev
```

### Docker

```bash
docker-compose up --build
```

## Scripts

### Client

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

### Server

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## Features

- Create and manage task boards with columns (To Do, In Progress, Done)
- Add, edit, move, and delete tasks
- Real-time updates via WebSockets
- JWT-based authentication
- Offline support with client-side caching
- Conflict detection for concurrent edits
- Responsive UI with React components
- Automated testing and CI/CD

## License

MIT

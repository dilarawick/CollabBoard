import { Routes, Route } from 'react-router-dom'
import BoardPage from './pages/BoardPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

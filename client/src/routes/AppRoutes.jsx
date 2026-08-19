import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import AppLayout from '../components/layout/AppLayout/AppLayout'
import BoardPage from '../pages/BoardPage/BoardPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TaskDetailPage from '../pages/TaskDetailPage/TaskDetailPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<AppLayout />}>
        <Route path="/app" element={<BoardPage />} />
        <Route path="/app/tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

import BoardPage from '../pages/BoardPage.jsx'
import TaskDetailPage from '../pages/TaskDetailPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export const routes = [
  { path: '/', element: <BoardPage /> },
  { path: '/tasks/:id', element: <TaskDetailPage /> },
  { path: '*', element: <NotFoundPage /> }
]

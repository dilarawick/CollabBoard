import { BrowserRouter } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import { TaskProvider } from './context/TaskContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <FilterProvider>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </FilterProvider>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App

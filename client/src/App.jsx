import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/approutes.js'
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
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  )
}

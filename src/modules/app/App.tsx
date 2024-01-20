import { Route, Routes } from 'react-router-dom'
import { ForbiddenPage, MainPage } from 'pages'
import './styles/index.css'

export function App() {
  return (
    <Routes>
      <Route path={'/sky-scaner/'} element={<MainPage />} />
      <Route path={'/*'} element={<ForbiddenPage />} />
    </Routes>
  )
}

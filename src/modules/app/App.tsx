import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../../pages'
import './styles/index.css'

export function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage />} />
      <Route path={'/*'} element={<MainPage />} />
    </Routes>
  )
}

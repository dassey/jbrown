import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Planner } from './planner/Planner'
import { Credits } from './pages/Credits'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plan" element={<Planner />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  )
}

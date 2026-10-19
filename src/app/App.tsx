
import { Navigate, Route, Routes } from 'react-router-dom'
import Onboarding from '../features/onboarding/Onboarding'
import GoalCreate from '../features/goal/GoalCreate'
import Reward from '../features/rewards/Reward'
import Dashboard from '../features/dashboard/Dashboard'
import { useApp } from '../store'

export default function App() {
  const onboarded = useApp((s) => s.onboarded)
  const setProfile = useApp((s) => s.setProfile)
  const createGoal = useApp((s) => s.createGoal)

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={<Onboarding onComplete={setProfile} />}
      />

      <Route
        path="/goal/new"
        element={<GoalCreate onCreate={createGoal} />}
      />

      <Route path="/reward" element={<Reward />} />

      <Route
        path="/"
        element={
          onboarded ? (
            <Dashboard />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

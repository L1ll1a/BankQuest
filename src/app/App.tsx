import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useApp } from '../store'

function Onboarding() {
  const setProfile = useApp((s) => s.setProfile)
  const navigate = useNavigate()
  return (
    <div className="p-4">
      <div className="text-lg">Onboarding</div>
      <button
        className="mt-3 rounded bg-violet-600 px-3 py-2 text-white"
        onClick={() => {
          setProfile({ age: 17, goalType: 'gadget', habits: [], consent: true })
          navigate('/')
        }}
      >
        Завершить онбординг (тест)
      </button>
    </div>
  )
}

function Goal() {
  const createGoal = useApp((s) => s.createGoal)
  const navigate = useNavigate()
  return (
    <div className="p-4">
      <div className="text-lg">Goal</div>
      <button
        className="mt-3 rounded bg-violet-600 px-3 py-2 text-white"
        onClick={() => {
          createGoal({
            title: 'Наушники',
            target: 12000,
            deadline: '2026-12-15',
            weekly: 1000,
          })
          navigate('/')
        }}
      >
        Создать цель (тест)
      </button>
    </div>
  )
}

function Dashboard() {
  const { level, xp, goals, quests, reset } = useApp()
  const navigate = useNavigate()
  return (
    <div className="p-4">
      <div className="text-lg">Dashboard</div>
      <div>Уровень {level}, XP {xp}</div>
      <div>Целей: {goals.length}, квестов: {quests.length}</div>
      <button
        className="mt-3 mr-2 rounded bg-violet-600 px-3 py-2 text-white"
        onClick={() => navigate('/goal/new')}
      >
        Новая цель
      </button>
      <button
        className="mt-3 rounded bg-gray-500 px-3 py-2 text-white"
        onClick={() => {
          reset()
          navigate('/onboarding')
        }}
      >
        Сбросить демо
      </button>
    </div>
  )
}

export default function App() {
  const onboarded = useApp((s) => s.onboarded)
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/goal/new" element={<Goal />} />
      <Route
        path="/"
        element={onboarded ? <Dashboard /> : <Navigate to="/onboarding" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
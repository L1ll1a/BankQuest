
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Onboarding from '../features/onboarding/Onboarding'
import GoalCreate from '../features/goal/GoalCreate'
import Reward from '../features/rewards/Reward'
import { PrimaryButton, Progress, Screen } from '../ui/Screen'
import { useApp } from '../store'

function Dashboard() {
  const { level, xp, goals, quests, reset } = useApp()
  const navigate = useNavigate()

  return (
    <Screen title="Финансовый уровень">
      <div className="space-y-5">
        <div className="rounded-2xl bg-[#633ed8] p-5 text-white">
          <p className="text-lg font-bold">Уровень {level}</p>
          <p className="mt-2 text-sm">{xp} XP</p>
        </div>

        <h2 className="font-bold">Твои цели</h2>

        {goals.length > 0 ? (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              <b>{goal.title}</b>

              <p className="my-2 text-sm">
                {goal.saved.toLocaleString('ru-RU')} /{' '}
                {goal.target.toLocaleString('ru-RU')} ₽
              </p>

              <Progress value={goal.saved} max={goal.target} />

              <p className="mt-2 text-xs text-gray-500">
                {goal.weekly.toLocaleString('ru-RU')} ₽ в неделю
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#6a6381]">
            Пока нет целей. Создай свою первую!
          </p>
        )}

        <h2 className="font-bold">Квесты</h2>

        <p className="text-sm text-[#6a6381]">
          Доступно квестов: {quests.length}
        </p>

        <PrimaryButton onClick={() => navigate('/goal/new')}>
          + Создать цель
        </PrimaryButton>

        <button
          className="w-full rounded-xl border border-[#d9d0f4] p-3 text-sm"
          onClick={() => {
            reset()
            navigate('/onboarding')
          }}
        >
          Сбросить демо
        </button>
      </div>
    </Screen>
  )
}

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
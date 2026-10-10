import { Navigate, Route, Routes } from 'react-router-dom'
import Onboarding from '../features/onboarding/Onboarding'
import GoalCreate from '../features/goal/GoalCreate'
import Reward from '../features/rewards/Reward'
import { PrimaryButton, Progress, Screen } from '../ui/Screen'
import { useNavigate } from 'react-router-dom'

function TemporaryDashboard() {
  const navigate = useNavigate()
  let goal: {title:string;target:number;weekly:number} | null = null
  try { const raw = localStorage.getItem('bankquest-draft-goal'); if(raw) goal = JSON.parse(raw) } catch { /* ignore stale demo data */ }
  return <Screen title="Финансовый уровень"><div className="space-y-5"><div className="rounded-2xl bg-[#633ed8] p-5 text-white"><p className="text-lg font-bold">Уровень 7</p><p className="mt-2 text-sm">2450 / 3000 XP</p><div className="mt-3 h-2 rounded-full bg-[#937cdd]"><div className="h-full w-[82%] rounded-full bg-[#b8eb65]" /></div></div><h2 className="font-bold">Твои цели</h2>{goal ? <div className="rounded-xl bg-white p-4 shadow-sm"><b>{goal.title}</b><p className="my-2 text-sm">0 / {goal.target.toLocaleString('ru-RU')} ₽ · {goal.weekly.toLocaleString('ru-RU')} ₽/нед.</p><Progress value={0} max={goal.target} /></div> : <p className="text-sm text-[#6a6381]">Пока нет целей</p>}<PrimaryButton onClick={() => navigate('/goal/new')}>+ Создать цель</PrimaryButton><button className="w-full rounded-xl border border-[#d9d0f4] p-3 text-sm" onClick={() => navigate('/onboarding')}>Пройти онбординг</button></div></Screen>
}

export default function App() {
  return <Routes>
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/goal/new" element={<GoalCreate />} />
    <Route path="/reward" element={<Reward />} />
    {/* Replace TemporaryDashboard with Vik's actual Dashboard once merged. */}
    <Route path="/" element={<TemporaryDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

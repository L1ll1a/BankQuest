import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store'
import LevelCard from './LevelCard'
import GoalsList from './GoalsList'
import QuestsList from './QuestsList'
import RewardsList from './RewardsList'
import FinProfile from './FinProfile'
import DemoPanel from '../demo-panel/DemoPanel'
import CelebrationModal from '../demo-panel/CelebrationModal'

export default function Dashboard() {
  const reset = useApp((s) => s.reset)
  const navigate = useNavigate()
  return (
    <div className="mx-auto min-h-screen max-w-[390px] space-y-5 bg-gray-50 p-4 pb-10">
      <h1 className="text-lg font-bold">Финансовый уровень</h1>
      <LevelCard />
      <GoalsList />
      <QuestsList />
      <RewardsList />
      <FinProfile />
      <DemoPanel />
      <button
        className="w-full rounded-xl bg-gray-200 py-2 text-xs font-semibold text-gray-600"
        onClick={() => {
          reset()
          navigate('/onboarding')
        }}
      >
        Сбросить демо
      </button>
      <CelebrationModal />
    </div>
  )
}
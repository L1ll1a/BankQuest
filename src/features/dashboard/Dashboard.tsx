
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
    <main className="min-h-screen bg-[#eaf1fb] px-3 py-6 text-[#142748]">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[30px] bg-[#f8fbff] shadow-[0_20px_60px_rgba(24,67,125,0.12)]">

        <header className="flex items-center justify-between border-b border-[#e6eef9] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b8cb8]">
              Твой финансовый путь
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#12346b]">
              BankQuest
            </h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e6efff] text-xl">
            ✨
          </div>
        </header>

        <div className="space-y-6 px-5 pb-8 pt-6">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Мой уровень</h2>
              <span className="rounded-full bg-[#e6efff] px-3 py-1 text-xs font-semibold text-[#1459d9]">
                Мой прогресс
              </span>
            </div>
            <LevelCard />
          </section>

          <section>
            <GoalsList />
          </section>

          <section>
            <QuestsList />
          </section>

          <section>
            <RewardsList />
          </section>

          <section>
            <FinProfile />
          </section>

          <section>
            <DemoPanel />
          </section>

          <button
            type="button"
            className="w-full rounded-2xl border border-[#dbe6f5] bg-white px-4 py-3 text-xs font-medium text-[#7890ae] transition hover:bg-[#f1f6ff]"
            onClick={() => {
              reset()
              navigate('/onboarding')
            }}
          >
            Сбросить демо
          </button>
        </div>

        <CelebrationModal />
      </div>
    </main>
  )
}

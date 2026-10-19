
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store'

import LevelCard from './LevelCard'
import GoalsList from './GoalsList'
import QuestsList from './QuestsList'
import RewardsList from './RewardsList'
import FinProfile from './FinProfile'
import BottomNav from './BottomNav'
import type { Tab } from './BottomNav'

import DemoPanel from '../demo-panel/DemoPanel'
import CelebrationModal from '../demo-panel/CelebrationModal'

const titles: Record<Tab, string> = {
  home: 'Главная',
  goals: 'Мои цели',
  quests: 'Квесты',
  rewards: 'Награды',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const reset = useApp((s) => s.reset)
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#eaf1fb] px-3 py-5 text-[#142748]">
      <div className="mx-auto flex min-h-[780px] w-full max-w-[430px] flex-col overflow-hidden rounded-[30px] bg-[#f8fbff] shadow-[0_20px_60px_rgba(24,67,125,0.12)]">

        <header className="flex items-center justify-between border-b border-[#e6eef9] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b8cb8]">
              Твой финансовый путь
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#12346b]">
              {activeTab === 'home' ? 'BankQuest' : titles[activeTab]}
            </h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e6efff] text-xl">
            ✨
          </div>
        </header>

        <div className="flex-1 space-y-6 px-5 pb-8 pt-6">
          {activeTab === 'home' && (
            <>
              <section>
                <h2 className="mb-3 text-lg font-bold">
                  Мой финансовый уровень
                </h2>
                <LevelCard />
              </section>

              <GoalsList />
              <QuestsList />
              <FinProfile />

              <section>
                <h2 className="mb-3 text-lg font-bold text-[#152d54]">
                  Демо-симулятор
                </h2>
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
            </>
          )}

          {activeTab === 'goals' && (
            <>
              <div className="rounded-2xl bg-[#e8f1ff] p-5">
                <p className="text-sm font-bold text-[#1459d9]">
                  Большие планы начинаются с малого
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#5c789f]">
                  Выбирай цель, откладывай регулярно и наблюдай за прогрессом.
                </p>
              </div>
              <GoalsList />
            </>
          )}

          {activeTab === 'quests' && (
            <>
              <div className="rounded-2xl bg-[#e8f1ff] p-5">
                <p className="text-sm font-bold text-[#1459d9]">
                  Прокачивай финансовые привычки
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#5c789f]">
                  Выполняй задания, зарабатывай XP и повышай уровень.
                </p>
              </div>
              <QuestsList />
            </>
          )}

          {activeTab === 'rewards' && (
            <>
              <div className="rounded-2xl bg-gradient-to-r from-[#0b4bc1] to-[#3489f6] p-5 text-white">
                <div className="text-3xl">🎁</div>
                <h2 className="mt-3 text-xl font-extrabold">
                  Твои достижения — твои бонусы
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-blue-100">
                  Открывай награды, повышая свой финансовый уровень.
                </p>
              </div>
              <RewardsList />
            </>
          )}
        </div>

        <BottomNav active={activeTab} onChange={setActiveTab} />
        <CelebrationModal />
      </div>
    </main>
  )
}

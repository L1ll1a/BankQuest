
import type { ReactNode } from 'react'

export type Tab = 'home' | 'goals' | 'quests' | 'rewards'

type BottomNavProps = {
  active: Tab
  onChange: (tab: Tab) => void
}

function NavIcon({
  name,
}: {
  name: Tab
}) {
  const paths: Record<Tab, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </>
    ),
    goals: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    quests: (
      <path d="m13 2-9 11h7l-1 9 10-12h-7z" />
    ),
    rewards: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M12 9v12M3 13h18M12 9c-4 0-7-2-7-5 0-3 5-3 7 5ZM12 9c4 0 7-2 7-5 0-3-5-3-7 5Z" />
      </>
    ),
  }

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'goals', label: 'Цели' },
  { id: 'quests', label: 'Квесты' },
  { id: 'rewards', label: 'Награды' },
]

export default function BottomNav({
  active,
  onChange,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Основная навигация"
      className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-[#e5edfa] bg-white/95 px-3 pb-3 pt-2 shadow-[0_-8px_24px_rgba(18,58,118,0.04)] backdrop-blur-md"
    >
      {tabs.map((tab) => {
        const selected = active === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            aria-current={selected ? 'page' : undefined}
            onClick={() => {
              onChange(tab.id)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-1 transition ${
              selected
                ? 'bg-[#eaf2ff] text-[#1764e8]'
                : 'text-[#91a2b9] hover:bg-[#f4f8ff]'
            }`}
          >
            <NavIcon name={tab.id} />
            <span className="text-[11px] font-semibold">
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

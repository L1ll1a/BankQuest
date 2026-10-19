
type Tab = 'home' | 'goals' | 'quests' | 'rewards'

type BottomNavProps = {
  active: Tab
  onChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: '⌂' },
  { id: 'goals', label: 'Цели', icon: '◎' },
  { id: 'quests', label: 'Квесты', icon: '⚡' },
  { id: 'rewards', label: 'Награды', icon: '♕' },
]

export default function BottomNav({
  active,
  onChange,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Основная навигация"
      className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-[#e5edfa] bg-white/95 px-2 pb-3 pt-2 shadow-[0_-8px_24px_rgba(18,58,118,0.04)] backdrop-blur-md"
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
            className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 transition ${
              selected
                ? 'bg-[#edf4ff] text-[#1764e8]'
                : 'text-[#8a9ab1] hover:bg-[#f5f8fd]'
            }`}
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="text-[11px] font-semibold">
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export type { Tab }

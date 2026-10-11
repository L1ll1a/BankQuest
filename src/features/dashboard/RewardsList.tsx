import { useState } from 'react'
import { useApp } from '../../store'

export default function RewardsList() {
  const rewards = useApp((s) => s.rewards)
  const level = useApp((s) => s.level)
  const [shown, setShown] = useState<string[]>([])
  return (
    <section>
      <h2 className="mb-2 font-bold">Награды</h2>
      <div className="space-y-2">
        {rewards.map((r) => {
          const open = level >= r.minLevel
          const revealed = shown.includes(r.id)
          return (
            <div
              key={r.id}
              className={`rounded-2xl p-4 ${open ? 'bg-white' : 'bg-gray-200'}`}
            >
              <div className={`font-semibold ${open ? '' : 'text-gray-500'}`}>
                {r.title}
              </div>
              <div className="text-xs text-gray-500">
                {r.partner} · уровень {r.minLevel}
              </div>
              {open ? (
                revealed ? (
                  <div className="mt-2 rounded-lg bg-violet-100 py-2 text-center text-sm font-bold text-violet-700">
                    {r.code}
                  </div>
                ) : (
                  <button
                    className="mt-2 w-full rounded-lg bg-violet-600 py-2 text-xs font-bold text-white"
                    onClick={() => setShown([...shown, r.id])}
                  >
                    Активировать
                  </button>
                )
              ) : (
                <div className="mt-2 text-xs font-semibold text-gray-500">
                  Откроется на уровне {r.minLevel}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
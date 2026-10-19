
import { useState } from 'react'
import { useApp } from '../../store'

export default function RewardsList() {
  const rewards = useApp((s) => s.rewards)
  const level = useApp((s) => s.level)
  const [shown, setShown] = useState<string[]>([])

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#152d54]">
          Награды
        </h2>
        <span className="text-xs font-semibold text-[#1764e8]">
          Твои бонусы
        </span>
      </div>

      <div className="space-y-3">
        {rewards.map((r) => {
          const open = level >= r.minLevel
          const revealed = shown.includes(r.id)

          return (
            <div
              key={r.id}
              className={`rounded-[22px] border p-5 shadow-sm ${
                open
                  ? 'border-[#dbe8fc] bg-gradient-to-br from-white to-[#f0f6ff]'
                  : 'border-[#e8edf5] bg-[#f0f3f8]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                    open ? 'bg-[#e4efff]' : 'bg-[#e3e8f0]'
                  }`}
                >
                  {open ? '🎁' : '🔒'}
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-bold ${
                      open ? 'text-[#18365c]' : 'text-[#8291a5]'
                    }`}
                  >
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#8293ab]">
                    {r.partner} · уровень {r.minLevel}
                  </p>
                </div>
              </div>

              {open ? (
                revealed ? (
                  <div className="mt-4 rounded-xl border border-[#c7defc] bg-[#e8f2ff] px-3 py-3 text-center text-sm font-extrabold tracking-wide text-[#1356c4]">
                    {r.code}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="mt-4 w-full rounded-xl bg-[#1764e8] py-3 text-sm font-bold text-white transition hover:bg-[#1050c4]"
                    onClick={() =>
                      setShown((prev) =>
                        prev.includes(r.id) ? prev : [...prev, r.id],
                      )
                    }
                  >
                    Активировать награду
                  </button>
                )
              ) : (
                <div className="mt-4 rounded-xl bg-white/70 px-3 py-3 text-center text-xs font-semibold text-[#8a98ac]">
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


import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store'
import Bar from './Bar'

const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

const date = (s: string) =>
  new Date(s).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

export default function GoalsList() {
  const goals = useApp((s) => s.goals)
  const navigate = useNavigate()

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#152d54]">
          Мои цели
        </h2>
        <span className="rounded-full bg-[#e7f0ff] px-3 py-1 text-xs font-semibold text-[#1661d9]">
          {goals.length} активных
        </span>
      </div>

      {goals.length === 0 ? (
        <div className="rounded-[22px] border border-[#e5edfa] bg-white p-6 text-center shadow-sm">
          <div className="mb-3 text-4xl">🎯</div>
          <p className="font-bold text-[#17365e]">
            Начни с первой цели
          </p>
          <p className="mt-2 text-sm text-[#8293ab]">
            Поставь финансовую цель и получи +50 XP
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((g) => {
            const pct =
              g.target > 0
                ? Math.min(100, Math.max(0, Math.round((g.saved / g.target) * 100)))
                : 0

            return (
              <div
                key={g.id}
                className="rounded-[22px] border border-[#e6eef9] bg-white p-5 shadow-[0_5px_20px_rgba(33,86,154,0.05)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-2xl">
                    🎯
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-[#18365c]">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8293ab]">
                      До {date(g.deadline)}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-[#1461dc]">
                    {pct}%
                  </span>
                </div>

                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <span className="text-base font-extrabold text-[#18365c]">
                    {rub(g.saved)}
                  </span>
                  <span className="text-xs text-[#8494a9]">
                    из {rub(g.target)}
                  </span>
                </div>

                <Bar
                  value={g.target > 0 ? g.saved / g.target : 0}
                  color="bg-[#1769ed]"
                />

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-[#8293ab]">Накоплено</span>
                  <span className="font-semibold text-[#1661d9]">
                    {pct}% от цели
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-2xl bg-[#1764e8] py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(23,100,232,0.18)] transition hover:bg-[#1050c4]"
        onClick={() => navigate('/goal/new')}
      >
        + Создать новую цель
      </button>
    </section>
  )
}

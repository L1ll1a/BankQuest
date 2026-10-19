
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store'
import Bar from './Bar'

const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

const date = (s: string) =>
  new Date(s).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

function getGoalIcon(title: string) {
  const value = title.toLowerCase()

  if (/наушник|airpods|гарнитур/.test(value)) return '🎧'
  if (/телефон|iphone|смартфон/.test(value)) return '📱'
  if (/ноутбук|macbook|компьютер/.test(value)) return '💻'
  if (/подар|день рожден/.test(value)) return '🎁'
  if (/поезд|путешеств|отпуск|билет/.test(value)) return '✈️'
  if (/машин|автомобил/.test(value)) return '🚗'
  if (/одежд|куртк|кроссов/.test(value)) return '👕'

  return '🎯'
}

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
        <div className="rounded-[22px] border border-[#e5edfa] bg-white p-5 text-center">
          <div className="text-3xl">🎯</div>
          <p className="mt-3 text-sm font-bold text-[#17365e]">
            Начни с первой цели
          </p>
          <p className="mt-1 text-xs text-[#8293ab]">
            Поставь цель и получи +50 XP
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((g) => {
            const progress =
              g.target > 0 ? g.saved / g.target : 0

            const pct = Math.min(
              100,
              Math.max(0, Math.round(progress * 100)),
            )

            return (
              <div
                key={g.id}
                className="rounded-[22px] border border-[#e4ecf8] bg-white p-4 shadow-[0_5px_18px_rgba(33,86,154,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-2xl">
                    {getGoalIcon(g.title)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-extrabold text-[#18365c]">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8293ab]">
                      До {date(g.deadline)}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-extrabold text-[#1764e8]">
                    {pct}%
                  </span>
                </div>

                <div className="mb-2 mt-4 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-extrabold text-[#18365c]">
                    {rub(g.saved)}
                  </span>
                  <span className="text-xs text-[#8494a9]">
                    из {rub(g.target)}
                  </span>
                </div>

                <Bar value={progress} color="bg-[#1769ed]" />
              </div>
            )
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate('/goal/new')}
        className="mt-4 w-full rounded-2xl bg-[#1764e8] py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(23,100,232,0.15)] transition hover:bg-[#1050c4]"
      >
        + Создать новую цель
      </button>
    </section>
  )
}

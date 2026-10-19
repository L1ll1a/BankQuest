
import { useApp } from '../../store'
import Bar from './Bar'

export default function QuestsList() {
  const quests = useApp((s) => s.quests)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#152d54]">
          Квесты
        </h2>
        <span className="text-xs font-semibold text-[#1764e8]">
          {quests.length} заданий
        </span>
      </div>

      <div className="space-y-3">
        {quests.map((q) => {
          const pct =
            q.total > 0
              ? Math.min(100, Math.max(0, Math.round((q.progress / q.total) * 100)))
              : 0

          return (
            <div
              key={q.id}
              className="rounded-[22px] border border-[#e6eef9] bg-white p-5 shadow-[0_5px_20px_rgba(33,86,154,0.05)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-xl">
                  {q.status === 'done' ? '✅' : '⚡'}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-snug text-[#18365c]">
                    {q.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#8293ab]">
                    {q.unit === 'days'
                      ? `${q.progress} из ${q.total} дней`
                      : `${q.progress.toLocaleString('ru-RU')} из ${q.total.toLocaleString('ru-RU')} ₽`}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#e6f8ee] px-2 py-1 text-[11px] font-bold text-[#13a66b]">
                  +{q.xp} XP
                </span>
              </div>

              <div className="mt-4">
                <Bar
                  value={q.total > 0 ? q.progress / q.total : 0}
                  color="bg-[#1769ed]"
                />
              </div>

              <div className="mt-2 flex justify-between text-[11px]">
                <span className="text-[#8293ab]">
                  {q.status === 'done' ? 'Квест выполнен' : 'В процессе'}
                </span>
                <span className="font-bold text-[#1764e8]">
                  {pct}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

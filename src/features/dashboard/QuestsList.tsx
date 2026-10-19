import { useApp } from '../../store'
import Bar from './Bar'

export default function QuestsList() {
  const quests = useApp((s) => s.quests)
  return (
    <section>
      <h2 className="mb-2 font-bold">Квесты</h2>
      <div className="space-y-2">
        {quests.map((q) => (
          <div key={q.id} className="rounded-2xl bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold">{q.title}</div>
              <div className="shrink-0 text-xs font-bold text-green-600">
                +{q.xp} XP
              </div>
            </div>
            <div className="mb-2 text-xs text-gray-500">
              {q.unit === 'days'
                ? `${q.progress} из ${q.total} дней`
                : `${q.progress.toLocaleString('ru-RU')} из ${q.total.toLocaleString('ru-RU')} ₽`}
              {q.status === 'done' ? ' · выполнен' : ''}
            </div>
            <Bar value={q.progress / q.total} />
          </div>
        ))}
      </div>
    </section>
  )
}